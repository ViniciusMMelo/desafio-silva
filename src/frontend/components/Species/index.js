import { useState, useEffect } from "react";
import {
  getSpecies,
  getSpecieById,
  updateSpecieById,
  createSpecie,
} from "../../hooks/species";
import { SpecieRender } from "../SpecieRender";
import Modal from "../Modal";
import SpeciesForm from "../SpeciesForm";
import styles from "./Species.module.css";

export default function Specie() {
  const [inputValue, setInputValue] = useState("");
  const [modal, openModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const { specieItem, isLoading: isLoadingItem } = getSpecieById(selectedId);

  const [name, setName] = useState("");
  const [scientificName, setScientificName] = useState("");
  const [description, setDescription] = useState("");
  const [biomes, setBiomes] = useState([]);

  useEffect(() => {
    if (selectedId && specieItem && !isLoadingItem) {
      setName(specieItem.commonName || "");
      setScientificName(specieItem.scientificName || "");
      setDescription(specieItem.description || "");
      setBiomes(specieItem.biomes || []);
    }
  }, [specieItem, isLoadingItem, selectedId]);

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  const itemsPerPage = 10;
  const start = (page - 1) * itemsPerPage;
  const end = page * itemsPerPage;

  const handleSelectItem = (id) => {
    setSelectedId(id);
    openModal(true);

    setName(specieItem?.commonName || "");
    setScientificName(specieItem?.scientificName || "");
    setDescription(specieItem?.description || "");
    setBiomes(specieItem?.biomes || []);
  };

  const handleCreateNew = () => {
    setSelectedId(null);

    setName("");
    setScientificName("");
    setDescription("");
    setBiomes([]);

    openModal(true);
  };

  const handleClose = () => {
    openModal(false);
    setSelectedId(null);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearchTerm(inputValue);
      setPage(1);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [inputValue]);
  const { speciesList, isLoading, isError, refresh } = getSpecies(
    start,
    end,
    searchTerm
  );
  const hasMore = isLoading || speciesList.length >= itemsPerPage;
  const isDebouncing = inputValue !== searchTerm;

  return (
    <>
      <div className={styles.buttonDiv}>
        <button onClick={handleCreateNew} className={styles.button}>
          + Nova Espécie
        </button>
      </div>
      <SpecieRender
        inputValue={inputValue}
        setInputValue={setInputValue}
        page={page}
        setPage={setPage}
        speciesList={speciesList}
        isLoading={isLoading}
        isError={isError}
        hasMore={hasMore}
        isDebouncing={isDebouncing}
        openModal={handleSelectItem}
      />
      <Modal isOpen={modal} onClose={handleClose}>
        {modal && !isLoadingItem && (
          <SpeciesForm
            name={name}
            scientificName={scientificName}
            description={description}
            biomes={biomes}
            onSubmit={async (formData) => {
              try {
                const payload = {
                  commonName: formData.name,
                  scientificName: formData.scientificName,
                  biomes: formData.biomes,
                  description: formData.description,
                };

                if (selectedId) {
                  await updateSpecieById(selectedId, payload);
                } else {
                  await createSpecie(payload);
                }

                await refresh();
                handleClose();
              } catch (error) {
                console.error("Erro ao salvar:", error);
                alert("Erro ao salvar as alterações.");
              }
            }}
          />
        )}
        {isLoadingItem && <p>Carregando dados da espécie...</p>}
      </Modal>
    </>
  );
}
