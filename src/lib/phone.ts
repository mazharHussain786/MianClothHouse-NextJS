export function normalizePhone(phone: string) {
  let digits = phone.replace(/\D/g, "");
  if (digits.startsWith("92") && digits.length >= 12) {
    digits = `0${digits.slice(2)}`;
  }
  return digits;
}

export function isValidPhone(phone: string) {
  const digits = normalizePhone(phone);
  return digits.length >= 10 && digits.length <= 13;
}
