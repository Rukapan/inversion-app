<template>
  <home />
</template>

<script>
import Home from './View/Home.vue';

export default {
  components: { Home },
}
</script>

<style>
html::-webkit-scrollbar {
  width: 7px;
}

html::-webkit-scrollbar-track {
  display: none;
}

html::-webkit-scrollbar-thumb {
  background: #525252;
  border-radius: 10px;
}
</style>
