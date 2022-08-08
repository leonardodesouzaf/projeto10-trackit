import styled from 'styled-components';
import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";

export default function TodayHabit(props){
    const { tasks, setTasks } = useContext(UserContext);
    return(
        <>
            <Habit>
                <Texts>
                    <Title>{props.name}</Title>
                    <Subitle>
                        Sequência atual: {props.currentSequence} dias
                        <br/>
                        Seu recorde: {props.highestSequence} dias
                    </Subitle>
                </Texts>
                <Icon><ion-icon name="checkbox"></ion-icon></Icon>
            </Habit>
        </>
    )
}

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