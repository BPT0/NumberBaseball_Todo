import { View, Text, Button } from 'react-native';

export default function Game({ navigation }) {
    return (
        <View>
            <Text>I am a screen Game</Text>
            <Button
                title="Go to Home"
                onPress={() => navigation.navigate('Home')}
            />
        </View>
    );
}