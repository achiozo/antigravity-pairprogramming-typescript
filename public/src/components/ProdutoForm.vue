<script setup lang="ts">
import { ref, watch } from 'vue'
import { Produto } from '../services/api'

const props = defineProps<{
  produtoEditando: Produto | null
}>()

const emit = defineEmits<{
  (e: 'salvar', produto: Produto): void
  (e: 'cancelar'): void
}>()

// Estado local do form
const form = ref<Produto>({
  nome: '',
  descricao: '',
  preco: 0,
  estoque: 0
})

// Observar mudanças do prop para preencher form na edição
watch(() => props.produtoEditando, (novo) => {
  if (novo) {
    form.value = { ...novo }
  } else {
    // Resetar
    form.value = { nome: '', descricao: '', preco: 0, estoque: 0 }
  }
}, { immediate: true })

const onSubmit = () => {
  emit('salvar', form.value)
}
</script>

<template>
  <article>
    <header>{{ form.id ? 'Editar Produto' : 'Novo Produto' }}</header>
    <form @submit.prevent="onSubmit">
      <label for="nome">
        Nome
        <input type="text" id="nome" v-model="form.nome" required />
      </label>
      
      <label for="descricao">
        Descrição
        <textarea id="descricao" v-model="form.descricao" required></textarea>
      </label>

      <div class="grid">
        <label for="preco">
          Preço
          <input type="number" step="0.01" id="preco" v-model="form.preco" required />
        </label>
        
        <label for="estoque">
          Estoque
          <input type="number" id="estoque" v-model="form.estoque" required />
        </label>
      </div>

      <div class="grid">
        <button type="submit">{{ form.id ? 'Atualizar' : 'Cadastrar' }}</button>
        <button v-if="form.id" type="button" class="secondary" @click="emit('cancelar')">Cancelar</button>
      </div>
    </form>
  </article>
</template>
