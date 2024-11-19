<template>
  <div class="flex justify-center py-10 bg-gray-100 space-x-3">
    <button
      :disabled="page === 1"
      @click="$router.push({ query: { page: page - 1 } })"
      class="flex items-center space-x-1.5 rounded-lg px-4 text-white py-1.5 bg-blue-500 disabled:bg-gray-300 transition-all"
    >
      <FlechaIzquierdaIcon />
      <span>Anteriores</span>
    </button>
    <button
      :disabled="hasMoredata"
      @click="$router.push({ query: { page: page + 1 } })"
      class="flex items-center space-x-1.5 rounded-lg px-4 text-white py-1.5 bg-blue-500 disabled:bg-gray-300 transition-all"
    >
      <span>Siguientes</span>
      <FlechaDerechaIcon />
    </button>
  </div>
</template>

<script setup lang="ts">
import FlechaDerechaIcon from '@/modules/iconos/FlechaDerechaIcon.vue';
import FlechaIzquierdaIcon from '@/modules/iconos/FlechaIzquierdaIcon.vue';

interface Props {
  page: number;

  hasMoredata: boolean;
}

defineProps<Props>();
</script>

<style scoped></style>
