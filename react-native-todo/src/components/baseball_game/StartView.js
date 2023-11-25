import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components/native';
import { theme } from '../../theme';

const Container = styled.View`
  flex : 1;
  flex-direction: row;
  align-items: center;
  background-color: ${({theme})=> theme.itemBackground};
  padding: 5px;
  borderBottomWidth: 1;
  borderBottomColor: ${({theme})=> theme.divisionLine}
`;

const Contents = styled.Text`
  flex: 1;
  font-size: 20px;
  color: ${(theme) =>  theme.done };
`;

// 기능 텍스트를 뷰에 보여주기
const StartView = ({text}) => {

  return (
      <Container>
        <View style={{ padding: 20}}>
            <Contents >{text}</Contents>
        </View>
      </Container>
  );
};

StartView.propTypes = {
  text: PropTypes.string.isRequired,
};

export default StartView;