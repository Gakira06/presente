import { useState, useEffect } from "react";
import {
  Heart,
  Calendar,
  Music,
  Play,
  ChevronLeft,
  ChevronRight,
  Images,
} from "lucide-react";
import firstPhoto from "../assets/firstPhoto.jpeg";
import ecaa from "../assets/ecaa.jpeg";
import fofoo from "../assets/fofoo.png";
import dead1 from "../assets/deadburguer1.png";
import dead2 from "../assets/deadburguer2.png";

const START_DATE = new Date("2025-11-07T00:00:00");

function calcularTempo() {
  const agora = new Date();
  const diff = agora - START_DATE;

  const totalSegundos = Math.floor(diff / 1000);
  const segundos = totalSegundos % 60;
  const totalMinutos = Math.floor(totalSegundos / 60);
  const minutos = totalMinutos % 60;
  const totalHoras = Math.floor(totalMinutos / 60);
  const horas = totalHoras % 24;

  const totalDias = Math.floor(diff / (1000 * 60 * 60 * 24));

  let anos = 0;
  let meses = 0;
  let dias = 0;

  const dataAtual = new Date(agora);
  const dataInicio = new Date(START_DATE);

  anos = dataAtual.getFullYear() - dataInicio.getFullYear();
  meses = dataAtual.getMonth() - dataInicio.getMonth();
  dias = dataAtual.getDate() - dataInicio.getDate();

  if (dias < 0) {
    meses -= 1;
    const mesAnterior = new Date(
      dataAtual.getFullYear(),
      dataAtual.getMonth(),
      0,
    );
    dias += mesAnterior.getDate();
  }
  if (meses < 0) {
    anos -= 1;
    meses += 12;
  }

  return {
    anos,
    meses,
    dias,
    horas: String(horas).padStart(2, "0"),
    minutos: String(minutos).padStart(2, "0"),
    segundos: String(segundos).padStart(2, "0"),
  };
}

const SPOTIFY_TRACK_ID = "3eBjtEPgx1Z2O5ILHdEoJ7";

const FOTOS_INICIAIS = [
  {
    src: firstPhoto,
    legenda: "Nosso primeiro foto",
  },
  {
    src: ecaa,
    legenda: "Que nojo😝kkkk",
  },
  {
    src: fofoo,
    legenda: "❤️😏",
  },
  {
    src: dead1,
    legenda: "👹",
  },
  {
    src: dead2,
    legenda: "🤡😜",
  },
];

