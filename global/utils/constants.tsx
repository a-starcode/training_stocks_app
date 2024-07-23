// global constants
export const BASE_URL = "http://localhost:3000";

// colors
export const COLOR_PURPLE_DEFAULT = "rgba(193, 144, 191, 1)";
export const COLOR_WHITE_LIGHTER = "rgba(255, 255, 255, 0.6)";
export const COLOR_WHITE_LIGHTEST = "rgba(255, 255, 255, 0.04)";

/**
 * uppercase
 * lowercase
 * ' - whitespace
 */
export const REGEX_NAME = /^[a-zA-Z]+(([' -][a-zA-Z ])?[a-zA-Z]*)*$/;
/**
 * alphanumeric
 * then @
 * alphanumeric and . after @
 * no two or more . in succession
 * @ or . not at the start or the string or end
 */
export const REGEX_EMAIL = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9.]+$/;
/**
 * 10 digits
 * at least 1 digit, uppercase, lowercase
 * allowed symbols @$!%*?&
 */
export const REGEX_PASSWORD =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;

export const API_URL = "https://www.alphavantage.co/query";
