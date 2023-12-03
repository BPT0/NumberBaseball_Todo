import React, { useEffect, useState } from 'react';
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
  background-color: #fff;
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

export default function HomeTodo({navigation}) {
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

  const _addTask = (gameData) => {
    const ID = Date.now().toString();
    // 3.task에 위 항목들 표시
    // todo. newtask를 gameData에 title로 변경
    // todo. 나머지 gameData 전달
    // todo. loadTask 함수도 같이 확인해보며 수정
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

  const _goGameScreen = () => {

  }

// async 스토리지 전체 데이터 삭제 함수
const clearAllData = async () => {
  try {
    await AsyncStorage.clear();
    console.log('모든 데이터가 삭제되었습니다.');
  } catch (error) {
    console.error('데이터 삭제 오류:', error);
  }
};


const gameData = navigation.params;
useEffect(()=>{
  if(gameData!= null){
    console.log(gameData.toString())
    // todo. 1.게임화면에서 2번을 누르고 정답을 맞추고 종료되어 홈화면으로 왔을때
    // todo. 2.addTask 에 상태값과 제목값, randomNumber를 전달
    _addTask(gameData);
  }
}, []);

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
            onBlur={_onBlur}
          />
          {/* onSubmitEditing={_addTask} */}
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
            <CategoryBox bgColor="#EBEFF5">
            <TouchableOpacity onPress={() => console.log('카테고리 1선택됨')}>
            <CategoryText>Not Solved</CategoryText>
              <CategoryText
                textColor="#252A31"
                size="14px;"
                opacity="0.5"
                weight="400"
              >
                0 task
              </CategoryText>
            </TouchableOpacity>
            </CategoryBox>
          <CategoryBox bgColor="#61DEA4">
          <TouchableOpacity onPress={() => console.log('카테고리 2선택됨')}>
          <CategoryText textColor="#fff">Solved</CategoryText>
            <CategoryText
              textColor="#fff"
              size="14px;"
              opacity="0.5"
              weight="400"
            >
              2 task
            </CategoryText>
          </TouchableOpacity>
          </CategoryBox>
          <CategoryBox bgColor="#F45E6D">
          <TouchableOpacity onPress={() => console.log('카테고리 3선택됨')}>
          <CategoryText textColor="#fff">Don’t want Game</CategoryText>
            <CategoryText
              textColor="#fff"
              size="14px;"
              opacity="0.5"
              weight="400"
            >
              3 task
            </CategoryText>          
          </TouchableOpacity>
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
        <FloatButton onPress={() => navigation.navigate('Game')} />
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
