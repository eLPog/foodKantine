export function getActuallyDate() {
  const date = new Date().toLocaleDateString();
  const hour = new Date().toLocaleTimeString();
  return `${date} ${hour}`;
}
