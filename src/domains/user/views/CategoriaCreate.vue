<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const name = ref('');
const description = ref('');
const status = ref('Active');
const userId = ref<number | null>(null);
const image = ref<File | null>(null);

const router = useRouter();

const createCategory = async () => {
    try {
        const formData = new FormData();
        formData.append('name', name.value);
        formData.append('description', description.value);
        formData.append('status', status.value);
        formData.append('userId', userId.value?.toString() || '');
        if (image.value) {
            formData.append('image', image.value);
        }

        const response = await fetch('http://localhost:5158/api/categories/', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Categoria criada com sucesso:', data);
        router.push('/home');
    } catch (error) {
        console.error('Erro ao criar categoria:', error);
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
            <h1>Criar Categoria</h1>
        </header>
        <main class="content">
            <div class="form-container">
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
                        <option value="Active">Ativo</option>
                        <option value="Inactive">Inativo</option>
                        <option value="Maintenance">Manutenção</option>
                    </select>
                </div>
                <div class="form-item">
                    <label for="userId">ID do Usuário</label>
                    <input id="userId" v-model="userId" type="number" required />
                </div>
                <div class="form-item">
                    <label for="image">Imagem</label>
                    <input id="image" type="file" @change="onFileChange" />
                </div>
                <button @click="createCategory">Criar Categoria</button>
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