import { useState } from "react";
import { useCustomers } from "../../Hooks/UseCustomers/UseCustomers";
import Input from "../../Components/Input/Input";
import style from "./CreateUser.module.scss";
import Submit from "../../Components/Submit/Submit";
import { CgAddR } from 'react-icons/cg';
import { CgRemoveR } from 'react-icons/cg';
import { v4 as uuidv4 } from 'uuid';

const Create = () => {
    const [message, setMessage] = useState('');
    const customersService = useCustomers();

    const [page, setPage] = useState(1);

    const [nit, setNit] = useState(undefined);
    const [dui, setDui] = useState(undefined);
    const [name, setName] = useState(undefined);
    const [dob, setDob] = useState(undefined);
    const [phones, setPhones] = useState([]);
    const [emails, setEmails] = useState([]);
    const [insuranceCarrier, setInsuranceCarrier] = useState([]);
    const [address, setAddress] = useState(undefined);
    const [type, setType] = useState(undefined);

    const [phoneInputs, setPhoneInputs] = useState([<Input title='Teléfono' type='number' id='createUserPhone0' name="Phone" onChange={(e) => { onChangeManyHandler(e, setPhones, phones, 0); }} required key={uuidv4()} />]);
    const [emailInputs, setEmailInputs] = useState([<Input title='Correo electrónico' type='email' id='createUserEmail0' name="Email" onChange={(e) => { onChangeManyHandler(e, setEmails, emails, 0); }} required key={uuidv4()} />]);
    const [insuranceCarrierInputs, setInsuranceCarrierInputs] = useState([<Input title='Aseguradora' type='text' id='createUserInsuranceCarrier0' name="InsuranceCarrier" onChange={(e) => { onChangeManyHandler(e, setInsuranceCarrier, insuranceCarrier, 0); }} required key={uuidv4()} />]);

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        const response = await customersService.createCustomer(nit, dui, name, dob, phones.slice(0, phoneInputs.length), emails.slice(0, emailInputs.length), insuranceCarrier.slice(0, insuranceCarrierInputs.length), address, type);

        setMessage('');

        if (response.error === "false") {
            setMessage('El cliente se ha creado con éxito');
        }
        else {
            setMessage('Error en la petición');
        }
    };

    const onChangeHandler = (e, save) => {
        save(e.target.value);
    };

    const onChangeManyHandler = (e, save, previousValue, index) => {
        let x = previousValue;
        x[index] = e.target.value;
        save(x);
    };

    const onAddHandler = (e, saveHtml, previousValueHtml, save, previousValue, title, type, name, id) => {
        e.preventDefault();
        saveHtml([...previousValueHtml, <Input title={title} type={type} id={`${id}${previousValueHtml.length}`} name={name} onChange={(e) => { onChangeManyHandler(e, save, previousValue, previousValueHtml.length); }} key={uuidv4()} required />]);
    };

    const onRemoveHandler = (e, saveHtml, previousValueHtml, save, previousValue) => {
        e.preventDefault();
        if (previousValueHtml.length !== 1) {
            const newValueHtml = previousValueHtml.slice(0, previousValueHtml.length - 1);
            saveHtml(newValueHtml);
        }
    };

    const white = '#FFFFFF';
    const borderColor = '#707070';
    const submitPadding = '10px';
    const submitRadius = '20px';
    const submitWidth = '100%';

    return (
        <div className={style.createUser}>
            <form onSubmit={onSubmitHandler} >
                {
                    page === 1 ?
                        <div className={style.firstPage}>
                            <h2 className={style.title}>Nuevo Cliente</h2>
                            <Input title='Nombre completo' type='text' id='createUserFullname' name="Fullname" onChange={(e) => { onChangeHandler(e, setName); }} required />
                            <Input title='NIT' type='text' id='createUserNIT' name="NIT" onChange={(e) => { onChangeHandler(e, setNit); }} required />
                            <Input title='DUI' type='text' id='createUserDUI' name="DUI" onChange={(e) => { onChangeHandler(e, setDui); }} required />
                            <Input title='Fecha de nacimiento' type='date' id='createUserDate' name="Date" onChange={(e) => { onChangeHandler(e, setDob); }} required />
                            <Input title='Dirección' type='text' id='createUserAddress' name="Address" onChange={(e) => { onChangeHandler(e, setAddress); }} required />
                            <p>Selecciona el tipo de cliente</p>
                            <div>
                                <input type="radio" id="createUserJuridicPerson" name="Type" value="persona jurídica" onChange={() => { setType("Persona jurídica"); }}
                                    required checked={type === "Persona jurídica"} />
                                <label htmlFor="createUserJuridicPerson">Persona jurídica</label>
                            </div>
                            <div>
                                <input type="radio" id="createUserNaturalPerson" name="Type" value="persona natural" onChange={() => { setType("Persona natural"); }} />
                                <label htmlFor="createUserNaturalPerson">Persona natural</label>
                            </div>
                            <ul className={style.tabs}>
                                <li onClick={() => { setPage(1); }}>1</li>
                                <li onClick={() => { setPage(2); }}>2</li>
                            </ul>
                        </div>
                        :
                        <div className={style.secondPage}>
                            {
                                phoneInputs && phoneInputs.map((element) => {
                                    return element;
                                })
                            }
                            <div className={style.plusButton}>
                                <CgRemoveR onClick={(e) => { onRemoveHandler(e, setPhoneInputs, phoneInputs, setPhones, phones); }} />
                                <CgAddR onClick={(e) => { onAddHandler(e, setPhoneInputs, phoneInputs, setPhones, phones, 'Teléfono', 'number', 'Phone', 'createUserPhone'); }} />
                            </div>
                            {
                                emailInputs && emailInputs.map((element) => {
                                    return element;
                                })
                            }
                            <div className={style.plusButton}>
                                <CgRemoveR onClick={(e) => { onRemoveHandler(e, setEmailInputs, emailInputs, setEmails, emails); }} />
                                <CgAddR onClick={(e) => { onAddHandler(e, setEmailInputs, emailInputs, setEmails, emails, 'Correo electrónico', 'email', 'Email', 'createUserEmail'); }} />
                            </div>
                            {
                                insuranceCarrierInputs && insuranceCarrierInputs.map((element) => {
                                    return element;
                                })
                            }
                            <div className={style.plusButton}>
                                <CgRemoveR onClick={(e) => { onRemoveHandler(e, setInsuranceCarrierInputs, insuranceCarrierInputs, setInsuranceCarrier, insuranceCarrier); }} />
                                <CgAddR onClick={(e) => { onAddHandler(e, setInsuranceCarrierInputs, insuranceCarrierInputs, setInsuranceCarrier, insuranceCarrier, 'Aseguradora', 'text', 'InsuranceCarrier', 'createUserInsuranceCarrier'); }} />
                            </div>
                            {message && (
                                <p>
                                    {message}
                                </p>
                            )}
                            <div className={style.submit}>
                                <Submit value="Crear cliente" bgColor={white} borderColor={borderColor} padding={submitPadding} radius={submitRadius} submitWidth={submitWidth} />
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

export default Create;