import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../UseLocalStorage/useLocalStorage';

const insuranceCarrierContext = createContext();

export function ProvideInsuranceCarrier({ children }) {
    const insuranceCarrier = useProvideInsuranceCarrier();
    return <insuranceCarrierContext.Provider value={insuranceCarrier}>{children}</insuranceCarrierContext.Provider>;
}

export const useInsuranceCarrier = () => {
    return useContext(insuranceCarrierContext);
};

const useProvideInsuranceCarrier = () => {
    const [insuranceCarrier, setInsuranceCarrier] = useLocalStorage('insuranceCarrier', null);

    return {
        insuranceCarrier,
        setInsuranceCarrier
    };
};