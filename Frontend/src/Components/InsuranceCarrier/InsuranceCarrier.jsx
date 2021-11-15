import styles from "./InsuranceCarrier.module.scss";

const InsuranceCarrier = ({ name }) => {
    return (
        <div className={styles.insuranceCarrier}>
            {name}
        </div>
    );
};

export default InsuranceCarrier;