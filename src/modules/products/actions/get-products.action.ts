import { TiendaApi } from '@/api/Tienda_online';
import type { Producto } from '@/modules/products/interfaces/producto.interface';

export const getProducts = async (page: number = 0, limit: number = 8) => {
  try {
    const { data } = await TiendaApi.get<Producto[]>(
      `/productos/?limit=${limit}&skip=${page * limit}`,
    );
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error('Error getting productos');
  }
};
