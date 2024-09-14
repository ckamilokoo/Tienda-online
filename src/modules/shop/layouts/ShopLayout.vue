<template>
  <!-- Header Navbar-->
  <TopMenu />
  <!-- RouterView-->
  <router-view />

  <!-- <Home />-->
  <CutomFooter />
</template>

<script setup>
import TopMenu from '../components/TopMenu.vue';
import CutomFooter from '../components/CustomFooter.vue';
//import Home from '../views/HomeView.vue';
</script>

<style scoped></style>
