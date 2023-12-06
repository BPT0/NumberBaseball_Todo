import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import IconButton from './component/IconButton';
import { images } from './images/images';
import Input from '../base_component/Input';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.itemBackground};
  border-radius: 10px;
  padding: 5px;
  margin: 3px 0px;
`;

const Contents = styled.TouchableOpacity`
  flex: 1;
`;

const ContentsText = styled.Text`
  font-size: 24px;
  text-decoration-line: ${({ completed }) =>
    completed ? 'line-through' : 'none'};
`;

const getStatusColor = (completed) => {
  const color = completed === "done" ? '#61DEA4' : '#979797';
  return color;
};

const StatusIcon = styled.View`
  width: 13px;
  height: 13px;
  border-radius: 15px;
  background-color: ${({ status }) => getStatusColor(status)};
`;

const Task = ({ item, deleteTask, toggleTask, navigation }) => {
  const [text, setText] = useState(item.text);

  useEffect(() => {
    console.log(item);
  }, [item]);

  const _goGameScreen = () => {
    // todo. 3. 데이터와 todo의 id(식별값)를 가지고 게임화면으로 이동
    navigation.navigate('Game', {item});
  }

  return (
    <Container>
      <IconButton
        type={item.completed === "done" ? images.completed : images.uncompleted}
        id={item.id}
        onPressOut={toggleTask}
        completed={item.completed}
      />
      <Contents onPress={_goGameScreen}>
        <ContentsText>
          {item.text} {/*게임 타이틀 값*/}
        </ContentsText>
      </Contents>
      <TouchableOpacity onPress={_goGameScreen}>
        <StatusIcon status={item.completed} />
      </TouchableOpacity>
    </Container>
  );
};

Task.propTypes = {
  item: PropTypes.object.isRequired,
  deleteTask: PropTypes.func.isRequired,
  toggleTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
  navigation: PropTypes.func.isRequired,
};

export default Task;
