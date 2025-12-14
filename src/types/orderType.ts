export interface OrderItem {
  id: string;
  category?: string;
  vendorId: string;
  title: string;
  price: number;
  quantity: number;
  status: "pending" | "in transit" | "recieved";
}

export interface Order {
  orderId: string;
  customerName: string;
  customerId: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  email: string;
  items: OrderItem[];
  createdAt: number;
}
