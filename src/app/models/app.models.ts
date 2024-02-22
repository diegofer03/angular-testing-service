export interface Category {
  id: number;
  name: string;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  images: string[];
  description: string;
  category: Category;
  taxes?: number;
}

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
}

export interface CreateUserDTO extends Omit<User, 'id'> {}

export interface Auth {
  access_token: string;
}

export interface CreateProductDTO extends Omit<Product, 'id' | 'category'> {
  categoryId: number;
}

export interface UpdateProductDTO extends Partial<CreateProductDTO> { }

export interface FileRta {
  originalname: string;
  filename: string;
  location: string;
}
