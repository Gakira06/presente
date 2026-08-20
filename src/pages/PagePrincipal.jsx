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
  X,
} from "lucide-react";
import firstPhoto from "../assets/firstPhoto.jpeg";
import ecaa from "../assets/ecaa.jpeg";
import fofoo from "../assets/fofoo.png";
import dead1 from "../assets/deadburguer1.png";
import dead2 from "../assets/deadburguer2.png";
import diaNaoTaoBom from "../assets/diaNaoTaoBom.png";
import shopping from "../assets/shopping.png";
import ibira1 from "../assets/ibira1.png";
import ibira2 from "../assets/ibira2.png";

import roupaBrasil from "../assets/roupaBrasil.png";
import miranha1 from "../assets/miranha1.png";
import miranha2 from "../assets/miranha2.png";
import miranha3 from "../assets/miranha3.png";
import lookFavorito from "../assets/lookFavorito.png";
import gostosa1 from "../assets/gostosa1.png";
import gostosa2 from "../assets/gostosa2.png";
import ela1 from "../assets/ela/1.png";
import ela2 from "../assets/ela/2.png";
import ela3 from "../assets/ela/3.png";
import ela4 from "../assets/ela/4.png";
import ela5 from "../assets/ela/5.png";
import ela6 from "../assets/ela/6.png";
import ela7 from "../assets/ela/7.png";
import ela8 from "../assets/ela/8.png";
import ela9 from "../assets/ela/9.png";
import ela10 from "../assets/ela/10.png";
import elaVideo from "../assets/ela/mulherLavando.mp4";
import buque1 from "../assets/buques/1.png";
import buque2 from "../assets/buques/2.png";
import buque3 from "../assets/buques/3.png";
import buque4 from "../assets/buques/4.png";
import buque5 from "../assets/buques/5.png";
import ele1 from "../assets/ele/1.png";
import ele2 from "../assets/ele/2.png";
import ele3 from "../assets/ele/3.png";
import ele4 from "../assets/ele/4.png";
import ele5 from "../assets/ele/5.png";
import ele6 from "../assets/ele/6.png";
import ele7 from "../assets/ele/7.png";
import ele8 from "../assets/ele/8.png";
import ele9 from "../assets/ele/9.png";
import ele10 from "../assets/ele/10.png";
import ele11 from "../assets/ele/11.png";
import ele12 from "../assets/ele/12.png";
import ele13 from "../assets/ele/13.png";
import {
  alternarFavorito,
  buscarFavoritos,
  buscarFotos,
  enviarFoto,
} from "../lib/fotos";

function comIds(prefixo, lista) {
  return lista.map((foto, indice) => ({ ...foto, id: `${prefixo}-${indice}` }));
}

function ordenarPorFavorito(lista, favoritos) {
  return [...lista].sort((a, b) => {
    const aFavorita = favoritos.includes(a.id) ? 0 : 1;
    const bFavorita = favoritos.includes(b.id) ? 0 : 1;
    return aFavorita - bFavorita;
  });
}

function normalizarFotosServidor(fotosServidor) {
  return fotosServidor.map((foto) => ({
    id: foto.url,
    src: foto.url,
    legenda: foto.legenda,
    tipo: foto.tipo,
  }));
}

const START_DATE = new Date("2025-11-07T00:00:00");
const MUSICAS = [
  { tipo: "track", id: "7A4O4g0PiUEcn0LCdblnqK", altura: 352 },
  { tipo: "album", id: "6j9LDGvDDXpfFvKYC1AzvK", altura: 152 },
];

const FOTOS_INICIAIS = comIds("inicial", [
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
  {
    src: shopping,
    legenda: "Filme do krl kkkk",
  },
  {
    src: ibira1,
    legenda: "ibirapuera",
  },
  {
    src: ibira2,
    legenda: "Ce é lindaa mulheeer",
  },
  {
    src: roupaBrasil,
    legenda: "Roupa do Brasil",
  },
  {
    src: miranha1,
    legenda: "Miranha",
  },
  {
    src: miranha2,
    legenda: "Miranha",
  },
  {
    src: miranha3,
    legenda: "Miranha",
  },
  {
    src: lookFavorito,
    legenda: "Meu look favorito seu",
  },
  {
    src: gostosa1,
    legenda: "Gostosa",
  },
  {
    src: gostosa2,
    legenda: "Gostosa",
  },
  // {
  //   src: mulherLavando,
  //   legenda: "Mulher lavando",
  //   tipo: "video",
  // },
]);

