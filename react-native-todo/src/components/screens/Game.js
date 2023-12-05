// global import
import { Dimensions, BackHandler, TouchableOpacity, Image }  from 'react-native';
import React, { useEffect, useState} from 'react';
import StartView from '../baseball_game/StartView';
import styled, { ThemeProvider } from 'styled-components/native';
import 'react-native-get-random-values';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useFocusEffect } from '@react-navigation/native';
// local import
import { theme } from '../../theme';
import InputTitleView from '../baseball_game/InputTitleView';
import SuggestNumView from '../baseball_game/SuggestNumView';
import ErrorView from '../baseball_game/ErrorView';
import ResultView from '../baseball_game/ResultView';
import GoGameControlView from '../baseball_game/GoGameControlView';
import GameControlView from '../baseball_game/GameControlView';

const List = styled.FlatList`

`;

const Container = styled.SafeAreaView`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

// func: 숫자야구에서 처음에 setting 할 3자리 수를 생성함
function getRandomNumber() {
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    // 첫 번째 자리는 0이 올 수 없으므로 1~9 중에서 랜덤하게 선택
    const first = numbers.splice(Math.floor(Math.random() * 9) + 1, 1)[0];

    // 두 번째 자리는 남은 숫자 중에서 랜덤하게 선택
    const second = numbers.splice(Math.floor(Math.random() * numbers.length), 1)[0];

    // 세 번째 자리는 남은 숫자 중에서 랜덤하게 선택
    const third = numbers.splice(Math.floor(Math.random() * numbers.length), 1)[0];

    return first * 100 + second * 10 + third;
}

function Game({ navigation, route }) {
    const width = Dimensions.get('window').width;
    const randomNumber = getRandomNumber();
    
    // 게임에서 todo로 넘기기위한 data를 보관하는 useState
    const [info, setInfo] = useState([
        {title: null, state: 'notDone', randomNumber: randomNumber.toString(),}
    ])

    // listItem을 정하는 useState
    const [listItem, setListItem] = useState([
    ]);

    // list의 id
    const [id, setId] = useState(2);

    // listItem을 추가하는 addItem 함수
    const addItem = async (type, text) => {
        return new Promise(resolve => {
            const newItem = {id: id.toString(), type: type, text: text};
            setListItem(prevItems => {
                resolve();
                return [...prevItems, newItem];
            });
            setId(prevInfo => prevInfo + 1);
        });
    };

    // listItem-resultView 를 추가하는 함수
    const addItemResult = (type, isNothing, ball, strike) => {
        const newItem = {id: id.toString(), type: type, isNothing: isNothing, ball: ball, strike: strike};
        setListItem(prevItems => [...prevItems, newItem]);
        setId(prevInfo => prevInfo + 1);
    }

    React.useLayoutEffect(() => { // 화면 그리기 전 동기적으로 실행
        navigation.setOptions({
            headerLeft: (props) => (
                <TouchableOpacity
                    {...props}
                    onPress={() => {
                        console.log('뒤로가기 버튼이 눌렸습니다.');
                        goToHomeTodo(info[0]);
                    }}
                    style={{ paddingTop: 8, paddingLeft: 15 }}
                >
                    <Image
                        source={require('../../../assets/icons/icon_back.png')}
                        style={{ width: 24, height: 24 }}
                    />
                </TouchableOpacity>
            ),
        });
    }, [navigation, info]);

    useFocusEffect(
        React.useCallback(() => {
            const updateItems = async () => {
                const todoItem = route.params?.item;
                if (todoItem === undefined) {
                    await addItem('infoText', '숫자 야구 게임을 시작합니다~!');
                    await addItem('inputTitle', '게임 제목 입력: ');
                } else {
                    if (todoItem.completed == 'done') {
                        await addItem('infoText', '이전 게임에서 정답을 맞췄습니다!');
                        await addItem('infoText', '숫자 야구 게임을 시작합니다~!');
                        await addItem('suggestNum', '숫자 입력: ');
                    } else if(todoItem.completed == 'notDone') {
                        await addItem('infoText', '이전 게임에서 정답을 못 맞췄습니다!');
                        await addItem('infoText', '숫자 야구 게임을 시작합니다~!');
                        await addItem('suggestNum', '숫자 입력: ');
                    }
                }
            };
            updateItems();
            return () => {
                // 화면이 포커스를 잃을 때 실행할 코드를 여기 작성하십시오.
                // 예를 들어, 리소스를 정리(clean-up)하는 등의 작업을 수행할 수 있습니다.
            };
        }, [route.params])
    );

    useEffect(() => { // 화면 그린 후 랜더링 작업 완료된 후 비동기적으로 실행
        if (info[0].title != null) {
            const backAction = () => {
                console.log('Back button pressed');
                goToHomeTodo(info[0]);
                return true; // 이벤트를 여기서 종료
            };

            const backHandler = BackHandler.addEventListener(
                'hardwareBackPress',
                backAction
            );

            return () => backHandler.remove();
        }
    }, [info]);

    const goToHomeTodo = (gameData) => {
        console.log('Sending game data to HomeTodo:', gameData);
        navigation.navigate('Home', { gameData });
    };

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
                    addItemResult={addItemResult}
                    answer={info[0].randomNumber}
                    />
            case 'error':
                return <ErrorView
                    text={item.text}
                    addItem={addItem}
                    />
            case 'result':
                return <ResultView
                    addItem={addItem}
                    isNothing={item.isNothing}
                    ball={item.ball}
                    strike={item.strike}
                    />
            case 'goGameControl':
                return <GoGameControlView
                        text={item.text}
                        addItem={addItem}
                    />
            case 'gameControl':
                return <GameControlView
                    text={item.text}
                    addItem={addItem}
                    setInfo={setInfo}
                    info={info[0]}
                    navigation={navigation}
                    />
            default:
                return null;
        }
    }
    
    return (
        <ThemeProvider theme={theme}>
            <Container>
                <KeyboardAwareScrollView>
                    <List contentContainerStyle={{ 
                        justifyContent: 'flex-start', }}
                        keyboardShouldPersistTaps="always"
                        width={width} data={listItem} 
                        // 각 아이템을 어떻게 렌더링할지 정의
                        renderItem= {renderItem}
                        // 각 아이템의 고유한 키 값을 정의
                        keyExtractor={(item, index) => index.toString()}                  >
                    </List>
                </KeyboardAwareScrollView>

            </Container>
        </ThemeProvider>

    );
}

export default Game;