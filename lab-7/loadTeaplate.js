
export default async function loadTemplate(url) {
  const template = document.createElement('template');
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const html = await response.text();
    template.innerHTML = html;
    return template;
  } catch (error) {
    console.error('Błąd ładowania szablonu:', url, error);
    // W przypadku błędu zwracamy pusty szablon
    return template;
  }
}