import useSWR from "swr";
import { fetchAPI } from "./get_api";

export function useSpecies(start, end, searchTerm) {
  const baseURL = "https://desafio-silva.vercel.app/";
  const key = `${baseURL}species?start=${start}&end=${end}&search=${searchTerm}`;

  const { data, error, isLoading } = useSWR(key, fetchAPI);

  return {
    speciesList: Array.isArray(data) ? data : [],
    isLoading,
    isError: error,
  };
}