export default function HomePage() {
  const [tempo, setTempo] = useState(calcularTempo());
  const [musicaEstado, setMusicaEstado] = useState("escondida"); // "escondida" | "revelando" | "revelada"
  const [fotos, setFotos] = useState(FOTOS_INICIAIS);
  const [fotoAtual, setFotoAtual] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTempo(calcularTempo());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  function revelarMusica() {
    setMusicaEstado("revelando");
    setTimeout(() => setMusicaEstado("revelada"), 2000);
  }

  function proximaFoto() {
    setFotoAtual((atual) => (atual + 1) % fotos.length);
  }

  function fotoAnterior() {
    setFotoAtual((atual) => (atual - 1 + fotos.length) % fotos.length);
  }

  function irParaFoto(indice) {
    setFotoAtual(indice);
  }

  function adicionarFotos(evento) {
    const arquivos = Array.from(evento.target.files || []);
    if (!arquivos.length) return;

    const novasFotos = arquivos.map((arquivo) => ({
      src: URL.createObjectURL(arquivo),
      legenda: arquivo.name.replace(/\.[^/.]+$/, ""),
    }));

    setFotos((anteriores) => [...anteriores, ...novasFotos]);
    evento.target.value = "";
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-10 bg-[#09030a]"
      style={{
        backgroundImage:
          "radial-gradient(circle at top, rgba(244,114,182,0.18), transparent 28%), linear-gradient(180deg, #23103b 0%, #0b0210 70%, #020203 100%)",
      }}
    >
      <div className="w-full max-w-3xl rounded-[2rem] border border-white/10 bg-white/5 p-6 sm:p-10 shadow-[0_30px_90px_rgba(0,0,0,0.4)] backdrop-blur-xl">
        {/* Main Content */}
        <div className="flex flex-col items-center justify-center py-12">
          {/* Pink Heart - Featured Content */}
          <div className="mb-8 animate-pulse">
            <Heart className="w-28 h-28 text-pink-400 fill-pink-400 drop-shadow-[0_0_15px_rgba(244,114,182,0.8)]" />
          </div>

          {/* Special Message */}
          <h1 className="text-center text-white font-bold font-serif text-5xl mb-6">
            Para minha
            <br />
            Princesa
          </h1>

          {/* Data */}
          <div className="flex items-center gap-2 text-pink-300 text-sm mb-10">
            <Calendar className="w-4 h-4" />
            <span>Brigando desde 7 de novembro de 2025</span>
          </div>

          {/* Contagem ANO / MESES / DIAS */}
          <div className="flex gap-4 mb-8">
            {[
              { valor: tempo.anos, label: "ANO" },
              { valor: tempo.meses, label: "MESES" },
              { valor: tempo.dias, label: "DIAS" },
            ].map(({ valor, label }) => (
              <div
                key={label}
                className="flex flex-col items-center justify-center w-24 h-24 rounded-2xl text-pink-300"
                style={{
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <span className="text-3xl font-bold text-pink-400">
                  {valor}
                </span>
                <span className="text-xs tracking-widest mt-1">{label}</span>
              </div>
            ))}
          </div>

          {/* Relógio */}
          <div
            className="px-10 py-4 rounded-full text-2xl font-mono text-pink-300 tracking-widest mb-10"
            style={{
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {tempo.horas} : {tempo.minutos} : {tempo.segundos}
          </div>

          {/* Total de dias */}
          <div className="flex items-center gap-2 text-pink-300 text-sm mb-8">
            <span className="text-pink-400">✦</span>
            <span>
              São{" "}
              <strong className="text-white text-base">
                {Math.floor((new Date() - START_DATE) / (1000 * 60 * 60 * 24))}
              </strong>{" "}
              dias de brigaa
            </span>
            <span className="text-pink-400">✦</span>
          </div>

          {/* Scroll hint */}
          <div className="flex flex-col items-center gap-1 text-pink-400 animate-bounce mb-12">
            <Heart className="w-5 h-5 fill-pink-400" />
            <Heart className="w-3 h-3 fill-pink-300 opacity-60" />
          </div>

          {/* Nossa Música */}
          <div
            className="w-full max-w-sm rounded-3xl p-6 mb-8"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,100,150,0.2)",
            }}
          >
            {musicaEstado === "revelada" ? (
              <>
                <div className="flex items-center justify-center gap-2 text-pink-400 font-bold mb-4">
                  <Heart className="w-4 h-4 fill-pink-400" />
                  <span className="text-white">Nossa Música</span>
                  <Heart className="w-4 h-4 fill-pink-400" />
                </div>
                <iframe
                  src={`https://open.spotify.com/embed/track/${SPOTIFY_TRACK_ID}?utm_source=generator&theme=0`}
                  width="100%"
                  height="352"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="rounded-xl"
                />
              </>
            ) : (
              <>
                <div className="flex justify-center mb-4">
                  <Music className="w-10 h-10 text-pink-400" />
                </div>
                <h2 className="text-center text-white font-bold font-serif text-2xl mb-2">
                  Nossa Música
                </h2>
                <p className="text-center text-gray-400 text-sm mb-6">
                  A trilha sonora do nosso amor
                </p>
                <button
                  onClick={revelarMusica}
                  disabled={musicaEstado === "revelando"}
                  className="w-full flex items-center justify-center gap-3 py-3 rounded-full text-white font-semibold transition-all"
                  style={{
                    background:
                      musicaEstado === "revelando"
                        ? "rgba(255,255,255,0.08)"
                        : "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.15)",
                  }}
                >
                  {musicaEstado === "revelando" ? (
                    <>
                      <span className="w-4 h-4 border-2 border-pink-400 border-t-transparent rounded-full animate-spin" />
                      <span className="text-pink-300">Revelando...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 text-pink-300" />
                      <span>Clique para descobrir</span>
                    </>
                  )}
                </button>
                <div className="flex justify-center gap-3 mt-4 text-pink-400 opacity-40">
                  <Music className="w-4 h-4" />
                  <Music className="w-4 h-4" />
                  <Music className="w-4 h-4" />
                </div>
              </>
            )}
          </div>

          {/* Divisor */}
          <div className="w-full max-w-sm flex items-center gap-4 mb-8 mt-2">
            <div className="h-px flex-1 bg-pink-300/40" />
            <Heart className="w-5 h-5 text-pink-400 fill-pink-400" />
            <div className="h-px flex-1 bg-pink-300/40" />
          </div>

          {/* Caixa de texto */}
          <div
            className="w-full max-w-sm rounded-3xl px-6 py-8 mb-12"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,100,150,0.2)",
              boxShadow: "0 12px 30px rgba(255, 40, 150, 0.15)",
            }}
          >
            <p className="text-center text-pink-100/90 italic leading-relaxed text-2xl">
              Eu gosto muito de voce, e odeio isso, porque fico com ciumes, e
              acabo ficando triste com certas coisas, e tenho medo do que pode
              acontecer, adoro ser idiota e te irritar, e como voce nao percebeu
              ate agora, adoro ficar agarrado com vc, Te amo❤️
            </p>
          </div>

          {/* Divisor */}
          <div className="w-full max-w-sm flex items-center gap-4 mb-8 mt-2">
            <div className="h-px flex-1 bg-pink-300/40" />
            <Heart className="w-5 h-5 text-pink-400 fill-pink-400" />
            <div className="h-px flex-1 bg-pink-300/40" />
          </div>

          {/* Nossos Momentos */}
          <section className="w-full max-w-sm mb-16">
            <h2 className="text-center text-white font-bold font-serif text-5xl mb-3">
              Nossos Momentos
            </h2>

            <label
              className="w-full mb-4 rounded-2xl px-4 py-3 flex items-center justify-center gap-2 cursor-pointer"
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,100,150,0.25)",
              }}
            >
              <Images className="w-4 h-4 text-pink-300" />
              <span className="text-pink-200 text-sm">
                Adicionar fotos sem limite
              </span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={adicionarFotos}
                className="hidden"
              />
            </label>

            <div
              className="rounded-3xl p-4"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,100,150,0.2)",
              }}
            >
              <div className="relative rounded-2xl overflow-hidden bg-black/30 h-[360px]">
                <img
                  src={fotos[fotoAtual].src}
                  alt={fotos[fotoAtual].legenda}
                  className="w-full h-full object-cover"
                />

                <button
                  onClick={fotoAnterior}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-black/35 text-white flex items-center justify-center"
                  aria-label="Foto anterior"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  onClick={proximaFoto}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-black/35 text-white flex items-center justify-center"
                  aria-label="Proxima foto"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                <div className="absolute top-3 right-3 px-3 py-1 rounded-lg text-sm text-white bg-black/45">
                  {fotoAtual + 1} / {fotos.length}
                </div>
              </div>

              <p className="text-center text-pink-200 italic text-xl mt-4">
                "{fotos[fotoAtual].legenda}"
              </p>

              <div className="mt-4 flex gap-2 overflow-x-auto pb-1 photo-strip">
                {fotos.map((foto, indice) => (
                  <button
                    key={`${foto.src}-${indice}`}
                    onClick={() => irParaFoto(indice)}
                    className="shrink-0 rounded-xl overflow-hidden border-2"
                    style={{
                      borderColor:
                        indice === fotoAtual
                          ? "rgba(255, 90, 180, 0.95)"
                          : "rgba(255,255,255,0.15)",
                    }}
                    aria-label={`Abrir foto ${indice + 1}`}
                  >
                    <img
                      src={foto.src}
                      alt={foto.legenda}
                      className="w-20 h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
