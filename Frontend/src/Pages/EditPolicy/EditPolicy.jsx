import style from "./EditPolicy.module.scss";

import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import { usePolicies } from "../../Hooks/UsePolicies/UsePolicies";

import Input from "../../Components/Input/Input";
import Submit from "../../Components/Submit/Submit";

const EditPolicy = () => {
    let { id, idPolicy } = useParams();

    const [number, setNumber] = useState(undefined);
    const [product, setProduct] = useState(undefined);
    const [plan, setPlan] = useState(undefined);
    const [commission, setCommission] = useState(undefined);
    const [insuranceCarrier, setInsuranceCarrier] = useState(undefined);
    const [paymentFrequency, setPaymentFrequency] = useState(undefined);
    const [totalPremium, setTotalPremium] = useState(undefined);
    const [basicPremium, setBasicPremium] = useState(undefined);
    const [plannedPremium, setPlannedPremium] = useState(undefined);
    const [initialValidity, setInitialValidity] = useState(undefined);
    const [finalValidity, setFinalValidity] = useState(undefined);

    const [page, setPage] = useState(1);
    const [message, setMessage] = useState('');

    const policiesService = usePolicies();
    const [policy, setPolicy] = useState(false);

    const onChangeHandler = (e, save) => {
        save(e.target.value);
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        const response = await policiesService.editPolicy(idPolicy, number, product, plan, commission, insuranceCarrier, paymentFrequency, totalPremium, basicPremium, plannedPremium, initialValidity, finalValidity);

        setMessage('');

        if (response.error === false) {
            setMessage('La poliza se ha actualizado con éxito');
        }
        else {
            setMessage('Error en la petición');
        }
    };

    useEffect(() => {
        if (!policy) {
            const getPolicyAsync = async () => {
                const response = await policiesService.getPolicy(id, idPolicy);
                setPolicy(response.currentPolicy);
            };

            getPolicyAsync();
        }
    }, [policy, policiesService, id, idPolicy]);

    const white = '#FFFFFF';
    const borderColor = '#707070';
    const submitPadding = '10px';
    const submitRadius = '20px';
    const submitWidth = '100%';

    if (policy) {
        return (
            <div className={style.createPolicy}>
                <form onSubmit={onSubmitHandler}>
                    {
                        page === 1 ?
                            <div className={style.firstPage}>
                                <h2 className={style.title}>Actualizar Poliza</h2>
                                <h2 className={style.subtitle}>Ingrese solo los campos que quiera actualizar</h2>
                                <Input title={`Número de la poliza: ${policy.number}`} type='text' id='createPolicyNumber' name="PolicyNumber" onChange={(e) => { onChangeHandler(e, setNumber); }} />
                                <Input title={'Producto: ' + policy.product} type='text' id='createPolicyProduct' name="PolicyProduct" onChange={(e) => { onChangeHandler(e, setProduct); }} />
                                <Input title={'Plan: ' + policy.plan} type='text' id='createPolicyPlan' name="PolicyPlan" onChange={(e) => { onChangeHandler(e, setPlan); }} />
                                <Input title={'Aseguradora: ' + policy.insuranceCarrier} type='text' id='createPolicyInsuranceCarrier' name="PolicyInsuranceCarrier" onChange={(e) => { onChangeHandler(e, setInsuranceCarrier); }} />
                                <Input title={'Porcentaje de comisión: ' + policy.commission} type='number' id='createPolicyCommission' name="PolicyCommission" onChange={(e) => { onChangeHandler(e, setCommission); }} max="100" min="0" step="0.01" />
                                <ul className={style.tabs}>
                                    <li onClick={() => { setPage(1); }}>1</li>
                                    <li onClick={() => { setPage(2); }}>2</li>
                                </ul>
                            </div>
                            :
                            <div className={style.secondPage}>
                                <Input title={'Frecuencia de pago (días): ' + policy.paymentFrequency} type='number' id='createPolicyPaymentFrequency' name="PolicyPaymentFrequency" onChange={(e) => { onChangeHandler(e, setPaymentFrequency); }} min="1" step="1" />
                                <Input title={'Prima total: ' + policy.totalPremium} type='number' id='createPolicyTotalPremium' name="PolicyTotalPremium" onChange={(e) => { onChangeHandler(e, setTotalPremium); }} min="0" step="0.01" />
                                <Input title={'Prima básica: ' + policy.basicPremium} type='number' id='createPolicyBasicPremium' name="PolicyBasicPremium" onChange={(e) => { onChangeHandler(e, setBasicPremium); }} min="0" step="0.01" />
                                <Input title={'Prima planeada: ' + policy.plannedPremium} type='number' id='createPolicyPlannedPremium' name="PolicyPlannedPremium" onChange={(e) => { onChangeHandler(e, setPlannedPremium); }} min="0" step="0.01" />
                                <Input title={'Fecha de validación inicial: ' + policy.initialValidity} type='date' id='createPolicyInitialValidity' name="Date" onChange={(e) => { onChangeHandler(e, setInitialValidity); }} />
                                <Input title={'Fecha de validación final: ' + policy.finalValidity} type='date' id='createPolicyFinalValidity' name="Date" onChange={(e) => { onChangeHandler(e, setFinalValidity); }} />
                                {message && (
                                    <p>
                                        {message}
                                    </p>
                                )}
                                <div className={style.submit}>
                                    <Submit value="Actualizar Poliza" bgColor={white} borderColor={borderColor} padding={submitPadding} radius={submitRadius} submitWidth={submitWidth} />
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
    }
    else {
        return (<></>);
    }
};

export default EditPolicy;