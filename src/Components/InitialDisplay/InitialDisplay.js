import Group8 from "./assets/Group8.png";
import styled from 'styled-components';

export default function InitialDisplay(){
    return(
        <>
            <Content>
                <Logo src={Group8} alt='app logo'/>
                <Input placeholder="email"/>
                <Input placeholder="senha"/>
                <Button>Entrar</Button>
                <Register>Não tem uma conta? Cadastre-se!</Register>
            </Content>
        </>
    )
}

const Content = styled.div`
    width: 100vw;
	display: flex;
    flex-direction: column;
    align-items: center;
`;

const Logo = styled.img`
    box-sizing: border-box;
    margin-bottom: 32.62px;
    margin-top: 68px;
    width: 48%;
`;

const Input = styled.input`
    background-color: #FFFFFF;
    box-sizing: border-box;
    padding-left: 11px;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    width: 80.8%;
    height: 45px;
    margin-bottom: 6px;
    text-decoration: none;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 19.976px;
    line-height: 25px;
    color: #D4D4D4;
    opacity: 0.5;
`;

const Button = styled.button`
    width: 80.8%;
    height: 45px;
    box-sizing: border-box;
    background-color: #52B6FF;
    border-radius: 4.63636px;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 20.976px;
    line-height: 26px;
    text-align: center;
    color: #FFFFFF;
    border: none;
    margin-bottom: 25px;
`;

const Register = styled.p`
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 13.976px;
    line-height: 17px;
    text-align: center;
    text-decoration-line: underline;
    color: #52B6FF;
`;
