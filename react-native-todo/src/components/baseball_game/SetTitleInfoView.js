import React, { useState } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.itemBackground};
  padding: 5px;
  margin: 3px 0px;
`;

const Contents = styled.Text`
  flex: 1;
  font-size: 24px;
  color: ${({ theme, result }) => (result ? theme.text_black : theme.text_error)};
  text-decoration-line: ${({ completed }) =>
    completed ? 'line-through' : 'none'};
`;

// 기능 텍스트를 뷰에 보여주기
const StartView = ({ text, result }) => {

  return (
    <Container>
        <View key={index} style={{backgroundColor: 'red', padding: 20}}>
            <Text>{item}</Text>
        </View>
    </Container>
  );
};

StartView.propTypes = {
  text: PropTypes.object.isRequired,
};

export default StartView;
