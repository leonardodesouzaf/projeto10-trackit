import Group8 from "./assets/Group8.png";
import styled from 'styled-components';
import { useNavigate , Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

export default function RegisterDisplay(){
    const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
    const [name, setName] = useState("");
	const [picture, setPicture] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    function registerIn (event) {
        event.preventDefault();
        setIsLoading(true);
		const requisition = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up", {
			email: email,
            name: name,
            image: picture,
			password: password
		});
        requisition.catch(() => {alert("Registro não efetuado! Tente novamente!")});
        requisition.then(() => {navigate("/")});
    }
    return(
        <>
            <Content>
                <Logo src={Group8} alt='app logo'/>
                <Form onSubmit={registerIn}>
                    <Input placeholder="email" disabled={isLoading} type="email" required onChange={e => setEmail(e.target.value)}/>
                    <Input placeholder="senha" disabled={isLoading} type="password" required onChange={e => setPassword(e.target.value)}/>
                    <Input placeholder="nome" disabled={isLoading} type="text" required onChange={e => setName(e.target.value)}/>
                    <Input placeholder="foto" disabled={isLoading} type="url" required onChange={e => setPicture(e.target.value)}/>
                    {isLoading ?
                    <Button disabled><ThreeDots 
                    color={'white'} 
                    height={30} 
                    width={30}/></Button>
                    :
                    <Button type="submit" disabled={isLoading}>Cadastrar</Button>
                    }
                </Form>
                <Link to="/">
                    <Register>Já tem uma conta? Faça login!</Register>
                </Link>
            </Content>
        </>
    )
}

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

const Content = styled.div`
    width: 100vw;
    background-color: white;
    height: 100vh;
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
    ::placeholder{
        color: #D4D4D4;
    }
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
    display: flex;
    justify-content: center;
    align-items: center;
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
