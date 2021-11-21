import style from './ReadUser.module.scss';

import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { useCustomers } from "../../Hooks/UseCustomers/UseCustomers";

const ReadUser = () => {
    let { id } = useParams();

    const date = (s) => {
        return (s.substring(0, 10));
    };

    const customersService = useCustomers();
    const [customer, setCustomer] = useState(false);

    useEffect(() => {
        if (!customer) {
            const getCustomerAsync = async () => {
                const response = await customersService.getCustomer(id);
                setCustomer(response.currentCustomer);
            };

            getCustomerAsync();
        }
    }, [customer, customersService, id]);

    if (customer) {
        return (
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