import React, { createContext, useContext } from "react";
import { useAuth } from '../UseAuth/useAuth';

const API_URL = 'http://192.168.1.29:5000';

const insuredContext = createContext();

export const ProvideInsured = ({ children }) => {
    const insured = useProvideInsured();
    return <insuredContext.Provider value={insured}>{children}</insuredContext.Provider>;
};

export const useInsured = () => {
    return useContext(insuredContext);
};

const useProvideInsured = () => {
    const auth = useAuth();

    const getInsured = async (policyId, insuredId) => {
        try {
            const response = await fetch(`${API_URL}/insured/getInsured`, {
                method: 'GET',
                headers: {
                    'Authorize': auth.user?.token,
                    'policyId': policyId,
                    'insuredId': insuredId
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

    const getAllInsuredsOfAPolicy = async (policyId) => {
        try {
            const response = await fetch(`${API_URL}/insured/getAllInsuredOfPolicy`, {
                method: 'GET',
                headers: {
                    'Authorize': auth.user?.token,
                    'policyId': policyId
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

    const createInsured = async (nit, dui, name, dob, phone, email, address, type, policyId) => {
        try {
            const response = await fetch(`${API_URL}/insured/addInsured`, {
                method: 'POST',
                headers: {
                    'Authorize': auth.user?.token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nit, dui, name, dob, phone, email, address, type, policyId })
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

    const updateInsured = async (id, nit, dui, name, dob, phone, email, address, type) => {
        try {
            const response = await fetch(`${API_URL}/insured/updateInsured`, {
                method: 'PUT',
                headers: {
                    'Authorize': auth.user?.token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id, nit, dui, name, dob, phone, email, address, type})
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

    const deleteInsured = async (id) => {
        try {
            const response = await fetch(`${API_URL}/insured/deleteInsured`, {
                method: 'DELETE',
                headers: {
                    'Authorize': auth.user?.token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id })
            });
            console.log(response.error);

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
        getAllInsuredsOfAPolicy,
        deleteInsured,
        createInsured,
        getInsured,
        updateInsured
    };
};