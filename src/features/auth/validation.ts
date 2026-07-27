export type LoginErrors = {
  email?: string;
  password?: string;
};

const MIN_PASSWORD_LENGTH = 6;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(email: string) {
  const trimmedEmail = email.trim();

  if (!trimmedEmail) {
    return "Email is required";
  }

  if (!EMAIL_PATTERN.test(trimmedEmail)) {
    return "Enter a valid email";
  }

  return undefined;
}

export function validatePassword(password: string) {
  if (!password) {
    return "Password is required";
  }

  if (password.length < MIN_PASSWORD_LENGTH) {
    return `Password must be at least ${MIN_PASSWORD_LENGTH} characters`;
  }

  return undefined;
}

export function validateLoginForm(email: string, password: string) {
  const nextErrors: LoginErrors = {};
  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);

  if (emailError) {
    nextErrors.email = emailError;
  }

  if (passwordError) {
    nextErrors.password = passwordError;
  }

  return nextErrors;
}
