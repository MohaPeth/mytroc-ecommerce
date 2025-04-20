
export interface Category {
  name: string;
  link: string;
  subcategories: {
    name: string;
    link: string;
  }[];
}
