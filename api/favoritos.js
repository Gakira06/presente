import { list, put } from "@vercel/blob";
import { fileURLToPath } from "node:url";

if (!process.env.BLOB_READ_WRITE_TOKEN) {
  try {
    process.loadEnvFile(fileURLToPath(new URL("../.env.local", import.meta.url)));
  } catch {
    // sem .env.local (ex.: produção, onde a Vercel já injeta as env vars)
  }
}

const FAVORITOS_PATH = "fotos/favoritos.json";
const token = process.env.BLOB_READ_WRITE_TOKEN;

async function lerFavoritos() {
  const { blobs } = await list({ prefix: FAVORITOS_PATH, token });
  if (!blobs.length) return [];

  const resposta = await fetch(blobs[0].url, { cache: "no-store" });
  if (!resposta.ok) return [];

  return resposta.json();
}

export default async function handler(req, res) {
  if (req.method === "GET") {
    const favoritos = await lerFavoritos();
    return res.status(200).json(favoritos);
  }

  if (req.method === "POST") {
    if (req.headers["x-upload-secret"] !== process.env.UPLOAD_SECRET) {
      return res.status(401).json({ erro: "Não autorizado" });
    }

    const { id } = req.body || {};
    if (!id) {
      return res.status(400).json({ erro: "id é obrigatório" });
    }

    const favoritos = await lerFavoritos();
    const indice = favoritos.indexOf(id);
    if (indice === -1) {
      favoritos.push(id);
    } else {
      favoritos.splice(indice, 1);
    }

    await put(FAVORITOS_PATH, JSON.stringify(favoritos), {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
      token,
    });

    return res.status(200).json(favoritos);
  }

  res.setHeader("Allow", "GET, POST");
  return res.status(405).json({ erro: "Método não permitido" });
}
