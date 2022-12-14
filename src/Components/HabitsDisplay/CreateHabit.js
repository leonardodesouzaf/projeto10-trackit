import styled from 'styled-components';
import { useState , useEffect } from "react";
import axios from "axios";
import { ThreeDots } from 'react-loader-spinner';

export default function CreateHabit(props){
    const [habit, setHabit] = useState("");
    const [isDay1Selected, setIsDay1Selected] = useState(false);
    const [isDay2Selected, setIsDay2Selected] = useState(false);
    const [isDay3Selected, setIsDay3Selected] = useState(false);
    const [isDay4Selected, setIsDay4Selected] = useState(false);
    const [isDay5Selected, setIsDay5Selected] = useState(false);
    const [isDay6Selected, setIsDay6Selected] = useState(false);
    const [isDay7Selected, setIsDay7Selected] = useState(false);
    const [arrSelected, setArrSelected] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    function arrSelectedDays(num,ans){
        if(ans === true){
            arrSelected.push(num);
            setArrSelected([...arrSelected]);
        }
        if(ans === false){
            const filterArr = arrSelected.filter(filterDays);
            setArrSelected([...filterArr]);
        }
        function filterDays(day){
            if(day === num){
                return false;
            }else{
                return true;
            }
        }
    }
    function saveHabit (event) {
        event.preventDefault();
        setIsLoading(true);
        console.log('renderizando create habit');
        if(arrSelected.length === 0){
            alert("Selecione o(s) dia(s) do hábito!");
        }else{
            const requisition = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", {
                name: habit,
                days: arrSelected,
            }, {headers: {"Authorization": `Bearer ${props.token}`}});
            requisition.catch(() => {alert("O hábito não foi salvado! Tente novamente!")});
            requisition.then((answer) => {
                props.setRefreshHabitsList(!props.refreshHabitsList);
                setIsLoading(false);
                props.setIsCreateHabit(false);
            });
        }
    }
    return(
        <>
            <CreatingDiv>
                <Form onSubmit={saveHabit}>
                    <Input placeholder="nome do hábito" type="text" required onChange={e => setHabit(e.target.value)}></Input>
                    <DaysSelection>
                        {isDay7Selected ? 
                        <SelectionedDay onClick={() => {setIsDay7Selected(!isDay7Selected); arrSelectedDays(7,false)}}>D</SelectionedDay>
                        :
                        <DiselectionedDay onClick={() => {setIsDay7Selected(!isDay7Selected); arrSelectedDays(7,true)}}>D</DiselectionedDay> 
                        }
                        {isDay1Selected ? 
                        <SelectionedDay onClick={() => {setIsDay1Selected(!isDay1Selected); arrSelectedDays(1,false)}}>S</SelectionedDay>
                        :
                        <DiselectionedDay onClick={() => {setIsDay1Selected(!isDay1Selected); arrSelectedDays(1,true)}}>S</DiselectionedDay> 
                        }
                        {isDay2Selected ? 
                        <SelectionedDay onClick={() => {setIsDay2Selected(!isDay2Selected); arrSelectedDays(2,false)}}>T</SelectionedDay>
                        :
                        <DiselectionedDay onClick={() => {setIsDay2Selected(!isDay2Selected); arrSelectedDays(2,true)}}>T</DiselectionedDay> 
                        }
                        {isDay3Selected ? 
                        <SelectionedDay onClick={() => {setIsDay3Selected(!isDay3Selected); arrSelectedDays(3,false)}}>Q</SelectionedDay>
                        :
                        <DiselectionedDay onClick={() => {setIsDay3Selected(!isDay3Selected); arrSelectedDays(3,true)}}>Q</DiselectionedDay> 
                        }
                        {isDay4Selected ? 
                        <SelectionedDay onClick={() => {setIsDay4Selected(!isDay4Selected); arrSelectedDays(4,false)}}>Q</SelectionedDay>
                        :
                        <DiselectionedDay onClick={() => {setIsDay4Selected(!isDay4Selected); arrSelectedDays(4,true)}}>Q</DiselectionedDay> 
                        }
                        {isDay5Selected ? 
                        <SelectionedDay onClick={() => {setIsDay5Selected(!isDay5Selected); arrSelectedDays(5,false)}}>S</SelectionedDay>
                        :
                        <DiselectionedDay onClick={() => {setIsDay5Selected(!isDay5Selected); arrSelectedDays(5,true)}}>S</DiselectionedDay> 
                        }
                        {isDay6Selected ? 
                        <SelectionedDay onClick={() => {setIsDay6Selected(!isDay6Selected); arrSelectedDays(6,false)}}>S</SelectionedDay>
                        :
                        <DiselectionedDay onClick={() => {setIsDay6Selected(!isDay6Selected); arrSelectedDays(6,true)}}>S</DiselectionedDay> 
                        }
                    </DaysSelection>
                    {isLoading ?
                    <SaveButton disabled><ThreeDots 
                    color={'white'} 
                    height={25} 
                    width={25}/></SaveButton>
                    :
                    <SaveButton type="submit" disabled={isLoading}>Salvar</SaveButton>
                    }
                    <CancelButton onClick={() => {props.setIsCreateHabit(false)}} disabled={isLoading}>Cancelar</CancelButton>
                </Form>
            </CreatingDiv>
        </>
    );
}


