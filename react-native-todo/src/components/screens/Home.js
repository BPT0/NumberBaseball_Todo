import { View, Text, Button, ScrollView } from 'react-native';

function Home({ navigation }) {

    return (
        // ThemeProvider로 theme 설정

        <ScrollView>
            <View>
                <Text>I am a screen Home</Text>
                <Button
                    title="Go to Game"
                    onPress={() => navigation.navigate('Game')}
                />
            </View>
        </ScrollView>

    );
}

export default Home