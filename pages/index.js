import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Script from 'next/script';
import { useEffect, useState } from 'react';

export default function Home() {
  const [data,setData] = useState([])
  const [filterData,setFilterData] = useState([])
  const [rare,setRare] = useState('Common')
  const [images,setImages] = useState([])


  function filteredData(){
    console.log(data);
    const filtered = data.filter((item) => item.rarity == rare)
    setFilterData(filtered);
  }

  function getImageById(name){
    const image = images.find((img) => img.name == name)
    console.log(image,name);
    return image.iconUrls.medium;
  }
  
  function changeRare(rare){
    setRare(rare)
    filteredData()
  }
  
  async function getData(){
    const res = await fetch('https://royaleapi.github.io/cr-api-data/json/cards.json');
    const data = await res.json();
    setData(data);
  }

  async function getImages(){
    const res = await fetch('https://vidi123.github.io/api-gambar/gambar2.json');
    const data = await res.json();
    setData(data);
  }

  useEffect(() => {
    getData()
    getImages()
  },[])

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
                <button onClick={() => changeRare('Common')} className={styles.common}>Common</button>
                <button onClick={() => changeRare('Rare')} className={styles.rare}>Rare</button>
                <button onClick={() => changeRare('Epic')} className={styles.epic}>Epic</button>
                <button onClick={() => changeRare('Legendary')} className={styles.legendary}>Legendary</button>
                <button onClick={() => changeRare('Champion')} className={styles.champion}>Champion</button>
            </div>
        </div>

        <div className={styles.cards}>
          {filterData.length && filterData.map((item) => 
            <div className={styles.card}>
                <img src={getImageById(item.name)}/>
            </div>)}
        </div>
{/* 
        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div> */}
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
          color:white;
          position:fixed;
          bottom:0;
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
        *{
          margin: 0;
          padding: 0;
          font-family: supercell-magic;
        }
      `}</style>
    </div>
  )
}
