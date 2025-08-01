import { Product } from '@/lib/types/product';
import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const discountedPrice = product.price - (product.price * product.discount) / 100;

  return (
    <Link href={`/product/${product.productId}`}>
      <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="relative w-full h-48">
          <Image
            src={product.imageUrls[0]}
            alt={product.productName}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1 truncate">{product.productName}</h3>
          <p className="text-gray-600 text-sm mb-2 truncate">{product.brand}</p>
          <div className="flex items-center gap-2">
            <span className="font-bold">₹{discountedPrice.toFixed(2)}</span>
            {product.discount > 0 && (
              <>
                <span className="text-gray-500 line-through text-sm">₹{product.price}</span>
                <span className="text-green-600 text-sm">{product.discount}% off</span>
              </>
            )}
          </div>
          <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
            <span>{product.gender}</span>
            <span>•</span>
            <span>{product.size}</span>
            <span>•</span>
            <span>{product.color}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
