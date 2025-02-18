import { useContext } from "react";
import Modal from "../UI/Modal";
import { CartContext } from "../../store/CartContext";
import { currencyFormatter } from "../../utils/formatting";
import Input from "../UI/Input";
import Button from "../UI/Button";
import { UserProgressContext } from "../../store/UserProgressContext";
import useHttp from "../../hooks/useHttp";
import Error from "../Error/Error";
import { useUser } from "../../store/UserContext";
import { useNavigate } from "react-router-dom";

const requestConfig = {
    method: "POST",
    headers: {
        'Content-type': 'application/json; charset=UTF-8'
    }
};

function Checkout() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);
    const { user } = useUser();
    const navigate = useNavigate();

    const { data, isLoading: isSending, error, sendRequest, clearData } = useHttp(
        "http://127.0.0.1:3000/api/v1/orders",
        requestConfig
    );

    const cartTotal = cartCtx.items.reduce((totalPrice, item) => {
        return totalPrice + item.quantity * item.price;
    }, 0);

    function handleClose() {
        userProgressCtx.hideCheckout();
    }

    function handleFinish() {
        userProgressCtx.hideCheckout();
        cartCtx.clearCart();
        clearData();
    }

    function handleLoginRequest() {
        navigate("/login");
        userProgressCtx.hideCheckout();
    }

    function handleSubmit(event) {
        event.preventDefault();

        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());

        sendRequest(JSON.stringify({
            user: user.id,
            products: cartCtx.items.map((item) => ({
                product: item._id,
                quantity: item.quantity,
                size: item.size
            })),
            totalPrice: cartTotal,
            name: customerData["full-name"],
            email: customerData["email"],
            street: customerData["street"],
            postalCode: customerData["postal-code"],
            city: customerData["city"],
            phone: customerData["phone"]
        }));
    }

    let actions = (
        <>
            <Button type="button" textOnly onClick={handleClose}>
                Cerrar
            </Button>
            <Button>
                Confirmar pedido
            </Button>
        </>
    );

    if (isSending) {
        actions = <span>Confirmando...</span>;
    }

    if (data && !error && user) {
        return (
            <Modal open={userProgressCtx.progress === "checkout"} onClose={handleFinish}>
                <h2>¡Éxito!</h2>
                <p>Tu pedido se ha realizado con éxito</p>
                <p className="modal-actions">
                    <Button onClick={handleFinish}>
                        Aceptar
                    </Button>
                </p>
            </Modal>
        );
    }

    return (
        <Modal open={userProgressCtx.progress === "checkout"} onClose={handleClose}>
            {user ? (
                <form onSubmit={handleSubmit}>
                    <h2>Procesar pedido</h2>
                    <p>Importe total: {currencyFormatter.format(cartTotal)}</p>
                    <Input label="Nombre" type="text" id="full-name" />
                    <Input label="Email" type="email" id="email" />
                    <Input label="Teléfono" type="tel" id="phone" />
                    <Input label="Calle" type="text" id="street" />
                    <div className="control-row">
                        <Input label="Código postal" type="text" id="postal-code" />
                        <Input label="Ciudad" type="text" id="city" />
                    </div>
                    {error && error !== "Invalid user ID" && (
                        <Error title="No se pudo realizar el pedido" message={error} />
                    )}
                    <p className="modal-actions">{actions}</p>
                </form>
            ) : (
                <Error
                    title="Inicia sesión para realizar el pedido"
                    message={
                        <button className="start-session-button" onClick={handleLoginRequest}>Iniciar sesión</button>
                    }
                />
            )}
        </Modal>
    );
}

export default Checkout;
