export const formatCurrency = (currency: number | string | undefined) => {
  if (currency !== undefined) {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });

    // extract just the numbers from string
    const currencyString = String(currency).replace(/[^\d.-]/g, "");
    const currencyFloat = parseFloat(currencyString); // convert to float

    let formattedString = formatter.format(currencyFloat);
    // add space between currency sign and numbers
    formattedString = formattedString.replace(/^(\D+)/, "$1 ").replace(/\s+/, " ");

    return formattedString;
  } else {
    return "INVLD CUR";
  }
};

export const toProperCase = (str: string) => {
  return str.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
};
