import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import ImageContainer from "../components/ImageContainer";



export default function Home() {

  const imageCallback=()=>{
    
  }

  return (
    <>
      <Head>
        <title>Glaucoma Detector</title>
        <meta name="a simple glaucoma detecion app." content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className="text-3xl font-bold m-5">Glaucoma Detector</h1>
        <ImageContainer updateFileCb={imageCallback}/>
      </main>
    </>
  );
}
