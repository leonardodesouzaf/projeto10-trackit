import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import dayjs from 'dayjs';
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import TodayHabit from './TodayHabit';
import { useState , useEffect } from "react";
import { buildStyles, CircularProgressbar, CircularProgressbarWithChildren } from 'react-circular-progressbar';

export default function TodayDisplay(){
    const { tasks, setTasks } = useContext(UserContext);
    require('dayjs/locale/pt-br');
    let dayName = dayjs().locale('pt-br');
    const navigate = useNavigate();
    const [habitsContent, setHabitsContent] = useState(<></>);
    const [refreshHabitsList, setRefreshHabitsList] = useState(false);
    const [counterDone, setCounterDone] = useState(0);
    const [counterUndone, setCounterUndone] = useState(0);
    const [isGreenSubtitle, setIsGreenSubtitle] = useState(false);
    const [perCentCounter, setPerCentCounter] = useState(0);
    useEffect(() => {
        let counterOfDone = 0;
        let counterOfUndone = 0;
        const requisition = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", {
            headers: {"Authorization": `Bearer ${tasks.token}`} 
		});
        requisition.catch(() => {alert("Erro ao carregar os hábitos! Tente novamente!")});
        requisition.then(renderHabits);
        function renderHabits(answer){
            let habitsList = answer.data;
            if(habitsList.length === 0){
                setHabitsContent(
                    <NonHabitsText>
                        Você não tem nenhum hábito cadastrado para hoje. Adicione mais hábitos!
                    </NonHabitsText>
                );
            }
            if(habitsList.length !== 0){
                setHabitsContent(habitsList.map((habito,index) => {
                if(habito.done === true){
                    counterOfDone++;
                    setCounterDone(counterOfDone);
                }
                if(habito.done === false){
                    counterOfUndone++;
                    setCounterUndone(counterOfUndone);
                }
                return(<TodayHabit key={index} done={habito.done} name={habito.name} token={tasks.token} id={habito.id} currentSequence={habito.currentSequence} highestSequence={habito.highestSequence} setRefreshHabitsList={setRefreshHabitsList} refreshHabitsList={refreshHabitsList} counterDone={counterDone} setCounterDone={setCounterDone} counterUndone={counterUndone} setCounterUndone={setCounterUndone}/>);
            }));
            }
            console.log(isGreenSubtitle,'passei aqui');
            if(counterOfDone !== 0){
                let perCent = (counterOfDone/habitsList.length)*100;
                setPerCentCounter(perCent.toFixed(0));
                setIsGreenSubtitle(true);
            }
            if(counterOfDone === 0){
                setIsGreenSubtitle(false);
            }
        }
    },[refreshHabitsList]);
    console.log('renderizando');
    return(
        <>
            <Header>
                TrackIt
                <UserPic src={tasks.image} alt='user profile pic'/>
            </Header>
            <Content>
                <DayName>
                    {dayName.format("dddd")}, {dayName.format("DD/MM")}
                </DayName>
                {isGreenSubtitle ?
                <CompleteRateGreen>
                    {perCentCounter}% dos hábitos concluídos
                </CompleteRateGreen>
                :
                <CompleteRate>
                    Nenhum hábito concluído ainda
                </CompleteRate>
                }
                <HabitsList>
                    {habitsContent}
                </HabitsList>
            </Content>
            <Footer>
                <FooterButton onClick={() => navigate('/habitos')}>Hábitos</FooterButton>
                <TodayButton onClick={() => navigate('/hoje')}>
                    <CircularProgressbarWithChildren
                    value={perCentCounter}
                    background
                    backgroundPadding={6}
                    styles={buildStyles({
                        backgroundColor: '#52B6FF',
                        textColor: 'white',
                        pathColor: 'white',
                        trailColor: 'transparent',
                        pathTransitionDuration: 0.5,
                        strokeLinecap: 'round',
                    })}
                    >Hoje</CircularProgressbarWithChildren>
                </TodayButton>
                <FooterButton onClick={() => navigate('/historico')}>Histórico</FooterButton>
            </Footer>
        </>
    )
}

const HabitsList = styled.div`
    
`;

const CompleteRateGreen = styled.div`
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;
    color: #8FC549;
    margin-bottom: 28px;
`;

const NonHabitsText = styled.div`
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;
    color: #666666;
    margin-top: 22px;
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

const CompleteRate = styled.div`
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;
    color: #BABABA;
    margin-bottom: 28px;
`;

const DayName = styled.div`
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 22.976px;
    line-height: 29px;
    color: #126BA5;
    margin-top: 28px;
    text-transform: capitalize;
`;

const Content = styled.div`
    width: 100%;
    height: auto;
	display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 70px 17px 70px 17px;
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