<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { api, Produto } from './services/api'
import ProdutoList from './components/ProdutoList.vue'
import ProdutoForm from './components/ProdutoForm.vue'

const produtos = ref<Produto[]>([])
const produtoEmEdicao = ref<Produto | null>(null)
const isLoading = ref(false)

const carregarProdutos = async () => {
  isLoading.value = true
  try {
    produtos.value = await api.listarTodos()
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

const salvarProduto = async (produto: Produto) => {
  if (produto.id) {
    await api.atualizar(produto.id, produto)
  } else {
    await api.criar(produto)
  }
  produtoEmEdicao.value = null
  await carregarProdutos()
}

const editarProduto = (produto: Produto) => {
  produtoEmEdicao.value = { ...produto }
}

const excluirProduto = async (id: number) => {
  if (confirm('Tem certeza que deseja excluir?')) {
    await api.excluir(id)
    await carregarProdutos()
  }
}

const cancelarEdicao = () => {
  produtoEmEdicao.value = null
}

onMounted(carregarProdutos)
</script>

<template>
  <main class="container">
    <h1>Gerenciamento de Produtos</h1>
    
    <div class="grid">
      <!-- Formulário de Criação/Edição -->
      <div>
        <ProdutoForm
          :produto-editando="produtoEmEdicao"
          @salvar="salvarProduto"
          @cancelar="cancelarEdicao"
        />
      </div>

      <!-- Listagem de Produtos -->
      <div>
        <div v-if="isLoading" aria-busy="true">Carregando produtos...</div>
        <ProdutoList
          v-else
          :produtos="produtos"
          @editar="editarProduto"
          @excluir="excluirProduto"
        />
      </div>
    </div>
  </main>
</template>