const FOTOS_DELA = comIds("dela", [
  { src: ela1, legenda: "" },
  { src: ela2, legenda: "" },
  { src: ela3, legenda: "" },
  { src: ela4, legenda: "" },
  { src: ela5, legenda: "" },
  { src: ela6, legenda: "" },
  { src: ela7, legenda: "" },
  { src: ela8, legenda: "" },
  { src: ela9, legenda: "" },
  { src: ela10, legenda: "" },
  { src: elaVideo, legenda: "", tipo: "video" },
]);

// Mesma coisa, só que com as suas fotos
const FOTOS_DELE = comIds("dele", [
  { src: ele1, legenda: "" },
  { src: ele2, legenda: "" },
  { src: ele3, legenda: "" },
  { src: ele4, legenda: "" },
  { src: ele5, legenda: "" },
  { src: ele6, legenda: "" },
  { src: ele7, legenda: "" },
  { src: ele8, legenda: "" },
  { src: ele9, legenda: "" },
  { src: ele10, legenda: "" },
  { src: ele11, legenda: "" },
  { src: ele12, legenda: "" },
  { src: ele13, legenda: "" },
]);

// Fotos do buquê
const FOTOS_BUQUE = comIds("buque", [
  { src: buque1, legenda: "" },
  { src: buque2, legenda: "" },
  { src: buque3, legenda: "" },
  { src: buque4, legenda: "" },
  { src: buque5, legenda: "" },
]);

const PROMESSAS = [
  "Podemos fazer uma promessa?",
  "Vamos prometer nunca parar de tentar, mesmo nos dias difíceis, e escolher sempre melhorarmos juntos, tanto para nós mesmos quanto para nos tornarmos um casal melhor",
  "Vamos prometer nunca deixar o relacionamento como algo rotineiro, aproveitar as pequenas coisas e dizer \"Eu te amo\" sempre que pudermos",
  "Vamos prometer crescer juntos, sonhar juntos e sempre apoiar e cuidar um do outro",
  "Vamos prometer nunca abandonar o outro em momentos ruins e ser a pessoa que um ao outro mais confia e se sente relaxado e cuidado",
];

const GOSTOS_DELA = [
  "O seu soriso",
  "O seu cabelo",
  "Nossas fofocas",
  "Seu lado tarada",
  "Seu lado toxica",
  "Você querer saber da minha vida",
  "Seu ciúmes",
  "Sua carinha de brava",
  "Quando você acaba de acordar",
  "O seu cabelo bagunçado",
  "Seu pescoço 😏",
  "Seus peitos 🤱",
  "Sua bunda 🍑",
];

