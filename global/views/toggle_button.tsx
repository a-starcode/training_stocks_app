import React from "react";

type ToggleButtonProps = {
  selectedValue: number;
  onSelectOne: () => void;
  onSelectTwo: () => void;
  backgroundColor?: string;
  buttonBorderRadius?: string;
  firstButtonBackgroundColor: string;
  firstButtonTextColor?: string;
  firstButtonText: string;
  secondButtonBackgroundColor: string;
  secondButtonTextColor?: string;
  secondButtonText: string;
  textSize?: string;
};

function ToggleButton({
  buttonBorderRadius = "rounded-sm",
  backgroundColor = "bg-black-default",
  firstButtonBackgroundColor,
  firstButtonTextColor = "text-white-default",
  firstButtonText,
  secondButtonBackgroundColor,
  secondButtonTextColor = "text-white-default",
  secondButtonText,
  textSize = "text-lg",
  selectedValue,
  onSelectOne,
  onSelectTwo,
}: ToggleButtonProps) {
  return (
    <div className={`flex ${buttonBorderRadius} p-1 ${backgroundColor} gap-1 mx-2`}>
      {/* first button */}
      <button
        className={`${
          selectedValue === 1
            ? `${firstButtonBackgroundColor} ${firstButtonTextColor}`
            : `text-white-lighter`
        } font-bold py-3 rounded-sm ${textSize} flex flex-1 justify-center transition-all ease-in duration-150`}
        onClick={onSelectOne}>
        {firstButtonText}
      </button>
      {/* second button */}
      <button
        className={`${
          selectedValue === 2
            ? `${secondButtonBackgroundColor} ${secondButtonTextColor}`
            : `text-white-lighter`
        } font-bold py-3 rounded-sm ${textSize} flex flex-1 justify-center transition-all ease-in duration-150`}
        onClick={onSelectTwo}>
        {secondButtonText}
      </button>
    </div>
  );
}

export default ToggleButton;
