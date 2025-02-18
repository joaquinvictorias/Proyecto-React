import { useState } from "react";

function Size({ product, onSizeSelected }) {
    const [sizeSelected, setSizeSelected] = useState("");

    function handleSizeSelected(size) {
        setSizeSelected((prevSize) => prevSize === size ? "" : size);
        onSizeSelected((prevSize) => prevSize === size ? "" : size);
    }

    return (
        <div className="size-buttons">
            {product.size.map((size, index) => (
                <button
                    key={index}
                    className={`size-button ${size === sizeSelected ? 'selected' : ''}`}
                    onClick={() => handleSizeSelected(size)}>
                    {size}
                </button>
            ))}
        </div>
    );
}

export default Size;
