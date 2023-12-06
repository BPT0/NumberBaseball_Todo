// global import
import React, { useEffect, useState } from 'react';
import {
  StatusBar,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  Button,
} from 'react-native';
import AppLoading from 'expo-app-loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FloatButton from '../todo/component/FloatButton';
import styled, { ThemeProvider } from 'styled-components/native';
import CategoryModal from './CategoryModal';
// local import
import { theme } from '../../theme';
import Input from '../base_component/Input';
import Task from '../todo/Task';
import { images } from '../todo/images/images';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: flex-start;
`;
const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;

  width: 100%;
  padding: 20px;
`;
const Title = styled.Text`
  font-size: 25px;
  font-weight: 600;
  color: #252a31;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-left:30px;
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

export default function HomeTodo({ navigation, route }) {
  const width = Dimensions.get('window').width;
  const [selectedCategory, setSelectedCategory] = useState(null); // 카테고리 필터링을 위한 상태
  const [isModalVisible, setIsModalVisible] = useState(false); // 모달창 상태관리
  const [categoryData, setCategoryData] = useState({ tasks: [] });
  
  const [isReady, setIsReady] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState([]);


  useEffect(() => {
    const gameData = route.params?.gameData;
    const todoItem = route.params?.todoItem;
    
    if (todoItem !== undefined) {      
        // 투두롤 클릭해 이동했을 경우에는 마지막에 todo 수정
        console.log('Received game data:', gameData);
        // _updateTask(todoItem);
      }else{
        _addTask(gameData);
      }
    
  }, [route.params]);

  const _saveTasks = async tasks => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
      setTasks(tasks);
    } catch (e) {
      console.error(e);
    }
  };

  
    

  const _loadTasks = async () => {
    try {
      const loadedTasks = await AsyncStorage.getItem('tasks');
      const parsedTasks = JSON.parse(loadedTasks || '[]'); // 문자열이 비어있을 경우 빈 배열로 파싱
      setTasks(Array.isArray(parsedTasks) ? parsedTasks : []);
    } catch (e) {
      console.error(e);
      setTasks([]); // 에러가 발생할 경우 tasks를 빈 배열로 초기화
    }
  };

  // const _addTask = (gameData) => {
  //   const ID = Date.now().toString();
  //   const newTaskObject = {
  //     [ID]: { 
  //       id: ID, 
  //       text: gameData.title,   // 예: 게임 제목 또는 설명
  //       completed: gameData.completed,  // 예: 게임 완료 상태
  //     },
  //   };
  //   _saveTasks([ ...tasks, ...newTaskObject ]);
  //   console.log([...tasks, ...newTaskObject ]);
  // };
  const _addTask = (gameData) => {

    if (gameData && Object.keys(gameData).length > 0) {  // gameData가 존재하고, 객체의 속성 개수가 0보다 큰지 확인
      const ID = Date.now().toString();
      const newTaskObject = {
        [ID]: {
          id: ID,
          text: gameData.title,       // 게임 제목 
          completed: gameData.state,  // 게임 완료 상태
          randomNumber: gameData.randomNumber, // 게임 설정 숫자값
        },
      };
      _saveTasks({ ...tasks, ...newTaskObject });
    } else {
      // tasks가 배열이 아닌 경우에는 새 배열을 생성합니다.
      _saveTasks([newTaskObject]);
    }
  };

  const _deleteTask = id => {
    const currentTasks = Object.assign({}, tasks);
    delete currentTasks[id];
    _saveTasks(currentTasks);
  };

  const _toggleTask = id => {
    const currentTasks = Object.assign({}, tasks);
    if(currentTasks[id]['completed'] == 'done'){
      currentTasks[id]['completed'] = 'notDone';
    }else{
      currentTasks[id]['completed'] = 'done';
    }
    _saveTasks(currentTasks);
  };
  const _updateTask = gameData => {
    const currentTasks = Object.assign({}, tasks);
    console.log(currentTasks, 'update');
    currentTasks[gameData.id] = gameData[0];
    _saveTasks(currentTasks);
  };

  // [도연] async 스토리지 데이터 체크용
  const loadStoredData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('tasks');
      if (storedData !== null) {
        // console.log(JSON.parse(storedData));
      } else {
        console.log('No data found');
      }
    } catch (error) {
      console.error('Error retrieving data', error);
    }
  };

  //카테고리 선택 핸들러
  const handleCategorySelect = (selectedCategory) => {
  const tasksFilteredByCategory = Array.isArray(tasks) ? tasks.filter(task =>
    selectedCategory === 'solved' ? task.completed : !task.completed
  ) : [];

  setCategoryData({
    title: selectedCategory === 'solved' ? 'Solved' : 'Not Solved',
    color: selectedCategory === 'solved' ? '#61DEA4' : '#EBEFF5',
    tasks: tasksFilteredByCategory
  });

  setIsModalVisible(true);
};

  return isReady ? (
    <ThemeProvider theme={theme}>
      <Container>
        <StatusBar
          barStyle="light-content"
          backgroundColor={theme.background} // Android only
        />

        <Header>
          <TouchableOpacity 
          onPress={() => navigation.navigate('Game')}
          style={{ flexDirection: 'row', alignItems: 'center' }}
          >
          <Image 
          source={images.Plus} 
          style={{ width: 20, height: 20, marginLeft: 45}} 
          />
            <Title>Play NumberbaseBall~!</Title>
          </TouchableOpacity>

        </Header>

        <Button title="Load Stored Data" onPress={loadStoredData} />{/*스토리지 체크용*/}
        <Button title="Delete Stored Data" onPress={clearAllData} />

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
            <TouchableOpacity onPress={() => handleCategorySelect('notSolved')}>
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
          <TouchableOpacity onPress={() => handleCategorySelect('solved')}>
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

        <CategoryModal
          isVisible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          title={selectedCategory === 'notSolved' ? 'Not Solved' : 'Solved'}
          color={selectedCategory === 'notSolved' ? '#EBEFF5' : '#61DEA4'}
          category={categoryData}
        />


        <List width={width}>
          {Object.values(tasks)
            .reverse()
            .map(item => (
              <Task
                key={item.id}
                item={item}
                deleteTask={_deleteTask}
                toggleTask={_toggleTask}
                navigation={navigation}
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
