import style from './ReadInsured.module.scss';

import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { useInsured } from '../../Hooks/UseInsureds/UseInsureds';

const ReadInsured = () => {
    let { idPolicy, idInsured } = useParams();

    const insuredService = useInsured();

    const date = (s) => {
        return (s.substring(0, 10));
    };

    const [insured, setInsured] = useState(false);

    useEffect(() => {
        if (!insured) {
            const getInsuredAsync = async () => {
                const response = await insuredService.getInsured(idPolicy, idInsured);
                setInsured(response.currentInsured);
            };

            getInsuredAsync();
        }
    }, [insured, insuredService, idPolicy,idInsured]);

    if (insured) {
        return (
            <div>
                <div className={style.personalInformation}>
                    <div>
                        <h2 className={style.title}>{insured.name}</h2>
                        <h3>({insured.type})</h3>
                    </div>
                    <div className={style.primaryInformation}>
                        <div className={style.primaryInformationContent}>
                            <div>
                                <h4 className={style.subtitle}>DUI</h4>
                                <p>{insured.dui}</p>
                            </div>
                            <div>
                                <h4 className={style.subtitle}>Telefonos</h4>
                                <ul>
                                    {insured.phone.map((phone) => {
                                        return (<li key={phone}>{phone}</li>);
                                    })}
                                </ul>
                            </div>
                        </div>
                        <div className={style.primaryInformationContent}>
                            <div>
                                <h4 className={style.subtitle}>NIT</h4>
                                <p>{insured.nit}</p>
                            </div>
                            <div>
                                <h4 className={style.subtitle}>Correos electrónicos</h4>
                                <ul>
                                    {insured.email.map((email) => {
                                        return (<li key={email}>{email}</li>);
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h4 className={style.subtitle}>Fecha de nacimiento</h4>
                        <p>{date(insured.dob)}</p>
                    </div>
                    <div>
                        <h4 className={style.subtitle}>Dirección</h4>
                        <p>{insured.address}</p>
                    </div>
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

export default ReadInsured;