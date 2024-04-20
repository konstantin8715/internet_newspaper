export function validateTitle(value) {
  return (
    value.length >= 2 &&
    value.length <= 255 &&
    value.replace(/\s+/g, "").length > 0
  );
}