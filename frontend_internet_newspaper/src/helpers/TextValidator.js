export function validateText(value) {
  return value.length >= 2 && value.replace(/\s+/g, "").length > 0;
}