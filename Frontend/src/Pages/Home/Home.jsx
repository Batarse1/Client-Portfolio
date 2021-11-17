import styles from './Home.module.scss';

import ACSA from '../../Assets/Img/InsuranceCarriers/acsa.png';
import MAPFRE from '../../Assets/Img/InsuranceCarriers/mapfre.png';
import PALIC from '../../Assets/Img/InsuranceCarriers/palic.png';

import Navbar from '../../Components/Navbar/Navbar';
import InsuranceCarrier from '../../Components/InsuranceCarrier/InsuranceCarrier';

import { ProvideInsuranceCarrier } from '../../Hooks/UseInsuranceCarrier/useInsuranceCarrier';
import { useInsuranceCarrier } from '../../Hooks/UseInsuranceCarrier/useInsuranceCarrier';

import { RiGlobalFill } from 'react-icons/ri';

function Home() {
    return (
        <ProvideInsuranceCarrier>
            <div className={styles.home}>
                <Navbar />
                <main>
                    <div className={styles.content}>
                        <Global />
                        <div className={styles.insuranceCompany}>
                            <InsuranceCarrier name="ACSA" img={ACSA} />
                            <InsuranceCarrier name="MAPFRE" img={MAPFRE} />
                            <InsuranceCarrier name="PALIC" img={PALIC} />
                        </div>
                    </div>
                </main>
            </div>
        </ProvideInsuranceCarrier>
    );
}

const Global = () => {
    const insuranceCarrier = useInsuranceCarrier();

    const onClickHandler = (event, name) => {
        event.preventDefault();
        insuranceCarrier.setInsuranceCarrier(name);
        return;
    };

    return (<div className={styles.global} onClick={(e) => {onClickHandler(e, "Global")}}><RiGlobalFill /><p>Global</p></div>);
};

export default Home;