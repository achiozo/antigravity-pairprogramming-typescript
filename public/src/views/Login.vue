<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { api, setAuthToken } from '../services/api'

const router = useRouter()
const email = ref('')
const password = ref('')
const errorMsg = ref('')
const isLoading = ref(false)

const handleLogin = async () => {
  isLoading.value = true
  errorMsg.value = ''
  try {
    const res = await api.login(email.value, password.value)
    setAuthToken(res.token)
    router.push('/produtos')
  } catch (err: any) {
    errorMsg.value = err.message || 'Erro ao fazer login'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="container">
    <article>
      <header>Login</header>
      <form @submit.prevent="handleLogin">
        <div v-if="errorMsg" class="error-msg" role="alert" style="color: var(--pico-del-color)">
          {{ errorMsg }}
        </div>
        
        <label for="email">E-mail</label>
        <input type="email" id="email" v-model="email" required />

        <label for="password">Senha</label>
        <input type="password" id="password" v-model="password" required />

        <button type="submit" :aria-busy="isLoading" :disabled="isLoading">Entrar</button>
        
        <p style="margin-top: 1rem; text-align: center;">
          Não tem uma conta? <router-link to="/register">Cadastre-se</router-link>
        </p>
      </form>
    </article>
  </div>
</template>

<style scoped>
.container {
  width: 50%;
  display: block;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
