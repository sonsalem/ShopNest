export interface ProductProps {
  id: number;
  title: string;
  price: number;
  description: string;
  category: CategoryProps;
  image: string;
  rating: RatingProps;
}

export enum CategoryProps {
  Electronics = "electronics",
  Jewelery = "jewelery",
  MenSClothing = "men's clothing",
  WomenSClothing = "women's clothing",
}

export interface RatingProps {
  rate: number;
  count: number;
}

export interface ParamsType {
  params: {
    id: string;
  };
}

export interface UserType {
  id: number;
  email: string;
  username: string;
  password: string;
  name: Name;
  address: Address;
  phone: string;
}

export interface Address {
  city: string;
  street: string;
  number: number;
  zipcode: string;
  geolocation: Geolocation;
}

export interface Geolocation {
  lat: string;
  long: string;
}

export interface Name {
  firstname: string;
  lastname: string;
}

export interface CartProps {
  id: number;
  userId: number;
  date: Date;
  products: Product[];
  __v: number;
}

export interface Product {
  productId: number;
  quantity: number;
}
