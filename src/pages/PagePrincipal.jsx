import { useEffect, useRef, useState } from "react";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Heart,
  Images,
  Music,
  Play,
  Sparkles,
} from "lucide-react";
import firstPhoto from "../assets/firstPhoto.jpeg";
import ecaa from "../assets/ecaa.jpeg";
import fofoo from "../assets/fofoo.png";
import dead1 from "../assets/deadburguer1.png";
import dead2 from "../assets/deadburguer2.png";
import diaNaoTaoBom from "../assets/diaNaoTaoBom.png";

const START_DATE = new Date("2025-11-07T00:00:00");
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
  {
    src: diaNaoTaoBom,
    legenda: "Nunca mais vou te deixar sozinha, desculpa por ter brigaado com vc",
  },
  
];

const GOSTOS_DELA = [
  "O seu soriso",
  "Sua carinha de brava",
  "Quando você acaba de acordar",
  "O seu cabelo bagunçado",
  "Seu pescoço 😏",
];

const COISAS_QUE_ELA_GOSTA_DE_FAZER = [
  "Ficar comigo",
  "Me irritar do nada",
  "Mandar mensagem quando sente saudade",
  "Ficar agarradinha",
  "Sair",
  "Dormir",
  "Comer hamburguer",
  "Cheedar",
  "Dançar",
  "Conversar",
  "Saber da minha vida",
  "fofocar",
];

const DECORACOES_FLUTUANTES = [
  { tipo: "heart", left: 8, top: 9, size: 18, delay: 0, duration: 9 },
  { tipo: "spark", left: 85, top: 8, size: 16, delay: 1.3, duration: 8 },
  { tipo: "heart", left: 92, top: 23, size: 13, delay: 2.2, duration: 10 },
  { tipo: "spark", left: 13, top: 31, size: 14, delay: 0.8, duration: 7 },
  { tipo: "heart", left: 5, top: 54, size: 15, delay: 3.1, duration: 11 },
  { tipo: "spark", left: 88, top: 57, size: 18, delay: 2.6, duration: 9 },
  { tipo: "heart", left: 17, top: 76, size: 12, delay: 1.7, duration: 8 },
  { tipo: "spark", left: 77, top: 82, size: 15, delay: 3.8, duration: 10 },
];

