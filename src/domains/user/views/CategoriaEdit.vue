<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const route = useRoute();

const id = ref('');
const name = ref('');
const description = ref('');
const status = ref('');
const userId = ref('');
const image = ref<File | null>(null);

onMounted(() => {
    id.value = route.params.id as string;
    name.value = route.params.name as string;
    description.value = route.params.description as string;
    status.value = route.params.status as string;
    userId.value = route.params.userId as string;
    console.log('Categoria:', route.params);
    console.log('ID:', id.value);
});

const updateCategory = async () => {
    try {
        const formData = new FormData();
        formData.append('name', name.value);
        formData.append('description', description.value);
        formData.append('status', status.value);
        formData.append('userId', userId.value?.toString() || '');
        
        for (let pair of (formData as any).entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }

        const response = await fetch(`http://localhost:5158/api/categories/${route.params.id}`, {
            method: 'PUT',
            headers: {
                'apllication': 'application/json',
                'Accept': 'application/json'
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Categoria atualizada com sucesso:', data);
        window.location.href = '/home';
    } catch (error) {
        console.error('Erro ao atualizar categoria:', error);
    }
};

const onFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
        image.value = target.files[0];
    }
};
</script>
<template>
    <div class="page">
        <header class="header">
            <h1>Editar Categoria</h1>
        </header>
        <main class="content">
            <div class="form-container">
                <form @submit.prevent="updateCategory">
                    <div class="form-item">
                        <label for="name">Nome</label>
                        <input id="name" v-model="name" required />
                    </div>
                    <div class="form-item">
                        <label for="description">Descrição</label>
                        <textarea id="description" v-model="description" required></textarea>
                    </div>
                    <div class="form-item">
                        <label for="status">Status</label>
                        <select id="status" v-model="status">
                            <option value="active">Ativo</option>
                            <option value="inactive">Inativo</option>
                        </select>
                    </div>
                    <div class="form-item">
                        <label for="userId">ID do Usuário</label>
                        <input id="userId" v-model="userId" required />
                    </div>
                    <div class="form-item">
                        <label for="image">Imagem</label>
                        <input id="image" type="file" @change="onFileChange" />
                    </div>
                    <button type="submit">Salvar</button>
                </form>
            </div>
        </main>
    </div>
</template>

<style scoped>
.page {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
}

.header {
    margin-bottom: 20px;
}

.content {
    width: 100%;
    max-width: 600px;
}

.form-container {
    display: flex;
    flex-direction: column;
}

.form-item {
    margin-bottom: 20px;
}

label {
    display: block;
    margin-bottom: 5px;
}

input,
textarea,
select {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
}

button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}
</style>