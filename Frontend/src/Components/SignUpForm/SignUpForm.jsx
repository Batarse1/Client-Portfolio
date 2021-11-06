import React, { useState } from 'react';
import { useAuth } from '../../Hooks/UseAuth/useAuth';

import styles from './SignUpForm.module.scss';

import CircleImg from '../CircleImg/CircleImg';
import Input from '../Input/Input';
import Button from '../Button/Button';

import Logo from '../../Assets/Img/logo.png';

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

        const response = await auth.signUp(username, password);

        setMessage('');

        if (response.error) {
            setMessage('Exito');
        }
        else {
            setMessage('Error en la petición');
        }

        console.log(message);
    };

    const white = '#FFFFFF';
    const borderColor = '#707070';
    const buttonPadding = '10px';
    const buttonRadius = '25px';
    const buttonWidth = '300px';

    return (
        <form className={styles.background} onSubmit={handleSubmit}>
            <CircleImg ImgSrc={Logo} imgHeight='150px' imgWidth='150px' imgRadius='75px' />
            <h2>Bienvenido</h2>
            <div className={styles.inputs}>
                <Input title='Usuario' type='text' id='text' name="text" onChange={(e) => { handleOnChange(e, setUsername); }} required />
                <Input title='Contraseña' type='password' id='password' name="password" onChange={(e) => { handleOnChange(e, setPassword); }} required />
                <Input title='Confirmar contraseña' type='password' id='confirmPassword' name="confirmPassword" onChange={(e) => { handleOnChange(e, setConfirmPassword); }} required />
            </div>
            <Button content='Registrarse' bgColor={white} borderColor={borderColor} padding={buttonPadding} radius={buttonRadius} buttonWidth={buttonWidth} route={'/signup'} />
        </form>
    );
}

export default SignUpForm;