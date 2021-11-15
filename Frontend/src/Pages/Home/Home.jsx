import styles from './Home.module.scss';

import Navbar from '../../Components/Navbar/Navbar';
import InsuranceCarrier from '../../Components/InsuranceCarrier/InsuranceCarrier';

function Home() {
    return (
        <div className={styles.home}>
            <Navbar insuranceCarrier={"ACSA"}/>
            <main>
                <InsuranceCarrier name="ACSA" />
                <InsuranceCarrier name="MAFRE" />
            </main>
        </div>
    );
}

export default Home;