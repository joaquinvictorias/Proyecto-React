import { currencyFormatter } from "../../utils/formatting";

function CartItem({ item, onIncrease, onDecrease }) {
    return (
        <li className="cart-item">
            <p>
                {item.name} ({item.size}) - {item.quantity} x {currencyFormatter.format(item.price)}
            </p>
            <p className="cart-item-actions">
                <button onClick={onDecrease}>-</button>
                <span>{item.quantity}</span>
                <button onClick={onIncrease}>+</button>
            </p>
        </li>
    );
}

export default CartItem;
