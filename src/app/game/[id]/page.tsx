import Container from "@/components/container";
import { GameProps } from "@/utils/interface/game";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Label } from "./components/label";
import { GameCard } from "@/components/cardGames";
import { Metadata } from "next";

interface PropsParams {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: PropsParams): Promise<Metadata> {
  const api = process.env.NEXT_API_URL;

  try {
    const response = await fetch(`${api}/next-api/?api=game&id=${params.id}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch game data");
    }

    const gameData: GameProps = await response.json();

    return {
      title: gameData.title || "DalyGames - Descubra jogos divertidos",
      description: `${gameData.description.slice(0, 100)}...`,
      openGraph: {
        title: gameData.title,
        images: gameData.image_url,
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
  } catch (error) {
    console.error("Error fetching metadata:", error);

    return {
      title: "DalyGames - Descubra jogos divertidos",
    };
  }
}

async function getData(id) {
  const api = process.env.NEXT_API_URL;
  try {
    const reponse = await fetch(`${api}/next-api/?api=game&id=${id}`, {
      cache: "no-store",
    });
    return reponse.json();
  } catch (error) {
    throw new Error("Falha ao fazer fetch");
  }
}

async function getDalyGame() {
  const api = process.env.NEXT_API_URL;
  try {
    const response = await fetch(`${api}/next-api/?api=game_day`, {
      cache: "no-store",
    });
    return response.json();
  } catch (error) {
    throw new Error("Falha ao fetch data");
  }
}

export default async function gameDetail({
  params: { id },
}: {
  params: { id: string };
}) {
  const data: GameProps = await getData(id);
  const dalyGame: GameProps = await getDalyGame();

  if (!data) {
    redirect("/");
  }

  return (
    <main className="w-full text-black">
      <section className="w-full bg-black rounded-lg ">
        <div className="w-full max-h-96 h-96 relative rounded-lg">
          <Image
            src={data.image_url}
            alt={data.title}
            priority={true}
            quality={100}
            fill={true}
            className="max-h-96 object-cover rounded-lg opacity-80"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 44vw"
          />
        </div>
      </section>
      <Container>
        <h1 className="font-bold text-xl my-4">{data.title}</h1>
        <p className="">{data.description}</p>

        <h2 className="font-bold text-xl mt-7 mb-2">Plataformas</h2>
        <div className="flex gap-2 flex-wrap">
          {data.platforms.map((item) => (
            <Label data={item} key={item} />
          ))}
        </div>

        <h2 className="font-bold text-xl mt-7 mb-2">Categorias</h2>
        <div className="flex gap-2 flex-wrap">
          {data.categories.map((item) => (
            <Label data={item} key={item} />
          ))}
        </div>

        <p className="mt-7 mb-2">
          <strong>Data de lançamento:</strong> {data.release}
        </p>

        <h2 className="font-bold text-xl mt-7 mb-2">Jogo recomendado</h2>
        <div className="flex">
          <div className="flex-grow">
            <GameCard key={dalyGame.id} data={dalyGame} />
          </div>
        </div>
      </Container>
    </main>
  );
}
