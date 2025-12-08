import Card from "../../Card";
import { useProducts } from "@/hooks";

function StorePage() {
    const { data: products, isLoading, error } = useProducts();
   if (isLoading) return <p>در حال بارگذاری...</p>;
    if (error) return <p>خطا در دریافت محصولات</p>;

     const mappedProducts = products.items.map(p => ({
        id: p.id,
        name: p.title || p.name || p.productName,
        imageUrl: p.img || p.image || p.imageUrl,
        price: p.cost || p.price,
        description: p.desc || p.description,
        category: p.category,
        inventory: p.inventory ?? 0
    }));
  return (
    <div >
       {mappedProducts.map(item => (
                <Card
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    description={item.description}
                    category={item.category}
                    inventory={item.inventory}
                    imageUrl={item.imageUrl}
                />
            ))}
       
       
       </div>
  )
}

export default StorePage