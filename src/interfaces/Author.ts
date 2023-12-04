
export interface Author {
  id: string;
  name: string;
  image: string;
  description: string;
  books: any[]; // You can replace 'any[]' with a more specific type if needed
}
