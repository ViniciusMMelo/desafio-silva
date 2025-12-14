import styles from "./SpeciesRender.module.css";
import SearchBar from "../SearchBar";
import Card from "../Card";
import Pagination from "../Pagination";

export function SpecieRender({
  inputValue,
  setInputValue,
  page,
  setPage,
  speciesList,
  isLoading,
  isError,
  hasMore,
  isDebouncing,
  openModal,
}) {
  const renderContent = () => {
    if (isLoading || isDebouncing) {
      return <div className={styles.loadingContainer}>Carregando dados...</div>;
    }

    if (isError) {
      return (
        <div className={styles.errorContainer}>Erro ao carregar espécies.</div>
      );
    }

    if (!speciesList || speciesList.length === 0) {
      return <p className={styles.noResults}>Nenhuma espécie encontrada.</p>;
    }

    return (
      <ul className={styles.grid}>
        {speciesList.map((item, index) => (
          <Card
            key={item.id || index}
            title={item.commonName || "Nome Desconhecido"}
            subtitle={item.scientificName || "Nome Científico não informado"}
            details={item.description || "Sem descrição."}
            tags={item.biomes || []}
            openModal={() => openModal(true, item.id)}
          />
        ))}
      </ul>
    );
  };

  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.pageTitle}>Catálogo de Espécies</h1>

      <SearchBar value={inputValue} onChange={(val) => setInputValue(val)} />

      <div className={styles.contentArea}>{renderContent()}</div>

      <div className={styles.paginationContainer}>
        <Pagination
          currentPage={page}
          onPageChange={setPage}
          hasMore={hasMore}
        />
      </div>
    </div>
  );
}
