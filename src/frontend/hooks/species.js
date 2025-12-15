import useSWR from "swr";
import { fetchAPI } from "./get_api";

const baseURL = "https://desafio-silva.vercel.app/";

export function getSpecies(start, end, searchTerm) {
  const key = `${baseURL}species?start=${start}&end=${end}&search=${searchTerm}`;

  const { data, error, isLoading } = useSWR(key, fetchAPI);

  return {
    speciesList: Array.isArray(data) ? data : [],
    isLoading,
    isError: error,
  };
}

export function getSpecieById(id) {
  const key = `${baseURL}species/${id}`;

  const shouldFetch = !!id;

  const { data, error, isLoading } = useSWR(shouldFetch ? key : null, fetchAPI);

  return {
    specieItem: data,
    isLoading,
    isError: error,
  };
}

export async function updateSpecieById(id, body) {
  console.log(body);
  const response = await fetch(baseURL + "species/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Erro HTTP: ${response.status}`);
  }

  return await response.json();
}
