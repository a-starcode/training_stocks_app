import type { NextPage } from "next";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import StockifyLogo from "/public/static/svgs/i_stockify_logo.svg";
import GoogleLogo from "/public/static/svgs/i_logo_google.svg";
import { REGEX_EMAIL, REGEX_PASSWORD } from "../global/utils/constants";
import { ErrorMessage, Field, Form, Formik, FormikErrors } from "formik";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
import { showToast } from "../global/utils/toast_message";
import { toast } from "react-toastify";

/*
https://www.youtube.com/watch?v=IHZwWFHWa-w
https://www.youtube.com/watch?v=-lz30by8-sU
https://www.youtube.com/watch?v=xEE31wsmV2U
https://www.youtube.com/watch?v=t0Fs0NO78X82
*/

interface LoginFormValues {
  email: string;
  password: string;
}

const Home: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const passwordPolicy = [
    "At least 10 digits",
    "Contain at least 1 digit",
    "Contain at least 1 lowercase",
    "Contain at least 1 uppercase",
    "Allowed symbols: @$!%*?&",
  ];

  const initialValues: LoginFormValues = {
    email: "",
    password: "",
  };

  const ids = ["asdf1", "asdf2"];

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

  const validate = ({ email, password }: LoginFormValues) => {
    let errors: FormikErrors<LoginFormValues> = {};

    errors.email = validateEntry(email, "Email", REGEX_EMAIL, true);
    errors.password = validateEntry(
      password,
      "Password",
      REGEX_PASSWORD,
      true,
      "Invalid password (hover for password policy)"
    );

    if (errors.email === undefined && errors.password === undefined) {
      return {};
    }

    return errors;
  };

  const handleGoogleSignIn = async () => {
    signIn("google", { callbackUrl: `/dashboard` });
  };

  const handleSignOut = () => {
    signOut();
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
            <p className="text-xl text-white-default font-bold">LOGIN</p>
            {/* top half, credentials login */}
            <Formik
              initialValues={initialValues}
              validate={validate}
              onSubmit={async (values, { setSubmitting }) => {
                const status = await signIn("credentials", {
                  redirect: false,
                  email: values.email,
                  password: values.password,
                  callbackUrl: "/dashboard",
                });

                if (status?.ok) {
                  showToast("Successfully logged in!", "success");
                  router.push(status.url!);
                } else {
                  showToast("Login credentials are invalid!", "error");
                }

                setSubmitting(false);
              }}
            >
              {({ isSubmitting }) => (
                <Form className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <Field
                      id={ids[0]}
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
                      className="absolute -z-40 -right-72 -top-12 opacity-0 group-hover:opacity-100 group-hover:z-40 transition-opacity bg-black-lighter rounded-base max-w-xs p-4 border border-white-lighter"
                    >
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
                      id={ids[1]}
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
                  <button
                    className="bg-purple-lighter rounded-base text-white-default font-bold w-full py-2 mt-4"
                    disabled={isSubmitting}
                    type="submit"
                  >
                    Login
                  </button>
                </Form>
              )}
            </Formik>

            {/* bottom half, google login */}
            <div className="flex flex-col gap-4">
              <button
                className="bg-white-default rounded-base w-full py-2 flex px-4 justify-center relative"
                onClick={handleGoogleSignIn}
              >
                <GoogleLogo className="absolute left-4 w-6 h-6" />
                <p className="text-black-default font-bold">
                  Login with Google
                </p>
              </button>
              <div className="flex justify-center mt-2 items-center">
                <span className="text-sm text-white-lighter">
                  Don't have an account?
                </span>
                <Link href="/register">
                  <button className="bg-none text-sm font-bold text-green-default p-2 pl-1">
                    Sign Up
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          // display get started
          <div className="flex flex-col gap-2">
            <span className="">Logged in as: {session.user?.name}</span>
            <Link href="/dashboard">
              <button className="px-6 py-4 font-bold text-white-default bg-purple-lighter rounded-full">
                Get Started
              </button>
            </Link>
            <button
              className="px-6 py-4 font-bold text-white-default bg-purple-lighter rounded-full"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
