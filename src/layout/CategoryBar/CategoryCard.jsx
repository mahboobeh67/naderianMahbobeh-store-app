import { Link } from "react-router-dom";

export default function CategoryCard({ id, title, imageUrl }) {
  return (
    <Link
      to={`/store?category=${id}`}
      className="border rounded-lg overflow-hidden hover:shadow-md hover:-translate-y-1 transition bg-white"
    >
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-28 object-cover"
      />

      <div className="p-3 text-center font-semibold">{title}</div>
    </Link>
  );
}