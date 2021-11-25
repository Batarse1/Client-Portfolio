import React, { useCallback, createContext, useContext } from 'react';

import { useAuth } from '../UseAuth/useAuth';
import { useInsuranceCarrier } from '../UseInsuranceCarrier/useInsuranceCarrier';

const API_URL = 'http://localhost:5000';

const customersContext = createContext();

export const ProvideCustomers = ({ children }) => {
    const customers = useProvideCustomers();
    return <customersContext.Provider value={customers}>{children}</customersContext.Provider>;
};

export const useCustomers = () => {
    return useContext(customersContext);
};

const useProvideCustomers = () => {
    const auth = useAuth();
    const insuranceCarrier = useInsuranceCarrier();

    const getAllCustomers = useCallback(() => {
        const getAllCustomersAsync = async () => {
            try {
                let data = {};
                if (!insuranceCarrier.insuranceCarrier || insuranceCarrier.insuranceCarrier === "Global") {
                    const response = await fetch(`${API_URL}/customers/getAllCustomersOfUser`, {
                        method: 'GET',
                        headers: {
                            'Authorize': auth.user?.token
                        }
                    });

                    data = await response.json();
                }
                else {
                    const response = await fetch(`${API_URL}/customers/getAllCustomersOfInsuranceCarrier`, {
                        method: 'GET',
                        headers: {
                            'Authorize': auth.user?.token,
                            'insuranceCarrier': insuranceCarrier.insuranceCarrier
                        }
                    });
                    data = await response.json();
                }
                return data;
            }
            catch (error) {
                console.log(error.message);
                return {
                    error: true,
                    message: "Can't connect with server"
                };
            }
        };

        return getAllCustomersAsync();
    }, [auth.user, insuranceCarrier]);

    const getCustomer = async (id) => {
        try {
            const response = await fetch(`${API_URL}/customers/getCustomer`, {
                method: 'GET',
                headers: {
                    'Authorize': auth.user?.token,
                    'id': id
                }
            });

            const data = await response.json();

            return data;
        }
        catch (error) {
            return {
                error: true,
                message: "Can't connect with server"
            };
        }
    };

    const createCustomer = async (nit, dui, name, dob, phone, email, insuranceCarrier, address, type) => {
        try {
            const response = await fetch(`${API_URL}/customers/addCustomer`, {
                method: 'POST',
                headers: {
                    'Authorize': auth.user?.token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nit, dui, name, dob, phone, email, insuranceCarrier, address, type })
            });

            const data = await response.json();

            return data;
        }
        catch (error) {
            return {
                error: true,
                message: "Can't connect with server"
            };
        }
    };

    const updateCustomer = async (id, nit, dui, name, dob, phone, email, insuranceCarrier, address, type) => {
        try {
            const response = await fetch(`${API_URL}/customers/updateCustomer`, {
                method: 'PUT',
                headers: {
                    'Authorize': auth.user?.token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id, nit, dui, name, dob, phone, email, insuranceCarrier, address, type })
            });

            const data = await response.json();

            return data;
        }
        catch (error) {
            console.log(error);
            return {
                error: true,
                message: "Can't connect with server"
            };
        }
    };

    const deleteCustomer = async (id) => {
        try {
            const response = await fetch(`${API_URL}/customers/deleteCustomer`, {
                method: 'DELETE',
                headers: {
                    'Authorize': auth.user?.token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id })
            });

            const data = await response.json();

            return data;
        }
        catch (error) {
            return {
                error: true,
                message: "Can't connect with server"
            };
        }
    };

    return {
        getAllCustomers,
        getCustomer,
        createCustomer,
        deleteCustomer,
        updateCustomer
    };
};