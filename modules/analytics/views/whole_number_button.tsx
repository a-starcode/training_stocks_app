import React, { ChangeEvent, useState } from "react";

type WholeNumberButtonProps = {
  label: string;
  value: number;
  onValueChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

function WholeNumberButton({ label, value, onValueChange }: WholeNumberButtonProps) {
  return (
    <div className="flex flex-col px-4 mt-6 mb-2 gap-2">
      <label className="text-m pl-2">{label}</label>
      <input
        type="number"
        min="0"
        value={value}
        onChange={onValueChange}
        placeholder={label}
        className="appearance-none rounded-sm px-4 py-4 text-start text-m text-white-default bg-black-lighter"
      />
    </div>
  );
}

export default WholeNumberButton;
