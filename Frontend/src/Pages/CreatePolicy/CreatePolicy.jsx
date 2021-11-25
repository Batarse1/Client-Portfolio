import style from "./CreatePolicy.module.scss";

import { useState } from "react";

import { useParams } from "react-router-dom";

import { usePolicies } from "../../Hooks/UsePolicies/UsePolicies";

import Input from "../../Components/Input/Input";
import Submit from "../../Components/Submit/Submit";

const CreatePolicy = () => {
    let { id } = useParams();

    const [number, setNumber] = useState(null);
    const [product, setProduct] = useState(null);
    const [plan, setPlan] = useState(null);
    const [commission, setCommission] = useState(null);
    const [insuranceCarrier, setInsuranceCarrier] = useState(null);
    const [paymentFrequency, setPaymentFrequency] = useState(null);
    const [totalPremium, setTotalPremium] = useState(null);
    const [basicPremium, setBasicPremium] = useState(null);
    const [plannedPremium, setPlannedPremium] = useState(null);
    const [initialValidity, setInitialValidity] = useState(null);
    const [finalValidity, setFinalValidity] = useState(null);

    const [page, setPage] = useState(1);
    const [message, setMessage] = useState('');

    const policiesService = usePolicies();

    const onChangeHandler = (e, save) => {
        save(e.target.value);
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        const response = await policiesService.createPolicy(id, number, product, plan, commission, insuranceCarrier, paymentFrequency, totalPremium, basicPremium, plannedPremium, initialValidity, finalValidity);

        setMessage('');

        if (response.error === "false") {
            setMessage('La poliza se ha creado con éxito');
        }
        else {
            setMessage('Error en la petición');
        }
    };

    const white = '#FFFFFF';
    const borderColor = '#707070';
    const submitPadding = '10px';
    const submitRadius = '20px';
    const submitWidth = '100%';

    return (
        <div className={style.createPolicy}>
            <form onSubmit={onSubmitHandler}>
                {
                    page === 1 ?
                        <div className={style.firstPage}>
                            <h2 className={style.title}>Nueva Poliza</h2>
                            <Input title='Número de la poliza' type='text' id='createPolicyNumber' name="PolicyNumber" onChange={(e) => { onChangeHandler(e, setNumber); }} required />
                            <Input title='Producto' type='text' id='createPolicyProduct' name="PolicyProduct" onChange={(e) => { onChangeHandler(e, setProduct); }} required />
                            <Input title='Plan' type='text' id='createPolicyPlan' name="PolicyPlan" onChange={(e) => { onChangeHandler(e, setPlan); }} required />
                            <Input title='Aseguradora' type='text' id='createPolicyInsuranceCarrier' name="PolicyInsuranceCarrier" onChange={(e) => { onChangeHandler(e, setInsuranceCarrier); }} required />
                            <Input title='Porcentaje de comisión' type='number' id='createPolicyCommission' name="PolicyCommission" onChange={(e) => { onChangeHandler(e, setCommission); }} max="100" min="0" step="0.01" required />
                            <ul className={style.tabs}>
                                <li onClick={() => { setPage(1); }}>1</li>
                                <li onClick={() => { setPage(2); }}>2</li>
                            </ul>
                        </div>
                        :
                        <div className={style.secondPage}>
                            <Input title='Frecuencia de pago (días)' type='number' id='createPolicyPaymentFrequency' name="PolicyPaymentFrequency" onChange={(e) => { onChangeHandler(e, setPaymentFrequency); }} min="1" step="1" required />
                            <Input title='Prima total' type='number' id='createPolicyTotalPremium' name="PolicyTotalPremium" onChange={(e) => { onChangeHandler(e, setTotalPremium); }} min="0" step="0.01" required />
                            <Input title='Prima básica' type='number' id='createPolicyBasicPremium' name="PolicyBasicPremium" onChange={(e) => { onChangeHandler(e, setBasicPremium); }} min="0" step="0.01" />
                            <Input title='Prima planeada' type='number' id='createPolicyPlannedPremium' name="PolicyPlannedPremium" onChange={(e) => { onChangeHandler(e, setPlannedPremium); }} min="0" step="0.01" required />
                            <Input title='Fecha de validación inicial' type='date' id='createPolicyInitialValidity' name="Date" onChange={(e) => { onChangeHandler(e, setInitialValidity); }} required />
                            <Input title='Fecha de validación final' type='date' id='createPolicyFinalValidity' name="Date" onChange={(e) => { onChangeHandler(e, setFinalValidity); }} required />
                            {message && (
                                <p>
                                    {message}
                                </p>
                            )}
                            <div className={style.submit}>
                                <Submit value="Crear Poliza" bgColor={white} borderColor={borderColor} padding={submitPadding} radius={submitRadius} submitWidth={submitWidth} />
                            </div>
                            <ul className={style.tabs}>
                                <li onClick={() => { setPage(1); }}>1</li>
                                <li onClick={() => { setPage(2); }}>2</li>
                            </ul>
                        </div>
                }
            </form>
        </div>
    );
};

export default CreatePolicy;