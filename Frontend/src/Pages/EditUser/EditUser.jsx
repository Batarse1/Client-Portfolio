import styles from './EditUser.module.scss';

import { useParams } from "react-router-dom";

import { useState, useEffect } from "react";
import { useCustomers } from "../../Hooks/UseCustomers/UseCustomers";

import Input from '../../Components/Input/Input';
import Submit from '../../Components/Submit/Submit';
import { CgAddR } from 'react-icons/cg';
import { CgRemoveR } from 'react-icons/cg';
import { v4 as uuidv4 } from 'uuid';

const EditUser = () => {
    let { id } = useParams();

    const customersService = useCustomers();
    const [customer, setCustomer] = useState(false);

    const [page, setPage] = useState(1);
    const [message, setMessage] = useState('');

    const [nit, setNit] = useState(undefined);
    const [dui, setDui] = useState(undefined);
    const [name, setName] = useState(undefined);
    const [dob, setDob] = useState(undefined);
    const [phones, setPhones] = useState([]);
    const [emails, setEmails] = useState([]);
    const [insuranceCarrier, setInsuranceCarrier] = useState([]);
    const [address, setAddress] = useState(undefined);
    const [type, setType] = useState(undefined);

    const [phoneInputs, setPhoneInputs] = useState([<Input title='Nuevo teléfono' type='number' id='createUserPhone0' name="Phone" onChange={(e) => { onChangeManyHandler(e, setPhones, phones, 0); }} key={uuidv4()} />]);
    const [emailInputs, setEmailInputs] = useState([<Input title='Nuevo correo electrónico' type='email' id='createUserEmail0' name="Email" onChange={(e) => { onChangeManyHandler(e, setEmails, emails, 0); }} key={uuidv4()} />]);
    const [insuranceCarrierInputs, setInsuranceCarrierInputs] = useState([<Input title='Nueva aseguradora' type='text' id='createUserInsuranceCarrier0' name="InsuranceCarrier" onChange={(e) => { onChangeManyHandler(e, setInsuranceCarrier, insuranceCarrier, 0); }} key={uuidv4()} />]);

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
        let insuranceCarrierToSend = insuranceCarrier.slice(0, insuranceCarrierInputs.length);

        if(phonesToSend.length === 0){
            customer.phone.forEach((element, index) => {
                phonesToSend[index] = element.toString();
            });
        }

        if(emailsToSend.length === 0){
            customer.email.forEach((element, index) => {
                emailsToSend[index] = element.toString();
            });
        }

        if(insuranceCarrierToSend.length === 0){
            customer.insuranceCarrier.forEach((element, index) => {
                insuranceCarrierToSend[index] = element.toString();
            });
        }

        const response = await customersService.updateCustomer(customer.id, nit, dui, name, dob, phonesToSend, emailsToSend, insuranceCarrierToSend, address, type);
        
        setMessage('');

        if (response.error === false) {
            setMessage('El cliente se ha actualizado con éxito');
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
        if (!customer) {
            const getCustomerAsync = async () => {
                const response = await customersService.getCustomer(id);
                setCustomer(response.currentCustomer);
            };

            getCustomerAsync();
        }
    }, [customer, customersService, id]);

    const white = '#FFFFFF';
    const borderColor = '#707070';
    const submitPadding = '10px';
    const submitRadius = '20px';
    const submitWidth = '100%';

    if (customer) {
        return (
            <div className={styles.edit}>
                <form onSubmit={onSubmitHandler}>
                    {
                        page === 1 ?
                            <div className={styles.firstPage}>
                                <h2 className={styles.title}>Actualizar Cliente</h2>
                                <h2 className={styles.subtitle}>Ingrese solo los campos que quiera actualizar</h2>
                                <Input title={`Nombre completo: ${customer.name}`} type='text' id='createUserFullname' name="Fullname" onChange={(e) => { onChangeHandler(e, setName); }} />
                                <Input title={`NIT: ${customer.nit}`} type='text' id='createUserNIT' name="NIT" onChange={(e) => { onChangeHandler(e, setNit); }} />
                                <Input title={`DUI: ${customer.dui}`} type='text' id='createUserDUI' name="DUI" onChange={(e) => { onChangeHandler(e, setDui); }} />
                                <Input title={`Fecha de nacimiento: ${date(customer.dob)}`} type='date' id='createUserDate' name="Date" onChange={(e) => { onChangeHandler(e, setDob); }} />
                                <Input title={`Dirección: ${customer.address}`} type='text' id='createUserAddress' name="Address" onChange={(e) => { onChangeHandler(e, setAddress); }} />
                                <p>{`Tipo de cliente: ${customer.type}`}</p>
                                <div>
                                    <input type="radio" id="createUserJuridicPerson" name="Type" value="persona jurídica" onChange={() => { setType("Persona jurídica"); }}
                                         checked={type === "Persona jurídica"} />
                                    <label htmlFor="createUserJuridicPerson">Persona jurídica</label>
                                </div>
                                <div>
                                    <input type="radio" id="createUserNaturalPerson" name="Type" value="persona natural" onChange={() => { setType("Persona natural"); }} />
                                    <label htmlFor="createUserNaturalPerson">Persona natural</label>
                                </div>
                                <ul className={styles.tabs}>
                                    <li onClick={() => { setPage(1); }}>1</li>
                                    <li onClick={() => { setPage(2); }}>2</li>
                                </ul>
                            </div>
                            :
                            <div className={styles.secondPage}>
                                <h2>{`Telefonos: ${arrayToString(customer.phone)}`}</h2>
                                {
                                    phoneInputs && phoneInputs.map((element) => {
                                        return element;
                                    })
                                }
                                <div className={styles.plusButton}>
                                    <CgRemoveR onClick={(e) => { onRemoveHandler(e, setPhoneInputs, phoneInputs, setPhones, phones); }} />
                                    <CgAddR onClick={(e) => { onAddHandler(e, setPhoneInputs, phoneInputs, setPhones, phones, 'Nuevo teléfono', 'number', 'Phone', 'createUserPhone'); }} />
                                </div>
                                <h2>{`Correos electrónicos: ${arrayToString(customer.email)}`}</h2>
                                {
                                    emailInputs && emailInputs.map((element) => {
                                        return element;
                                    })
                                }
                                <div className={styles.plusButton}>
                                    <CgRemoveR onClick={(e) => { onRemoveHandler(e, setEmailInputs, emailInputs, setEmails, emails); }} />
                                    <CgAddR onClick={(e) => { onAddHandler(e, setEmailInputs, emailInputs, setEmails, emails, 'Nuevo correo electrónico', 'email', 'Email', 'createUserEmail'); }} />
                                </div>
                                <h2>{`Aseguradoras: ${arrayToString(customer.insuranceCarrier)}`}</h2>
                                {
                                    insuranceCarrierInputs && insuranceCarrierInputs.map((element) => {
                                        return element;
                                    })
                                }
                                <div className={styles.plusButton}>
                                    <CgRemoveR onClick={(e) => { onRemoveHandler(e, setInsuranceCarrierInputs, insuranceCarrierInputs, setInsuranceCarrier, insuranceCarrier); }} />
                                    <CgAddR onClick={(e) => { onAddHandler(e, setInsuranceCarrierInputs, insuranceCarrierInputs, setInsuranceCarrier, insuranceCarrier, 'Nueva aseguradora', 'text', 'InsuranceCarrier', 'createUserInsuranceCarrier'); }} />
                                </div>
                                {message && (
                                    <p>
                                        {message}
                                    </p>
                                )}
                                <div className={styles.submit}>
                                    <Submit value="Actualizar cliente" bgColor={white} borderColor={borderColor} padding={submitPadding} radius={submitRadius} submitWidth={submitWidth} />
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

export default EditUser;