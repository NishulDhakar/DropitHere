import React, { useRef, useState } from 'react';
import { Input } from '../component/Input';
import { Button } from '../component/Button';
import { BACKRND_URL } from '../config';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export function SignUp(){

    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();
   
    async function signup() {
    try {
      const username = usernameRef.current?.value;
      const password = passwordRef.current?.value;
      await axios.post(BACKRND_URL + "/api/v1/signup", {
        username,
        password,
      });
      alert("You have signed up");
      navigate("/signin");
    } catch (error) {
      setError("User already exists");
    }
  }

  function navigateSignup() {
    navigate("/signin");
  }

    return<div className='h-screen w-screen bg-gray-200 flex justify-center items-center '>
        <div className='bg-white rounded-2xl border-gray-200 border min-w-48 p-8'>
            <Input reference={usernameRef} placeholder='Nishul' type='text'/>
            <Input reference={passwordRef} placeholder='123456' type='password'/>

             {error && (
          <div>
            <p className="text-red-500 text-sm pl-2">{error}</p>
          </div>
        )}

            <div className='justify-center pt-4'>
                <div className=''>
                <Button onClick={signup} loading={false} text="Signup" variant='primary' size="md"  fullWidth={true}/>
                </div>
                <div className='pt-4'>
                <Button onClick={navigateSignup} loading={false} text="Already Have Account" variant='secondary' size="md"  fullWidth={true}/>
                </div>
                </div>
        </div>
    </div>
}