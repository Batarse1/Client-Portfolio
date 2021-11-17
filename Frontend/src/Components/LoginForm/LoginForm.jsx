import React, { useState } from 'react';
import { useAuth } from '../../Hooks/UseAuth/useAuth';
import { useNavigate } from 'react-router-dom';

import styles from './LoginForm.module.scss';

import CircleImg from '../CircleImg/CircleImg';
import Input from '../Input/Input';
import Submit from '../Submit/Submit';
import Button from '../Button/Button';

import Logo from '../../Assets/Img/Logo/logo.png';

function LoginForm() {
    const [message, setMessage] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const auth = useAuth();

    const handleOnChange = (e, save) => {
        save(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await auth.logIn(username, password);

        if (response.error) {
            setMessage("Credenciales incorrectas");
        }
        else {
            navigate("/home", { replace: true });

            setUsername("");
            setPassword("");
        }
    };

    const white = '#FFFFFF';
    const borderColor = '#707070';
    const submitPadding = '10px';
    const submitRadius = '25px';
    const submitWidth = '300px';
    const buttonPadding = '10px';
    const buttonRadius = '25px';
    const buttonWidth = '300px';

    return (
        <form className={styles.background} onSubmit={handleSubmit}>
            <CircleImg ImgSrc={Logo} imgHeight='150px' imgWidth='150px' imgRadius='75px' />
            <h2 className={styles.welcome}>Bienvenido</h2>
            <div className={styles.text}>
                <div className={styles.inputs}>
                    <Input title='Usuario' type='text' id='logInText' name="text" onChange={(e) => { handleOnChange(e, setUsername); }} required />
                    <Input title='Contraseña' type='password' id='logInPassword' name="password" onChange={(e) => { handleOnChange(e, setPassword); }} required autoComplete="off" />
                </div>
                {message && (
                    <p className={styles.message}>
                        {message}
                    </p>
                )}
            </div>
            <div className={styles.buttons}>
                <Submit value="Iniciar sesión" bgColor={white} borderColor={borderColor} padding={submitPadding} radius={submitRadius} submitWidth={submitWidth} />
                <Button content='Registrarse' bgColor={white} borderColor={borderColor} padding={buttonPadding} radius={buttonRadius} buttonWidth={buttonWidth} route={'signup'} />
            </div>
        </form>
    );
}

export default LoginForm;