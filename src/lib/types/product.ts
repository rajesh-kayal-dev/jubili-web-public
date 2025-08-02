export interface Product {
  productId: string;
  productName: string;
  productDescription: string;
  price: number;
  discount: number;
  brand: string;
  color: string;
  size: string;
  material: string;
  gender: string;
  stock: number;
  likeCount: number;
  isLiked?: boolean;
  imageUrls: string[];
  sellerId: string;
  categoryId: string;
  createdAt: string;
  linkedItems: any[]; // TODO: Define proper type if needed
}

export interface SearchProductsResponse {
  products: Product[];
  total?: number;
  page?: number;
  limit?: number;
}
