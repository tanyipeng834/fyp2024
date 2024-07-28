import { Image, View, Text } from "react-native";
import { TopChatBubble } from "@/components/TopChatBubble";
import { CustomButton } from "@/components/CustomButton";

export default function IntroductionSegment() {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Image style={{marginBottom: 20}} source={require('@/assets/images/mascot.png')}></Image>
            <TopChatBubble>
                Help me understand you better with just{'\n'}<Text style={{ fontWeight: 'bold' }}>4 quick segments</Text>!
            </TopChatBubble>
            
            {/* <TopChatBubble message="Help me understand you better with just 4 quick segments!" /> */}
            <View style={{
                position: 'absolute',
                bottom: 40,
            }}>
                <CustomButton label="continue" backgroundColor="white"/>
            </View>
        </View>
    )
}