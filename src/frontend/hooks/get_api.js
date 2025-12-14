export async function fetchAPI(key) {
  try {
    const response = await fetch(key);

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Erro ao buscar espécies:", error);
    return null;
  }
}
