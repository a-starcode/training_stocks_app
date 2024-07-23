import React from "react";

type KeyValueEntryProps = {
  title: string;
  value: string;
  titleTextColor?: string;
  valueTextColor?: string;
  textSize?: string;
};

function KeyValueEntry({
  title,
  value,
  titleTextColor = "text-white-lighter",
  valueTextColor = "text-white-default",
  textSize = "text-lg",
}: KeyValueEntryProps) {
  return (
    <div className="flex justify-between">
      {/* info title */}
      <p className={`${titleTextColor} ${textSize}`}>{title}</p>
      {/* data */}
      <p className={`${valueTextColor} ${textSize}`}>{value}</p>
    </div>
  );
}

export default KeyValueEntry;
