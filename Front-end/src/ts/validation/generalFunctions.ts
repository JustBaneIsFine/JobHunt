export function checkLength(min: number, max: number, data: string) {
  if (data.length < min) {
    return 'min';
  }
  if (data.length > max) {
    return 'max';
  }
  return true;
}
