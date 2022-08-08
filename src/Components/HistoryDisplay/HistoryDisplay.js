import styled from 'styled-components';
import { useNavigate , Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";

export default function HistoryDisplay(){
    const navigate = useNavigate();
    const { tasks, setTasks } = useContext(UserContext);
    return(
        <>
            <Header>
                TrackIt
                <UserPic src={tasks.image} alt='user profile pic'/>
            </Header>
            <Content>
                <Title>Histórico</Title>
                <Subtitle>Em breve você poderá ver o histórico dos seus hábitos aqui!</Subtitle>
            </Content>
            <Footer>
                <FooterButton onClick={() => navigate('/habitos')}>Hábitos</FooterButton>
                <TodayButton onClick={() => navigate('/hoje')}>Hoje</TodayButton>
                <FooterButton onClick={() => navigate('/historico')}>Histórico</FooterButton>
            </Footer>
        </>
    )
}

const Title = styled.div`
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 22.976px;
    line-height: 29px;
    color: #126BA5;
`;

const Subtitle = styled.div`
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;
    color: #666666;
    margin-top: 17px;
`;

const Content = styled.div`
    box-sizing: border-box;
    margin-top: 98px;
    margin-left: 17px;
    display: flex;
    flex-direction: column;
`;

const UserPic = styled.img`
    width: 51px;
    height: 51px;
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
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

