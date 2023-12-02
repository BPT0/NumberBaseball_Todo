import React, { useState } from 'react';
import {
  StatusBar,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import styled, { ThemeProvider } from 'styled-components/native';
import { theme } from '../../theme';
import Input from '../base_component/Input';
import Task from '../todo/Task';
import AppLoading from 'expo-app-loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FloatButton from '../todo/component/FloatButton';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  align-items: center;
  justify-content: flex-start;
`;
const Header = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 20px;
`;
const Title = styled.Text`
  font-size: 25px;
  font-weight: 600;
  color: #252a31;
  align-self: flex-start;
  margin-top: 20px;
`;

const CategoryArea = styled.View`
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;

const CategoryBox = styled.View`
  justify-content: center;
  width: 90%;
  height: 69px;
  background-color: ${props => props.bgColor || '#ddd'};
  border-radius: 10px;
  margin: 4px 0;
  padding: 10px;
`;

const CategoryText = styled.Text`
  font-style: normal;
  color: ${props => props.textColor || '#252A31'};
  font-size: ${props => props.size || '19px'};
  opacity: ${props => props.opacity || '0.9'};
  font-weight: ${props => props.weight || '100'};
  align-self: ${props => props.align || 'auto'};
  margin-left: ${props => props.marginL || '0px'};
`;

const List = styled.ScrollView`
  flex: 1;
  width: ${({ width }) => width - 40}px;
`;

export default function App() {
  const width = Dimensions.get('window').width;

  const [isReady, setIsReady] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState({});

  const _saveTasks = async tasks => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
      setTasks(tasks);
    } catch (e) {
      console.error(e);
    }
  };
  const _loadTasks = async () => {
    const loadedTasks = await AsyncStorage.getItem('tasks');
    setTasks(JSON.parse(loadedTasks || '{}'));
  };

  const _addTask = () => {
    const ID = Date.now().toString();
    const newTaskObject = {
      [ID]: { id: ID, text: newTask, completed: false },
    };
    setNewTask('');
    _saveTasks({ ...tasks, ...newTaskObject });
  };
  const _deleteTask = id => {
    const currentTasks = Object.assign({}, tasks);
    delete currentTasks[id];
    _saveTasks(currentTasks);
  };
  const _toggleTask = id => {
    const currentTasks = Object.assign({}, tasks);
    currentTasks[id]['completed'] = !currentTasks[id]['completed'];
    _saveTasks(currentTasks);
  };
  const _updateTask = item => {
    const currentTasks = Object.assign({}, tasks);
    currentTasks[item.id] = item;
    _saveTasks(currentTasks);
  };

  const _handleTextChange = text => {
    setNewTask(text);
  };
  const _onBlur = () => {
    setNewTask('');
  };

  return isReady ? (
    <ThemeProvider theme={theme}>
      <Container>
        <StatusBar
          barStyle="light-content"
          backgroundColor={theme.background} // Android only
        />

        <Header>
          <Input
            placeholder="+"
            value={newTask}
            onChangeText={_handleTextChange}
            onSubmitEditing={_addTask}
            onBlur={_onBlur}
          />
          <Title>Play NumberbaseBall~!</Title>
        </Header>
        <CategoryArea>
          <CategoryText
            size="16px;"
            opacity="0.3"
            weight="700"
            align="flex-start"
            marginL="20px;"
          >
            Category
          </CategoryText>
          <TouchableOpacity onPress={() => console.log('카테고리 선택됨')}>
            <CategoryBox bgColor="#EBEFF5">
              <CategoryText>Not Solved</CategoryText>
              <CategoryText
                textColor="#252A31"
                size="14px;"
                opacity="0.5"
                weight="400"
              >
                0 task
              </CategoryText>
            </CategoryBox>
          </TouchableOpacity>
          <CategoryBox bgColor="#61DEA4">
            <CategoryText textColor="#fff">Solved</CategoryText>
            <CategoryText
              textColor="#fff"
              size="14px;"
              opacity="0.5"
              weight="400"
            >
              2 task
            </CategoryText>
          </CategoryBox>
          <CategoryBox bgColor="#F45E6D">
            <CategoryText textColor="#fff">Don’t want Game</CategoryText>
            <CategoryText
              textColor="#fff"
              size="14px;"
              opacity="0.5"
              weight="400"
            >
              3 task
            </CategoryText>
          </CategoryBox>
        </CategoryArea>

        <List width={width}>
          {Object.values(tasks)
            .reverse()
            .map(item => (
              <Task
                key={item.id}
                item={item}
                deleteTask={_deleteTask}
                toggleTask={_toggleTask}
                updateTask={_updateTask}
              />
            ))}
        </List>
        <FloatButton onPress={() => console.log('버튼 클릭')} />
      </Container>
    </ThemeProvider>
  ) : (
    <AppLoading
      startAsync={_loadTasks}
      onFinish={() => setIsReady(true)}
      onError={console.error}
    />
  );
}
