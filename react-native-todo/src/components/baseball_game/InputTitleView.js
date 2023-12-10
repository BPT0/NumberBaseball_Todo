import React, { useState } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import Input from '../base_component/Input';

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justifyContent: space-between;
  background-color: ${({ theme }) => theme.white};
  padding: 5px;
  borderBottomWidth: 1px; 
  borderBottomColor: ${({theme})=> theme.divisionLine}
`;

const Contents = styled.Text`
  flex: 1;
  text-align: center;
  font-size: 20px;
  color: ${({ theme }) => theme.textBlack};
`;

const InputTitleView = ({ text, navigation, addItem, setInfo}) => {
  // textInput editable 상태 관리 변수
  const [isEditable, setIsEditable] = useState(true);
  // textInput의 입력값의 상태 관리 변수
  const [inputText, setInputText] = useState('');

  const handleSubmitEditing = () => {
      setIsEditable(false);
      navigation.setOptions({ title: inputText }); //  navigation의 title 설정
      if(inputText){
        addItem('suggestNum', '숫자 입력:'); // 새로운 아이템 뷰 생성
        setInfo(prevInfo => {
          // 이전 상태(prevInfo)를 기반으로 새로운 상태를 반환
          return prevInfo.map(item => {
            // 각 아이템의 title을 수정
            return {
              ...item, // 기존 아이템의 다른 속성들은 그대로 유지
              title: inputText // 새로운 title 값으로 업데이트
            };
          });
        });
      }
  };
  
  return (
    <Container>
      <Contents>{text}</Contents>
      <Input autoFocus={true} 
        placeholder='제목'
        value={inputText}
        editable={isEditable} 
        onSubmitEditing={handleSubmitEditing}
        onChangeText={setInputText}
        maxLength={20}
        multiline={true}
        textAlign={'right'}
      />
    </Container>
  ); 
};

InputTitleView.propTypes = {
  text: PropTypes.string.isRequired,
  navigation: PropTypes.object.isRequired,
  addItem: PropTypes.func.isRequired,
  setInfo: PropTypes.func.isRequired,
};

export default InputTitleView;