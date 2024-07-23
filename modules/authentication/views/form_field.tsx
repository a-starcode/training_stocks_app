import { ErrorMessage, Field } from "formik";
import React from "react";
import { v4 as uuidv4 } from "uuid";

type FormFieldProps = {
  id?: string;
  name: string;
  type?: "name" | "email" | "password" | "text";
  placeholder?: string;
  hasTooltip?: boolean;
  tooltipTitle?: string;
  tooltipContent?: string[];
};

function FormField({
  id = uuidv4(),
  name,
  type = "text",
  placeholder = "Type here...",
  tooltipTitle,
  tooltipContent = [],
  hasTooltip = false,
}: FormFieldProps) {
  return (
    // tooltip section (optional)
    <div className="flex flex-col gap-1 group relative">
      {hasTooltip && (
        <label
          htmlFor={name}
          className="absolute -z-40 top-10 opacity-0 group-hover:opacity-100 group-hover:z-40 transition-opacity bg-black-lighter rounded-base max-w-xs p-4 border border-white-lighter">
          {tooltipTitle && ( // if there is a title, make space for it
            <>
              <strong>{tooltipTitle}</strong>
              <br />
            </>
          )}

          {tooltipContent.length === 1 ? ( // if its just one message, display as it is
            <span>{tooltipContent[0]}</span>
          ) : (
            tooltipContent.map((tip, index) => {
              // if it is a list of messages, then number them
              return (
                <div className="py-2" key={uuidv4()}>
                  <span>{`${index + 1}. ${tip}`}</span>
                  <br />
                </div>
              );
            })
          )}
        </label>
      )}
      {/* form field section */}
      {/* form input */}
      <Field
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        className="bg-white-lightest rounded-base py-3 px-5 text-m"
      />
      {/* form error message */}
      <ErrorMessage name={name} component="div" className="text-red-default text-sm" />
    </div>
  );
}

export default FormField;
