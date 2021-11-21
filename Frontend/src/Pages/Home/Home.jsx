import styles from './Home.module.scss';

import ACSA from '../../Assets/Img/InsuranceCarriers/acsa.png';
import ASESUISA from '../../Assets/Img/InsuranceCarriers/asesuisa.png';
import PALIC from '../../Assets/Img/InsuranceCarriers/palic.png';

import InsuranceCarrier from '../../Components/InsuranceCarrier/InsuranceCarrier';

import { useInsuranceCarrier } from '../../Hooks/UseInsuranceCarrier/useInsuranceCarrier';

import { RiGlobalFill } from 'react-icons/ri';

function Home() {
    return (
        <div className={styles.home}>
            <div className={styles.content}>
                <Global />
                <div className={styles.insuranceCompany}>
                    <InsuranceCarrier name="ACSA" img={ACSA} />
                    <InsuranceCarrier name="ASESUISA" img={ASESUISA} />
                    <InsuranceCarrier name="PALIC" img={PALIC} />
                </div>
            </div>
        </div>
    );
}

const Global = () => {
    const insuranceCarrier = useInsuranceCarrier();

    const onClickHandler = (event, name) => {
        event.preventDefault();
        insuranceCarrier.setInsuranceCarrier(name);
        return;
    };

    return (<div className={styles.global} onClick={(e) => { onClickHandler(e, "Global"); }}><RiGlobalFill /><p>Global</p></div>);
};

export default Home;