import styles from './Customers.module.scss';

import { useEffect, useState } from "react";
import { useCustomers } from "../../Hooks/UseCustomers/UseCustomers";

import ItemList from "../../Components/ItemList/ItemList";
import { CgAddR } from 'react-icons/cg';
import { MdDelete } from 'react-icons/md';
import { MdEdit } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Customers = () => {
    const customersService = useCustomers();
    const [message, setMessage] = useState(false);
    const [customers, setCustomers] = useState(false);

    useEffect(() => {
        if (!customers) {
            const getAllCustomersAsync = async () => {
                const response = await customersService.getAllCustomers();
                setCustomers(response['allCustomers']);
            };

            getAllCustomersAsync();
        }
    }, [customersService, customers]);

    const onDeleteHandler = async (e, id) => {
        e.preventDefault();

        const response = await customersService.deleteCustomer(id);

        setMessage('');

        if (response.error) {
            setMessage('Error en la petición');
        }
        else {
            setMessage('El cliente se ha eliminado con éxito');
        }
        setCustomers(false);
    };

    return (
        <>
            <h2 className={styles.title}>Clientes</h2>
            <div className={styles.firstLine}>
                <h3>Nombres</h3>
                <Link className={styles.icon} to={"create"}><CgAddR /></Link>
            </div>
            <ul>
                {
                    customers && customers.map((customer) => {
                        return (
                            <li key={customer.id} className={styles.item}>
                                <ItemList
                                    name={customer.name}
                                    id={customer.id}
                                />
                                <Link to={`edit/${customer.id}`}><MdEdit className={styles.icon} /></Link>
                                <MdDelete className={styles.icon} onClick={(e) => { onDeleteHandler(e, customer.id); }} />
                            </li>
                        );
                    })
                }
            </ul>
            {message && (
                <p className={styles.message}>
                    {message}
                </p>
            )}
        </>
    );
};

export default Customers;