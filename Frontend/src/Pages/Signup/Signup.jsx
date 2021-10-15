import styles from './Signup.module.scss';

import Wave from '../../Components/Wave/Wave';
import Return from '../../Components/Return/Return';
import SignUpForm from '../../Components/SignUpForm/SignUpForm';

import { ReactComponent as ReturnImg } from '../../Assets/Svg/return.svg';
import { ReactComponent as WaveImg } from '../../Assets/Svg/wave2.svg';

function SignUp() {
    return (
        <>
            <Return Img={ReturnImg} route={'/'} />
            <Wave Img={WaveImg} />
            <main className={styles.background}>
                <SignUpForm />
            </main>
        </>
    );
}

export default SignUp;