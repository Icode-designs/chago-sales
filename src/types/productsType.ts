interface CustomerReviews {
  user: string;
  stars: number;
  comment: string;
}

export interface SPECS {
  spec: string;
  detail: string;
}

export interface Product {
  id?: string;
  sellerId: string;
  category: string;
  title: string;
  price: string;
  description: string;
  productStock: string;
  specifications: SPECS[];
  customerReviews?: CustomerReviews[];
  images: string[];
}
export default Product;
