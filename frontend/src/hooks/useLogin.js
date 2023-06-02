import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext();

    const login = async (username, password) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch('/api/user/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, password})
        })

        const json = await response.json()

        if (!response.ok){
            setIsLoading(false);
            setError(json.error)
            toast.error(json.error)
        }

        if (response.ok){
            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            // update the Auth Context
            dispatch({type: 'LOGIN', payload: json})
            toast.success('Logged in successfully')
            setIsLoading(false)


        }

    }

    return {login, isLoading, error}

}