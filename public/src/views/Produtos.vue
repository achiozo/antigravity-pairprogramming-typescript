<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { api, Produto } from '../services/api'
import ProdutoList from '../components/ProdutoList.vue'
import ProdutoForm from '../components/ProdutoForm.vue'

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

const salvarProduto = async (produto: Produto, onSuccess?: () => void) => {
  try {
    if (produto.id) {
      await api.atualizar(produto.id, produto)
    } else {
      await api.criar(produto)
    }
    produtoEmEdicao.value = null
    await carregarProdutos()
    if (onSuccess) onSuccess()
  } catch (err: any) {
    alert(err.message || 'Erro ao salvar produto')
    console.error(err)
  }
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
  <div>
    <h1>Gerenciamento de Produtos</h1>
    
    <div class="grid match-height">
      <div>
        <ProdutoForm
          :produto-editando="produtoEmEdicao"
          @salvar="salvarProduto"
          @cancelar="cancelarEdicao"
        />
      </div>

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
  </div>
</template>

<style scoped>
.match-height > div {
  display: flex;
  flex-direction: column;
}

:deep(.match-height > div > article) {
  flex-grow: 1;
  height: 100%;
  margin-bottom: 0;
}
</style>
