export function getValueById(id: string) {
  const element = document.getElementById(id) as HTMLInputElement;
  if (element) return element.value;
  console.error("NÃO ACHOU O ELEMENTO");
  return "";
}
