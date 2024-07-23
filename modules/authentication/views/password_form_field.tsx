import React from "react";
import FormField from "./form_field";

type PasswordFormFieldProps = {};

function PasswordFormField({}: PasswordFormFieldProps) {
  const passwordPolicy = [
    "At least 10 digits",
    "Contain at least 1 digit",
    "Contain at least 1 lowercase",
    "Contain at least 1 uppercase",
    "Allowed symbols: @$!%*?&",
  ];

  return (
    <FormField
      name="password"
      placeholder="Password"
      hasTooltip={true}
      tooltipTitle="PASSWORD POLICY"
      tooltipContent={passwordPolicy}
    />
  );
}

export default PasswordFormField;
