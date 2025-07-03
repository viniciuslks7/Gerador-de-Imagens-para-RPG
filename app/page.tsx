"use client";
import { useState } from "react";
import styles from "./page.module.css";

interface GaleriaItem {
  img: string;
  prompt: string;
}

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [gallery, setGallery] = useState<GaleriaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);
  const [showGallery, setShowGallery] = useState(false);
  const [selectedImg, setSelectedImg] = useState<GaleriaItem | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setErrorDetails(null);
    setImage(null);
    try {
      const res = await fetch("/api/gerar-imagem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (data.image) {
        setImage(data.image);
        setGallery(g => [{ img: data.image, prompt }, ...g]);
      } else {
        setError(data.error || "Erro ao gerar imagem.");
        setErrorDetails(data.details || null);
      }
    } catch (err: any) {
      setError("Erro de conexão.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>✨ Gerador de Imagens RPG ✨</h1>
      <form onSubmit={handleSubmit} className={styles.formulario}>
        <label htmlFor="prompt">Descreva seu personagem, monstro, cenário ou item mágico:</label>
        <textarea
          id="prompt"
          className={styles.textarea}
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          rows={3}
          placeholder="Ex: Feiticeiro sombrio conjurando chamas roxas em uma floresta amaldiçoada"
          required
        />
        <button type="submit" className={styles.botao} disabled={loading}>
          {loading ? "Invocando magia..." : "Gerar Imagem"}
        </button>
        {error && <div style={{ color: "#f357a8", marginTop: 8 }}>{error}</div>}
        {errorDetails && <div style={{ color: "#bbb", marginTop: 8, fontSize: 13, whiteSpace: 'pre-wrap' }}>{errorDetails}</div>}
      </form>
      {loading && <div className={styles.loader}></div>}
      {/* Imagem gerada em overlay/modal, quase tela cheia, com fundo escurecido e X */}
      {image && (
        <div className={styles.imagemOverlay}>
          <div className={styles.imagemOverlayBg} onClick={() => setImage(null)} />
          <div className={styles.imagemOverlayContent}>
            <button className={styles.fecharImagemBtnGrande} onClick={() => setImage(null)} title="Fechar imagem">✖</button>
            <img src={image} alt="Imagem gerada pela IA" className={styles.imagemRPGFull} />
          </div>
        </div>
      )}
      {/* Divisória de runas entre formulário e galeria */}
      <div className={styles.runaDivisoria}></div>
      {/* Botão de galeria flutuante */}
      {gallery.length > 0 && (
        <button className={styles.galeriaBtn} onClick={() => setShowGallery(true)} title="Abrir galeria">
          🖼️ Galeria ({gallery.length})
        </button>
      )}
      {/* Modal da galeria */}
      {showGallery && (
        <div className={styles.galeriaModalOverlay} onClick={() => setShowGallery(false)}>
          <div className={styles.galeriaModal} onClick={e => e.stopPropagation()}>
            <button className={styles.galeriaModalFechar} onClick={() => setShowGallery(false)} title="Fechar galeria">✖</button>
            <h2 className={styles.galeriaModalTitulo}>Galeria da Sessão</h2>
            <div className={styles.galeriaModalGrid}>
              {gallery.map((item, idx) => (
                <div key={idx} className={styles.galeriaModalItem}>
                  <div className={styles.galeriaModalOrdem}>#{gallery.length - idx}</div>
                  <img
                    src={item.img}
                    alt={`Imagem RPG ${idx + 1}`}
                    className={styles.galeriaModalThumb}
                    onClick={() => setSelectedImg(item)}
                  />
                  <div className={styles.galeriaModalPrompt}>{item.prompt}</div>
                  <a href={item.img} download={`rpg-ia-${idx + 1}.png`} className={styles.galeriaModalDownload}>Baixar</a>
                </div>
              ))}
            </div>
            {selectedImg && (
              <div className={styles.galeriaModalZoomOverlay} onClick={() => setSelectedImg(null)}>
                <div className={styles.galeriaModalZoom} onClick={e => e.stopPropagation()}>
                  <img src={selectedImg.img} alt="Imagem ampliada" />
                  <div className={styles.galeriaModalPromptZoom}>{selectedImg.prompt}</div>
                  <a href={selectedImg.img} download={`rpg-ia-zoom.png`} className={styles.galeriaModalDownload}>Baixar</a>
                  <button className={styles.galeriaModalFecharZoom} onClick={() => setSelectedImg(null)}>Fechar</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
