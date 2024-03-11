<script setup>
  import { RouterLink, RouterView } from 'vue-router'
  import NavBar from './components/NavBar.vue'
</script>

<template>
  <div class="container pt-3">

    <NavBar />

    <div class="col">
      <div class="row">
        <RouterView />
      </div>
    </div>

  </div>
</template>