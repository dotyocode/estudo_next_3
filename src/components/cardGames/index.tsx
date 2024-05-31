import Link from "next/link";
import Image from "next/image";
import { BiRightArrowCircle } from "react-icons/bi";
import { GameProps } from "@/utils/interface/game";

interface GameCardProps {
  data: GameProps;
}

export function GameCard({ data }: GameCardProps) {
  return (
    <Link href={`/game/${data.id}`}>
      <section className="w-full bg-slate-200 rounded-lg p-4 mb-5">
        <div className="relative w-full h-56 hover:scale-105 transition-all duration-300">
          <Image
            src={data.image_url}
            alt={data.title}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 44vw"
            fill={true}
            quality={100}
            className="rounded-lg object-cover"
          />
        </div>
        <div className="flex items-center mt-4 justify-between">
            <p className="text-sm font-bold px-2 text-black text-ellipsis truncate whitespace-nowrap overflow-hidden">{data.title}</p>
            <BiRightArrowCircle size={24} color="#000"/>
        </div>
      </section>
    </Link>
  );
}
