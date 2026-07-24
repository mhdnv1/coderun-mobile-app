export type LoginErrors = {
  email?: string;
  password?: string;
};

const MIN_PASSWORD_LENGTH = 6;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateLoginForm(email: string, password: string) {
  const nextErrors: LoginErrors = {};
  const trimmedEmail = email.trim();

  if (!trimmedEmail) {
    nextErrors.email = "Email is required";
  } else if (!EMAIL_PATTERN.test(trimmedEmail)) {
    nextErrors.email = "Enter a valid email";
  }

  if (!password) {
    nextErrors.password = "Password is required";
  } else if (password.length < MIN_PASSWORD_LENGTH) {
    nextErrors.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters`;
  }

  return nextErrors;
}
