<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '../services/api'

const router = useRouter()
const name = ref('')
const email = ref('')
const password = ref('')
const errorMsg = ref('')
const successMsg = ref('')
const isLoading = ref(false)

const handleRegister = async () => {
  isLoading.value = true
  errorMsg.value = ''
  successMsg.value = ''
  try {
    await api.register(name.value, email.value, password.value)
    successMsg.value = 'Cadastro realizado com sucesso! Aguarde a aprovação de um administrador para fazer login.'
    setTimeout(() => {
        router.push('/login')
    }, 3000)
  } catch (err: any) {
    errorMsg.value = err.message || 'Erro ao cadastrar'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="container">
    <article>
      <header>Cadastro</header>
      <form @submit.prevent="handleRegister">
        <div v-if="errorMsg" role="alert" style="color: var(--pico-del-color); margin-bottom: 1rem;">
          {{ errorMsg }}
        </div>
        <div v-if="successMsg" role="alert" style="color: var(--pico-ins-color); margin-bottom: 1rem;">
          {{ successMsg }}
        </div>
        
        <label for="name">Nome Completo</label>
        <input type="text" id="name" v-model="name" required />

        <label for="email">E-mail</label>
        <input type="email" id="email" v-model="email" required />

        <label for="password">Senha</label>
        <input type="password" id="password" v-model="password" required />

        <button type="submit" :aria-busy="isLoading" :disabled="isLoading || successMsg !== ''">Cadastrar</button>
        
        <p style="margin-top: 1rem; text-align: center;">
          Já tem uma conta? <router-link to="/login">Fazer Login</router-link>
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