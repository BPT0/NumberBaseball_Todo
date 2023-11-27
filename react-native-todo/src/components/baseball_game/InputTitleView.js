import React, { useState } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import Input from '../base_component/Input';

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justifyContent: space-between;
  background-color: ${({ theme }) => theme.itemBackground};
  padding: 5px;
  borderBottomWidth: 1;
  borderBottomColor: ${({theme})=> theme.divisionLine}
`;

const Contents = styled.Text`
  flex: 1;
  text-align: center;
  font-size: 20px;
  color: ${({ theme }) => (theme.textBlack)};
`;

const InputTitleView = ({ text }) => {
  // textInput 상태 관리 변수
  const [isEditable, setIsEditable] = useState(true);

  const handleSubmitEditing = () => {
      setIsEditable(false);
  };
  
  return (
    <Container>
      <Contents>{text}</Contents>
      <Input autoFocus={true}
        placeholder='제목'
        editable={isEditable} onSubmitEditing={handleSubmitEditing}
      />

    </Container>
  );
};

InputTitleView.propTypes = {
  text: PropTypes.object.isRequired,
};

export default InputTitleView;
