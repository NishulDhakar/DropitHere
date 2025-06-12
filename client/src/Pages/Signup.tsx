import React, { useRef, useState } from 'react';
import { Input } from '../component/Input';
import { Button } from '../component/Button';
import { BACKRND_URL } from '../config';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export function SignUp() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function signup() {
    setError("");
    setLoading(true);
    try {
      const username = usernameRef.current?.value;
      const password = passwordRef.current?.value;
      await axios.post(BACKRND_URL + "/api/v1/signup", {
        username,
        password,
      });
      const loginRes = await axios.post(BACKRND_URL + "/api/v1/signin", {
        username,
        password,
      });
      localStorage.setItem("token", loginRes.data.token);
      navigate("/dashboard");
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("User already exists");
      }
    }
    setLoading(false);
  }

  function navigateSignin() {
    navigate("/signin");
  }

  function continueAsGuest() {
    localStorage.setItem("guest", "true");
    navigate("/dashboard");
  }

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-gray-100 to-gray-300 flex justify-center items-center px-4">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg max-w-md w-full p-8 border border-gray-200 dark:border-zinc-700 space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
          Create Your Account
        </h2>
        <div className="space-y-4">
          <Input reference={usernameRef} placeholder="Username" type="text" />
          <Input reference={passwordRef} placeholder="Password" type="password" />
        </div>
        {error && (
          <p className="text-red-500 text-sm pl-1">{error}</p>
        )}
        <div className="space-y-4 pt-4">
          <Button
            onClick={signup}
            loading={loading}
            text="Signup"
            variant="primary"
            size="md"
            fullWidth={true}
          />
          <Button
            onClick={navigateSignin}
            loading={false}
            text="Already Have Account"
            variant="secondary"
            size="md"
            fullWidth={true}
          />
          <Button
            onClick={continueAsGuest}
            loading={false}
            text="Continue as Guest"
            variant="secondary"
            size="md"
            fullWidth={true}
          />
        </div>
      </div>
    </div>
  );
}