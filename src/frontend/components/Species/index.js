import { useState, useEffect } from "react";
import { useSpecies } from "../../hooks/species";
import { SpecieRender } from "../SpecieRender";
import Modal from "../Modal";

export default function Specie() {
  const [inputValue, setInputValue] = useState("");
  const [modal, openModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  const itemsPerPage = 10;
  const start = (page - 1) * itemsPerPage;
  const end = page * itemsPerPage;

  const testOpenModal = (isModalOpen, id) => {
    openModal(isModalOpen);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearchTerm(inputValue);
      setPage(1);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [inputValue]);

  const { speciesList, isLoading, isError } = useSpecies(
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
        openModal={testOpenModal}
      />
      <Modal isOpen={modal} onClose={() => openModal(false)}>
        {/* renderModal */}
      </Modal>
    </>
  );
}
