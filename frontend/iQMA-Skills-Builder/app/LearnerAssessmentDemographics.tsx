import { Image, View, Text } from "react-native";
import { ChatBubble } from "@/components/ChatBubble";

export default function LearnerAssessmentDemographics() {
    return(
        <View style={{padding: 20}}>
            <View style={{flexDirection: 'row'}}>
                <Image style={{height: 100, width: 100, marginRight: 15}} source={require('@/assets/images/mascot.png')}></Image>
                <View style={{marginTop: 5}}>
                    <ChatBubble position='left'>What are your demographics?</ChatBubble>
                </View>
            </View>
        </View>
    )
}