import React, { useState } from 'react';
import { useAuth } from '../../Hooks/UseAuth/useAuth';

import styles from './SignUpForm.module.scss';

import CircleImg from '../CircleImg/CircleImg';
import Input from '../Input/Input';
import Submit from '../Submit/Submit';

import Logo from '../../Assets/Img/Logo/logo.png';

function SignUpForm() {
    const [message, setMessage] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const auth = useAuth();

    const handleOnChange = (e, save) => {
        save(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await auth.signUp(username, password, confirmPassword);

        setMessage('');

        if (response.error === true) {
            setMessage('Error en la petición');
        }
        else {
            setMessage('El usuario se ha creado con exito');
        }
    };

    const white = '#FFFFFF';
    const borderColor = '#707070';
    const submitPadding = '10px';
    const submitRadius = '25px';
    const submitWidth = '300px';

    return (
        <form className={styles.background} onSubmit={handleSubmit}>
            <CircleImg ImgSrc={Logo} imgHeight='150px' imgWidth='150px' imgRadius='75px' />
            <h2>Registrar</h2>
            <div className={styles.text}>
                <div className={styles.inputs}>
                    <Input title='Usuario' type='text' id='signUpText' name="text" onChange={(e) => { handleOnChange(e, setUsername); }} required />
                    <Input title='Contraseña' type='password' id='signUpPassword' name="password" onChange={(e) => { handleOnChange(e, setPassword); }} required autoComplete="off" />
                    <Input title='Confirmar contraseña' type='password' id='signUpConfirmPassword' name="confirmPassword" onChange={(e) => { handleOnChange(e, setConfirmPassword); }} required autoComplete="off" />
                </div>
                {message && (
                    <p className={styles.message}>
                        {message}
                    </p>
                )}
            </div>

            <Submit value="registrarse" bgColor={white} borderColor={borderColor} padding={submitPadding} radius={submitRadius} submitWidth={submitWidth} />
        </form>
    );
}

export default SignUpForm;