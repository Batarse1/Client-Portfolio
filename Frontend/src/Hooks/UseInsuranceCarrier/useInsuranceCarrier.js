import React, { useEffect, createContext, useContext } from 'react';
import { useLocalStorage } from '../UseLocalStorage/useLocalStorage';
import { useAuth } from '../UseAuth/useAuth';

const insuranceCarrierContext = createContext();

export function ProvideInsuranceCarrier({ children }) {
    const insuranceCarrier = useProvideInsuranceCarrier();
    return <insuranceCarrierContext.Provider value={insuranceCarrier}>{children}</insuranceCarrierContext.Provider>;
}

export const useInsuranceCarrier = () => {
    return useContext(insuranceCarrierContext);
};

const useProvideInsuranceCarrier = () => {
    const auth = useAuth();
    const [insuranceCarrier, setInsuranceCarrier] = useLocalStorage('insuranceCarrier', null);

    useEffect(()=>{
        if(!auth.user){
            setInsuranceCarrier(false);
        }
    },[auth.user, setInsuranceCarrier]);

    return {
        insuranceCarrier,
        setInsuranceCarrier
    };
};