const NonHabitsText = styled.div`
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;
    color: #666666;
    margin-top: 22px;
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

const DaysSelection = styled.div`
    display: flex;
    width: 100%;
    justify-content: start;
`;

const SaveButton = styled.button`
    height: 35px;
    background-color: #52B6FF;
    border-radius: 4.63636px;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 15.976px;
    line-height: 20px;
    text-align: center;
    color: #FFFFFF;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 22.4vw;
    position: absolute;
    bottom: 18px;
    right: 18px;
    border: none;
`;

const CancelButton = styled.button`
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 15.976px;
    line-height: 20px;
    text-align: center;
    color: #52B6FF;
    position: absolute;
    bottom: 25px;
    right: 32vw;
    border: none;
    background: none;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

const Input = styled.input`
    background-color: #FFFFFF;
    box-sizing: border-box;
    padding-left: 11px;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    width: 100%;
    height: 45px;
    margin-bottom: 6px;
    text-decoration: none;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 19.976px;
    line-height: 25px;
    color: #DBDBDB;
    ::placeholder{
        color: #DBDBDB;
    }
`;

const CreatingDiv = styled.div`
    box-sizing: border-box;
    padding: 18px;
    background-color: #FFFFFF;
    border-radius: 5px;
    height: 180px;
    width: 100%;
    position: relative;
`;

const NoneAdvise = styled.div`
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;
    color: #666666;
`;

const Title = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: 22px;
    margin-bottom: 10px;
    p{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 22.976px;
        line-height: 29px;
        color: #126BA5;
    }
`;

const PlusIcon = styled.div`
    background-color: #52B6FF;
    border-radius: 4.63636px;
    width: 40px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 400;
    font-size: 26.976px;
    line-height: 34px;
    text-align: center;
    color: #FFFFFF;
`;

const TodayButton = styled.div`
    background-color: #52B6FF;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;
    color: #52B6FF;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    width: 91px;
    height: 91px;
    position: fixed;
    bottom: 10px;
    left: calc(50vw - 45.5px);
`;

const Footer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0px 31px 0px 36px;
    width: 100%;
    height: 70px;
    background-color: #FFFFFF;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 1;
`;

const FooterButton = styled.div`
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;
    color: #52B6FF;
`;

const Content = styled.div`
    width: 100%;
    height: auto;
	display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 70px 17px 70px 17px;
    margin-bottom: 10px;
`;

const UserPic = styled.img`
    width: 51px;
    height: 51px;
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 70px;
    background-color: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    box-sizing: border-box;
    padding: 0px 18px 0px 18px;
    font-family: 'Playball';
    font-style: normal;
    font-weight: 400;
    font-size: 38.982px;
    line-height: 49px;
    color: #FFFFFF;
    z-index: 1;
    position: fixed;
    top: 0;
    left: 0;
`;
