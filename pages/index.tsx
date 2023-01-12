import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import ImageContainer from "../components/ImageContainer";
import { useState } from "react";
import Card from "../components/steps/Card";
import CardContainer from "../components/steps/CardContainer";



export default function Home() {

  const [fundas,setFundas] = useState<File[]>([])
  const imageCallback = (filesArray: File[]) => {
    console.log("imageCallback", filesArray)
    setFundas(filesArray)
  }

  return (
    <>
      <Head>
        <title>Glaucoma Detector</title>
        <meta name="a simple glaucoma detecion app." content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="">
        <h1 className="text-3xl font-bold m-5">Glaucoma Detector</h1>
        <ImageContainer instructions="Drop Your Image Here OR" multiple={false} updateFileCb={imageCallback} />
          {
            fundas.length > 0 &&
           <CardContainer/>
          }
      </main>
    </>
  );
}
