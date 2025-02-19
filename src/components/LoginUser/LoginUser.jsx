import { useNavigate } from "react-router-dom";
import Button from "../UI/Button";
import Input from "../UI/Input";
import { useState } from "react";
import Error from "../Error/Error";
import { useUser } from "../../store/UserContext";

const BASE_URL = import.meta.env.VITE_BACKEND_HOST || "http://127.0.0.1:3000/api/v1";

function LoginUser() {
    const navigate = useNavigate();
    const { login } = useUser();
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        setErrorMessage("");

        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());

        try {
            setIsLoading(true);
            const response = await fetch(`${BASE_URL}/auth/login`, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify({
                    email: customerData["email-login"],
                    password: customerData["password-login"]
                })
            });

            if (response.ok) {
                const data = await response.json();
                login({ id: data._id, name: data.name, email: data.email });
                navigate('/dashboard');
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || "Error al iniciar sesión. Por favor, inténtalo de nuevo");
            }
        } catch (error) {
            setErrorMessage("Ocurrió un error inesperado. Por favor, inténtalo más tarde");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Iniciar sesión</h2>
            <Input label="Email" type="email" id="email-login" />
            <Input label="Contraseña" type="password" id="password-login" />
            <Button>{isLoading ? "Iniciando..." : "Iniciar"}</Button>
            {errorMessage && <Error title="Error al iniciar sesión" message={errorMessage} />}
        </form>
    );
}

export default LoginUser;
