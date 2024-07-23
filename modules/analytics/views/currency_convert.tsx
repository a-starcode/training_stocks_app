import React, { useState } from "react";
import KeyValueEntry from "../../../global/views/key_value_entry";
import { v4 as uuidv4 } from "uuid";

type Props = {};

function CurrencyConvert({}: Props) {
  const inputs = [
    {
      id: uuidv4(),
      currencyOptions: ["USD", "EUR", "BTC"],
      backgroundColor: "bg-blue-lightest",
      textColor: "text-blue-default",
      optionsBackgroundColor: "bg-black-default",
    },
    {
      id: uuidv4(),
      currencyOptions: ["BTC", "EUR", "USD"],
      backgroundColor: "bg-yellow-lightest",
      textColor: "text-yellow-default",
      optionsBackgroundColor: "bg-black-default",
    },
  ];
  return (
    <div className="flex flex-col gap-4 h-fit w-full px-7">
      {/* title */}
      <p className="font-bold text-white-default text-xl">Convert Currency</p>
      {/* input boxes */}
      <div className="flex flex-col gap-4">
        {inputs.map((input) => {
          return (
            <CurrencyInput
              key={input.id}
              currencyOptions={input.currencyOptions}
              backgroundColor={input.backgroundColor}
              textColor={input.textColor}
              optionsBackgroundColor={input.optionsBackgroundColor}
            />
          );
        })}
      </div>
    </div>
  );
}

type CurrencyInputProps = {
  currencyOptions: string[];
  backgroundColor: string;
  textColor: string;
  optionsBackgroundColor: string;
};

function CurrencyInput({
  currencyOptions,
  backgroundColor,
  textColor,
  optionsBackgroundColor,
}: CurrencyInputProps) {
  const options = currencyOptions;
  const [option, setOption] = useState(options[0]);
  const [showOptions, setShowOptions] = useState(false);

  const handleClick = () => {
    setShowOptions(!showOptions);
  };

  const handleSetOption = (option: string) => {
    setOption(option);
    setShowOptions(false);
  };

  return (
    <div className="flex flex-1 items-center relative h-fit">
      <input
        className="w-full h-full bg-black-lighter rounded-xs py-2 pl-4 text-lg"
        placeholder="100.0"
        type="text"
      ></input>

      {/* currency selector menu */}
      <button
        className={`absolute right-0 px-4 py-[10px] h-full ${backgroundColor} ${textColor} rounded-xs font-bold`}
        onClick={handleClick}
      >
        {option}
      </button>
      {showOptions && (
        // options
        <ul
          className={`${optionsBackgroundColor} absolute shadow right-0 rounded-xs p-2 z-10`}
        >
          {options.map((option) => {
            return (
              <div
                className="flex text-white-default p-1 cursor-pointer"
                onClick={() => handleSetOption(option)}
              >
                {option}
              </div>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default CurrencyConvert;
