export function getValueById(id: string) {
  const element = document.getElementById(id) as HTMLInputElement;
  if (element) return element.value;
  console.error("NÃO ACHOU O ELEMENTO");
  return "";
}

export function getCheckedById(id: string) {
  const element = document.getElementById(id) as HTMLInputElement;
  if (element) return element.checked;
  console.error("NÃO ACHOU O ELEMENTO");
  return "";
}

export function getValueByName(id: string) {
  const element = document.querySelector(`[name='${id}']`) as HTMLInputElement;
  if (element) return element.value;
  console.error("NÃO ACHOU O ELEMENTO");
  return "";
}
