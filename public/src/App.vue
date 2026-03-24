<script setup lang="ts">
import { useRouter } from 'vue-router'
import { getAuthToken, setAuthToken } from './services/api'
import { ref, watchEffect } from 'vue'

const router = useRouter()
const isAuthenticated = ref(!!getAuthToken())

watchEffect(() => {
    // Basic reactivity for auth token changes via navigation
    isAuthenticated.value = !!getAuthToken()
})

router.afterEach(() => {
    isAuthenticated.value = !!getAuthToken()
})

const logout = () => {
    setAuthToken(null)
    router.push('/login')
}
</script>

<template>
  <nav class="">
    <ul>
      <li><strong>CRUD Fullstack</strong></li>
    </ul>
    <ul v-if="isAuthenticated">
      <li><router-link to="/produtos">Produtos</router-link></li>
      <li><router-link to="/users">Usuários (Admin)</router-link></li>
      <li><a href="#" @click.prevent="logout">Logout</a></li>
    </ul>
    <ul v-else>
      <li><router-link to="/login">Login</router-link></li>
      <li><router-link to="/register">Register</router-link></li>
    </ul>
  </nav>

  <main class="">
    <router-view></router-view>
  </main>
</template>

<style scoped>
nav {
    margin-bottom: 2rem;
    border-bottom: 1px solid var(--pico-muted-border-color);
}
</style>
