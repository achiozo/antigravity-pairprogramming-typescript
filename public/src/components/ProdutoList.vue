<script setup lang="ts">
import { Produto } from '../services/api'

defineProps<{
  produtos: Produto[]
}>()

const emit = defineEmits<{
  (e: 'editar', produto: Produto): void
  (e: 'excluir', id: number): void
}>()
</script>

<template>
  <article>
    <header>Lista de Produtos</header>
    <table v-if="produtos.length > 0" role="grid">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Preço</th>
          <th>Estoque</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="produto in produtos" :key="produto.id">
          <td>{{ produto.id }}</td>
          <td>{{ produto.nome }}</td>
          <td>R$ {{ produto.preco }}</td>
          <td>{{ produto.estoque }}</td>
          <td>
            <a href="#" @click.prevent="emit('editar', produto)">Editar</a> |
            <a href="#" @click.prevent="emit('excluir', produto.id!)" class="secondary">Excluir</a>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>Nenhum produto cadastrado.</p>
  </article>
</template>
