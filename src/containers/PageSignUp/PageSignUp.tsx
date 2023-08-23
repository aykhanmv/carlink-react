import React, { FC, useState } from "react";
import facebookSvg from "images/Facebook.svg";
import twitterSvg from "images/Twitter.svg";
import googleSvg from "images/Google.svg";
import { Helmet } from "react-helmet";
import Input from "shared/Input/Input";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { Link } from "react-router-dom";

export interface PageSignUpProps {
  className?: string;
}
const userChoices = ["User", "Company"];

const loginSocials = [
  {
    name: "Continue with Facebook",
    href: "#",
    icon: facebookSvg,
  },
  {
    name: "Continue with Twitter",
    href: "#",
    icon: twitterSvg,
  },
  {
    name: "Continue with Google",
    href: "#",
    icon: googleSvg,
  },
];

const PageSignUp: FC<PageSignUpProps> = ({ className = "" }) => {
  const [firstName, setFirstName] = useState(""); 
  const [lastName, setLastName] = useState("");
  const [selectedUserChoice, setSelectedUserChoice] = useState(userChoices[0]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");


  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      console.error("Passwords do not match");
      return;
    }
    const registrationData = {
      first_name: firstName,
      last_name: lastName,
      user_choices: selectedUserChoice,
      email: email,
      password: password,
    };
  
    const response = await fetch("http://127.0.0.1:8000/api/v1/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registrationData), 
    });
  
    if (response.ok) {
      console.log("Registration successful");
    } else {
      console.error("Registration failed with status:", response.status);
      const errorText = await response.text();
      console.error("Error details:", errorText);
    }
  };
  const handleUserChoiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserChoice(e.target.value);
  };

  return (
    <div className={`nc-PageSignUp  ${className}`} data-nc-id="PageSignUp">
      <Helmet>
        <title>Sign up || Booking React Template</title>
      </Helmet>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Signup
        </h2>
        <div className="max-w-md mx-auto space-y-6 ">
          {/* Social logins */}
          <div className="grid gap-3">
            {loginSocials.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="nc-will-change-transform flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
              >
                <img
                  className="flex-shrink-0"
                  src={item.icon}
                  alt={item.name}
                />
                <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
                  {item.name}
                </h3>
              </a>
            ))}
          </div>
          {/* Registration form */}
          <form className="grid grid-cols-1 gap-6" onSubmit={handleSignUp}>
          <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                First Namw
              </span>
              <Input
                type="text"
                placeholder="Aykhan"
                className="mt-1"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Last Name
              </span>
              <Input
                type="text"
                placeholder="Mahmudov"
                className="mt-1"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">User Choices</span>
              <select
                className="mt-1"
                value={selectedUserChoice}
                onChange={handleUserChoiceChange}
              >
                {userChoices.map((choice, index) => (
                  <option key={index} value={choice}>
                    {choice}
                  </option>
                ))}
              </select>
            </label>
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
            <ButtonPrimary type="submit">Continue</ButtonPrimary>
          </form>
          {/* Existing account */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            Already have an account? <Link to="/login">Sign in</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageSignUp;