const COISAS_QUE_ELA_GOSTA_DE_FAZER = [
  "Ficar comigo",
  "Me irritar do nada",
  "Mandar mensagem quando sente saudade",
  "Ficar agarradinha",
  "Sair",
  "Dormir",
  "Comer hamburguer",
  "Pastel",
  "Salsicha",
  "Ler livro",
  "Assistir filme",
  "Ver serie",
  "Lego",
  "Quebra cabeça",
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
  const [musicaAtual, setMusicaAtual] = useState(0);
  const [fotos, setFotos] = useState(FOTOS_INICIAIS);
  const [fotoAtualId, setFotoAtualId] = useState(FOTOS_INICIAIS[0]?.id ?? null);
  const [enviandoFotos, setEnviandoFotos] = useState(false);
  const [favoritos, setFavoritos] = useState([]);
  const [fotoAmpliada, setFotoAmpliada] = useState(null);
  const [secaoLiberada, setSecaoLiberada] = useState(1);
  const [coracoesSoltos, setCoracoesSoltos] = useState([]);
  const [gostosRevelados, setGostosRevelados] = useState(1);
  const [fazeresRevelados, setFazeresRevelados] = useState(1);
  const [promessaAtual, setPromessaAtual] = useState(0);

  const musicaRef = useRef(null);
  const textoRef = useRef(null);
  const promessasRef = useRef(null);
  const gostosRef = useRef(null);
  const fazeresRef = useRef(null);
  const momentosRef = useRef(null);
  const promessaInicioX = useRef(null);

  const fotosOrdenadas = ordenarPorFavorito(fotos, favoritos);
  const indiceAtual = Math.max(
    0,
    fotosOrdenadas.findIndex((foto) => foto.id === fotoAtualId),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTempo(calcularTempo());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    buscarFotos()
      .then((fotosServidor) => {
        if (fotosServidor.length) {
          setFotos([...FOTOS_INICIAIS, ...normalizarFotosServidor(fotosServidor)]);
        }
      })
      .catch((erro) => console.error("Não foi possível carregar as fotos", erro));

    buscarFavoritos()
      .then(setFavoritos)
      .catch((erro) => console.error("Não foi possível carregar os favoritos", erro));
  }, []);

  async function favoritar(id) {
    setFavoritos((atual) =>
      atual.includes(id)
        ? atual.filter((favoritoId) => favoritoId !== id)
        : [...atual, id],
    );

    try {
      await alternarFavorito(id);
    } catch (erro) {
      console.error("Não foi possível favoritar", erro);
    }
  }

  function revelarMusica() {
    setMusicaEstado("revelando");
    setTimeout(() => setMusicaEstado("revelada"), 2000);
  }

  function proximaMusica() {
    setMusicaAtual((atual) => (atual + 1) % MUSICAS.length);
  }

  function musicaAnterior() {
    setMusicaAtual((atual) => (atual - 1 + MUSICAS.length) % MUSICAS.length);
  }

  function proximaFoto() {
    const proximo = fotosOrdenadas[(indiceAtual + 1) % fotosOrdenadas.length];
    setFotoAtualId(proximo.id);
  }

  function fotoAnterior() {
    const anterior =
      fotosOrdenadas[
        (indiceAtual - 1 + fotosOrdenadas.length) % fotosOrdenadas.length
      ];
    setFotoAtualId(anterior.id);
  }

  function irParaFoto(id) {
    setFotoAtualId(id);
  }

  function irDiretoParaFotos() {
    setSecaoLiberada((atual) => Math.max(atual, 7));
    setGostosRevelados(GOSTOS_DELA.length);
    setFazeresRevelados(COISAS_QUE_ELA_GOSTA_DE_FAZER.length);
    setTimeout(() => {
      momentosRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }

  async function adicionarFotos(evento) {
    const arquivos = Array.from(evento.target.files || []);
    evento.target.value = "";
    if (!arquivos.length) return;

    setEnviandoFotos(true);
    try {
      for (const arquivo of arquivos) {
        await enviarFoto(arquivo);
      }
      const fotosServidor = await buscarFotos();
      setFotos([...FOTOS_INICIAIS, ...normalizarFotosServidor(fotosServidor)]);
    } catch (erro) {
      console.error("Não foi possível enviar a foto", erro);
      alert("Não foi possível enviar a foto. Tente novamente.");
    } finally {
      setEnviandoFotos(false);
    }
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

  function revelarProximoGosto() {
    setGostosRevelados((atual) => Math.min(atual + 1, GOSTOS_DELA.length));
  }

  function revelarProximoFazer() {
    setFazeresRevelados((atual) =>
      Math.min(atual + 1, COISAS_QUE_ELA_GOSTA_DE_FAZER.length),
    );
  }

  function proximaPromessa() {
    setPromessaAtual((atual) => (atual + 1) % PROMESSAS.length);
  }

  function promessaAnterior() {
    setPromessaAtual((atual) => (atual - 1 + PROMESSAS.length) % PROMESSAS.length);
  }

  function iniciarInteracaoPromessa(evento) {
    promessaInicioX.current = evento.clientX;
  }

  function finalizarInteracaoPromessa(evento) {
    if (promessaInicioX.current === null) return;
    const deltaX = evento.clientX - promessaInicioX.current;
    promessaInicioX.current = null;

    if (deltaX > 40) {
      promessaAnterior();
    } else {
      proximaPromessa();
    }
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

          <span className="inline-flex items-center gap-2 rounded-full border border-pink-300/30 bg-pink-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-pink-200 mb-5">
            <Heart className="w-3 h-3 fill-pink-300 text-pink-300" />
            Pro amor da minha vida
          </span>

          <h1 className="text-center text-white font-bold font-serif text-5xl mb-6">
            Sarah,
            <br />
            minha namorada
          </h1>

          <div className="flex items-center gap-2 text-pink-300 text-sm mb-10">
            <Calendar className="w-4 h-4" />
            <span>Juntos (e brigando) desde 7 de novembro de 2025</span>
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

          <div className="flex items-center gap-2 text-pink-300 text-sm mb-8 justify-center text-center items-center">
            <span className="text-pink-400 ">✦</span>
            <span>
              São{" "}
              <strong className="text-white text-base">
                {totalDiasJuntos()}
              </strong>{" "}
              dias sendo seu, com direito a brigas e amor,<br/> e eu espero que seja por muitos e muitos anos mais
            </span>
            <span className="text-pink-400">✦</span>
          </div>

          <button
            type="button"
            onClick={irDiretoParaFotos}
            className="mb-10 inline-flex items-center gap-2 rounded-full border border-pink-300/30 bg-pink-500/10 px-5 py-2.5 text-sm font-semibold text-pink-200 transition duration-300 hover:bg-pink-500/20 hover:-translate-y-0.5"
          >
            <Images className="w-4 h-4" />
            Ir direto para as fotos
          </button>

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
                      key={musicaAtual}
                      src={`https://open.spotify.com/embed/${MUSICAS[musicaAtual].tipo}/${MUSICAS[musicaAtual].id}?utm_source=generator&theme=0`}
                      width="100%"
                      height={MUSICAS[musicaAtual].altura}
                      frameBorder="0"
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                      className="rounded-xl"
                    />

                    <div className="mt-3 flex items-center justify-center gap-4">
                      <button
                        onClick={musicaAnterior}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-pink-200 transition hover:bg-white/20"
                        aria-label="Música anterior"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>

                      <div className="flex gap-1.5">
                        {MUSICAS.map((_, indice) => (
                          <span
                            key={indice}
                            className="h-1.5 w-1.5 rounded-full"
                            style={{
                              background:
                                indice === musicaAtual
                                  ? "rgba(244,114,182,0.9)"
                                  : "rgba(255,255,255,0.25)",
                            }}
                          />
                        ))}
                      </div>

                      <button
                        onClick={proximaMusica}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-pink-200 transition hover:bg-white/20"
                        aria-label="Próxima música"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-center mb-4">
                      <Music className="w-10 h-10 text-pink-400" />
                    </div>
                    <h2 className="text-center text-white font-bold font-serif text-2xl mb-2">
                      Nossa Música
                    </h2>
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
                  Sarah, eu adoro seu jeitinho de maluca, seu lado toxico, quando voce fica toda fofa, quando voce fica toda grudenta, adoro quando voce fica com ciúmes,
                   adoro ser idiota e te irritar, adoro que você se esforça pela coisas que você quer, e como voce nao
                  percebeu ate agora, adoro ficar agarrado com vc, E me desculpa por todas as vezes que ja te chatei, e mesmo você não gostando das minhas desculpas vou continuar pedindo porque isso é meu jeito de mostrar que me importo com você.<br/>Eu quero ser a pessoa que você mais confia, quero ser seu melhor amigo, quero ser o primeiro a saber dos seus problemas, quero poder te ajudar, quero ser o lugar onde você se acalma e esquece dos seus problemas.<br/>Prometo cuidar do que a gente construiu com todo cuidado do mundo.<br/>
                  Amor e me desculpa por ter sido egoista e ter chateado e estragado uma das surpresas, nem sei se vc vai gostar mais das outras agora, mas queria que esse final de semana fosse o melhor final de semana nosso. Eu espero que voce me de mais uma chance e tente entender depois de domingo<br/>Eu te amo muito❤️
                </p>
              </div>

              {secaoLiberada < 4 && (
                <HeartGate
                  coracoesSoltos={coracoesSoltos}
                  label="Uma promessa"
                  onClick={() => liberarProximaSecao(4, promessasRef)}
                />
              )}
            </>
          )}

          {secaoLiberada >= 4 && (
            <>
              <div
                ref={promessasRef}
                onPointerDown={iniciarInteracaoPromessa}
                onPointerUp={finalizarInteracaoPromessa}
                className="w-full max-w-sm cursor-grab select-none rounded-3xl px-6 py-8 mb-8 reveal-section active:cursor-grabbing"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,100,150,0.2)",
                  boxShadow: "0 12px 30px rgba(255, 40, 150, 0.15)",
                }}
              >
                {promessaAtual === 0 ? (
                  <h2 className="text-center text-white font-bold font-serif text-3xl leading-snug">
                    {PROMESSAS[0]}
                  </h2>
                ) : (
                  <>
                    <div className="flex items-center justify-center gap-2 text-pink-400 font-bold mb-4">
                      <Heart className="w-4 h-4 fill-pink-400" />
                      <span className="text-white text-sm uppercase tracking-[0.2em]">
                        Promessa {promessaAtual} de {PROMESSAS.length - 1}
                      </span>
                      <Heart className="w-4 h-4 fill-pink-400" />
                    </div>
                    <p className="text-center text-pink-100/90 italic leading-relaxed text-xl">
                      {PROMESSAS[promessaAtual]}
                    </p>
                  </>
                )}

                <div className="mt-6 flex items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={promessaAnterior}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-pink-200 transition hover:bg-white/20"
                    aria-label="Promessa anterior"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <div className="flex gap-1.5">
                    {PROMESSAS.map((_, indice) => (
                      <span
                        key={indice}
                        className="h-1.5 w-1.5 rounded-full"
                        style={{
                          background:
                            indice === promessaAtual
                              ? "rgba(244,114,182,0.9)"
                              : "rgba(255,255,255,0.25)",
                        }}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={proximaPromessa}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-pink-200 transition hover:bg-white/20"
                    aria-label="Próxima promessa"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {secaoLiberada < 5 && (
                <HeartGate
                  coracoesSoltos={coracoesSoltos}
                  label="Coisas dela"
                  onClick={() => liberarProximaSecao(5, gostosRef)}
                />
              )}
            </>
          )}

          {secaoLiberada >= 5 && (
            <>
              <section
                ref={gostosRef}
                onClick={revelarProximoGosto}
                className="w-full max-w-sm cursor-pointer rounded-3xl px-6 py-8 mb-12 reveal-section"
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
                  {GOSTOS_DELA.slice(0, gostosRevelados).map((gosto, indice) => (
                    <li
                      key={`${gosto}-${indice}`}
                      className="list-item-reveal flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-pink-100"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-pink-500/20 text-sm font-bold text-pink-300">
                        {indice + 1}
                      </span>
                      <span className="text-base leading-5">{gosto}</span>
                    </li>
                  ))}
                </ol>
              </section>

              {secaoLiberada < 6 && gostosRevelados === GOSTOS_DELA.length && (
                <HeartGate
                  coracoesSoltos={coracoesSoltos}
                  label="O que ela faz"
                  onClick={() => liberarProximaSecao(6, fazeresRef)}
                />
              )}
            </>
          )}

          {secaoLiberada >= 6 && (
            <>
              <section
                ref={fazeresRef}
                onClick={revelarProximoFazer}
                className="w-full max-w-sm cursor-pointer rounded-3xl px-6 py-8 mb-12 reveal-section"
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
                  {COISAS_QUE_ELA_GOSTA_DE_FAZER.slice(0, fazeresRevelados).map((coisa, indice) => (
                    <li
                      key={`${coisa}-${indice}`}
                      className="list-item-reveal flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-pink-100"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-pink-500/20 text-sm font-bold text-pink-300">
                        {indice + 1}
                      </span>
                      <span className="text-base leading-5">{coisa}</span>
                    </li>
                  ))}
                </ol>
              </section>

              {secaoLiberada < 7 &&
                fazeresRevelados === COISAS_QUE_ELA_GOSTA_DE_FAZER.length && (
                <HeartGate
                  coracoesSoltos={coracoesSoltos}
                  label="Abrir momentos"
                  onClick={() => liberarProximaSecao(7, momentosRef)}
                />
              )}
            </>
          )}

          {secaoLiberada >= 7 && (
            <>
            <section
              ref={momentosRef}
              className="w-full max-w-sm mb-16 reveal-section"
            >
              <h2 className="text-center text-white font-bold font-serif text-5xl mb-3">
                Nossos Momentos
              </h2>

              <label
                className={`w-full mb-4 rounded-2xl px-4 py-3 flex items-center justify-center gap-2 ${
                  enviandoFotos ? "cursor-wait opacity-70" : "cursor-pointer"
                }`}
                style={{
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,100,150,0.25)",
                }}
              >
                {enviandoFotos ? (
                  <span className="w-4 h-4 border-2 border-pink-400 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Images className="w-4 h-4 text-pink-300" />
                )}
                <span className="text-pink-200 text-sm">
                  {enviandoFotos ? "Enviando..." : "Adicionar fotos sem limite"}
                </span>
                <input
                  type="file"
                  accept="image/*,video/*"
                  multiple
                  onChange={adicionarFotos}
                  disabled={enviandoFotos}
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
                  {fotosOrdenadas[indiceAtual].tipo === "video" ? (
                    <video
                      src={fotosOrdenadas[indiceAtual].src}
                      className="w-full h-full object-cover cursor-zoom-in"
                      controls
                      playsInline
                      onClick={() => setFotoAmpliada(fotosOrdenadas[indiceAtual])}
                    />
                  ) : (
                    <img
                      src={fotosOrdenadas[indiceAtual].src}
                      alt={fotosOrdenadas[indiceAtual].legenda}
                      className="w-full h-full object-cover cursor-zoom-in"
                      onClick={() => setFotoAmpliada(fotosOrdenadas[indiceAtual])}
                    />
                  )}

                  <BotaoFavorito
                    ativo={favoritos.includes(fotosOrdenadas[indiceAtual].id)}
                    onClick={() => favoritar(fotosOrdenadas[indiceAtual].id)}
                    className="absolute top-3 left-3 w-9 h-9"
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
                    {indiceAtual + 1} / {fotosOrdenadas.length}
                  </div>
                </div>

                <p className="text-center text-pink-200 italic text-xl mt-4">
                  "{fotosOrdenadas[indiceAtual].legenda}"
                </p>

                <div className="mt-4 flex gap-2 overflow-x-auto pb-1 photo-strip">
                  {fotosOrdenadas.map((foto, indice) => (
                    <button
                      key={foto.id}
                      onClick={() => irParaFoto(foto.id)}
                      className="relative shrink-0 rounded-xl overflow-hidden border-2"
                      style={{
                        borderColor:
                          foto.id === fotoAtualId
                            ? "rgba(255, 90, 180, 0.95)"
                            : "rgba(255,255,255,0.15)",
                      }}
                      aria-label={`Abrir foto ${indice + 1}`}
                    >
                      {foto.tipo === "video" ? (
                        <span className="relative block w-20 h-20 bg-black/50">
                          <video
                            src={foto.src}
                            className="w-full h-full object-cover"
                            muted
                            playsInline
                          />
                          <span className="absolute inset-0 flex items-center justify-center bg-black/25 text-white">
                            <Play className="w-5 h-5 fill-current" />
                          </span>
                        </span>
                      ) : (
                        <img
                          src={foto.src}
                          alt={foto.legenda}
                          className="w-20 h-20 object-cover"
                        />
                      )}
                      {favoritos.includes(foto.id) && (
                        <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-black/50">
                          <Heart className="w-2.5 h-2.5 fill-pink-400 text-pink-400" />
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            <GaleriaGrade
              titulo="Só dela"
              fotos={FOTOS_DELA}
              favoritos={favoritos}
              aoAlternarFavorito={favoritar}
              aoAbrirFoto={setFotoAmpliada}
            />
            <GaleriaGrade
              titulo="O buquê"
              fotos={FOTOS_BUQUE}
              favoritos={favoritos}
              aoAlternarFavorito={favoritar}
              aoAbrirFoto={setFotoAmpliada}
            />
            <GaleriaGrade
              titulo="Só minhas"
              fotos={FOTOS_DELE}
              favoritos={favoritos}
              aoAlternarFavorito={favoritar}
              aoAbrirFoto={setFotoAmpliada}
            />
            </>
          )}
        </div>
      </div>

      <VisualizadorFoto foto={fotoAmpliada} onClose={() => setFotoAmpliada(null)} />
    </div>
  );
}

function GaleriaGrade({ titulo, fotos, favoritos, aoAlternarFavorito, aoAbrirFoto }) {
  const fotosOrdenadas = ordenarPorFavorito(fotos, favoritos);

  return (
    <section className="w-full max-w-sm mb-16 reveal-section">
      <h2 className="text-center text-white font-bold font-serif text-4xl mb-6">
        {titulo}
      </h2>

      {fotosOrdenadas.length === 0 ? (
        <p className="text-center text-pink-200/70 text-sm">
          Fotos chegando em breve 💕
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {fotosOrdenadas.map((foto) => (
            <div
              key={foto.id}
              onClick={() => aoAbrirFoto(foto)}
              className="relative cursor-zoom-in rounded-2xl overflow-hidden border border-white/10 bg-white/5"
            >
              {foto.tipo === "video" ? (
                <span className="relative block w-full h-36 bg-black/50">
                  <video
                    src={foto.src}
                    className="w-full h-full object-cover"
                    muted
                    playsInline
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-black/25 text-white">
                    <Play className="w-6 h-6 fill-current" />
                  </span>
                </span>
              ) : (
                <img
                  src={foto.src}
                  alt={foto.legenda || titulo}
                  className="w-full h-36 object-cover"
                />
              )}
              <BotaoFavorito
                ativo={favoritos.includes(foto.id)}
                onClick={() => aoAlternarFavorito(foto.id)}
                className="absolute top-2 right-2 w-7 h-7"
              />
              {foto.legenda && (
                <p className="px-2 py-2 text-center text-pink-200 text-xs italic">
                  {foto.legenda}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function VisualizadorFoto({ foto, onClose }) {
  if (!foto) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Fechar"
        className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
      >
        <X className="w-5 h-5" />
      </button>

      <div
        className="flex max-h-full max-w-full flex-col items-center gap-4"
        onClick={(evento) => evento.stopPropagation()}
      >
        {foto.tipo === "video" ? (
          <video
            src={foto.src}
            className="max-h-[85vh] max-w-full rounded-2xl"
            controls
            autoPlay
            playsInline
          />
        ) : (
          <img
            src={foto.src}
            alt={foto.legenda}
            className="max-h-[85vh] max-w-full rounded-2xl object-contain"
          />
        )}
        {foto.legenda && (
          <p className="max-w-md px-4 text-center text-lg italic text-pink-200">
            "{foto.legenda}"
          </p>
        )}
      </div>
    </div>
  );
}

function BotaoFavorito({ ativo, onClick, className = "" }) {
  return (
    <button
      type="button"
      onClick={(evento) => {
        evento.stopPropagation();
        onClick();
      }}
      aria-label={ativo ? "Remover dos favoritos" : "Marcar como favorita"}
      aria-pressed={ativo}
      className={`flex items-center justify-center rounded-full bg-black/45 backdrop-blur-sm transition hover:bg-black/60 ${className}`}
    >
      <Heart
        className={`w-4 h-4 ${
          ativo ? "fill-pink-400 text-pink-400" : "text-white"
        }`}
      />
    </button>
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
