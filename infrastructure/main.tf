terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"
}
provider "aws" {
  region  = "ap-southeast-1"
}

resource "aws_vpc" "prod_vpc" {
  cidr_block = "10.0.0.0/16"
}

// Creating the internet gateway

resource "aws_internet_gateway" "gw" {
  vpc_id = aws_vpc.prod_vpc.id  
}

// I w

resource "aws_route_table" "main_route_table" {
  vpc_id = aws_vpc.prod_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.gw.id
  }
}

// I will create four subnets,two public subnets and two private subnets for failover
// First subnet would be 10.0.0.0/18
// Second subnet would be 10.0.64.0/18

// Third subnet would be  10.0.128.0/18
// Fourth subnet would be 10.0.192.0/18
resource "aws_subnet" "public_subnet_one" {
  vpc_id     = aws_vpc.prod_vpc.id
  cidr_block = "10.0.0.0/18"
  availability_zone = "ap-southeast-1a"

  tags = {
    Name = "Public Subnet 1"
  }
}
resource "aws_subnet" "public_subnet_two" {
  vpc_id     = aws_vpc.prod_vpc.id
  cidr_block = "10.0.64.0/18"
  availability_zone = "ap-southeast-1b"

  tags = {
    Name = "Public Subnet 2"
  }
}

// Route table association
resource "aws_route_table_association" "public_subnet_1_association" {
  subnet_id      = aws_subnet.public_subnet_one.id
  route_table_id = aws_route_table.main_route_table.id
}
resource "aws_route_table_association" "public_subnet_2_association" {
  subnet_id      = aws_subnet.public_subnet_two.id
  route_table_id = aws_route_table.main_route_table.id
}

resource "aws_security_group" "allow_tls" {
  name        = "allow_tls"
  description = "Allow TLS inbound traffic and all outbound traffic"
  vpc_id      = aws_vpc.prod_vpc.id

  tags = {
    Name = "allow_tls"
  }
}

resource "aws_vpc_security_group_ingress_rule" "allow_tls_ipv4" {
  security_group_id = aws_security_group.allow_tls.id
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = 443
  ip_protocol       = "tcp"
  to_port           = 443
}
resource "aws_vpc_security_group_ingress_rule" "allow_ssh_ipv4" {
  security_group_id = aws_security_group.allow_tls.id
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = 22
  ip_protocol       = "tcp"
  to_port           = 22
}
resource "aws_vpc_security_group_ingress_rule" "allow_http_ipv4" {
  security_group_id = aws_security_group.allow_tls.id
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = 80
  ip_protocol       = "tcp"
  to_port           = 80
}

resource "aws_vpc_security_group_egress_rule" "allow_all_traffic_ipv4" {
  security_group_id = aws_security_group.allow_tls.id
  cidr_ipv4         = "0.0.0.0/0"
  ip_protocol       = "-1" # semantically equivalent to all ports
}


resource "aws_network_interface" "web_network_interface" {
  subnet_id   = aws_subnet.public_subnet_one.id
  private_ips = ["10.0.0.4"]
  security_groups = [aws_security_group.allow_tls.id]

  tags = {
    Name = "primary_network_interface"
  }
}

resource "aws_eip" "public_ip" {

  network_interface         = aws_network_interface.web_network_interface.id
  associate_with_private_ip = "10.0.0.4"
  depends_on = [aws_internet_gateway.gw] 
}


resource "aws_instance" "web" {
  ami           = "ami-060e277c0d4cce553"
  instance_type = "t2.micro"
  
  key_name = "main-key"
  network_interface {
    network_interface_id = aws_network_interface.web_network_interface.id
    device_index         = 0
  }

  tags = {
    Name = "Proxy Server"
  }
}

output "public_ip" {
  value = aws_eip.public_ip.address
}

# S3 bucket to read data
resource "aws_s3_bucket" "athena" {
  bucket = "isb-raw-data-athena"

  tags = {
    Name        = "My bucket"
    Environment = "Dev"
  }
}

# S3 bucket to store athena output data
resource "aws_s3_bucket" "athena_output" {
  bucket = "isb-raw-data-athena-output"

  tags = {
    Name        = "My bucket"
    Environment = "Dev"
  }
}

# Athena Workgroup
resource "aws_athena_workgroup" "athena_workgroup" {
  name = "JsonQuery"

  configuration {
    enforce_workgroup_configuration    = true
    publish_cloudwatch_metrics_enabled = true

    result_configuration {
      output_location = "s3://isb-raw-data-athena-output/"
    }
  }
}

# Athena Database
resource "aws_athena_database" "athena_db" {
  name   = "s3jsondb"
  bucket = "isb-raw-data-athena-output"
}

# Structured Table in Athena Database
resource "aws_glue_catalog_table" "athena_table" {
  database_name = "s3jsondb"
  name          = "s3jsontable"

  table_type = "EXTERNAL_TABLE"

  storage_descriptor {
    columns {
      name = "event_type"
      type = "string"
    }
    columns {
      name = "event_id"
      type = "string"
    }
    columns {
      name = "timestamp"
      type = "timestamp"
    }
    columns {
      name = "user_id"
      type = "string"
    }

    location = "s3://isb-raw-data-athena/"

    input_format  = "org.apache.hadoop.mapred.TextInputFormat"
    output_format = "org.apache.hadoop.hive.ql.io.HiveIgnoreKeyTextOutputFormat"

    ser_de_info {
      serialization_library = "org.openx.data.jsonserde.JsonSerDe"
      parameters = {
        "ignore.malformed.json" = "FALSE"
        "dots.in.keys"          = "FALSE"
        "case.insensitive"      = "TRUE"
        "mapping"               = "TRUE"
      }
    }
  }

  parameters = {
    "classification" = "json"
  }

  depends_on = [aws_athena_database.athena_db]
}