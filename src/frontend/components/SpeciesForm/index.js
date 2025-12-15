import { useState, useEffect } from "react";
import styles from "./SpeciesForm.module.css";

export default function SpeciesForm({
  onSubmit,
  name = "",
  scientificName = "",
  description = "",
  biomes = [],
}) {
  const [form, setForm] = useState({
    name: "",
    scientificName: "",
    description: "",
    biomes: [],
  });

  useEffect(() => {
    setForm({
      name: name || "",
      scientificName: scientificName || "",
      description: description || "",
      biomes: biomes || [],
    });
  }, [name, scientificName, description, JSON.stringify(biomes)]);

  const [biomeInput, setBiomeInput] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const addBiomeTag = () => {
    const trimmedInput = biomeInput.trim();

    if (trimmedInput && !form.biomes.includes(trimmedInput)) {
      setForm((prev) => ({
        ...prev,
        biomes: [...prev.biomes, trimmedInput],
      }));
      setBiomeInput(""); // Limpa o input
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addBiomeTag();
    }
  };

  const removeBiomeTag = (tagToRemove) => {
    setForm((prev) => ({
      ...prev,
      biomes: prev.biomes.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(form);
    }
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      {/* Nome Popular */}
      <div className={styles.group}>
        <label className={styles.label}>Nome Popular</label>
        <input
          type="text"
          name="name"
          className={styles.input}
          value={form.name}
          onChange={handleChange}
          placeholder="Ex: Arara-azul"
          required
        />
      </div>

      {/* Nome Científico */}
      <div className={styles.group}>
        <label className={styles.label}>Nome Científico</label>
        <input
          type="text"
          name="scientificName"
          className={styles.input}
          value={form.scientificName}
          onChange={handleChange}
          placeholder="Ex: Anodorhynchus hyacinthinus"
          required
        />
      </div>

      {/* Descrição */}
      <div className={styles.group}>
        <label className={styles.label}>Descrição</label>
        <textarea
          name="description"
          className={styles.textarea}
          value={form.description}
          onChange={handleChange}
          placeholder="Descreva a espécie..."
        />
      </div>

      {/* Biomas (Input de Tags) */}
      <div className={styles.group}>
        <label className={styles.label}>Biomas</label>

        <div className={styles.tagInputGroup}>
          <input
            type="text"
            className={styles.input}
            value={biomeInput}
            onChange={(e) => setBiomeInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Digite e aperte Enter..."
            style={{ flex: 1 }} // Ocupa o espaço restante
          />
          <button
            type="button"
            className={styles.addButton}
            onClick={addBiomeTag}
          >
            Adicionar
          </button>
        </div>

        {/* Lista de Tags Adicionadas */}
        <div className={styles.tagsList}>
          {form.biomes.map((bioma, index) => (
            <span key={index} className={styles.tag}>
              {bioma}
              <button
                type="button"
                className={styles.removeTag}
                onClick={() => removeBiomeTag(bioma)}
                aria-label={`Remover ${bioma}`}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      <button type="submit" className={styles.button}>
        Salvar Espécie
      </button>
    </form>
  );
}
