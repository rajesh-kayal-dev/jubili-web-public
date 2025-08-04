import { Product } from '@/lib/types/product';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { toggleProductLike } from '@/services/product.service';
import { useAuth } from '@/hooks/useAuth';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [bgImage, setBgImage] = useState(product.imageUrls?.[0]);
  const [descExpanded, setDescExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(product.isLiked || false);
  const [likeCount, setLikeCount] = useState(product.likeCount);
  const [likeLoading, setLikeLoading] = useState(false);
  const { token } = useAuth();
  
  const discountedPrice = product.price - (product.price * product.discount) / 100;

  const handleLikeToggle = async () => {
    if (!token) {
      // Handle not logged in state - you might want to show a login popup
      return;
    }
    
    if (likeLoading) return;
    setLikeLoading(true);
    
    try {
      const response = await toggleProductLike(product.productId, token);
      setIsLiked(!isLiked);
      setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    } catch (error) {
      console.error("Failed to toggle like:", error);
    } finally {
      setLikeLoading(false);
    }
  };



  return (
    <div className="relative bg-white overflow-hidden flex flex-col">
      {/* Background image only on laptop and up */}
      {bgImage && (
        <div className="hidden lg:block absolute right-0 top-0 h-full w-1/2 z-0 overflow-hidden">
          <img
            src={bgImage}
            alt="background"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute left-0 top-0 h-full w-full"
            style={{
              background: "linear-gradient(80deg, white 10%, transparent 70%)",
            }}
          />
        </div>
      )}

      {/* Foreground content */}
      <div className="relative z-10 py-5">
        {/* Top Row */}
        <div className="flex items-start justify-between mb-1 w-full md:w-2/3 lg:w-1/2 px-4">
          <div>
            <div className="text-xl font-semibold">{product.productName}</div>
            <div className="text-sm text-gray-500">{product.brand || "Brand"}</div>
          </div>
          <div className="w-15" />
          <div className="flex items-center gap-15">
            <div className="flex items-center gap-2">
              {product.discount > 0 ? (
                <>
                  <div className="text-green-600 text-lg font-semibold">₹{discountedPrice.toFixed(2)}</div>
                  <span className="text-gray-500 line-through text-sm">₹{product.price}</span>
                  
                  <span className="text-green-600 text-sm">{product.discount}% off</span>
                </>
              ) : (
                <div className="text-green-600 text-lg font-semibold">₹{product.price}</div>
              )}
            </div>
            <button className="text-2xl px-2"><b>⋮</b></button>
          </div>
        </div>

        {/* Thumbnails */}
        <div className="flex overflow-x-auto gap-4 mb-2" style={{ height: 320 }}>
          <div style={{ height: 300, width: 0 }} />
          {product.imageUrls.map((url, idx) => (
            <img
              key={idx}
              src={url}
              alt={product.productName}
              onMouseEnter={() => setBgImage(url)}
              style={{ height: 300, width: "auto" }}
              className="object-cover rounded-xl cursor-pointer"
            />
          ))}
        </div>

        {/* Actions Row */}
        <div className="w-full md:w-2/3 lg:w-1/2 flex items-center gap-6 mb-2 px-4">
          <button 
            onClick={handleLikeToggle}
            disabled={likeLoading}
            className="ml-2 flex items-center gap-4"
            >
             <Image
               src={isLiked ? '/icons/like_filled.svg' : '/icons/like_outlined.svg'}
               alt="like"
               width={20}
               height={20}
               className={`transition-all ${likeLoading ? 'opacity-50' : ''}`}
             />
             <span className="text-sm text-gray-600">{likeCount}</span>
          </button>
          <div className="flex-2" />
          <button className="flex items-center gap-1 text-gray-700">
            <img src="/icons/share.svg" alt="share-product" width={24} height={24} />
          </button>
          <button className="bg-black text-white rounded px-4 py-1 text-sm">0 reviews</button>
          <div className="flex-1" />
        </div>

        {/* Description */}
        <div
          className={`text-base text-justify font-medium mb-2 w-full md:w-2/3 lg:w-1/2 px-4 cursor-pointer select-none`}
          style={
            descExpanded
              ? {}
              : {
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }
          }
          onClick={() => setDescExpanded((prev) => !prev)}
          title={descExpanded ? "Show less" : "Show more"}
        >
          {product.productDescription || `${product.productName} - ${product.gender} ${product.size} ${product.color}`}
          {!descExpanded && (
            <span className="text-blue-500 ml-2">See more</span>
          )}
          {descExpanded && (
            <span className="text-blue-500 ml-2">See less</span>
          )}
        </div>

        {/* Product Details */}
        <div className="w-full md:w-2/3 lg:w-1/2 px-4 mb-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>{product.gender}</span>
            <span>•</span>
            <span>{product.size}</span>
            <span>•</span>
            <span>{product.color}</span>
          </div>
        </div>

        {/* Buy Row */}
        <div className="flex items-center gap-3 mt-2 w-full md:w-2/3 lg:w-1/2 px-4">
          <Link href={`/product/${product.productId}`}>
            <button className="bg-gray-900 text-white rounded-full px-10 py-2 text-lg font-semibold hover:bg-gray-800 transition-colors">
              Make it yours
            </button>
          </Link>

          <div className="flex-1" />
        </div>
      </div>
    </div>
  );
}