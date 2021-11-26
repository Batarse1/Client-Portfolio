import React, { createContext, useContext } from 'react';

import { useAuth } from '../UseAuth/useAuth';

const API_URL = 'http://192.168.1.29:5000';

const policiesContext = createContext();

export const ProvidePolicies = ({ children }) => {
    const policies = useProvidePolicies();
    return <policiesContext.Provider value={policies}>{children}</policiesContext.Provider>;
};

export const usePolicies = () => {
    return useContext(policiesContext);
};

const useProvidePolicies = () => {
    const auth = useAuth();

    const getPolicy = async (customerId, id) => {
        try {
            const response = await fetch(`${API_URL}/policies/getPolicy`, {
                method: 'GET',
                headers: {
                    'Authorize': auth.user?.token,
                    'customerId': customerId,
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

    const getAllPoliciesOfACustomer = async (id) => {
        try {
            const response = await fetch(`${API_URL}/policies/getAllPoliciesOfCustomer`, {
                method: 'GET',
                headers: {
                    'Authorize': auth.user?.token,
                    'customerId': id
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

    const deletePolicy = async (id) => {
        try {
            const response = await fetch(`${API_URL}/policies/deletePolicy`, {
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

    const editPolicy = async (id, number, product, plan, commission, insuranceCarrier, paymentFrequency, totalPremium, basicPremium, plannedPremium, initialValidity, finalValidity) => {
        try {
            const response = await fetch(`${API_URL}/policies/updatePolicy`, {
                method: 'PUT',
                headers: {
                    'Authorize': auth.user?.token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id, number, product, plan, commission, insuranceCarrier, paymentFrequency, totalPremium, basicPremium, plannedPremium, initialValidity, finalValidity })
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

    const createPolicy = async (customerId, number, product, plan, commission, insuranceCarrier, paymentFrequency, totalPremium, basicPremium, plannedPremium, initialValidity, finalValidity) => {
        try {
            const response = await fetch(`${API_URL}/policies/addPolicy`, {
                method: 'POST',
                headers: {
                    'Authorize': auth.user?.token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ customerId, number, product, plan, commission, insuranceCarrier, paymentFrequency, totalPremium, basicPremium, plannedPremium, initialValidity, finalValidity })
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
        getAllPoliciesOfACustomer,
        getPolicy,
        deletePolicy,
        createPolicy,
        editPolicy
    };
};