import styled from 'styled-components';
import { useNavigate , Link } from "react-router-dom";
import { useState , useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import Habit from './Habit';

export default function HabitsDisplay(){
    const { tasks, setTasks } = useContext(UserContext);
    const [habitsContent, setHabitsContent] = useState(<></>);
    const navigate = useNavigate();
    useEffect(() => {
        const requisition = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", {
            headers: {"Authorization": `Bearer ${tasks.token}`} 
		});
        requisition.catch(() => {alert("Erro ao carregar os hábitos! Tente novamente!")});
        requisition.then(renderHabits);
        function renderHabits(answer){
            let habitsList = answer.data;
            if(answer.data === []){
                setHabitsContent(
                    <>
                        Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!
                    </>
                );
            }else{
                setHabitsContent(habitsList.map((habito,index) => <Habit key={index} days={habito.days} name={habito.name}/>));
            }
        }
        },[]);
    return(
        <>
            <Header>
                TrackIt
                <UserPic src='https://zonacuriosa.com/wp-content/uploads/2020/11/curiosidades-incriveis-sobre-o-patrick-estrela-758x455.jpg' alt='user profile pic'/>
            </Header>
            <Content>
                <Title>
                    <p>Meus hábitos</p>
                    <PlusIcon><ion-icon name="add-outline"></ion-icon></PlusIcon>
                </Title>
                {habitsContent}
            </Content>
            <Footer>
                <FooterButton onClick={() => navigate('/habitos')}>Hábitos</FooterButton>
                <TodayButton>Hoje</TodayButton>
                <FooterButton onClick={() => navigate('/historico')}>Histórico</FooterButton>
            </Footer>
        </>
    )
}

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
    height: 100vh;
	display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 70px 17px 70px 17px;
    background-color: #EBEBEB;
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