import React, { Suspense } from "react";
import skullVideo from "../assets/video/skull.mp4";

const Header = React.lazy(() => import("../components/Header/Header"));

const VideoComponent = React.memo(() => {
  return (
    <div className="video-container">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
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
      <Suspense fallback={<div>Cargando header...</div>}>
        <Header />
      </Suspense>
      <VideoComponent />
    </div>
  );
}

export default React.memo(Home);
