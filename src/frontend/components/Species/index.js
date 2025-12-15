import { useState, useEffect } from "react";
import {
  getSpecies,
  getSpecieById,
  updateSpecieById,
} from "../../hooks/species";
import { SpecieRender } from "../SpecieRender";
import Modal from "../Modal";
import SpeciesForm from "../SpeciesForm";

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
    if (specieItem && !isLoadingItem) {
      setName(specieItem.commonName || "");
      setScientificName(specieItem.scientificName || "");
      setDescription(specieItem.description || "");
      setBiomes(specieItem.biomes || []);
    }
  }, [specieItem, isLoadingItem]);

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
  const { speciesList, isLoading, isError } = getSpecies(
    start,
    end,
    searchTerm
  );
  const hasMore = isLoading || speciesList.length >= itemsPerPage;
  const isDebouncing = inputValue !== searchTerm;

  return (
    <>
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
            setName={setName} // Provavelmente você precisa passar as funções de set para o form funcionar
            scientificName={scientificName}
            setScientificName={setScientificName}
            description={description}
            setDescription={setDescription}
            biomes={biomes}
            setBiomes={setBiomes}
            onSubmit={(formData) => {
              updateSpecieById(selectedId, {
                commonName: formData.name,
                scientificName: formData.scientificName,
                biomes: formData.biomes,
                description: formData.description,
              });
              handleClose();
            }}
          />
        )}
        {isLoadingItem && <p>Carregando dados da espécie...</p>}
      </Modal>
    </>
  );
}
