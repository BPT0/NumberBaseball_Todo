import React  from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './components/screens/HomeTodo';
import Game from './components/screens/Game';
export default function App() {
  const Stack = createStackNavigator();

  return (
      <NavigationContainer>
      <Stack.Navigator initialRouteName="ScreenHome">
        <Stack.Screen name="Home" component={Home} 
          options={{
            title: '홈 화면',
            headerShown: false,
          }}
        />
        <Stack.Screen name="Game" component={Game} 
          options={{title: '게임 화면'}}
        />
        </Stack.Navigator>
      </NavigationContainer>

  );
}