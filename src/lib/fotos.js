const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const UPLOAD_SECRET = import.meta.env.VITE_UPLOAD_SECRET;

export async function buscarFotos() {
  const resposta = await fetch("/api/photos");
  if (!resposta.ok) return [];
  return resposta.json();
}

export async function enviarFoto(arquivo) {
  const formData = new FormData();
  formData.append("file", arquivo);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  const respostaCloudinary = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/auto/upload`,
    { method: "POST", body: formData },
  );

  if (!respostaCloudinary.ok) {
    throw new Error("Falha ao enviar para o Cloudinary");
  }

  const dadosCloudinary = await respostaCloudinary.json();

  const respostaApi = await fetch("/api/photos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-upload-secret": UPLOAD_SECRET || "",
    },
    body: JSON.stringify({
      url: dadosCloudinary.secure_url,
      legenda: arquivo.name.replace(/\.[^/.]+$/, ""),
      tipo: dadosCloudinary.resource_type === "video" ? "video" : "imagem",
    }),
  });

  if (!respostaApi.ok) {
    throw new Error("Falha ao salvar a foto");
  }

  return respostaApi.json();
}

export async function buscarFavoritos() {
  const resposta = await fetch("/api/favoritos");
  if (!resposta.ok) return [];
  return resposta.json();
}

export async function alternarFavorito(id) {
  const resposta = await fetch("/api/favoritos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-upload-secret": UPLOAD_SECRET || "",
    },
    body: JSON.stringify({ id }),
  });

  if (!resposta.ok) {
    throw new Error("Falha ao favoritar");
  }

  return resposta.json();
}
