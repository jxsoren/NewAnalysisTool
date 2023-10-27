"use client"

import styles from "./page.module.css";

import MyDropzone from "./MyDropzone";

export default function Home() {
  return (
    <main className={styles.main}>
      <MyDropzone />
    </main>
  );
}
