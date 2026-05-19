import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-10 bg-[#09030a]"
      style={{
        backgroundImage:
          "radial-gradient(circle at top, rgba(244,114,182,0.18), transparent 28%), linear-gradient(180deg, #23103b 0%, #0b0210 70%, #020203 100%)",
      }}
    >
      <div className="w-full max-w-3xl rounded-[2rem] border border-white/10 bg-white/5 p-6 sm:p-10 shadow-[0_30px_90px_rgba(0,0,0,0.4)] backdrop-blur-xl">
        <div className="flex flex-col items-center text-center gap-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-pink-300/30 bg-pink-500/10 px-8 py-4 text-3xl font-bold text-pink-100">
            <Heart className="w-8 h-8 text-pink-300" />
            Meu presente <br />
            de
            <br /> Dia dos Namorados
          </div>

          <div className="grid gap-4 sm:grid-cols-[auto_1fr] sm:items-center">
            <button
              onClick={() => navigate("/principal")}
              className="inline-flex items-center justify-center rounded-full bg-pink-500 px-8 py-4 text-lg font-semibold text-white shadow-[0_20px_40px_rgba(244,114,182,0.35)] transition duration-300 hover:bg-pink-400 hover:shadow-[0_0_30px_rgba(244,114,182,0.55)] hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-pink-300"
            >
              Abrir surpresa
            </button>
          </div>
        </div>

        <div className="mt-10">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_16px_40px_rgba(255,255,255,0.08)]">
            <p className="text-sm uppercase tracking-[0.25em] text-pink-200/80 mb-4">
              Nosso começo
            </p>
            <h2 className="text-3xl font-semibold text-white">
              7 de novembro de 2025
            </h2>
            <p className="mt-3 text-sm text-pink-100/80 leading-6">
              Cada dia juntos é uma nova lembrança. Essa surpresa é para lembrar
              o quanto você é especial e importante para mim.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
