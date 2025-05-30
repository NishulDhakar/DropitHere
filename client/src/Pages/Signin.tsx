import React, { useRef, useState } from 'react';
import { Input } from '../component/Input';
import { Button } from '../component/Button';
import { BACKRND_URL } from '../config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export function Signin(){

    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState(String);
    const navigate = useNavigate();
    

    async function signin() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        try {
        const response = await axios.post(BACKRND_URL + "/api/v1/signin", {
                username,
                password 
        })
        const jwt = response.data.token;
        localStorage.setItem("token" ,jwt);
        navigate("/dashboard")
    }catch (error) {
            setError("Incorrect username or password");
        }
    }

    return<div className='h-screen w-screen bg-gray-200 flex justify-center items-center '>    
        <div className='bg-white rounded-2xl border-gray-200 border min-w-48 p-8'>
            <Input reference={usernameRef} placeholder='Nishul' type='text'/>
            <Input reference={passwordRef} placeholder='123456' type='password'/>

            {error && <div>
                <p className='text-red-500 text-sm pl-2'>{error}</p>
            </div>}
            
            <div className='justify-center pt-4'>
                <Button onClick={signin} loading={false} text="Signin" variant='primary' size="md"  fullWidth={true}/>
                </div>
        </div>
    </div>
}