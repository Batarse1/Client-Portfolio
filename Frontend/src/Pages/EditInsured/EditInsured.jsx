import styles from './EditInsured.module.scss';

import { useParams } from "react-router-dom";

import { useState, useEffect } from "react";

import { useInsured } from '../../Hooks/UseInsureds/UseInsureds';

import Input from '../../Components/Input/Input';
import Submit from '../../Components/Submit/Submit';

import { CgAddR } from 'react-icons/cg';
import { CgRemoveR } from 'react-icons/cg';

import { v4 as uuidv4 } from 'uuid';

const EditInsured = () => {
    let { idPolicy, idInsured } = useParams();

    const insuredService = useInsured();
    const [insured, setInsured] = useState(false);

    const [page, setPage] = useState(1);
    const [message, setMessage] = useState('');

    const [nit, setNit] = useState(undefined);
    const [dui, setDui] = useState(undefined);
    const [name, setName] = useState(undefined);
    const [dob, setDob] = useState(undefined);
    const [phones, setPhones] = useState([]);
    const [emails, setEmails] = useState([]);
    const [address, setAddress] = useState(undefined);
    const [type, setType] = useState(undefined);

    const [phoneInputs, setPhoneInputs] = useState([<Input title='Nuevo teléfono' type='number' id='createInsuredPhone0' name="Phone" onChange={(e) => { onChangeManyHandler(e, setPhones, phones, 0); }} key={uuidv4()} />]);
    const [emailInputs, setEmailInputs] = useState([<Input title='Nuevo correo electrónico' type='email' id='createInsuredEmail0' name="Email" onChange={(e) => { onChangeManyHandler(e, setEmails, emails, 0); }} key={uuidv4()} />]);

    const date = (s) => {
        return (s.substring(0, 10));
    };

    const onChangeHandler = (e, save) => {
        save(e.target.value);
    };

    const arrayToString = (array) => {
        return array.toString();
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        let phonesToSend = phones.slice(0, phoneInputs.length);
        let emailsToSend = emails.slice(0, emailInputs.length);

        if(phonesToSend.length === 0){
            insured.phone.forEach((element, index) => {
                phonesToSend[index] = element.toString();
            });
        }

        if(emailsToSend.length === 0){
            insured.email.forEach((element, index) => {
                emailsToSend[index] = element.toString();
            });
        }

        const response = await insuredService.updateInsured(insured.id, nit, dui, name, dob, phonesToSend, emailsToSend, address, type);
        
        setMessage('');

        if (response.error === false) {
            setMessage('El asegurado se ha actualizado con éxito');
        }
        else {
            setMessage('Error en la petición');
        }
    }

    const onChangeManyHandler = (e, save, previousValue, index) => {
        let x = previousValue;
        x[index] = e.target.value;
        save(x);
    };

    const onAddHandler = (e, saveHtml, previousValueHtml, save, previousValue, title, type, name, id) => {
        e.preventDefault();
        saveHtml([...previousValueHtml, <Input title={title} type={type} id={`${id}${previousValueHtml.length}`} name={name} onChange={(e) => { onChangeManyHandler(e, save, previousValue, previousValueHtml.length); }} key={uuidv4()} />]);
    };

    const onRemoveHandler = (e, saveHtml, previousValueHtml, save, previousValue) => {
        e.preventDefault();
        if (previousValueHtml.length !== 1) {
            const newValueHtml = previousValueHtml.slice(0, previousValueHtml.length - 1);
            saveHtml(newValueHtml);
        }
    };

    useEffect(() => {
        if (!insured) {
            const getInsuredAsync = async () => {
                const response = await insuredService.getInsured(idPolicy, idInsured);
                setInsured(response.currentInsured);
            };

            getInsuredAsync();
        }
    }, [insured, insuredService, idPolicy, idInsured]);

    const white = '#FFFFFF';
    const borderColor = '#707070';
    const submitPadding = '10px';
    const submitRadius = '20px';
    const submitWidth = '100%';

    if (insured) {
        return (
            <div className={styles.edit}>
                <form onSubmit={onSubmitHandler}>
                    {
                        page === 1 ?
                            <div className={styles.firstPage}>
                                <h2 className={styles.title}>Actualizar Asegurado</h2>
                                <h2 className={styles.subtitle}>Ingrese solo los campos que quiera actualizar</h2>
                                <Input title={`Nombre completo: ${insured.name}`} type='text' id='createInsuredFullname' name="Fullname" onChange={(e) => { onChangeHandler(e, setName); }} />
                                <Input title={`NIT: ${insured.nit}`} type='text' id='createInsuredNIT' name="NIT" onChange={(e) => { onChangeHandler(e, setNit); }} />
                                <Input title={`DUI: ${insured.dui}`} type='text' id='createInsuredDUI' name="DUI" onChange={(e) => { onChangeHandler(e, setDui); }} />
                                <Input title={`Fecha de nacimiento: ${date(insured.dob)}`} type='date' id='createInsuredDate' name="Date" onChange={(e) => { onChangeHandler(e, setDob); }} />
                                <Input title={`Dirección: ${insured.address}`} type='text' id='createInsuredAddress' name="Address" onChange={(e) => { onChangeHandler(e, setAddress); }} />
                                <p>{`Tipo de cliente: ${insured.type}`}</p>
                                <div>
                                    <input type="radio" id="createInsuredJuridicPerson" name="Type" value="persona jurídica" onChange={() => { setType("Persona jurídica"); }}
                                         checked={type === "Persona jurídica"} />
                                    <label htmlFor="createInsuredJuridicPerson">Persona jurídica</label>
                                </div>
                                <div>
                                    <input type="radio" id="createInsuredNaturalPerson" name="Type" value="persona natural" onChange={() => { setType("Persona natural"); }} />
                                    <label htmlFor="createInsuredNaturalPerson">Persona natural</label>
                                </div>
                                <ul className={styles.tabs}>
                                    <li onClick={() => { setPage(1); }}>1</li>
                                    <li onClick={() => { setPage(2); }}>2</li>
                                </ul>
                            </div>
                            :
                            <div className={styles.secondPage}>
                                <h2>{`Telefonos: ${arrayToString(insured.phone)}`}</h2>
                                {
                                    phoneInputs && phoneInputs.map((element) => {
                                        return element;
                                    })
                                }
                                <div className={styles.plusButton}>
                                    <CgRemoveR onClick={(e) => { onRemoveHandler(e, setPhoneInputs, phoneInputs, setPhones, phones); }} />
                                    <CgAddR onClick={(e) => { onAddHandler(e, setPhoneInputs, phoneInputs, setPhones, phones, 'Nuevo teléfono', 'number', 'Phone', 'createUserPhone'); }} />
                                </div>
                                <h2>{`Correos electrónicos: ${arrayToString(insured.email)}`}</h2>
                                {
                                    emailInputs && emailInputs.map((element) => {
                                        return element;
                                    })
                                }
                                <div className={styles.plusButton}>
                                    <CgRemoveR onClick={(e) => { onRemoveHandler(e, setEmailInputs, emailInputs, setEmails, emails); }} />
                                    <CgAddR onClick={(e) => { onAddHandler(e, setEmailInputs, emailInputs, setEmails, emails, 'Nuevo correo electrónico', 'email', 'Email', 'createUserEmail'); }} />
                                </div>
                                {message && (
                                    <p>
                                        {message}
                                    </p>
                                )}
                                <div className={styles.submit}>
                                    <Submit value="Actualizar asegurado" bgColor={white} borderColor={borderColor} padding={submitPadding} radius={submitRadius} submitWidth={submitWidth} />
                                </div>
                                <ul className={styles.tabs}>
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
        return (
            <div>
            </div>
        );
    }
};

export default EditInsured;