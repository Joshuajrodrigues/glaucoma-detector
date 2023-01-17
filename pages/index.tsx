import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import ImageContainer from "../components/ImageContainer";
import { LegacyRef, useRef, useState } from "react";
import Card from "../components/Card";
import CardContainer from "../components/CardContainer";

export default function Home() {
  const [fundasDisplay, setFundasDisplay] = useState<File[]>([]);
  const imgRef = useRef<HTMLImageElement>(null);
  
  const imageCallback = (filesArray: File[]) => {
    console.log("imageCallback", filesArray);
    setFundasDisplay(filesArray);
  };

  return (
    <>
      <Head>
        <title>Glaucoma Detector</title>
        <meta
          name="a simple glaucoma detecion app."
          content="Generated by create next app"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="">
        <h1 className="text-3xl font-bold m-5">Glaucoma Detector</h1>
        <ImageContainer
          imageRef={imgRef}
          instructions="Drop Your Image Here OR"
          multiple={false}
          updateFileCb={imageCallback}
        />
        <CardContainer imageRef={imgRef} imageCallback={imageCallback} />
      </main>
    </>
  );
}
