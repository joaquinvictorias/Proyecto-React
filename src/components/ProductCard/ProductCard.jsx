import { useContext, useState } from "react";
import { currencyFormatter } from "../../utils/formatting"
import Button from "../UI/Button";
import { CartContext } from "../../store/CartContext";
import Size from "../Size/Size";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
    const cartCtx = useContext(CartContext);
    const [sizeSelected, setSizeSelected] = useState("");

    function handleSizeSelected(size) {
        setSizeSelected(size);
    }

    function handleAddProductToCart() {
        if (sizeSelected) {
            cartCtx.addItem({ ...product, size: sizeSelected });
        } else {
            alert("Por favor, selecciona una talla antes de agregar a la cesta");
        }
    }

    return (
        <li className="product-item">
            <article>
                <img src={product.image} alt={product.name} />
                <div>
                    <Link to={`/dashboard/${product._id}`}>
                        <h3>{product.name}</h3>
                    </Link>
                    <p className="product-item-price">
                        {currencyFormatter.format(product.price)}
                    </p>
                    <p className="product-item-description">{product.description}</p>
                </div>
                <Size product={product} onSizeSelected={handleSizeSelected} />
                <p className="product-item-actions">
                    <Button onClick={handleAddProductToCart}>Añadir</Button>
                </p>
            </article>
        </li>
    );
}

export default ProductCard;
