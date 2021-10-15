import styles from './SignUpForm.module.scss';

import Logo from '../../Assets/Img/logo.png';

import CircleImg from '../CircleImg/CircleImg';
import Input from '../Input/Input';
import Button from '../Button/Button';

function SignUpForm() {
    const white = '#FFFFFF';
    const borderColor = '#707070';
    const buttonPadding = '10px';
    const buttonRadius = '25px';
    const buttonWidth = '300px';

    return (
        <form className={styles.background}>
            <CircleImg ImgSrc={Logo} imgHeight='150px' imgWidth='150px' imgRadius='75px' />
            <h2>Bienvenido</h2>
            <div className={styles.inputs}>
                <Input title='Usuario' type='text' id='text' name="text" />
                <Input title='Contraseña' type='password' id='password' name="password" />
                <Input title='Confirmar contraseña' type='password' id='confirmPassword' name="confirmPassword" />
            </div>
            <Button content='Registrarse' bgColor={white} borderColor={borderColor} padding={buttonPadding} radius={buttonRadius} buttonWidth={buttonWidth} route={'/'} />
        </form>
    );
}

export default SignUpForm;