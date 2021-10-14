import styles from './LoginForm.module.scss';

import CircleImg from '../CircleImg/CircleImg';
import Input from '../Input/Input';
import OvalButton from '../OvalButton/OvalButton';

import Logo from '../../Assets/Img/logo.png';

function LoginForm() {
    const white = '#FFFFFF';
    const borderColor = '#707070';
    const buttonPadding = '10px';
    const buttonRadius = '25px';

    return (
        <form className={styles.background}>
            <CircleImg ImgSrc={Logo} imgHeight='150px' imgWidth='150px' imgRadius='75px' />
            <h2 className={styles.welcome}>Bienvenido</h2>
            <div className={styles.inputs}>
                <Input title='Correo electrónico' type='email' id='email' name="email" />
                <Input title='Contraseña' type='password' id='password' name="password" />
            </div>
            <div className={styles.buttons}>
                <OvalButton content='Iniciar sesión' bgColor={white} borderColor={borderColor} padding={buttonPadding} radius={buttonRadius} />
                <OvalButton content='Registrarse' bgColor={white} borderColor={borderColor} padding={buttonPadding} radius={buttonRadius} />
            </div>
        </form>
    );
}

export default LoginForm;