import React from 'react';
import './index.css';

import { ImageCircle } from '../components/images';
import { TextTitle } from '../components/texts';
import { InputTextIcon } from '../components/inputs';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { ButtonDefault, ButtonIcon } from '../components/buttons';
import { AlertDecision } from '../components/alerts';
import { useNavigate } from 'react-router-dom';


export default function SignIn () {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [alertDF, setAlertDF] = React.useState(false);
    const navigate = useNavigate();

    function loginWithUser(e){
        e.preventDefault();

        Meteor.loginWithPassword(email, password, (error) => {
            if(error && error.reason === "User not found"){
                setAlertDF({
                    title: "Usuário não encontrado",
                    content: "O usuário informado não foi encontrado, deseja criar um novo usuário a partir destas informações?",
                    error: false,
                    onConfirm: () => {
                        setAlertDF(false);
                        Accounts.createUser({
                            username: email,
                            password: password
                        }, (error) => {
                            if(!error) navigate('/home');
                        });
                    }
                });
            }
            else if(error){
                setAlertDF({
                    title: "Erro " + error.error,
                    content: "Erro ao tentar entrar no sistema (" + error.reason + "). Verifique seus dados de acesso e tente novamente!",
                    error: true,
                });             
            }else {
                navigate('/home');
            }
        });
    }

    function loginWithFacebook(){
        Meteor.loginWithFacebook({
            requestPermissions: ['public_profile', 'email']
        }, (error) => {
            if(error){
                setAlertDF({
                    title: "Erro " + error.error,
                    content: "Erro ao tentar entrar no sistema com o Facebook (" + error.reason + "). Verifique seus dados de acesso e tente novamente!",
                    error: true,
                });
            }
        })
    }

    return (
    <div className="full-page">
        <div className="card-center">
           <ImageCircle src="images/profile.png" alt="Imagem de Usuário" style={{marginTop: '-90px'}} />
           <TextTitle>Entrar</TextTitle>
           <form onSubmit={loginWithUser}>
                <InputTextIcon 
                    value={email} 
                    setValue={setEmail} 
                    icon="person" 
                    style={{marginTop: '20px'}} 
                    label="Usuário"
                    placeholder="Digite seu Usuário aqui"
                />

                <InputTextIcon 
                    value={password} 
                    setValue={setPassword} 
                    icon="password" 
                    style={{marginTop: '30px'}} 
                    type='password'
                    label="Senha"
                    placeholder="Digite sua Senha aqui"
                />

                <ButtonDefault text="Entrar" style={{marginTop: '30px'}} />
           </form>
           <ButtonIcon icon="facebook" onClick={loginWithFacebook}/>
        </div>

        {alertDF   
            && <AlertDecision 
                title={alertDF.title} 
                content={alertDF.content} 
                onCancel={() => setAlertDF(false)} 
                onConfirm={alertDF.onConfirm}
                error={alertDF.error}
            />
        }
    </div>     
    );
}