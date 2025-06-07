import React, { useRef, useState } from 'react';
import { Input } from '../component/Input';
import { Button } from '../component/Button';
import { BACKRND_URL } from '../config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function Signin() {
  const [loading, setLoading] = useState(false);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function signin() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(BACKRND_URL + "/api/v1/signin", {
        username,
        password
      });
      const jwt = response.data.token;
      localStorage.setItem("token", jwt);
      navigate("/dashboard");
    } catch {
      setError("Incorrect username or password");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-gray-100 to-gray-300 flex justify-center items-center px-4">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl w-full max-w-sm p-8 space-y-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">Welcome Back</h2>
        <p className="text-sm text-center text-gray-500 dark:text-gray-300">Please sign in to continue</p>
        <div className="space-y-4">
          <Input reference={usernameRef} placeholder="Username" type="text" />
          <Input reference={passwordRef} placeholder="Password" type="password" />
          {error && (
            <div>
              <p className="text-red-500 text-sm pl-2">{error}</p>
            </div>
          )}
        </div>
        <div className="pt-2">
          <Button
            onClick={signin}
            loading={loading}
            text="Sign In"
            variant="primary"
            size="md"
            fullWidth={true}
          />
        </div>
      </div>
    </div>
  )
}
