"use client";
import { FormEvent, useState } from "react";
import styles from "./styles.module.css";
import { FiSearch } from "react-icons/fi";
import {useRouter} from 'next/navigation'

export function Input() {
  const [input, setInput] = useState("");
  const router = useRouter();

  const handleSearch = (event: FormEvent) => {
    event.preventDefault();

    if(input === '') return;

    router.push(`/game/search/${input}`)
  };

  return (
    <form
      onSubmit={handleSearch}
      className="w-full bg-slate-200 my-5 flex gap-2 items-center justify-between rounded-lg p-2"
    >
      <input
        className="bg-slate-200 outline-none w-11/12"
        onChange={(event) => setInput(event?.target.value)}
        value={input}
        type="text"
        placeholder="Procurando algum jogo?"
      />
      <button type="submit">
        <FiSearch size={24} color="#ea780c" />
      </button>
    </form>
  );
}
