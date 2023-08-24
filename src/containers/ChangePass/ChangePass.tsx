import React, { FC, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import Input from "shared/Input/Input";
import ButtonPrimary from "shared/Button/ButtonPrimary";

export interface ChangePassProps {
  className?: string;
}
const ChangePass: FC<ChangePassProps> = ({ className = "" }) => {
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const {token} = useParams();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
        setError("Passwords do not match");
        return;
      }
    const payload = {
        password: password,
    };

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/v1/change-pass/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
          const data = await response.json();
          setSuccessMessage(data.message);
          setError("");
      } else {
        const data = await response.json();
        setSuccessMessage("");
        setError(data.message); 
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
<div className={`nc-PageLogin ${className}`} data-nc-id="PageLogin">
      <Helmet>
        <title>Login || Booking React Template</title>
      </Helmet>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Forgot Password
        </h2>
        <div className="max-w-md mx-auto space-y-6">
            {successMessage && <p className="text-green-500">{successMessage}</p>}

          {/* FORM */}
          <form className="grid grid-cols-1 gap-6" onSubmit={handleLogin}>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Password
              </span>
              <Input
                type="password"
                className="mt-1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Confirm Password
              </span>
              <Input
                type="password"
                className="mt-1"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
            </label>
            {error && <p className="text-red-500">{error}</p>}
            <ButtonPrimary type="submit">Update Password</ButtonPrimary>
          </form>
      {/* ==== */}
        </div>
      </div>
    </div>
      );
};

export default ChangePass;
