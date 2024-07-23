import StockifyLogo from "/public/static/svgs/i_stockify_logo.svg";
import { Form, Formik, FormikErrors, FormikHelpers } from "formik";
import { toProperCase } from "../../../global/utils/string_formatting";
import { v4 as uuidv4 } from "uuid";
import { REGEX_EMAIL, REGEX_PASSWORD } from "../../../global/utils/constants";

/*
https://www.youtube.com/watch?v=IHZwWFHWa-w
https://www.youtube.com/watch?v=-lz30by8-sU
https://www.youtube.com/watch?v=xEE31wsmV2U
https://www.youtube.com/watch?v=t0Fs0NO78X82
*/

type FormPageProps = {
  formTitle?: string;
  formSubmitButtonText?: string;
  initialValues: object;
  formFields: JSX.Element[];
  validator: (values: any) => void;
  onSubmit: (values: any, formikHelpers: FormikHelpers<any>) => Promise<any>;
};

const FormPage = ({
  formTitle = "Form",
  formSubmitButtonText = "Submit",
  initialValues = {},
  formFields,
  validator,
  onSubmit,
}: FormPageProps) => {
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

  const validate = (values: any) => {
    let errors: FormikErrors<any> = {};

    // errors.email = validateEntry(email, "Email", REGEX_EMAIL, true);
    // errors.password = validateEntry(
    //   password,
    //   "Password",
    //   REGEX_PASSWORD,
    //   true,
    //   "Invalid password (hover for password policy)"
    // );

    if (errors.email === undefined && errors.password === undefined) {
      return {};
    }

    return errors;
  };

  return (
    <div className="flex flex-col items-center w-screen h-screen">
      {/* header */}
      <div className="absolute top-0 mx-auto">
        {/* brand logo */}
        <div className="flex gap-1 justify-center items-center w-full mt-8">
          <StockifyLogo className="w-12 h-12" />
          <span className="font-bold text-2xl">STOCKIFY</span>
        </div>
      </div>
      <div className="grid place-items-center h-screen w-screen">
        <div className="flex flex-col gap-4 bg-white-lightest rounded-base py-8 px-12">
          {/* form starts here */}
          <p className="text-xl text-white-default font-bold">{formTitle}</p>
          <Formik initialValues={initialValues} validate={validator} onSubmit={onSubmit}>
            {({ isSubmitting }) => (
              <Form className="flex flex-col gap-4">
                {formFields.map((formField) => (
                  <div key={uuidv4()}>{formField}</div>
                ))}
                <button
                  className="bg-purple-lighter rounded-base text-white-default font-bold w-full py-2 mt-4"
                  disabled={isSubmitting}
                  type="submit">
                  {formSubmitButtonText}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default FormPage;
