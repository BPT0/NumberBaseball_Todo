// global import
import { Dimensions, BackHandler, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState, useLayoutEffect, 
    useCallback } from 'react';
import Infotext from '../baseball_game/InfoTextView';
import styled, { ThemeProvider } from 'styled-components/native';
import 'react-native-get-random-values';
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
    width: ${({ width }) => width - 40}px;
`;

const Container = styled.SafeAreaView`
    flex: 1;
    align-items: center;
    background-color: ${({ theme }) => theme.white};
`;

function Game({ navigation, route }) {
    const width = Dimensions.get('window').width;

    const getRandomNumber = () => {
        const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

        // 첫 번째 자리는 0이 올 수 없으므로 1~9 중에서 랜덤하게 선택
        const first = numbers.splice(Math.floor(Math.random() * 9) + 1, 1)[0];

        // 두 번째 자리는 남은 숫자 중에서 랜덤하게 선택
        const second = numbers.splice(Math.floor(Math.random() * numbers.length), 1)[0];

        // 세 번째 자리는 남은 숫자 중에서 랜덤하게 선택
        const third = numbers.splice(Math.floor(Math.random() * numbers.length), 1)[0];

        return first * 100 + second * 10 + third;
    };

    // 게임에서 todo로 넘기기위한 data를 보관하는 useState
    const [info, setInfo] = useState(
        {
            title: null, state: false,
            randomNumber: getRandomNumber().toString(),
            isTodo: false
        }
    )

    // listItem을 정하는 useState
    const [listItem, setListItem] = useState([]);

    // listItem을 추가하는 addItem 함수
    const addItem = async (type, text) => {
        return new Promise(resolve => {
            const newItem = { type: type, text: text };
            setListItem(prevItems => {
                resolve();
                return [...prevItems, newItem];
            });
        });
    };

    // listItem의 resultView를 추가하는 함수
    const addItemResult = async (type, isNothing, ball, strike) => {
        const newItem = { type: type, isNothing: isNothing, ball: ball, strike: strike };
        setListItem(prevItems => [...prevItems, newItem]);
    }

    const setNowInfos = async (title, randomNumber, isTodo) => {
        navigation.setOptions({ title: title })
        setInfo(prevInfo => {
            // 이전 상태(prevInfo)를 기반으로 새로운 상태를 반환
            return {
                ...prevInfo, // 기존 info 유지
                title: title, // 새로운 title 값으로 업데이트
                randomNumber: randomNumber,
                isTodo: isTodo,
            };
        });
    }

    // 화면 그리기 전 동기적으로 실행되기에 
    // 좌상단백버튼이 그려진후 아래 코드 적용되게 함 
    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: (props) => (
                <TouchableOpacity
                    {...props}
                    onPress={() => {
                        goToHomeTodo(info);
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

    const goToHomeTodo = (info) => {
        if (info.isTodo == false) { // todo가 아닐때 
            setInfo(prevInfo => {
                // 바꿀 데이터들?
                return {
                    ...prevInfo,
                    state: false,
                    isTodo: true,
                };
            });
            navigation.navigate('Home', { info });
        } else { // todo로 등록된 게임일때
            setInfo(prevInfo => {
                return prevInfo.map(item => {
                    return {
                        ...item,
                        state: false,
                    };
                });
            });
            navigation.navigate('Home', { gameData: info });
        }
    };

    useFocusEffect( // navigation으로 화면 포커스 받을시 실행되는 후크
        useCallback(() => {
            const updateItems = async () => {
                // setNowInfo 재설정
                if (info.title == null) {
                    await addItem('infoText', '숫자 야구 게임을 시작합니다~!');
                    await addItem('inputTitle', '게임 제목 입력: ');
                }
            };
            //     else {
            //         console.log(todoItem);
            //         // title 하고 randomNumber 상태값 을 todoItem의 값으로 설정
            //         if (todoItem.completed == 'done') {
            //             await setNowInfos(todoItem.text, todoItem.randomNumber);
            //             await addItem(id, 'infoText', '이전 게임에서 정답을 맞췄습니다!');
            //             await addItem(id, 'infoText', '숫자 야구 게임을 시작합니다~!');
            //             await addItem(id, 'suggestNum', '숫자 입력: ');
            //         } else if (todoItem.completed == 'notDone') {
            //             await setNowInfos(todoItem.text, todoItem.randomNumber);
            //             await addItem(id, 'infoText', '이전 게임에서 정답을 못 맞췄습니다!');
            //             await addItem(id, 'infoText', '숫자 야구 게임을 시작합니다~!');
            //             await addItem('suggestNum', '숫자 입력: ');
            //         } else {
            //             await setNowInfos(todoItem.text, todoItem.randomNumber);
            //             await addItem(id, 'infoText', '이전 게임에서 정답을 못 맞췄습니다!');
            //             await addItem(id, 'infoText', '숫자 야구 게임을 시작합니다~!');
            //             await addItem(id, 'suggestNum', '숫자 입력: ');
            //         }
            //     }
            // };
            updateItems();
            return () => {
                // 화면이 포커스를 잃을 때 실행할 코드를 여기 작성하십시오.
                // 예를 들어, 리소스를 정리(clean-up)하는 등의 작업을 수행할 수 있습니다.
            };
        }, [info])

    );

    // info.title 이 업데이트시 백버튼 동작하게함
    useEffect(() => { // 화면 그린 후 랜더링 작업 완료된 후 비동기적으로 실행
        if (info.title != null) {
            const backAction = () => {
                // info 전달
                goToHomeTodo(info);
                return true; // 이벤트를 여기서 종료
            };

            const backHandler = BackHandler.addEventListener(
                'hardwareBackPress',
                backAction
            );
            return () => backHandler.remove();
        }
    }, [info]);

    // listItem을 rendering 하는 함수
    const renderItem = ({ item }) => {
        switch (item.type) {
            case 'infoText':
                return <Infotext text={item.text} />
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
                    answer={info.randomNumber}
                    setInfo={setInfo}
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
                    info={info}
                    navigation={navigation}
                />
            default:
                return null;
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <List
                    removeClippedSubviews={false}
                    contentContainerStyle={{
                        justifyContent: 'space-around',
                    }}
                    keyboardShouldPersistTaps="always"
                    width={width} data={listItem}
                    // 각 아이템을 어떻게 렌더링할지 정의
                    renderItem={renderItem}
                    // 각 아이템의 고유한 키 값을 정의
                    keyExtractor={(item, index) => String(index)}
                >
                </List>
            </Container>
        </ThemeProvider>

    );
}

export default Game;