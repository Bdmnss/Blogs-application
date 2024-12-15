export const validationRules = {
  firstNameKa: {
    minLength: {
      value: 2,
      message: "firstNameKaMinLength",
    },
    maxLength: {
      value: 30,
      message: "firstNameKaMaxLength",
    },
  },
  lastNameKa: {
    minLength: {
      value: 2,
      message: "lastNameKaMinLength",
    },
    maxLength: {
      value: 30,
      message: "lastNameKaMaxLength",
    },
  },
  firstNameEn: {
    minLength: {
      value: 2,
      message: "firstNameEnMinLength",
    },
    maxLength: {
      value: 30,
      message: "firstNameEnMaxLength",
    },
  },
  lastNameEn: {
    minLength: {
      value: 2,
      message: "lastNameEnMinLength",
    },
    maxLength: {
      value: 30,
      message: "lastNameEnMaxLength",
    },
  },
  avatarUrl: {},
  phoneNumber: {
    minLength: {
      value: 9,
      message: "phoneNumberLength",
    },
    maxLength: {
      value: 9,
      message: "phoneNumberLength",
    },
  },
};