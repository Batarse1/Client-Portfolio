import styles from './Signup.module.scss';

import Wave from '../../Components/Wave/Wave';
import SignUpForm from '../../Components/SignUpForm/SignUpForm';

import { ReactComponent as WaveImg } from '../../Assets/Svg/wave2.svg';

function SignUp() {
    return (
        <>
            <Wave Img={WaveImg} />
            <main className={styles.background}>
                <SignUpForm />
            </main>
        </>
    );
}

export default SignUp;