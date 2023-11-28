import { Dimensions}  from 'react-native';
import React, { useEffect, useState} from 'react';
import StartView from '../baseball_game/StartView';
import styled, { ThemeProvider } from 'styled-components/native';
import 'react-native-get-random-values';
import { theme } from '../../theme';
import InputTitleView from '../baseball_game/InputTitleView';
import SuggestNumView from '../baseball_game/SuggestNumView';
import ErrorView from '../baseball_game/ErrorView';
const List = styled.FlatList`
    width: ${({ width }) => width - 40}px;
`;

const Container = styled.SafeAreaView`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

// crypto.getRandomValues(): 웹 플랫폼에서 암호화적으로 
// 강력한 랜덤 값을 생성하는 데 사용되는 메소드
// func: 숫자야구에서 처음에 setting 할 3자리 수를 생성함
function getRandomNumber() {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return array[0] % 100 + 1;
}

function Game({ navigation }) {
    const width = Dimensions.get('window').width;

    // 게임에서 todo로 넘기기위한 data를 보관하는 useState
    const [info, setInfo] = useState([
        {title: 'noneTitle', state: 'notDone'}
    ])

    // 게임 시작시 처음에 임시로 제목을 지정하는 useEffect()  
    useEffect(() => {
        navigation.setOptions({
            title: '새로운 게임',
        });
    }, []);
    
    // listItem을 정하는 useState
    const [listItem, setListItem] = useState([
        {id: '1', type: 'infoText', text: '숫자 야구 게임을 시작합니다~!'},
        {id: '2', type: 'inputTitle', text: '게임 제목 입력: ',  },
    ]);

    // list의 id
    let id = 3;

    const randomNumber = getRandomNumber();

    // listItem을 추가하는 addItem 함수
    const addItem = (type, text) => {
        const newItem = {id: id.toString(), type: type, text: text};
        setListItem([...listItem, newItem]);
        id++;
    }

    // listItem을 rendering 하는 함수
    const renderItem = ({ item }) => {
        switch(item.type){
            case 'infoText':
                return <StartView text={item.text}/>
            case 'inputTitle':
                return <InputTitleView 
                    text={item.text} 
                    navigation={navigation}
                    addItem={addItem}
                    setInfo={setInfo}
                    />
            case 'suggestNum':
                return <SuggestNumView
                    text={item.text} 
                    addItem={addItem}
                    answer={randomNumber}
                    />
            case 'error':
                return <ErrorView
                    text={item.text}
                    />
            default:
                return null;
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <List contentContainerStyle={{flexGrow: 1, justifyContent: 'flex-end', }} 
                    width={width} data={listItem} 
                    // 각 아이템을 어떻게 렌더링할지 정의
                    renderItem= {renderItem}
                    // 각 아이템의 고유한 키 값을 정의
                    keyExtractor={(item, index) => item.id}                  >
                </List>
            </Container>
        </ThemeProvider>

    );
}

export default Game;