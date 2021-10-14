import styles from './Login.module.scss';

import LoginForm from '../../Components/LoginForm/LoginForm';

import { ReactComponent as WaveImg } from '../../Assets/Svg/wave.svg';
import { ReactComponent as LoginImg } from '../../Assets/Svg/login.svg';

function Login() {
    return (
        <>
            <WaveImg className={styles.wave} />
            <main className={styles.background}>
                <div className={`${styles.container} ${styles.img}`}><LoginImg /></div>
                <div className={`${styles.container} ${styles.login}`}><LoginForm /></div>
            </main>
        </>
    );
}

export default Login;