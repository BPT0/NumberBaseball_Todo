import { View, Text, Button } from 'react-native';

export default function Home({ navigation }) {
    return (
        <View>
            <Text>I am a screen Home</Text>
            <Button
                title="Go to Game"
                onPress={() => navigation.navigate('Game')}
            />
        </View>
    );
}
