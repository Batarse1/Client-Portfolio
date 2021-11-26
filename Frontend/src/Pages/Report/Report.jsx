import style from './Report.module.scss';

import { useEffect, useState } from 'react';

import { useAuth } from '../../Hooks/UseAuth/useAuth';

const Report = () => {
    const API_URL = 'http://localhost:5000';
    const auth = useAuth();

    const[monthlyPayment,setMonthlyPayment] = useState(undefined);

    useEffect(()=>{
        try {
            const getMonthlyPayment = async () => {
                const response = await fetch(`${API_URL}/report/getMonthlyPayment`, {
                    method: 'GET',
                    headers: {
                        'Authorize': auth.user?.token
                    }
                });
    
                const data = await response.json();
                
                setMonthlyPayment(data.monthlyPayment);
            }
            getMonthlyPayment()
        }
        catch (error){
            console.log(error)
        }
    },[auth])

    return(
        <div className={style.message}>
            Ingreso mensual por prima planeada: {monthlyPayment ? monthlyPayment : 0}
        </div>
    );
}

export default Report;