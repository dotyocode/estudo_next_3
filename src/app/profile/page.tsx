import Container from "@/components/container";
import Image from "next/image";
import userImag from "../../../public/user.png";
import { FaShareAlt } from "react-icons/fa";
import { FavoriteCard } from "./components/favorite";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meu Perfil - Daly Games",
  description: "Perfil Jhonathan",
  keywords: ["games", "jogos", "steam"],
  openGraph: {
    images: [`${process.env.PROJECT_URL}/user.png`],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
    },
  },
};

export default function Profile() {
  return (
    <main className="w-100 text-black">
      <Container>
        <section className="mt-8 mb-6 flex flex-col items-center justify-between relative gap-3 sm:flex-row">
          <div className="flex w-full items-center gap-4 text-lg flex-col sm:flex-row justify-center sm:justify-normal">
            <Image
              src={userImag}
              alt="perfil"
              className="rounded-full w-56 h-56 object-cover"
            />
            <h1 className="font-bold text-2xl">Jhonathan peres</h1>
          </div>
          <div className="sm:absolute top-0 right-0 gap-3 flex items-center justify-center mt-2">
            <button className="bg-gray-700 px-4 py-3 rounded-lg text-white">
              Configurações
            </button>
            <button className="bg-gray-700 px-4 py-3 rounded-lg">
              <FaShareAlt size={24} color="white" />
            </button>
          </div>
        </section>
        <section className="flex flex-wrap gap-5 flex-col md:flex-row">
          <div className="flex-grow flex-wrap">
            <FavoriteCard />
          </div>
          <div className="flex-grow flex-wrap">
            <FavoriteCard />
          </div>
          <div className="flex-grow flex-wrap">
            <FavoriteCard />
          </div>
        </section>
      </Container>
    </main>
  );
}
