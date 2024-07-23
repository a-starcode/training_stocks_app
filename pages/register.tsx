import { ErrorMessage, Field, Form, Formik, FormikErrors } from "formik";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import StockifyLogo from "/public/static/svgs/i_stockify_logo.svg";
import { v4 as uuidv4 } from "uuid";
import { BASE_URL, REGEX_EMAIL, REGEX_NAME, REGEX_PASSWORD } from "../global/utils/constants";
import { useRouter } from "next/router";
import { showToast } from "../global/utils/toast_message";

type Props = {};

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function RegisterPage({}: Props) {
  const { data: session } = useSession();
  const router = useRouter();

  const passwordPolicy = [
    "At least 10 digits",
    "Contain at least 1 digit",
    "Contain at least 1 lowercase",
    "Contain at least 1 uppercase",
    "Allowed symbols: @$!%*?&",
  ];

  const initialValues: RegisterFormValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const ids = ["abcd1", "abcd2", "abcd3", "abcd4"];

  const toProperCase = (str: string) => {
    return str.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
  };

  const validateEntry = (
    entry: string,
    entryName: string,
    entryValidatorRegex: RegExp,
    isRequired: boolean,
    errorMessage?: string
  ) => {
    if (!entry && isRequired) {
      return `${toProperCase(entryName)} is required *`;
    }
    if (!entryValidatorRegex.test(entry)) {
      return errorMessage ? errorMessage : `Invalid ${entryName.toLowerCase()}`;
    }
    return;
  };

  const validate = ({ email, password, name, confirmPassword }: RegisterFormValues) => {
    let errors: FormikErrors<RegisterFormValues> = {};

    errors.email = validateEntry(email, "Email", REGEX_EMAIL, true);
    errors.name = validateEntry(name, "Name", REGEX_NAME, true);
    errors.password = validateEntry(
      password,
      "Password",
      REGEX_PASSWORD,
      true,
      "Invalid password (hover for password policy)"
    );
    errors.confirmPassword = validateEntry(
      confirmPassword,
      "Confirm Password",
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/,
      true
    );

    if (confirmPassword !== password) {
      errors.confirmPassword = "Passwords do not match!";
    }

    if (
      errors.name === undefined &&
      errors.email === undefined &&
      errors.password === undefined &&
      errors.confirmPassword === undefined
    ) {
      return {};
    }

    return errors;
  };

  return (
    <div className="flex flex-col items-center w-screen h-screen">
      {/* logo */}
      <div className="absolute top-0 mx-auto">
        <div className="flex gap-1 justify-center items-center w-full mt-8">
          <StockifyLogo className="w-12 h-12" />
          <span className="font-bold text-2xl">STOCKIFY</span>
        </div>
      </div>
      <div className="grid place-items-center h-screen w-screen">
        {!session ? ( // if session does not exist
          <div className="flex flex-col gap-4 bg-white-lightest rounded-base py-8 px-12">
            <p className="text-xl text-white-default font-bold">CREATE ACCOUNT</p>
            <Formik
              initialValues={initialValues}
              validate={validate}
              onSubmit={async (values, { setSubmitting }) => {
                const options = {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(values),
                };
                // might have broke
                await fetch(`/api/auth/signup`, options)
                  .then((res) => res.json())
                  .then((data) => {
                    if (data) {
                      showToast("Registerd Successfully!", "success");
                      router.push(BASE_URL);
                    } else {
                      showToast("Could not register, please try again", "error");
                    }
                  });

                setSubmitting(false);
              }}>
              {({ isSubmitting }) => (
                <Form className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <Field
                      id={ids[0]}
                      name="name"
                      placeholder="Name"
                      className="bg-white-lightest rounded-base py-3 px-5 text-m"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-default text-sm"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <Field
                      id={ids[1]}
                      name="email"
                      type="email"
                      placeholder="Email"
                      className="bg-white-lightest rounded-base py-3 px-5 text-m"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-default text-sm"
                    />
                  </div>
                  <div className="flex flex-col gap-1 group relative">
                    <label
                      htmlFor="password"
                      className="absolute -right-72 -top-12 -z-40 opacity-0 group-hover:opacity-100 group-hover:z-40 transition-opacity bg-black-lighter rounded-base max-w-xs p-4 border border-white-lighter">
                      <strong>PASSWORD POLICY</strong>
                      {passwordPolicy.map((policy, index) => {
                        return (
                          <div className="py-2" key={uuidv4()}>
                            <span>{`  ${index + 1}. ${policy}`}</span>
                            <br />
                          </div>
                        );
                      })}
                    </label>
                    <Field
                      id={ids[2]}
                      name="password"
                      type="password"
                      placeholder="Password"
                      className="bg-white-lightest rounded-base py-3 px-5 text-m"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-default text-sm"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <Field
                      id={ids[3]}
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm Password"
                      className="bg-white-lightest rounded-base py-3 px-5 text-m"
                    />
                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className="text-red-default text-sm"
                    />
                  </div>
                  <button
                    className="bg-purple-lighter rounded-base text-white-default font-bold w-full py-2 mt-6"
                    disabled={isSubmitting}
                    type="submit">
                    Register
                  </button>
                </Form>
              )}
            </Formik>
            <div className="flex justify-center items-center">
              <span className="text-sm text-white-lighter">Already have an account?</span>
              <Link href="/">
                <button className="bg-none text-sm font-bold text-green-default p-2 pl-1">
                  Login
                </button>
              </Link>
            </div>
          </div>
        ) : (
          // display get started
          <div className="flex flex-col gap-2">
            <span className="">You're already logged in as: {session.user?.name}</span>
            <Link href="/dashboard">
              <button className="px-6 py-4 font-bold text-white-default bg-purple-lighter rounded-full">
                Go to Dashboard
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default RegisterPage;
