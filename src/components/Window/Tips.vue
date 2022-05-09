<template>
  <div class="hero">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">Welcome Inversion</h1>
        <p class="py-6 text-xl">This app allows you to create an album of your life. you can only post a photo once a
          day, so post a photo that reminds you of that day.</p>
        <button @click="this.$store.commit('changeWindow', 'profile')" class="btn btn-primary text-white">Create
          Profile</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tips',
}
</script>
