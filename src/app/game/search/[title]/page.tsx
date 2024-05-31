import { GameCard } from "@/components/cardGames";
import Container from "@/components/container";
import { Input } from "@/components/input";
import { GameProps } from "@/utils/interface/game";

async function getData(title: string) {
  const api = process.env.NEXT_API_URL;
  try {
    const decodeTitle: string = decodeURI(title);
    const response = await fetch(`${api}/next-api/?api=game&title=${decodeTitle}`);
    return response.json();
  } catch (error) {
    return null;
  }
}

export default async function Search({
  params: { title },
}: {
  params: { title: string };
}) {
  const games: GameProps[] = await getData(title);

  return (
    <main className="w-full text-black">
      <Container>
        <Input />
        <h1 className="font-bold text-xl mt-8 mb-5">
          Veja o que encontramos em nossa base:
        </h1>
        {!games && <p>Esse jogo não foi encontrado...</p>}

        <section className="grid gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {games?.map((item: GameProps) => (
            <GameCard key={item.id} data={item} />
          ))}
        </section>
      </Container>
    </main>
  );
}
