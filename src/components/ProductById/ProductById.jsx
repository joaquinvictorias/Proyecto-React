import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getOneProduct } from "../../services/apiClient";
import ProductCard from "../ProductCard/ProductCard";
import Error from "../Error/Error";

function ProductById() {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { id } = useParams();

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const product = await getOneProduct(id);
                setProduct(product);
                setError(null);
            } catch (error) {
                setError("Error al cargar el producto");
            } finally {
                setLoading(false);
            }
        }

        fetchProduct();
    }, []);

    if (loading) return <p className="center">Cargando...</p>
    if (error) return <Error title="Error al cargar el producto" message={error} />;

    return (
        <ul className="products">
            <ProductCard
                key={product._id}
                product={product}
            />
        </ul>
    );
}

export default ProductById;
