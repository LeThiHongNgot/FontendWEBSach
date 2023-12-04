export interface BookDetail {
  bookId: string;
  categoryId: string;
  dimensions: string;
  pages: number;
  description: string;
  book: any | null; // You can replace 'any' with a specific type if you have a defined interface for books
  category: any | null; // You can replace 'any' with a specific type if you have a defined interface for categories
}
