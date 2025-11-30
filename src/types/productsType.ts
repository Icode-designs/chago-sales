interface PRODUCT {
  id: string;
  category: string;
  title: string;
  price: number;
  rating: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  description: string;
  specifications: {
    display: string;
    chipset: string;
    ram: string;
    storage: string;
    cameras: string;
    battery: string;
    os: string;
  };
  customerReviews: {
    user: string;
    stars: number;
    comment: string;
  }[];
  image: string[];
}

export default PRODUCT;