function calcularTempo() {
  const agora = new Date();
  const diff = agora - START_DATE;

  const totalSegundos = Math.floor(diff / 1000);
  const segundos = totalSegundos % 60;
  const totalMinutos = Math.floor(totalSegundos / 60);
  const minutos = totalMinutos % 60;
  const totalHoras = Math.floor(totalMinutos / 60);
  const horas = totalHoras % 24;

  const dataAtual = new Date(agora);
  const dataInicio = new Date(START_DATE);

  let anos = dataAtual.getFullYear() - dataInicio.getFullYear();
  let meses = dataAtual.getMonth() - dataInicio.getMonth();
  let dias = dataAtual.getDate() - dataInicio.getDate();

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

function totalDiasJuntos() {
  return Math.floor((new Date() - START_DATE) / (1000 * 60 * 60 * 24));
}

export default function PagePrincipal() {
  const [tempo, setTempo] = useState(calcularTempo());
  const [musicaEstado, setMusicaEstado] = useState("escondida");
  const [fotos, setFotos] = useState(FOTOS_INICIAIS);
  const [fotoAtual, setFotoAtual] = useState(0);
  const [secaoLiberada, setSecaoLiberada] = useState(1);
  const [coracoesSoltos, setCoracoesSoltos] = useState([]);

  const musicaRef = useRef(null);
  const textoRef = useRef(null);
  const gostosRef = useRef(null);
  const fazeresRef = useRef(null);
  const momentosRef = useRef(null);

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

  function liberarProximaSecao(proximaSecao, proximoElemento) {
    setSecaoLiberada((atual) => Math.max(atual, proximaSecao));
    setCoracoesSoltos(
      Array.from({ length: 12 }, (_, indice) => ({
        id: `${Date.now()}-${indice}`,
        left: 12 + Math.random() * 76,
        delay: Math.random() * 0.18,
        size: 12 + Math.random() * 12,
      })),
    );

    setTimeout(() => setCoracoesSoltos([]), 1100);
    setTimeout(() => {
      proximoElemento.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 220);
  }

  return (
    <div
      className="relative min-h-screen overflow-hidden flex items-center justify-center px-4 py-10 bg-[#09030a]"
      style={{
        backgroundImage:
          "radial-gradient(circle at top, rgba(244,114,182,0.18), transparent 28%), linear-gradient(180deg, #23103b 0%, #0b0210 70%, #020203 100%)",
      }}
    >
      <FloatingDecor />

      <div className="relative z-10 w-full max-w-3xl rounded-[2rem] border border-white/10 bg-white/5 p-6 sm:p-10 shadow-[0_30px_90px_rgba(0,0,0,0.4)] backdrop-blur-xl">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="main-heart mb-8 animate-pulse">
            <Heart className="w-28 h-28 text-pink-400 fill-pink-400 drop-shadow-[0_0_15px_rgba(244,114,182,0.8)]" />
          </div>

          <h1 className="text-center text-white font-bold font-serif text-5xl mb-6">
            Para minha
            <br />
            Princesa
          </h1>

          <div className="flex items-center gap-2 text-pink-300 text-sm mb-10">
            <Calendar className="w-4 h-4" />
            <span>Brigando desde 7 de novembro de 2025</span>
          </div>

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

          <div
            className="px-10 py-4 rounded-full text-2xl font-mono text-pink-300 tracking-widest mb-10"
            style={{
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {tempo.horas} : {tempo.minutos} : {tempo.segundos}
          </div>

          <div className="flex items-center gap-2 text-pink-300 text-sm mb-8">
            <span className="text-pink-400">✦</span>
            <span>
              São{" "}
              <strong className="text-white text-base">
                {totalDiasJuntos()}
              </strong>{" "}
              dias de brigaa
            </span>
            <span className="text-pink-400">✦</span>
          </div>

          {secaoLiberada < 2 && (
            <HeartGate
              coracoesSoltos={coracoesSoltos}
              label="Clique no coração"
              onClick={() => liberarProximaSecao(2, musicaRef)}
            />
          )}

          {secaoLiberada >= 2 && (
            <>
              <div
                ref={musicaRef}
                className="w-full max-w-sm rounded-3xl p-6 mb-8 reveal-section"
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

              {secaoLiberada < 3 && (
                <HeartGate
                  coracoesSoltos={coracoesSoltos}
                  label="Mais uma surpresa"
                  onClick={() => liberarProximaSecao(3, textoRef)}
                />
              )}
            </>
          )}

          {secaoLiberada >= 3 && (
            <>
              <div
                ref={textoRef}
                className="w-full max-w-sm rounded-3xl px-6 py-8 mb-12 reveal-section"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,100,150,0.2)",
                  boxShadow: "0 12px 30px rgba(255, 40, 150, 0.15)",
                }}
              >
                <p className="text-center text-pink-100/90 italic leading-relaxed text-2xl">
                  Eu adoro seu jeitinho de maluca, seu lado toxico, quando voce fica toda fofa, quando voce fica toda grudenta, adoro quando voce fica com ciúmes,
                   adoro ser idiota e te irritar, e como voce nao
                  percebeu ate agora, adoro ficar agarrado com vc, E me desculpa por todas as vezes que ja te chatei, e mesmo você não gostando das minhas desculpas vou continuar pedindo porque isso é meu jeito de mostrar que me importo com você.<br/>Eu te amo❤️
                </p>
              </div>

              {secaoLiberada < 4 && (
                <HeartGate
                  coracoesSoltos={coracoesSoltos}
                  label="Coisas dela"
                  onClick={() => liberarProximaSecao(4, gostosRef)}
                />
              )}
            </>
          )}

          {secaoLiberada >= 4 && (
            <>
              <section
                ref={gostosRef}
                className="w-full max-w-sm rounded-3xl px-6 py-8 mb-12 reveal-section"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,100,150,0.2)",
                  boxShadow: "0 12px 30px rgba(255, 40, 150, 0.12)",
                }}
              >
                <div className="flex items-center justify-center gap-2 text-pink-400 font-bold mb-5">
                  <Heart className="w-4 h-4 fill-pink-400" />
                  <h2 className="text-center text-white font-serif text-3xl">
                    O que eu mais amo em você
                  </h2>
                  <Heart className="w-4 h-4 fill-pink-400" />
                </div>

                <ol className="space-y-3">
                  {GOSTOS_DELA.map((gosto, indice) => (
                    <li
                      key={gosto}
                      className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-pink-100"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-pink-500/20 text-sm font-bold text-pink-300">
                        {indice + 1}
                      </span>
                      <span className="text-base leading-5">{gosto}</span>
                    </li>
                  ))}
                </ol>
              </section>

              {secaoLiberada < 5 && (
                <HeartGate
                  coracoesSoltos={coracoesSoltos}
                  label="O que ela faz"
                  onClick={() => liberarProximaSecao(5, fazeresRef)}
                />
              )}
            </>
          )}

          {secaoLiberada >= 5 && (
            <>
              <section
                ref={fazeresRef}
                className="w-full max-w-sm rounded-3xl px-6 py-8 mb-12 reveal-section"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,100,150,0.2)",
                  boxShadow: "0 12px 30px rgba(255, 40, 150, 0.12)",
                }}
              >
                <div className="flex items-center justify-center gap-2 text-pink-400 font-bold mb-5">
                  <Heart className="w-4 h-4 fill-pink-400" />
                  <h2 className="text-center text-white font-serif text-3xl">
                    O que você mais gosta de fazer
                  </h2>
                  <Heart className="w-4 h-4 fill-pink-400" />
                </div>

                <ol className="space-y-3">
                  {COISAS_QUE_ELA_GOSTA_DE_FAZER.map((coisa, indice) => (
                    <li
                      key={coisa}
                      className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-pink-100"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-pink-500/20 text-sm font-bold text-pink-300">
                        {indice + 1}
                      </span>
                      <span className="text-base leading-5">{coisa}</span>
                    </li>
                  ))}
                </ol>
              </section>

              {secaoLiberada < 6 && (
                <HeartGate
                  coracoesSoltos={coracoesSoltos}
                  label="Abrir momentos"
                  onClick={() => liberarProximaSecao(6, momentosRef)}
                />
              )}
            </>
          )}

          {secaoLiberada >= 6 && (
            <section
              ref={momentosRef}
              className="w-full max-w-sm mb-16 reveal-section"
            >
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
          )}
        </div>
      </div>
    </div>
  );
}

function FloatingDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      <div className="absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_62%)]" />

      {DECORACOES_FLUTUANTES.map((decoracao, indice) => {
        const Icone = decoracao.tipo === "heart" ? Heart : Sparkles;

        return (
          <Icone
            key={`${decoracao.tipo}-${indice}`}
            className={`floating-decor absolute ${
              decoracao.tipo === "heart"
                ? "fill-pink-300/35 text-pink-300/55"
                : "text-rose-100/55"
            }`}
            style={{
              left: `${decoracao.left}%`,
              top: `${decoracao.top}%`,
              width: `${decoracao.size}px`,
              height: `${decoracao.size}px`,
              animationDelay: `${decoracao.delay}s`,
              animationDuration: `${decoracao.duration}s`,
            }}
          />
        );
      })}
    </div>
  );
}

function HeartGate({ label, onClick, coracoesSoltos }) {
  return (
    <div className="relative w-full max-w-sm flex items-center gap-4 mb-12 mt-2">
      <div className="h-px flex-1 bg-pink-300/40" />
      <button
        type="button"
        onClick={onClick}
        className="group relative flex flex-col items-center gap-2 text-pink-300"
      >
        <span className="absolute inset-0 -m-4 rounded-full bg-pink-400/20 blur-xl opacity-0 transition-opacity group-hover:opacity-100" />
        <span className="relative flex h-14 w-14 items-center justify-center rounded-full border border-pink-300/40 bg-pink-500/15 shadow-[0_0_28px_rgba(244,114,182,0.35)] transition duration-300 group-hover:scale-110 group-active:scale-95">
          <Heart className="w-7 h-7 fill-pink-400 text-pink-400" />
        </span>
        <span className="relative text-xs font-semibold uppercase tracking-[0.22em] text-pink-200/80">
          {label}
        </span>
      </button>
      <div className="h-px flex-1 bg-pink-300/40" />

      {coracoesSoltos.map((coracao) => (
        <Heart
          key={coracao.id}
          className="heart-pop absolute bottom-12 fill-pink-300 text-pink-300"
          style={{
            left: `${coracao.left}%`,
            width: `${coracao.size}px`,
            height: `${coracao.size}px`,
            animationDelay: `${coracao.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
