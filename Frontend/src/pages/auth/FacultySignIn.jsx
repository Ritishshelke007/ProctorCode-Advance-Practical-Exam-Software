import React, { useContext, useRef } from "react";
import { toast } from "react-hot-toast";
import Checkbox from "../../components/Checkbox/Checkbox";
import axios from "axios";
import InputField from "../../components/InputField/InputField";

export default function FacultySignIn() {
  const formRef = useRef();

  const handleStudentLogin = (e) => {
    e.preventDefault();

    let form = new FormData(formRef.current);
    let formData = {};

    for (let [key, value] of form.entries()) {
      formData[key] = value;
    }

    console.log(formData);

    const { email, password } = formData;

    console.log(email, password);

    axios
      .post("http://localhost:3000/auth/faculty/login", {
        email,
        password,
      })
      .then(({ data }) => {
        toast.success("Faculty logged in successfully");
        // storeInSession("user", JSON.stringify(data));
        // console.log(sessionStorage);
        // setUserAuth(data);
      })
      .catch((error) => {
        console.log(error.response.data);
        toast.error("Error in Student login");
      });
  };
  return (
    <div className="mt-16 mb-16 flex h-full w-[500px] gap-10 justify-center items-center border px-16 rounded-lg py-5 shadow-sm">
      {/* Sign in section */}
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 ">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Sign In as Faculty
        </h4>
        <p className="mb-9 ml-1 text-base text-gray-600">
          Enter your email and password to sign in!
        </p>

        <form ref={formRef} onSubmit={handleStudentLogin}>
          {/* Email */}

          <InputField
            extra="mb-3"
            label="Email"
            id="email"
            name="email"
            placeholder="Enter name*"
            variant="auth"
            type="text"
          />

          {/* Password */}

          <InputField
            extra="mb-3"
            label="Password"
            id="password"
            name="password"
            placeholder="Enter Password*"
            variant="auth"
            type="password"
          />

          {/* Checkbox */}
          <div className="mb-4 flex items-center justify-between px-2">
            <div className="flex items-center">
              <Checkbox />
              <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">
                Keep me logged In
              </p>
            </div>
            <a
              className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
              href=" "
            >
              Forgot Password?
            </a>
          </div>

          <button className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
