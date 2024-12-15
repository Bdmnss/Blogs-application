export const validationRules = {
  email: {
    required: "emailRequired",
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      message: "invalidEmail",
    },
  },
  password: {
    required: "passwordRequired",
    minLength: {
      value: 8,
      message: "passwordMinLength",
    },
    maxLength: {
      value: 20,
      message: "passwordMaxLength",
    },
  },
  confirmPassword: {
    required: "confirmPasswordRequired",
    validate: (value: string, getValues: () => { password: string }) =>
      value === getValues().password || "passwordsDoNotMatch",
  },
};