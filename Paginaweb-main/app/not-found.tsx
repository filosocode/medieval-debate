"use client";

import TransitionPage from "@/components/transition-Page";
import CoverParticles from "@/components/cover-particles";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative min-h-screen w-full flex flex-col justify-center items-center bg-darkBg text-white text-center p-6 overflow-hidden">

      <TransitionPage />
      <CoverParticles />

      <div className="relative z-10"> {/* Para que el texto quede encima de las partículas */}
        <h1 className="text-5xl font-bold mb-4">404 - Página no encontrada</h1>
        <p className="text-lg mb-6">Parece que esta ruta no existe...</p>

        <Link
          href="/"
          className="mt-4 px-6 py-2 bg-white text-green-700 font-semibold rounded-full hover:bg-green-200 transition"
        >
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}
