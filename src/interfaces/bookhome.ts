export interface bookhome {
  id: string;
  title: string;
  authorId: string;
  supplierId: string;
  unitPrice: number;
  pricePercent: number;
  publishYear: number;
  available: boolean;
  quantity: number;
  author: any; //
  supplier: any; //
  bookdetails: any[];
  carts: any[]; //
  orderdetails: any[];
}
