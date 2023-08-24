import React, { FC, useState } from "react";
import { Helmet } from "react-helmet";
import Input from "shared/Input/Input";
import ButtonPrimary from "shared/Button/ButtonPrimary";

export interface ForgotPassProps {
  className?: string;
}
const ForgotPass: FC<ForgotPassProps> = ({ className = "" }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Construct the request payload
    const payload = {
      email: email,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/v1/forgot-pass/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        setError("");
        setSuccessMessage(data.message);
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
          {/* FORM */}
          {successMessage && <p className="text-green-500">{successMessage}</p>}

          <form className="grid grid-cols-1 gap-6" onSubmit={handleLogin}>
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Email address
              </span>
              <Input
                type="email"
                placeholder="example@example.com"
                className="mt-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            
            {error && <p className="text-red-500">{error}</p>}
            <ButtonPrimary type="submit">Continue</ButtonPrimary>
          </form>
      {/* ==== */}
        </div>
      </div>
    </div>
      );
};

export default ForgotPass;
