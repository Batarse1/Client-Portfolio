import style from './ReadUser.module.scss';

import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { useCustomers } from "../../Hooks/UseCustomers/UseCustomers";
import { usePolicies } from "../../Hooks/UsePolicies/UsePolicies";

import { CgAddR } from 'react-icons/cg';
import { MdEdit } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';

import ItemList from '../ItemList/ItemList';

const ReadUser = () => {
    let { id } = useParams();

    const date = (s) => {
        return (s.substring(0, 10));
    };

    const customersService = useCustomers();
    const policiesService = usePolicies();

    const [message, setMessage] = useState(false);
    const [customer, setCustomer] = useState(false);
    const [policies, setPolicies] = useState(false);

    useEffect(() => {
        if (!policies) {
            const getAllPoliciesAsync = async () => {
                const response = await policiesService.getAllPoliciesOfACustomer(id);
                setPolicies(response['allPolicies']);
            };

            getAllPoliciesAsync();
        }
    }, [policiesService, policies, id]);

    useEffect(() => {
        if (!customer) {
            const getCustomerAsync = async () => {
                const response = await customersService.getCustomer(id);
                setCustomer(response.currentCustomer);
            };

            getCustomerAsync();
        }
    }, [customer, customersService, id]);

    const onDeleteHandler = async (e, id) => {
        e.preventDefault();

        const response = await policiesService.deletePolicy(id);

        setMessage('');

        if (response.error) {
            setMessage('Error en la petición');
        }
        else {
            setMessage('La poliza se ha eliminado con éxito');
        }
        setPolicies(false);
    };

    if (customer) {
        return (
            <div>
                <div className={style.personalInformation}>
                    <div>
                        <h2 className={style.title}>{customer.name}</h2>
                        <h3>({customer.type})</h3>
                    </div>
                    <div className={style.primaryInformation}>
                        <div className={style.primaryInformationContent}>
                            <div>
                                <h4 className={style.subtitle}>DUI</h4>
                                <p>{customer.dui}</p>
                            </div>
                            <div>
                                <h4 className={style.subtitle}>Telefonos</h4>
                                <ul>
                                    {customer.phone.map((phone) => {
                                        return (<li key={phone}>{phone}</li>);
                                    })}
                                </ul>
                            </div>
                        </div>
                        <div className={style.primaryInformationContent}>
                            <div>
                                <h4 className={style.subtitle}>NIT</h4>
                                <p>{customer.nit}</p>
                            </div>
                            <div>
                                <h4 className={style.subtitle}>Correos electrónicos</h4>
                                <ul>
                                    {customer.email.map((email) => {
                                        return (<li key={email}>{email}</li>);
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h4 className={style.subtitle}>Fecha de nacimiento</h4>
                        <p>{date(customer.dob)}</p>
                    </div>
                    <div>
                        <h4 className={style.subtitle}>Dirección</h4>
                        <p>{customer.address}</p>
                    </div>
                </div>
                <div className={style.firstLine}>
                    <h3>Polizas</h3>
                    <Link className={style.icon} to={"create"}><CgAddR /></Link>
                </div>
                <ul>
                    {
                        policies && policies.map((policy) => {
                            return (
                                <li key={policy.id} className={style.item}>
                                    <ItemList
                                        name={policy.insuranceCarrier}
                                        id={policy.id}
                                    />
                                    <ItemList
                                        name={policy.product}
                                        id={policy.id}
                                    />
                                    <div>
                                        <Link to={`edit/${policy.id}`}><MdEdit className={style.icon} /></Link>
                                        <MdDelete className={style.icon} onClick={(e) => { onDeleteHandler(e, policy.id); }} />
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
            </div>
        );
    }
    else {
        return (
            <div>
            </div>
        );
    }
};

export default ReadUser;