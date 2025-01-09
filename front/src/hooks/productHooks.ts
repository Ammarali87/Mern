import { useQuery } from '@tanstack/react-query';
import apiClient from '../ApiClient';
import { Product } from '../types/Product';

export const useGetProductsQuery = () =>
  useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: async () => {
      const { data } = await apiClient.get<Product[]>('/products');
      return data;
    },
    staleTime: 5 * 60 * 1000, // Optional: Cache data for 5 minutes
  });

export const useGetProductDetailsBySlugQuery = (slug: string) =>
  useQuery<Product, Error>({
    queryKey: ['products', slug],
    queryFn: async () => {
      const { data } = await apiClient.get<Product>(`api/products/slug/${slug}`);
      return data;
    },
    enabled: !!slug, // Only run the query if a valid slug is provided
  });

export const useGetCategoriesQuery = () =>
  useQuery<string[], Error>({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await apiClient.get<string[]>('/api/products/categories');
      return data;
    },
    staleTime: 10 * 60 * 1000, // Optional: Cache data for 10 minutes
  });




// import { useQuery } from '@tanstack/react-query'
// import apiClient from '../ApiClient'
// import { Product } from '../types/Product'

// export const useGetProductsQuery = () =>
//   useQuery({
//     queryKey: ['products'],
//     queryFn: async () => (await apiClient.get<Product[]>(`api/products`)).data,
//   })

// export const useGetProductDetailsBySlugQuery = (slug: string) =>
//   useQuery({
//     queryKey: ['products', slug],
//     queryFn: async () =>
//       (await apiClient.get<Product>(`api/products/slug/${slug}`)).data,
//   })

// export const useGetCategoriesQuery = () =>
//   useQuery({
//     queryKey: ['categories'],
//     queryFn: async () =>
//       (await apiClient.get<[]>(`/api/products/categories`)).data,
//   })
