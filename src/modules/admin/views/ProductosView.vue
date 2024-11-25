<template>
  <div class="bg-white px-5 py-2 rounded">
    <h1 class="text-3xl">Productos</h1>
    <div class="py-8 w-full">
      <div class="shadow overflow-hidden rounded border-b border-gray-200">
        <table class="min-w-full bg-white">
          <thead class="bg-gray-800 text-white">
            <tr>
              <th class="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">Nombre</th>
              <th class="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">Descripción</th>
              <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Precio</th>
              <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Imagen</th>
            </tr>
          </thead>
          <tbody class="text-gray-700">
            <tr
              v-for="(producto, index) in productos"
              :key="producto.id"
              :class="{
                'bg-gray-100': index % 2 === 0,
              }"
            >
              <td class="text-left py-3 px-4">
                <RouterLink
                  class="hover:text-blue-500 hover:underline"
                  :to="`/admin/productos/${producto.id}`"
                >
                  {{ producto.nombre }}
                </RouterLink>
              </td>
              <td class="text-left py-3 px-4">{{ producto.descripcion }}</td>
              <td class="text-left py-3 px-4">
                <span class="bg-blue-200 text-blue-600 py-1 px-3 rounded-full text-xs">{{
                  producto.precio
                }}</span>
              </td>
              <td class="text-left py-3 px-4">
                <img
                  :src="producto.imagen_url"
                  :alt="producto.nombre"
                  class="h-10 w-10 object-cover"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <BotonPaginacion :has-moredata="!!productos && productos.length < 8" :page="pagina" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { getProducts } from '@/modules/products/actions';

import { useQuery, useQueryClient } from '@tanstack/vue-query';

import BotonPaginacion from '@/modules/common/componentes/BotonPaginacion.vue';
import { usePaginacion } from '@/modules/common/composable/usePaginacion';
import { watchEffect } from 'vue';

const queryclient = useQueryClient();
const { pagina } = usePaginacion();

console.log({ pagina });

const { data: productos } = useQuery({
  queryKey: ['productos', { page: pagina }],
  queryFn: () => getProducts(pagina.value),
});

watchEffect(() => {
  queryclient.prefetchQuery({
    queryKey: ['productos', { page: pagina.value + 1 }],
    queryFn: () => getProducts(pagina.value + 1),
  });
});
</script>

<style scoped></style>
