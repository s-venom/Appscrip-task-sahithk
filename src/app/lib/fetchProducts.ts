// app/lib/fetchProducts.ts
export async function fetchProducts() {
    const res = await fetch("https://fakestoreapi.com/products?limit=20", {
        next: { revalidate: 3600 }, // ISR: revalidate every hour
    });
    const data = await res.json();

    return data.map((p: any, i: number) => ({
        ...p,
        isNew: i % 3 === 0,
        isOutOfStock: i % 5 === 0 && i % 3 !== 0,
    }));
}