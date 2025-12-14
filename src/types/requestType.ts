import { OrderItem } from "./orderType";
import { Address } from "./userTypes";

export interface RequestType {
  id?: string | null;
  orderId: string;
  requestTo: string | null;
  requestItem: OrderItem | null;
  customerName: string | null;
  customerPhone?: string | null;
  customerEmail: string | null;
  customerAddress?: Address | null;
  createdAt: number | null;
  status: "pending" | "accepted" | "rejected";
}
