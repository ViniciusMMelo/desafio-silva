import styles from "./Card.module.css";
import { useState } from "react";
import Modal from "../Modal";

export default function Card({ title, subtitle, details, tags, openModal }) {
  return (
    <li className={styles.card}>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
        <div className={styles.details}>{details}</div>

        {tags && tags.length > 0 && (
          <div className={styles.tagsContainer}>
            {tags.map((tag, index) => (
              <span key={index} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className={styles.buttons}>
        <button className={styles.openButton} onClick={() => openModal()}>
          Ver Mais
        </button>
      </div>
    </li>
  );
}
