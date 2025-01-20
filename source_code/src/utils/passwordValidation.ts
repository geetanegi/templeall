// passwordValidation.ts

export const PasswordRegex = {
  REQUIRED: "Password is Required",
  FORMAT:
    "Password must be 8-25 characters long, include at least one letter, one number, one special character, and cannot contain spaces.",
  MAX_LENGTH: "Password must be less than 25 characters",
  PATTERN:
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!\"#$%&'()*+,\-./:;<=>?@\[\\\\\]^_`{|}~])[a-zA-Z\d!\"#$%&'()*+,\-./:;<=>?@\[\\\\\]^_`{|}~]{8,25}$/,
};
