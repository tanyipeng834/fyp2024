import { Text, View, Image } from "react-native";
import { LoginButton } from "@/components/LoginButton";
import { LogoutButton } from "@/components/LogoutButton";
import { Profile } from "@/components/Profile";

export default function Index() {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Image
                source={require("../assets/images/iqma_logo.png")}
            />
            <Text>Leadership Skills For A New Self</Text>
            <LoginButton></LoginButton>
            <LogoutButton></LogoutButton>
            <Profile></Profile>
            
        </View>
    );
}
