export function validatePassword(value) {
  const passwordPattern = /^(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$/;
  return passwordPattern.test(value);
}
