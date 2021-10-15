import styles from './LoginForm.module.scss';

import CircleImg from '../CircleImg/CircleImg';
import Input from '../Input/Input';
import Button from '../Button/Button';

import Logo from '../../Assets/Img/logo.png';

function LoginForm() {
    const white = '#FFFFFF';
    const borderColor = '#707070';
    const buttonPadding = '10px';
    const buttonRadius = '25px';
    const buttonWidth = '300px';

    return (
        <form className={styles.background}>
            <CircleImg ImgSrc={Logo} imgHeight='150px' imgWidth='150px' imgRadius='75px' />
            <h2 className={styles.welcome}>Bienvenido</h2>
            <div className={styles.inputs}>
                <Input title='Usuario' type='text' id='text' name="text" />
                <Input title='Contraseña' type='password' id='password' name="password" />
            </div>
            <div className={styles.buttons}>
                <Button content='Iniciar sesión' bgColor={white} borderColor={borderColor} padding={buttonPadding} radius={buttonRadius} buttonWidth={buttonWidth} route={'/'} />
                <Button content='Registrarse' bgColor={white} borderColor={borderColor} padding={buttonPadding} radius={buttonRadius} buttonWidth={buttonWidth} route={'signup'} />
            </div>
        </form>
    );
}

export default LoginForm;