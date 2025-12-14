export interface PaymentInfo {
  accountNumber?: string;
  bankName?: string;
  accountName?: string;
  BVN?: string;
}

export interface VendorData {
  NIN?: string;
  verified?: boolean;
  establishedDate?: string;
  businessname?: string;
  productsOffered?: string[];
  paymentInfo?: PaymentInfo;
}

export interface Address {
  street?: string;
  city?: string;
  state?: string;
}

export interface UserData {
  uid: string;
  firstName?: string;
  lastName?: string;
  email: string | null;
  displayName: string | null;
  photoURL?: string | null;
  createdAt?: string;
  updatedAt?: string;
  phoneNumber?: string | null;
  address?: Address;
  status: "active" | "suspended";
}

export interface Vendor extends UserData {
  role: "vendor";
  vendorData: VendorData;
}

export type AppUser = Vendor;
