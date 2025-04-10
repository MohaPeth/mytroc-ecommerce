
// Mock data for sales
export interface Sale {
  id: string;
  orderNumber: string;
  customer: string;
  date: string;
  amount: number;
  status: string;
  paymentMethod: "card" | "paypal" | "transfer" | "other";
  commission: number;
}

export const SALES_DATA: Sale[] = [
  {
    id: "S001",
    orderNumber: "CMD-87562",
    customer: "Jean Dupont",
    date: "15/03/2025",
    amount: 129.99,
    status: "completed",
    paymentMethod: "card",
    commission: 12.99
  },
  {
    id: "S002",
    orderNumber: "CMD-87612",
    customer: "Marie Laurent",
    date: "10/03/2025",
    amount: 224.50,
    status: "completed",
    paymentMethod: "paypal",
    commission: 22.45
  },
  {
    id: "S003",
    orderNumber: "CMD-88032",
    customer: "Pierre Michel",
    date: "05/03/2025",
    amount: 46.90,
    status: "completed",
    paymentMethod: "card",
    commission: 4.69
  },
  {
    id: "S004",
    orderNumber: "CMD-88145",
    customer: "Sophie Girard",
    date: "28/02/2025",
    amount: 189.00,
    status: "completed",
    paymentMethod: "card",
    commission: 18.90
  },
  {
    id: "S005",
    orderNumber: "CMD-88301",
    customer: "Lucas Bernard",
    date: "20/02/2025",
    amount: 53.50,
    status: "completed",
    paymentMethod: "paypal",
    commission: 5.35
  }
];
