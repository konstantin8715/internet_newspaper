export function validateText(value) {
  return value.length >= 2 && value.length <= 1000;
}