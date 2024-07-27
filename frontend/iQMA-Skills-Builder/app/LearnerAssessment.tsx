import { Image, View } from "react-native";
import { TopChatBubble } from "@/components/TopChatBubble";

export default function LearnerAssessment() {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Image style={{marginBottom: 20}} source={require('@/assets/images/mascot.png')}></Image>
            <TopChatBubble message="Hi there! I'm Dao!" />
        </View>
    );
}