import { useContext } from "react";
import Modal from "../UI/Modal";
import { CartContext } from "../../store/CartContext";
import { currencyFormatter } from "../../utils/formatting";
import Button from "../UI/Button";
import { UserProgressContext } from "../../store/UserProgressContext";
import CartItem from "../CartItem/CartItem";

function Cart() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const cartTotal = cartCtx.items.reduce((totalPrice, item) => {
        return totalPrice + item.quantity * item.price;
    }, 0);

    function handleCloseCart() {
        userProgressCtx.hideCart();
    }

    function handleGoToChackout() {
        userProgressCtx.showCheckout();
    }

    return (
        <Modal
            className="cart"
            open={userProgressCtx.progress === "cart"}
            onClose={userProgressCtx.progress === "cart" ? handleCloseCart : null}
        >
            <h2>Tu cesta</h2>
            <ul>
                {cartCtx.items.map((item) => (
                    <CartItem
                        key={item._id + item.size}
                        item={item}
                        onDecrease={() => cartCtx.removeItem(item._id, item.size)}
                        onIncrease={() => cartCtx.addItem(item)}
                    />
                ))}
            </ul>
            <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
            <p className="modal-actions">
                <Button textOnly onClick={handleCloseCart}>
                    Cerrar
                </Button>
                {cartCtx.items.length > 0 && (
                    <Button onClick={handleGoToChackout}>
                        Finalizar compra
                    </Button>
                )}
            </p>
        </Modal>
    );
}

export default Cart;
