import styles from './PageLayout.module.scss';

import Navbar from '../../Components/Navbar/Navbar';

import { ProvideInsuranceCarrier } from '../../Hooks/UseInsuranceCarrier/useInsuranceCarrier';

const PageLayout = () => {
    return (
        <ProvideInsuranceCarrier>
            <div className={styles.layout}>
                <Navbar />
                <main>
                </main>
            </div>
        </ProvideInsuranceCarrier>
    );
};

export default PageLayout;