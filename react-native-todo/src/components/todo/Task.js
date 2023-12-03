import React, { useState } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import IconButton from './component/IconButton';
import { images } from './images/images';
import Input from '../base_component/Input';

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.itemBackground};
  border-radius: 10px;
  padding: 5px;
  margin: 3px 0px;
`;

const Contents = styled.Text`
  flex: 1;
  font-size: 24px;
  color: ${({ theme, completed }) => (completed ? theme.done : theme.text)};
  text-decoration-line: ${({ completed }) =>
    completed ? 'line-through' : 'none'};
`;

const getStatusColor = (status) => {
  switch (status) {
    case 'Not Solved':
      return '#979797';
    case 'Solved':
      return '#61DEA4';
    case 'Dont want':
      return '#F45E6D';
    default:
      return '#61DEA4';
  }
};

const StatusIcon = styled.View`
  width: 13px;
  height: 13px;
  border-radius: 15px;
  background-color: ${({ status }) => getStatusColor(status)};
`;


const Task = ({ item, deleteTask, toggleTask, updateTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(item.text);

  const _handleUpdateButtonPress = () => {
    setIsEditing(true);
  };
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

      // todo. 1.task버튼 이벤트 구현하게 수정
      // todo. 2.누를때 전달된 게임화면에서 가져온 데이터가 확인되는지 체크 및 표시
      // todo. 3. 데이터와 todo의 id(식별값)를 가지고 게임화면으로 이동
      
      <Contents 
          completed={item.completed}
      >
        {item.text}
      
      </Contents>
      {/* {item.completed || (
        <IconButton
          type={images.update}
          onPressOut={_handleUpdateButtonPress}
        />
      )}
      <IconButton
        type={images.delete}
        id={item.id}
        onPressOut={deleteTask}
        completed={item.completed}
      /> */}
      <StatusIcon status={item.status} />
  
    </Container>
  );
};

Task.propTypes = {
  item: PropTypes.object.isRequired,
  deleteTask: PropTypes.func.isRequired,
  toggleTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
};

export default Task;
