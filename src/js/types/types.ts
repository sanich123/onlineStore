export type DataType = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  amount?: number,
};

export type ObjectKeys = {
  [key: string]: string,
}

export type ParsedParams = {
  urlCategories: string[],
  urlBrands: string[],
  urlSortPriceRating: string,
  urlSize: string,
  urlSearch: string,
  urlMinStock: string,
  urlMaxStock: string,
  urlMinPrice: string, 
  urlMaxPrice: string,
  searchParams: URLSearchParams,
  filtredParams: string,
}
