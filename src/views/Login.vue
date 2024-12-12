<template>
  <div>
    login
    <button @click="handleLogin">login</button>
  </div>
</template>

<script setup>
const handleLogin = () => {
  localStorage.setItem('token', '123')
}
</script>

<style lang="scss" scoped></style>
