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
  flex: 1;
  font-size: 24px;
  color: ${({ theme, completed }) => (completed ? theme.done : theme.text)};
  text-decoration-line: ${({ completed }) =>
    completed ? 'line-through' : 'none'};
`;

const getStatusColor = (status) => {
  const color = status === 'done' ? '#61DEA4' : '#979797';
  console.log(`Status: ${status}, Color: ${color}`);
  return color;
};

const StatusIcon = styled.View`
  width: 13px;
  height: 13px;
  border-radius: 15px;
  background-color: ${({ status }) => getStatusColor(status)};
`;

const Task = ({ item, deleteTask, toggleTask, updateTask, navigation }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(item.text);

  const _onSubmitEditing = () => {
    if (isEditing) {
      const editedTask = Object.assign({}, item, { text });
      setIsEditing(false);
      updateTask(editedTask);
    }
  };
  const _onBlur = () => {
    if (isEditing) {
      setIsEditing(false);
      setText(item.text);
    }
  };

  const _goGameScreen = () => {
    // todo. 3. 데이터와 todo의 id(식별값)를 가지고 게임화면으로 이동
    navigation.navigate('Game', {item});
  }

  return isEditing ? (
    <Input
      value={text}
      onChangeText={text => setText(text)}
      onSubmitEditing={_onSubmitEditing}
      onBlur={_onBlur}
    />
  ) : (
    <Container>
      <IconButton
        type={item.completed ? images.completed : images.uncompleted}
        id={item.id}
        onPressOut={toggleTask}
        completed={item.completed}
      />
      <Contents onPress={_goGameScreen}>
        <ContentsText completed={item.completed}>
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
