import { useNavigate } from "react-router-dom";
import Button from "../UI/Button";
import Input from "../UI/Input";
import { useState } from "react";
import Error from "../Error/Error";
import { useUser } from "../../store/UserContext";

function RegisterUser() {
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
            const response = await fetch("http://127.0.0.1:3000/api/v1/auth/register", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify({
                    name: customerData["name-register"],
                    email: customerData["email-register"],
                    password: customerData["password-register"]
                })
            });

            if (response.ok) {
                const data = await response.json();
                login({ id: data.data._id, name: data.data.name, email: data.data.email });
                navigate('/dashboard');
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || "Error al registrarse. Por favor, inténtalo de nuevo");
            }
        } catch (error) {
            setErrorMessage("Ocurrió un error inesperado. Por favor, inténtalo más tarde");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Regístrate</h2>
            <Input label="Nombre" type="text" id="name-register" />
            <Input label="Email" type="email" id="email-register" />
            <Input label="Contraseña" type="password" id="password-register" />
            <Button>{isLoading ? "Registrando..." : "Registrar"}</Button>
            {errorMessage && <Error title="Error al registrarse" message={errorMessage} />}
        </form>
    );
}

export default RegisterUser;
