import RegisterUser from "../components/RegisterUser/RegisterUser";
import LoginUser from "../components/LoginUser/LoginUser";
import { useState } from "react";
import Button from "../components/UI/Button";
import Header from "../components/Header/Header";

function Login() {
    const [login, setLogin] = useState(true);

    function handleLogin() {
        setLogin(true);
    }

    function handleRegister() {
        setLogin(false);
    }

    return (
        <div>
            <Header />
            <div className="form-container">
                {login ? <LoginUser /> : <RegisterUser />}
                <p className="option-login">
                    <Button
                        style={login ? { color: "#02788D" } : { color: "#58E6FF" }}
                        textOnly
                        onClick={handleLogin}>
                        Iniciar sesión
                    </Button>
                    <Button
                        style={login ? { color: "#58E6FF" } : { color: "#02788D" }}
                        textOnly
                        onClick={handleRegister}>
                        Regístrate
                    </Button>
                </p>
            </div>
        </div>
    );
}

export default Login;
