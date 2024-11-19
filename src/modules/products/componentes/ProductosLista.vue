<template>
  <section class="py-10 bg-gray-100">
    <div
      class="mx-auto grid max-w-6xl grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      <ProductoCard v-for="producto in productos" :key="producto.id" :producto="producto" />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Producto } from '../interfaces/producto.interface';
import ProductoCard from './ProductoCard.vue';

interface Props {
  productos: Producto[];
}

defineProps<Props>();
</script>

<style scoped></style>
