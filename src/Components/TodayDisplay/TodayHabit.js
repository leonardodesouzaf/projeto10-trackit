import styled from 'styled-components';
import { useState , useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";

export default function TodayHabit(props){
    const navigate = useNavigate();
    const { tasks, setTasks } = useContext(UserContext);
    const [isRecord, setIsRecord] = useState(false);
    function doneHabit(){
        props.setCounterDone(props.counterDone + 1);
        props.setCounterUndone(props.counterUndone - 1);
        const requisition = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${props.id}/check`, {}, {
            headers: {"Authorization": `Bearer ${tasks.token}`} 
		});
        requisition.catch(() => {alert("Hábito já foi marcado como feito!")});
        requisition.then(() => {
            props.setRefreshHabitsList(!props.refreshHabitsList);
        });
    }
    function undoneHabit(){
        props.setCounterUndone(props.counterUndone + 1);
        props.setCounterDone(props.counterDone - 1);
        const requisition = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${props.id}/uncheck`, {}, {
            headers: {"Authorization": `Bearer ${tasks.token}`} 
		});
        requisition.catch(() => {alert("Hábito já está marcado como não feito!")});
        requisition.then(() => {
            props.setRefreshHabitsList(!props.refreshHabitsList);
        });
    }
    useEffect(() => {
        if(props.currentSequence >= props.highestSequence){
        setIsRecord(true);
        }
    },[])
    return(
        <>
            <Habit>
                <Texts>
                    <Title>{props.name}</Title>
                    <Subitle>
                        {isRecord ? 
                        <><Flexing>Sequência atual: <SeqText> {props.currentSequence} dias</SeqText></Flexing>
                        <Flexing>Seu recorde: <SeqText> {props.highestSequence} dias</SeqText></Flexing></>
                        :
                        <>
                        <><Flexing>Sequência atual: <SeqText> {props.currentSequence} dias</SeqText></Flexing>
                        Seu recorde: {props.highestSequence} dias</>
                        </>
                        }
                    </Subitle>
                </Texts>
                {props.done ? <IconCheck onClick={undoneHabit}><ion-icon name="checkbox"></ion-icon></IconCheck>
                :
                <Icon onClick={doneHabit}><ion-icon name="checkbox"></ion-icon></Icon>}
            </Habit>
        </>
    )
}

const Flexing = styled.div`
    display: flex;
`;

const SeqText = styled.div`
    color: #8FC549;
    margin-left: 3px;
`;

const IconCheck = styled.div`
    color: #8FC549;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 80px;
`;

const Texts = styled.div`
    margin-left: 7px;
    margin-top: 5px;
`;

const Title = styled.div`
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 19.976px;
    line-height: 25px;
    color: #666666;
`;

const Subitle = styled.div`
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 12.976px;
    line-height: 16px;
    color: #666666;
    margin-top: 7px;
`;

const Icon = styled.div`
    color: #EBEBEB;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 80px;
`;

const Habit = styled.div`
    background-color: #FFFFFF;
    border-radius: 5px;
    height: 94px;
    width: 100%;
    box-sizing: border-box;
    padding: 8px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
`;