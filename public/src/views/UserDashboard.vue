<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { api, User } from '../services/api'

const users = ref<User[]>([])
const isLoading = ref(false)
const errorMsg = ref('')

const loadUsers = async () => {
  isLoading.value = true
  errorMsg.value = ''
  try {
    users.value = await api.getUsers()
  } catch (err: any) {
    errorMsg.value = err.message || 'Erro ao carregar usuários'
  } finally {
    isLoading.value = false
  }
}

const approveUser = async (id: string) => {
  try {
    await api.approveUser(id)
    await loadUsers()
  } catch (err: any) {
    alert(err.message || 'Erro ao aprovar usuário')
  }
}

const deleteUser = async (id: string) => {
  if (!confirm('Tem certeza que deseja excluir este usuário?')) return
  try {
    await api.deleteUser(id)
    await loadUsers()
  } catch (err: any) {
    alert(err.message || 'Erro ao excluir usuário')
  }
}

onMounted(loadUsers)
</script>

<template>
  <article>
    <header>Gestão de Usuários</header>
    
    <div v-if="errorMsg" style="color: var(--pico-del-color); margin-bottom: 1rem;">
      {{ errorMsg }}
    </div>

    <div v-if="isLoading" aria-busy="true">Carregando usuários...</div>
    
    <table v-else-if="users.length > 0" role="grid">
      <thead>
        <tr>
          <th>Nome</th>
          <th>E-mail</th>
          <th>Status</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>
            <span v-if="user.verified_at" style="color: var(--pico-ins-color);"><strong>Verificado</strong></span>
            <span v-else style="color: var(--pico-h2-color);"><strong>Pendente</strong></span>
          </td>
          <td>
            <button v-if="!user.verified_at" @click="approveUser(user.id!)" class="outline" style="margin-right: 0.5rem; padding: 0.2rem 0.5rem; font-size: 0.8rem;">Aprovar</button>
            <button @click="deleteUser(user.id!)" class="secondary outline" style="padding: 0.2rem 0.5rem; font-size: 0.8rem; border-color: var(--pico-del-color); color: var(--pico-del-color);">Excluir</button>
          </td>
        </tr>
      </tbody>
    </table>
    
    <p v-else>Nenhum usuário encontrado.</p>
  </article>
</template>
