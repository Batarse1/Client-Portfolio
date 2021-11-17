import styles from "./InsuranceCarrier.module.scss";

import { useInsuranceCarrier } from "../../Hooks/UseInsuranceCarrier/useInsuranceCarrier";

const InsuranceCarrier = ({ name, img }) => {
    const insuranceCarrier = useInsuranceCarrier();

    const onClickHandler = (event, name) => {
        event.preventDefault();
        insuranceCarrier.setInsuranceCarrier(name);
        return;
    };

    return (
        <img src={img} className={styles.insuranceCarrier} onClick={(e) => {onClickHandler(e, name)}} alt={name} />
    );
};

export default InsuranceCarrier;