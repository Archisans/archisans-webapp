export const initialFormState = {
  // Section 1: Company Details
  companyName: "",
  businessTypes: [],
  directorName: "",
  officeAddress: "",
  district: "",
  state: "",
  pinCode: "",

  // Section 2: Contact Details
  contactPersonName: "",
  designation: "",
  mobileNumber: "",

  // Section 3: Project Details
  currentProjectName: "",
  projectLocation: "",
  projectTypes: [],
  estimatedDuration: "",
  workersRequired: "",

  // Section 4: Worker Requirements (quantities)
  workerQuantities: {
    Mason: "",
    Carpenter: "",
    Electrician: "",
    Plumber: "",
    "Steel Fixer": "",
    Painter: "",
    "Tile Worker": "",
    "Gypsum Worker": "",
    "Aluminium Fabricator": "",
    Welder: "",
    "Helper / General Worker": "",
    "Interior Finishing Worker": "",
    Other: "",
  },

  // Section 5: Facilities
  accommodation: null,       // true | false | null
  foodFacility: null,
  transportation: null,
  safetyEquipment: [],
  weeklyOff: "",
  workingHours: "",

  // Section 6: Salary & Payment
  salaryStructures: [],
  wageRange: "",
  overtimePolicy: "",
  paymentMethods: [],

  // Section 7: Legal & Compliance
  labourCompliance: null,
  workerInsurance: null,
  pfEsiOptions: [],

  // Section 8: Declaration
  declarationAgreed: false,
};

// Field-level Validators

const PHONE_REGEX = /^[6-9]\d{9}$/;
const PIN_REGEX = /^\d{6}$/;

export const validators = {
  companyName: (v) =>
    !v?.trim() ? "Company / Firm name is required." : null,

  businessTypes: (v) =>
    !v?.length ? "Select at least one type of business." : null,

  directorName: (v) =>
    !v?.trim() ? "Proprietor / Managing Director name is required." : null,

  officeAddress: (v) =>
    !v?.trim() ? "Office address is required." : null,

  district: (v) =>
    !v?.trim() ? "District is required." : null,

  state: (v) =>
    !v?.trim() ? "State is required." : null,

  pinCode: (v) => {
    if (!v?.trim()) return "PIN code is required.";
    if (!PIN_REGEX.test(v.trim())) return "Enter a valid 6-digit PIN code.";
    return null;
  },

  contactPersonName: (v) =>
    !v?.trim() ? "Contact person name is required." : null,

  designation: (v) =>
    !v?.trim() ? "Designation is required." : null,

  mobileNumber: (v) => {
    if (!v?.trim()) return "Mobile number is required.";
    if (!PHONE_REGEX.test(v.trim()))
      return "Enter a valid 10-digit Indian mobile number.";
    return null;
  },

  currentProjectName: (v) =>
    !v?.trim() ? "Current project name is required." : null,

  projectLocation: (v) =>
    !v?.trim() ? "Project location is required." : null,

  projectTypes: (v) =>
    !v?.length ? "Select at least one project type." : null,

  estimatedDuration: (v) =>
    !v?.trim() ? "Estimated project duration is required." : null,

  workersRequired: (v) => {
    if (!v?.trim()) return "Approximate number of workers required.";
    if (isNaN(Number(v)) || Number(v) <= 0)
      return "Enter a valid positive number.";
    return null;
  },

  workerQuantities: (quantities) => {
    const total = Object.values(quantities).reduce(
      (sum, q) => sum + (Number(q) || 0),
      0
    );
    if (total === 0)
      return "Specify at least one worker type and quantity needed.";

    const errors = {};
    Object.entries(quantities).forEach(([role, qty]) => {
      if (qty !== "" && (isNaN(Number(qty)) || Number(qty) < 0)) {
        errors[role] = "Must be a valid non-negative number.";
      }
    });
    return Object.keys(errors).length ? errors : null;
  },

  accommodation: (v) =>
    v === null ? "Please indicate if accommodation is provided." : null,

  foodFacility: (v) =>
    v === null ? "Please indicate if a food / mess facility is provided." : null,

  transportation: (v) =>
    v === null ? "Please indicate if transportation is provided." : null,

  weeklyOff: (v) =>
    !v?.trim() ? "Weekly off details are required." : null,

  workingHours: (v) =>
    !v?.trim() ? "Working hours are required." : null,

  salaryStructures: (v) =>
    !v?.length ? "Select at least one salary structure." : null,

  wageRange: (v) =>
    !v?.trim() ? "Expected wage range is required." : null,

  paymentMethods: (v) =>
    !v?.length ? "Select at least one payment method." : null,

  labourCompliance: (v) =>
    v === null
      ? "Indicate whether your company complies with labour and safety regulations."
      : null,

  workerInsurance: (v) =>
    v === null ? "Indicate whether workers are covered under insurance." : null,

  pfEsiOptions: (v) =>
    !v?.length ? "Select at least one PF / ESI option." : null,

  declarationAgreed: (v) =>
    !v
      ? "You must read and agree to the declaration before submitting."
      : null,
};

// Full-form Validation

/**
 * Validates the entire form state.
 * @param {object} formState - Current form values matching initialFormState shape.
 * @returns {{ isValid: boolean, errors: object }}
 *   errors keys match formState keys; values are error strings (or nested objects
 *   for workerQuantities).
 */
export function validateForm(formState) {
  const errors = {};

  Object.keys(validators).forEach((field) => {
    const error = validators[field](formState[field]);
    if (error) errors[field] = error;
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Validates a single field on blur / change.
 * @param {string} field - Field name.
 * @param {*} value - Field value.
 * @returns {string|object|null} Error message, nested errors object, or null.
 */
export function validateField(field, value) {
  const fn = validators[field];
  return fn ? fn(value) : null;
}

// Section-level Validation

const sectionFields = {
  1: ["companyName", "businessTypes", "directorName", "officeAddress", "district", "state", "pinCode"],
  2: ["contactPersonName", "designation", "mobileNumber"],
  3: ["currentProjectName", "projectLocation", "projectTypes", "estimatedDuration", "workersRequired"],
  4: ["workerQuantities"],
  5: ["accommodation", "foodFacility", "transportation", "weeklyOff", "workingHours"],
  6: ["salaryStructures", "wageRange", "paymentMethods"],
  7: ["labourCompliance", "workerInsurance", "pfEsiOptions"],
  8: ["declarationAgreed"],
};

/**
 * Validates only the fields belonging to a given section.
 * @param {number} sectionNumber - Section 1–8.
 * @param {object} formState
 * @returns {{ isValid: boolean, errors: object }}
 */
export function validateSection(sectionNumber, formState) {
  const fields = sectionFields[sectionNumber] ?? [];
  const errors = {};

  fields.forEach((field) => {
    const fn = validators[field];
    if (fn) {
      const error = fn(formState[field]);
      if (error) errors[field] = error;
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

// Helper Utilities

/**
 * Toggle a value in a multi-select array (checkboxes).
 * @param {string[]} current - Current array of selected values.
 * @param {string} value - Value to toggle.
 * @returns {string[]} Updated array.
 */
export function toggleArrayValue(current, value) {
  return current.includes(value)
    ? current.filter((v) => v !== value)
    : [...current, value];
}

export function hasError(errors, touched, field) {
  return Boolean(touched[field] && errors[field]);
}

export function getHelperText(errors, touched, field) {
  return hasError(errors, touched, field) ? errors[field] : "";
}
