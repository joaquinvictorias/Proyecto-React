import skullVideo from "../assets/video/skull.mp4"
import Header from "../components/Header/Header";

function Home() {
    return (
        <div>
            <Header />
            <div className="video-container">
                <video autoPlay muted loop playsInline>
                    <source src={skullVideo} type="video/mp4" />
                    Tu navegador no soporta la etiqueta de video
                </video>
            </div>
        </div>
    );
}

export default Home;
