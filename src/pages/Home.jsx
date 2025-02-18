import React, { Suspense } from "react";
import skullVideo from "../assets/video/skull.mp4";

// Carga el Header de forma asíncrona
const Header = React.lazy(() => import("../components/Header/Header"));

// Componente para el video, memorizado para evitar re-renderizados innecesarios
const VideoComponent = React.memo(() => {
  return (
    <div className="video-container">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/assets/images/video-poster.jpg"  // Agrega una imagen de previsualización
      >
        <source src={skullVideo} type="video/mp4" />
        Tu navegador no soporta la etiqueta de video
      </video>
    </div>
  );
});

function Home() {
  return (
    <div>
      {/* Suspense para cargar el Header de forma lazy */}
      <Suspense fallback={<div>Cargando header...</div>}>
        <Header />
      </Suspense>
      <VideoComponent />
    </div>
  );
}

export default React.memo(Home);