import { View, Text, Button, Dimensions}  from 'react-native';
import React, {useState} from 'react';
import StartView from '../baseball_game/StartView';
import styled, { ThemeProvider } from 'styled-components/native';
import { theme } from '../../theme';
import InputTitleView from '../baseball_game/InputTitleView';

const List = styled.FlatList`
    width: ${({ width }) => width - 40}px;
`;

const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

function Game({ navigation }) {
    const width = Dimensions.get('window').width;

    // todo 1.제목 input이 있는지, 2.숫자 input이 있는지, 둘다 없는지 구분 => type으로 구분
    const listItem = [
        {type: 'infoText', text: '숫자 야구 게임을 시작합니다~!'},
        {type: 'inputTitle', text: '게임 제목 입력: ',  },
    ]

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <List contentContainerStyle={{flexGrow: 1, justifyContent: 'flex-end', }} 
                    width={width} data={listItem} 
                    // 각 아이템을 어떻게 렌더링할지 정의
                    renderItem={({ item }) => {
                        switch(item.type){
                            case 'infoText':
                                return <StartView text={item.text}/>
                            case 'inputTitle':
                                // todo input이 들어가게 수정
                                return <InputTitleView 
                                    text={item.text}/>
                            default:
                                return null;
                        }
                    }}
                    keyExtractor={(index) => index.toString()}  // 각 아이템의 고유한 키 값을 정의
                >
                </List>
            </Container>
        </ThemeProvider>

    );
}

export default Game;