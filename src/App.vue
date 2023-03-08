<template>
  <header>
    <div class="wrapper">
      <!-- 
      <nav>
        <RouterLink to="/treasurehunt">Treasure Hunt</RouterLink>
        <RouterLink to="/phaserexamples">Phaser Examples</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav> -->
    </div>
  </header>

  <section>
    <RouterView />
  </section>
</template>

<script setup>
  import { RouterLink, RouterView } from "vue-router";
</script>