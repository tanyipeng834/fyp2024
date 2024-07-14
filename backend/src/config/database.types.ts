export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      accounts: {
        Row: {
          age: Database["public"]["Enums"]["age_type"]
          datecreated: string | null
          email: string
          firstname: string
          gender: Database["public"]["Enums"]["gender_type"]
          lastname: string
          role: Database["public"]["Enums"]["role"]
          userid: number
        }
        Insert: {
          age: Database["public"]["Enums"]["age_type"]
          datecreated?: string | null
          email: string
          firstname: string
          gender: Database["public"]["Enums"]["gender_type"]
          lastname: string
          role: Database["public"]["Enums"]["role"]
          userid?: number
        }
        Update: {
          age?: Database["public"]["Enums"]["age_type"]
          datecreated?: string | null
          email?: string
          firstname?: string
          gender?: Database["public"]["Enums"]["gender_type"]
          lastname?: string
          role?: Database["public"]["Enums"]["role"]
          userid?: number
        }
        Relationships: []
      }
      accountsaffective: {
        Row: {
          attitude: Database["public"]["Enums"]["attitude_towards_learning_type"]
          barriers: Database["public"]["Enums"]["barriers_to_learning_interests_type"][]
          motivationallevel: Database["public"]["Enums"]["motivational_level_type"]
          personality: Database["public"]["Enums"]["personality_type"]
          reasons: Database["public"]["Enums"]["reasons_for_attending_course_type"][]
          userid: number
        }
        Insert: {
          attitude: Database["public"]["Enums"]["attitude_towards_learning_type"]
          barriers: Database["public"]["Enums"]["barriers_to_learning_interests_type"][]
          motivationallevel: Database["public"]["Enums"]["motivational_level_type"]
          personality: Database["public"]["Enums"]["personality_type"]
          reasons: Database["public"]["Enums"]["reasons_for_attending_course_type"][]
          userid: number
        }
        Update: {
          attitude?: Database["public"]["Enums"]["attitude_towards_learning_type"]
          barriers?: Database["public"]["Enums"]["barriers_to_learning_interests_type"][]
          motivationallevel?: Database["public"]["Enums"]["motivational_level_type"]
          personality?: Database["public"]["Enums"]["personality_type"]
          reasons?: Database["public"]["Enums"]["reasons_for_attending_course_type"][]
          userid?: number
        }
        Relationships: [
          {
            foreignKeyName: "accountsaffective_userid_fkey"
            columns: ["userid"]
            isOneToOne: true
            referencedRelation: "accounts"
            referencedColumns: ["userid"]
          },
        ]
      }
      accountscognitive: {
        Row: {
          educationallevel: Database["public"]["Enums"]["educational_level_type"]
          languageabilities: Database["public"]["Enums"]["language_abilities_type"]
          learningpreferences: Database["public"]["Enums"]["learning_preferences_type"]
          litnumproficiency: Database["public"]["Enums"]["literacy_numeracy_proficiency_type"]
          priorknowledge: Database["public"]["Enums"]["prior_knowledge_skills_type"]
          userid: number
        }
        Insert: {
          educationallevel: Database["public"]["Enums"]["educational_level_type"]
          languageabilities: Database["public"]["Enums"]["language_abilities_type"]
          learningpreferences: Database["public"]["Enums"]["learning_preferences_type"]
          litnumproficiency: Database["public"]["Enums"]["literacy_numeracy_proficiency_type"]
          priorknowledge: Database["public"]["Enums"]["prior_knowledge_skills_type"]
          userid: number
        }
        Update: {
          educationallevel?: Database["public"]["Enums"]["educational_level_type"]
          languageabilities?: Database["public"]["Enums"]["language_abilities_type"]
          learningpreferences?: Database["public"]["Enums"]["learning_preferences_type"]
          litnumproficiency?: Database["public"]["Enums"]["literacy_numeracy_proficiency_type"]
          priorknowledge?: Database["public"]["Enums"]["prior_knowledge_skills_type"]
          userid?: number
        }
        Relationships: [
          {
            foreignKeyName: "accountscognitive_userid_fkey"
            columns: ["userid"]
            isOneToOne: true
            referencedRelation: "accounts"
            referencedColumns: ["userid"]
          },
        ]
      }
      accountsdemographics: {
        Row: {
          careerstage: Database["public"]["Enums"]["career_stage_type"]
          ethnicgroup: string
          jobcategory: Database["public"]["Enums"]["job_category_type"]
          lifestage: Database["public"]["Enums"]["life_stage_type"]
          race: Database["public"]["Enums"]["race_type"]
          specialneeds: Database["public"]["Enums"]["special_needs_type"]
          userid: number
        }
        Insert: {
          careerstage: Database["public"]["Enums"]["career_stage_type"]
          ethnicgroup: string
          jobcategory: Database["public"]["Enums"]["job_category_type"]
          lifestage: Database["public"]["Enums"]["life_stage_type"]
          race: Database["public"]["Enums"]["race_type"]
          specialneeds: Database["public"]["Enums"]["special_needs_type"]
          userid: number
        }
        Update: {
          careerstage?: Database["public"]["Enums"]["career_stage_type"]
          ethnicgroup?: string
          jobcategory?: Database["public"]["Enums"]["job_category_type"]
          lifestage?: Database["public"]["Enums"]["life_stage_type"]
          race?: Database["public"]["Enums"]["race_type"]
          specialneeds?: Database["public"]["Enums"]["special_needs_type"]
          userid?: number
        }
        Relationships: [
          {
            foreignKeyName: "accountsdemographics_userid_fkey"
            columns: ["userid"]
            isOneToOne: true
            referencedRelation: "accounts"
            referencedColumns: ["userid"]
          },
        ]
      }
      accountssocial: {
        Row: {
          compliteracy: Database["public"]["Enums"]["computer_literacy_type"]
          relationshiptopeers: Database["public"]["Enums"]["relationship_to_peers_type"]
          socialbackground: Database["public"]["Enums"]["social_background_type"]
          tendency: Database["public"]["Enums"]["tendency_to_compete_or_cooperate_type"]
          userid: number
        }
        Insert: {
          compliteracy: Database["public"]["Enums"]["computer_literacy_type"]
          relationshiptopeers: Database["public"]["Enums"]["relationship_to_peers_type"]
          socialbackground: Database["public"]["Enums"]["social_background_type"]
          tendency: Database["public"]["Enums"]["tendency_to_compete_or_cooperate_type"]
          userid: number
        }
        Update: {
          compliteracy?: Database["public"]["Enums"]["computer_literacy_type"]
          relationshiptopeers?: Database["public"]["Enums"]["relationship_to_peers_type"]
          socialbackground?: Database["public"]["Enums"]["social_background_type"]
          tendency?: Database["public"]["Enums"]["tendency_to_compete_or_cooperate_type"]
          userid?: number
        }
        Relationships: [
          {
            foreignKeyName: "accountssocial_userid_fkey"
            columns: ["userid"]
            isOneToOne: true
            referencedRelation: "accounts"
            referencedColumns: ["userid"]
          },
        ]
      }
      certificate: {
        Row: {
          certificateid: number
          certificateurl: string | null
          courseid: string
          issuedate: string | null
          provider: string
          userid: number
        }
        Insert: {
          certificateid?: number
          certificateurl?: string | null
          courseid: string
          issuedate?: string | null
          provider: string
          userid: number
        }
        Update: {
          certificateid?: number
          certificateurl?: string | null
          courseid?: string
          issuedate?: string | null
          provider?: string
          userid?: number
        }
        Relationships: [
          {
            foreignKeyName: "certificate_courseid_fkey"
            columns: ["courseid"]
            isOneToOne: false
            referencedRelation: "course"
            referencedColumns: ["courseid"]
          },
          {
            foreignKeyName: "certificate_userid_fkey"
            columns: ["userid"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["userid"]
          },
        ]
      }
      course: {
        Row: {
          coursedescription: string | null
          courseid: string
          coursename: string
          datecreated: string | null
          skillsfutureccs: string
        }
        Insert: {
          coursedescription?: string | null
          courseid: string
          coursename: string
          datecreated?: string | null
          skillsfutureccs: string
        }
        Update: {
          coursedescription?: string | null
          courseid?: string
          coursename?: string
          datecreated?: string | null
          skillsfutureccs?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_skillsfutureccs_fkey"
            columns: ["skillsfutureccs"]
            isOneToOne: false
            referencedRelation: "skillsfuturemapping"
            referencedColumns: ["skillsfutureccs"]
          },
        ]
      }
      coursemodule: {
        Row: {
          courseid: string
          moduleid: string
          sequence: number
        }
        Insert: {
          courseid: string
          moduleid: string
          sequence: number
        }
        Update: {
          courseid?: string
          moduleid?: string
          sequence?: number
        }
        Relationships: [
          {
            foreignKeyName: "coursemodule_courseid_fkey"
            columns: ["courseid"]
            isOneToOne: false
            referencedRelation: "course"
            referencedColumns: ["courseid"]
          },
          {
            foreignKeyName: "coursemodule_moduleid_fkey"
            columns: ["moduleid"]
            isOneToOne: false
            referencedRelation: "module"
            referencedColumns: ["moduleid"]
          },
        ]
      }
      material: {
        Row: {
          datecreated: string | null
          materialdescription: string | null
          materialduration: number | null
          materialid: string
          materialname: string
          materialtext: string | null
          materialurl: string | null
        }
        Insert: {
          datecreated?: string | null
          materialdescription?: string | null
          materialduration?: number | null
          materialid: string
          materialname: string
          materialtext?: string | null
          materialurl?: string | null
        }
        Update: {
          datecreated?: string | null
          materialdescription?: string | null
          materialduration?: number | null
          materialid?: string
          materialname?: string
          materialtext?: string | null
          materialurl?: string | null
        }
        Relationships: []
      }
      module: {
        Row: {
          datecreated: string | null
          moduledescription: string | null
          moduleid: string
          modulename: string
        }
        Insert: {
          datecreated?: string | null
          moduledescription?: string | null
          moduleid: string
          modulename: string
        }
        Update: {
          datecreated?: string | null
          moduledescription?: string | null
          moduleid?: string
          modulename?: string
        }
        Relationships: []
      }
      modulematerial: {
        Row: {
          courseid: string
          materialid: string
          moduleid: string
        }
        Insert: {
          courseid: string
          materialid: string
          moduleid: string
        }
        Update: {
          courseid?: string
          materialid?: string
          moduleid?: string
        }
        Relationships: [
          {
            foreignKeyName: "modulematerial_courseid_fkey"
            columns: ["courseid"]
            isOneToOne: false
            referencedRelation: "course"
            referencedColumns: ["courseid"]
          },
          {
            foreignKeyName: "modulematerial_materialid_fkey"
            columns: ["materialid"]
            isOneToOne: false
            referencedRelation: "material"
            referencedColumns: ["materialid"]
          },
          {
            foreignKeyName: "modulematerial_moduleid_fkey"
            columns: ["moduleid"]
            isOneToOne: false
            referencedRelation: "module"
            referencedColumns: ["moduleid"]
          },
        ]
      }
      question: {
        Row: {
          answer: string
          option1: string
          option2: string
          option3: string
          option4: string
          question: string
          questionid: string
        }
        Insert: {
          answer: string
          option1: string
          option2: string
          option3: string
          option4: string
          question: string
          questionid: string
        }
        Update: {
          answer?: string
          option1?: string
          option2?: string
          option3?: string
          option4?: string
          question?: string
          questionid?: string
        }
        Relationships: []
      }
      quiz: {
        Row: {
          courseid: string
          lastupdated: string | null
          quizid: Database["public"]["Enums"]["quiz_id_type"]
        }
        Insert: {
          courseid: string
          lastupdated?: string | null
          quizid: Database["public"]["Enums"]["quiz_id_type"]
        }
        Update: {
          courseid?: string
          lastupdated?: string | null
          quizid?: Database["public"]["Enums"]["quiz_id_type"]
        }
        Relationships: [
          {
            foreignKeyName: "quiz_courseid_fkey"
            columns: ["courseid"]
            isOneToOne: false
            referencedRelation: "course"
            referencedColumns: ["courseid"]
          },
        ]
      }
      quizquestion: {
        Row: {
          courseid: string
          questionid: string
          quizid: Database["public"]["Enums"]["quiz_id_type"]
          sequence: number
        }
        Insert: {
          courseid: string
          questionid: string
          quizid: Database["public"]["Enums"]["quiz_id_type"]
          sequence: number
        }
        Update: {
          courseid?: string
          questionid?: string
          quizid?: Database["public"]["Enums"]["quiz_id_type"]
          sequence?: number
        }
        Relationships: [
          {
            foreignKeyName: "quizquestion_courseid_fkey"
            columns: ["courseid"]
            isOneToOne: false
            referencedRelation: "course"
            referencedColumns: ["courseid"]
          },
          {
            foreignKeyName: "quizquestion_questionid_fkey"
            columns: ["questionid"]
            isOneToOne: false
            referencedRelation: "question"
            referencedColumns: ["questionid"]
          },
          {
            foreignKeyName: "quizquestion_quizid_fkey"
            columns: ["quizid"]
            isOneToOne: false
            referencedRelation: "quiz"
            referencedColumns: ["quizid"]
          },
        ]
      }
      response: {
        Row: {
          courseid: string
          questionid: string
          quizid: Database["public"]["Enums"]["quiz_id_type"]
          response: string | null
          userid: number
        }
        Insert: {
          courseid: string
          questionid: string
          quizid: Database["public"]["Enums"]["quiz_id_type"]
          response?: string | null
          userid: number
        }
        Update: {
          courseid?: string
          questionid?: string
          quizid?: Database["public"]["Enums"]["quiz_id_type"]
          response?: string | null
          userid?: number
        }
        Relationships: [
          {
            foreignKeyName: "response_courseid_fkey"
            columns: ["courseid"]
            isOneToOne: false
            referencedRelation: "course"
            referencedColumns: ["courseid"]
          },
          {
            foreignKeyName: "response_questionid_fkey"
            columns: ["questionid"]
            isOneToOne: false
            referencedRelation: "question"
            referencedColumns: ["questionid"]
          },
          {
            foreignKeyName: "response_quizid_fkey"
            columns: ["quizid"]
            isOneToOne: false
            referencedRelation: "quiz"
            referencedColumns: ["quizid"]
          },
          {
            foreignKeyName: "response_userid_fkey"
            columns: ["userid"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["userid"]
          },
        ]
      }
      result: {
        Row: {
          courseid: string
          datecreated: string | null
          quizid: Database["public"]["Enums"]["quiz_id_type"]
          score: number
          userid: number
        }
        Insert: {
          courseid: string
          datecreated?: string | null
          quizid: Database["public"]["Enums"]["quiz_id_type"]
          score: number
          userid: number
        }
        Update: {
          courseid?: string
          datecreated?: string | null
          quizid?: Database["public"]["Enums"]["quiz_id_type"]
          score?: number
          userid?: number
        }
        Relationships: [
          {
            foreignKeyName: "result_courseid_fkey"
            columns: ["courseid"]
            isOneToOne: false
            referencedRelation: "course"
            referencedColumns: ["courseid"]
          },
          {
            foreignKeyName: "result_quizid_fkey"
            columns: ["quizid"]
            isOneToOne: false
            referencedRelation: "quiz"
            referencedColumns: ["quizid"]
          },
          {
            foreignKeyName: "result_userid_fkey"
            columns: ["userid"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["userid"]
          },
        ]
      }
      skillsfuturemapping: {
        Row: {
          cluster: string
          skillsfutureccs: string
        }
        Insert: {
          cluster: string
          skillsfutureccs: string
        }
        Update: {
          cluster?: string
          skillsfutureccs?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      age_type:
        | "Baby Boomers (55-75)"
        | "Generation X (40-55)"
        | "Millennials (25-40)"
        | "Generation Z (18-24)"
      attitude_towards_learning_type: "Positive" | "Neutral" | "Negative"
      barriers_to_learning_interests_type:
        | "Time"
        | "Resources"
        | "Accessibility"
        | "Interest"
      career_stage_type: "Starter" | "Builder" | "Accelerator" | "Expert"
      computer_literacy_type: "Advanced" | "Intermediate" | "Basic" | "None"
      continents:
        | "Africa"
        | "Antarctica"
        | "Asia"
        | "Europe"
        | "Oceania"
        | "North America"
        | "South America"
      educational_level_type:
        | "High school or below"
        | "Some college"
        | "Bachelor's degree"
        | "Master's degree"
        | "Doctoral degree"
      gender_type: "Male" | "Female" | "Other"
      job_category_type:
        | "Entry-level"
        | "Mid-level"
        | "Senior-level"
        | "Executive"
      language_abilities_type: "Fluent" | "Proficient" | "Basic" | "None"
      learning_preferences_type:
        | "Visual"
        | "Auditory"
        | "Kinesthetic"
        | "Reading/Writing"
      life_stage_type:
        | "Early career"
        | "Mid-career"
        | "Late career"
        | "Retirement"
      literacy_numeracy_proficiency_type:
        | "Advanced"
        | "Intermediate"
        | "Basic"
        | "None"
      motivational_level_type: "High" | "Medium" | "Low"
      personality_type: "Extroverted" | "Introverted" | "Ambivert"
      prior_knowledge_skills_type:
        | "Advanced"
        | "Intermediate"
        | "Basic"
        | "None"
      quiz_id_type: "Mid Term" | "Final"
      race_type:
        | "Caucasian"
        | "African American"
        | "Asian"
        | "Hispanic/Latino"
        | "Other"
      reasons_for_attending_course_type:
        | "Career advancement"
        | "Skill development"
        | "Personal interest"
        | "Requirement"
      relationship_to_peers_type:
        | "Collaborative"
        | "Competitive"
        | "Supportive"
        | "Independent"
      role: "admin" | "learner"
      social_background_type: "Urban" | "Suburban" | "Rural"
      special_needs_type: "None" | "Physical" | "Mental" | "Other"
      tendency_to_compete_or_cooperate_type:
        | "Competitive"
        | "Cooperative"
        | "Both"
        | "Neither"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
