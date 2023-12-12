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
  background-color: ${({ theme }) => theme.white};
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
            return {
              ...prevInfo, 
              title: inputText
            };
        });
      }
  };
  
  return (
    <Container>
      <Contents>{text}</Contents>
      <Input 
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