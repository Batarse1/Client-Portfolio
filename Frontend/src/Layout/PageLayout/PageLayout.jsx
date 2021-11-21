import styles from './PageLayout.module.scss';

import Navbar from '../../Components/Navbar/Navbar';

const PageLayout = ({ children }) => {
    return (
        <div className={styles.layout}>
            <Navbar />
            <main>
                {children}
            </main>
        </div>
    );
};

export default PageLayout;