import styled from 'styled-components';
import { useState } from "react";
export default function Habit(props){
    const [habitDays, setHabitDays] = useState([]);
    let arrayDays = props.days;
    const weekDays = ['S','T','Q','Q','S','S','D'];
    for(let i=0; i<7; i++){
        let weekDay = i+1;
        for(let j=0; j<arrayDays.length; j++){
            if(arrayDays[j]===weekDay){
                habitDays.push(<SelectionedDay>weekDays[i]</SelectionedDay>);
            }
        }
        habitDays.push(<DiselectionedDay>weekDays[i]</DiselectionedDay>);
    }
    console.log(habitDays);
    return(
        <>
            <Content>
                <HabitName>
                    {props.name}
                </HabitName>
                <Days>
                    {habitDays}
                </Days>
            </Content>
        </>
    )
}

const DiselectionedDay = styled.div`
    background-color: #FFFFFF;
    border: 1px solid #D5D5D5;
    box-sizing: border-box;
    border-radius: 5px;
    width: 8vw;
    height: 30px;
`;

const SelectionedDay = styled.div`
    background-color: #CFCFCF;
    border: 1px solid #D5D5D5;
    box-sizing: border-box;
    border-radius: 5px;
    width: 8vw;
    height: 30px;
`;

const Days = styled.div`
    display: flex;
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
`;