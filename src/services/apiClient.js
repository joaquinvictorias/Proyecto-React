const BASE_URL = import.meta.env.BACKEND_HOST || "http://127.0.0.1:3000/api/v1";

export async function getProducts() {
    const res = await fetch(`${BASE_URL}/products`);
    const data = await res.json();
    return data.data.products;
}

export async function getOneProduct(id) {
    const res = await fetch(`${BASE_URL}/products/${id}`);
    const data = await res.json();
    return data.data.product;
}
