import React, { useRef, useState, useEffect } from 'react';
import { Input } from '../component/Input';
import { Button } from '../component/Button';
import { BACKRND_URL } from '../config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function Signin() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }
  }, [navigate]);

  async function signin() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    setLoading(true);
    setError("");
    setProgress(10);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 80) return prev + 10;
        return prev;
      });
    }, 100);

    try {
      const response = await axios.post(BACKRND_URL + "/api/v1/signin", {
        username,
        password
      });
      setProgress(100);
      clearInterval(interval);
      const jwt = response.data.token;
      localStorage.setItem("token", jwt);
      setTimeout(() => {
        setLoading(false);
        setProgress(0);
        navigate("/dashboard");
      }, 300);
    } catch (err: unknown) {
      clearInterval(interval);
      setProgress(0);
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Incorrect username or password");
      }
      setLoading(false);
    }
  }

  function continueAsGuest() {
    localStorage.setItem("guest", "true");
    navigate("/dashboard");
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
        <div className="pt-2 space-y-3">
          <Button
            onClick={signin}
            loading={loading}
            text="Sign In"
            variant="primary"
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
        {loading && (
          <div className="w-full mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-200"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="text-xs text-center text-blue-600 mt-1">{progress}%</div>
          </div>
        )}
      </div>
    </div>
  );
}
