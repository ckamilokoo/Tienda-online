import { TiendaApi } from '@/api/Tienda_online';
import type { Producto } from '@/modules/products/interfaces/producto.interface';
import { ref } from 'vue';

export const currentPage = ref(1);

export const getProducts = async (page: number = 0, limit: number = 8) => {
  try {
    const skip = page === 1 ? 0 : (page - 1) * limit;

    const { data } = await TiendaApi.get<Producto[]>(`/productos/?skip=${skip}&limit=${limit}`);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error('Error getting productos');
  }
};
