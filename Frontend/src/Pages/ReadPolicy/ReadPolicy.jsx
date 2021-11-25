import style from './ReadPolicy.module.scss';

import { useEffect, useState } from "react";

import { useParams, Link } from "react-router-dom";

import { usePolicies } from "../../Hooks/UsePolicies/UsePolicies";
import { useInsured } from '../../Hooks/UseInsureds/UseInsureds';

import { CgAddR } from 'react-icons/cg';
import { MdEdit } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';

import ItemList from '../../Components/ItemList/ItemList';

import { v4 as uuidv4 } from 'uuid';

const ReadPolicy = () => {
    let { id, idPolicy } = useParams();

    const [message, setMessage] = useState(false);

    const [policy, setPolicy] = useState(false);
    const [insureds, setInsureds] = useState(false);

    const InsuredsService = useInsured();
    const policiesService = usePolicies();

    const date = (s) => {
        return (s.substring(0, 10));
    };

    const onDeleteHandler = async (e, id) => {
        e.preventDefault();

        const response = await InsuredsService.deleteInsured(id);

        setMessage('');

        if (response.error) {
            setMessage('Error en la petición');
        }
        else {
            setMessage('El asegurado se ha eliminado con éxito');
        }
        setInsureds(false);
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

    useEffect(() => {
        if (!insureds) {
            const getAllInsuredsAsync = async () => {
                const response = await InsuredsService.getAllInsuredsOfAPolicy(idPolicy);
                setInsureds(response['allInsured']);
            };

            getAllInsuredsAsync();
        }
    }, [InsuredsService, insureds, idPolicy]);

    if (policy) {
        return (
            <>
                <div className={style.policyInformation}>
                    <h2 className={style.title}>{`${policy.product} (${policy.insuranceCarrier})`}</h2>
                    <h3>{`Número: ${policy.number}`}</h3>
                    <div className={style.policyWrapper}>
                        <div>
                            <div className={style.policyColumn}>
                                <h4><span className={style.subtitle}>Plan: </span>{policy.plan}</h4>
                                <h4><span className={style.subtitle}>Frecuencia de pago: </span>{policy.paymentFrequency}</h4>
                                <h4><span className={style.subtitle}>Fecha de validación inicial: </span>{date(policy.initialValidity)}</h4>
                                <h4><span className={style.subtitle}>Fecha de validación final: </span>{date(policy.finalValidity)}</h4>
                            </div>
                        </div>
                        <div>
                            <div className={style.policyColumn}>
                                <h4><span className={style.subtitle}>Comisión: </span>{policy.commission}%</h4>
                                <h4><span className={style.subtitle}>Prima total: </span>{policy.totalPremium}$</h4>
                                <h4><span className={style.subtitle}>Prima planeada: </span>{policy.plannedPremium}$</h4>
                                <h4><span className={style.subtitle}>Prima básica: </span>{policy.basicPremium}$</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.firstLine}>
                    <h3>Asegurados</h3>
                    <Link className={style.icon} to={"create"}><CgAddR /></Link>
                </div>
                <ul>
                    {
                        insureds && insureds.map((insured) => {
                            return (
                                <li key={uuidv4()} className={style.item}>
                                    <ItemList
                                        name={insured.name}
                                        id={insured.id}
                                    />
                                    <div>
                                        <Link to={`edit/${insured.id}`}><MdEdit className={style.icon} /></Link>
                                        <MdDelete className={style.icon} onClick={(e) => { onDeleteHandler(e, insured.id); }} />
                                    </div>
                                </li>
                            );
                        })
                    }
                </ul>
                {message && (
                    <p className={style.message}>
                        {message}
                    </p>
                )}
            </>
        );
    }
    else {
        return (<></>);
    }
};

export default ReadPolicy;