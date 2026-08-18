import { list, put } from "@vercel/blob";

const MANIFEST_PATH = "fotos/manifest.json";

async function lerManifesto() {
  const { blobs } = await list({ prefix: MANIFEST_PATH });
  if (!blobs.length) return [];

  const resposta = await fetch(blobs[0].url, { cache: "no-store" });
  if (!resposta.ok) return [];

  return resposta.json();
}

export default async function handler(req, res) {
  if (req.method === "GET") {
    const fotos = await lerManifesto();
    return res.status(200).json(fotos);
  }

  if (req.method === "POST") {
    if (req.headers["x-upload-secret"] !== process.env.UPLOAD_SECRET) {
      return res.status(401).json({ erro: "Não autorizado" });
    }

    const { url, legenda, tipo } = req.body || {};
    if (!url) {
      return res.status(400).json({ erro: "url é obrigatória" });
    }

    const fotos = await lerManifesto();
    fotos.push({
      url,
      legenda: typeof legenda === "string" ? legenda.slice(0, 200) : "",
      tipo: tipo === "video" ? "video" : "imagem",
      criadoEm: new Date().toISOString(),
    });

    await put(MANIFEST_PATH, JSON.stringify(fotos), {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
    });

    return res.status(200).json(fotos);
  }

  res.setHeader("Allow", "GET, POST");
  return res.status(405).json({ erro: "Método não permitido" });
}
