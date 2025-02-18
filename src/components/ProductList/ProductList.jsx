import { useState, useEffect } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { getProducts } from "../../services/apiClient";
import Error from "../Error/Error";

function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const productsData = await getProducts();
                setProducts(productsData);
                setError(null);
            } catch (error) {
                setError("Error al cargar los productos");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <p className="center">Cargando...</p>;
    if (error) return <Error title="Error al cargar los productos" message={error} />;

    return (
        <ul className="products">
            {products.map((product) => (
                <ProductCard
                    key={product._id}
                    product={product}
                />
            ))}
        </ul>
    );
}

export default ProductList;
