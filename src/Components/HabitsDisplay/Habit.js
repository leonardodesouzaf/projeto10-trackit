import styled from 'styled-components';
import { useState } from "react";
import axios from "axios";
export default function Habit(props){
    const [habitDays, setHabitDays] = useState([]);
    let arrayDays = props.days;
    const weekDays = ['S','T','Q','Q','S','S','D'];
    if(habitDays.length<7){
        for(let i=0; i<7; i++){
            let weekDay = i+1;
            let itsEqual = false;
            for(let j=0; j<arrayDays.length; j++){
                if(arrayDays[j]===weekDay){
                    habitDays.push(<SelectionedDay key={i}>{weekDays[i]}</SelectionedDay>);
                    itsEqual = true;
                }
            }
            if(itsEqual === false){    
                habitDays.push(<DiselectionedDay key={i}>{weekDays[i]}</DiselectionedDay>);
            }
        }
    }
    let habitRenderDays;
    if(habitDays.length === 7){
        habitRenderDays = [habitDays.at(-1), ...habitDays];
        habitRenderDays.pop();
    }
    function removeHabit(){
        let answer = window.confirm('Deseja apagar esse hábito?');
        if(answer === true){
            const requisition = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${props.id}`,{headers: {"Authorization": `Bearer ${props.token}`}});
            requisition.catch(() => {alert("O hábito não foi removido! Tente novamente!")});
            requisition.then((answer) => {props.setRefreshHabitsList(!props.refreshHabitsList)});
        }
    }
    return(
        <>
            <Content>
                <HabitName>
                    {props.name}
                </HabitName>
                <Days>
                    {habitRenderDays}
                </Days>
                <TrashIcon onClick={removeHabit}><ion-icon name="trash-outline"></ion-icon></TrashIcon>
            </Content>
        </>
    )
}

const TrashIcon = styled.div`
    color: #666666;
    font-size: 16px;
    position: absolute;
    top: 10px;
    right: 10px;
`;

const DiselectionedDay = styled.div`
    background-color: #FFFFFF;
    border: 1px solid #D5D5D5;
    box-sizing: border-box;
    border-radius: 5px;
    width: 8vw;
    height: 30px;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 19.976px;
    line-height: 25px;
    color: #DBDBDB;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-right: 4px;
`;

const SelectionedDay = styled.div`
    background-color: #CFCFCF;
    border: 1px solid #D5D5D5;
    box-sizing: border-box;
    border-radius: 5px;
    width: 8vw;
    height: 30px;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 19.976px;
    line-height: 25px;
    color: #FFFFFF;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-right: 4px;
`;

const Days = styled.div`
    display: flex;
    box-sizing: border-box;
    margin-top: 8px;
`;

const HabitName = styled.div`
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 19.976px;
    line-height: 25px;
    color: #666666;
`;

const Content = styled.div`
    background-color: #FFFFFF;
    border-radius: 5px;
    height: 91px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 10px;
    box-sizing: border-box;
    padding-left: 15px;
    position: relative;
`;