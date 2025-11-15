export const EXPERIENCE_YEARS = Array.from({ length: 31 }, (_, i) => i+1);

export const RATE_BASIS_OPTIONS = [
  { value: "HOUR", label: "Per Hour" },
  { value: "DAY", label: "Per Day" },
  { value: "SQAURE_FEET", label: "Per Sq. Ft" },
  { value: "JOB", label: "Per Job" },
];

export const GENDER_OPTIONS = [
  { value: "MALE", label: "Male" },
  { value: "FEMALE", label: "Female" },
  { value: "OTHER", label: "Other" },
];

export const FORM_STEPS = {
  PERSONAL: 0,
  CONTACT: 1,
  PROFESSION: 2,
  EXPERIENCE: 3,
  COMPLETE: 4,
};
