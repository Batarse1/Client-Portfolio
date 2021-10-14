import styles from './Login.module.scss';

import Wave from '../../Components/Wave/Wave';
import LoginForm from '../../Components/LoginForm/LoginForm';

import { ReactComponent as WaveImg } from '../../Assets/Svg/wave1.svg';
import { ReactComponent as LoginImg } from '../../Assets/Svg/login.svg';

function Login() {
    return (
        <>
            <Wave Img={WaveImg} />
            <main className={styles.background}>
                <div className={`${styles.container} ${styles.img}`}><LoginImg /></div>
                <div className={`${styles.container} ${styles.login}`}><LoginForm /></div>
            </main>
        </>
    );
}

export default Login;