import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [rare, setRare] = useState("Common");

  async function filteredData() {
    const res = await fetch(
      "https://royaleapi.github.io/cr-api-data/json/cards.json"
    );
    const data = await res.json();
    let filtered = [];
    let allFilter = [];
    if (data.length) {
      filtered = data.filter((item) => item.rarity == rare);
      for (const item of filtered) {
        const resImage = await fetch(
          "https://vidi123.github.io/api-gambar/gambar2.json"
        );
        const images = await resImage.json();
        let image = images.find((img) => img.id == item.id);
        let url = "";
        if (image) url = image.iconUrls.medium;
        allFilter.push({ ...item, image: url });
      }
      setFilterData(allFilter);
    }
  }

  function changeRare(rare) {
    setRare(rare);
    filteredData();
  }

  useEffect(() => {
    // filteredData();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Clash Royale Card Sorter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className={styles.header}>
          <div className={styles.judul}>
            <h1>Clash Royale Card Sorter based on Rarity</h1>
          </div>
          <div className={styles.rarity}>
            <button
              onClick={() => changeRare("Common")}
              className={styles.common}
            >
              Common
            </button>
            <button onClick={() => changeRare("Rare")} className={styles.rare}>
              Rare
            </button>
            <button onClick={() => changeRare("Epic")} className={styles.epic}>
              Epic
            </button>
            <button
              onClick={() => changeRare("Legendary")}
              className={styles.legendary}
            >
              Legendary
            </button>
            <button
              onClick={() => changeRare("Champion")}
              className={styles.champion}
            >
              Champion
            </button>
          </div>
        </div>

        <div className={styles.cards}>
          {filterData?.map((item) => (
            <div className={styles.card} key={item.id}>
              <img src={item.image} />
            </div>
          ))}
        </div>
      </main>

      <footer>
        <p>Create by Vidi</p>
      </footer>

      <style jsx>{`
        main {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 50px;
          background: linear-gradient(#222, #333);
          color: white;
          position: fixed;
          bottom: 0;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          background-image: url(images/background.png);
          background-size: 300px;
        }
        @font-face {
          font-family: supercell-magic;
          src: url(fontcr/supercell-magic-webfont.ttf);
        }
        * {
          margin: 0;
          padding: 0;
          font-family: supercell-magic;
        }
      `}</style>
    </div>
  );
}
