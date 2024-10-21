<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
    setup() {
        const data = ref({
            image: null as File | null,
            title: '',
            description: '',
            type: '',
            urlImage: '',
            urlsDocuments: [] as File[],
            moduleId: 0,
            activityData: {}
        });

        const modules = ref<{ id: number; title: string }[]>([]);

        onMounted(async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/modules`, {
                    method: 'GET',
                    headers: {
                        'accept': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Erro ao buscar módulos');
                }

                const result = await response.json();
                modules.value = result;
            } catch (error) {
                console.error(error);
            }
        });

        const handleFileChange = (event: Event, type: 'image' | 'document') => {
            const target = event.target as HTMLInputElement;
            if (target.files && target.files[0]) {
                const file = target.files[0];
                if (type === 'image') {
                    data.value.image = file;
                } else if (type === 'document') {
                    data.value.urlsDocuments.push(file);
                }
            }
        };

        const uploadFile = async (file: File) => {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await fetch(`http://localhost:8080/api/contents/upload`, {
                    method: 'POST',
                    body: formData
                });

                if (!response.ok) {
                    throw new Error('Erro ao fazer upload do arquivo');
                }

                const result = await response.json();
                return result.path;
            } catch (error) {
                console.error(error);
                return null;
            }
        };

        const createContent = async () => {
            try {
                const urlImagePath = data.value.image ? await uploadFile(data.value.image) : null;
                const urlsDocumentsPaths = await Promise.all(data.value.urlsDocuments.map(uploadFile));

                console.log(urlImagePath, urlsDocumentsPaths);

                const response = await fetch(`http://localhost:8080/api/contents`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'accept': 'application/json',
                    },
                    body: JSON.stringify({
                        title: data.value.title,
                        description: data.value.description,
                        type: data.value.type,
                        activityData: JSON.stringify(data.value.activityData),
                        urlImage: urlImagePath,
                        urlsDocuments: urlsDocumentsPaths,
                        moduleId: data.value.moduleId
                    })
                });

                if (!response.ok) {
                    throw new Error('Erro ao criar conteúdo');
                }
                console.log("Conteúdo criado: ", response);
                window.location.href = '/manager/contents';
            } catch (error) {
                console.error(error);
            }
        };

        return { data, modules, handleFileChange, createContent };
    }
});
</script>
<template>
    <div class="container">
        <div class="form">
            <form @submit.prevent="createContent">
                <label for="urlImage">Selecione uma imagem</label>
                <input @change="(event) => handleFileChange(event, 'image')" name="urlImage" type="file"
                    placeholder="Imagem do conteúdo">
                <label for="title">Título</label>
                <input v-model="data.title" name="title" type="text" placeholder="Título do conteúdo">
                <label for="description">Descrição</label>
                <input v-model="data.description" name="description" type="text" placeholder="Descrição do conteúdo">
                <label for="type">Selecione o tipo do conteúdo</label>
                <select v-model="data.type" name="type">
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Maintenance">Maintenance</option>
                </select>

                <label for="moduleId">Selecione o módulo do conteúdo</label>
                <select v-model="data.moduleId" name="moduleId">
                    <option v-for="module in modules" :key="module.id" :value="module.id">
                        {{ module.title }}
                    </option>
                </select>
                <div>
                    <h3>Adicionar documento</h3>
                    <ul>
                        <input name="urlDocuments" type="file" @change="(event) => handleFileChange(event, 'document')"
                            placeholder="Documento PDF">
                    </ul>
                    <h3>Link do YouTube</h3>
                    <ul>
                        <input name="urlVideo" type="text" placeholder="Link do YouTube">
                    </ul>
                </div>

                <button type="submit">Criar Conteúdo</button>
            </form>
        </div>
    </div>
</template>
<style scoped>
.container {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: scroll;
}

label {
    font-size: large;
    color: #2e2e2e;
    font-weight: bold;
}

h3 {
    font-size: large;
    color: #2e2e2e;
    font-weight: bold;
}

form {
    display: flex;
    flex-direction: column;
    height: 100vh;
    gap: 10px;
    padding: 5px;
    color: white;
}

input {
    border: 2px solid brown;
    color: #2e2e2e;
    border-radius: 5px;
    padding: 5px;
    margin-bottom: 10px;
}

input:focus {
    background-color: brown;
    border: 2px solid brown;
    color: white;
    border-radius: 5px;
    padding: 5px;
    margin-bottom: 10px;
}

::placeholder {
    color: gray;
}

.letras {
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    padding: 0px;
    background-color: transparent;
    height: 50px;
    width: 50px;
    color: white;
    border: 1px solid gray;
    border-radius: 50%;
}

select {
    border: 2px solid brown;
    color: #2e2e2e;
    border-radius: 5px;
    padding: 5px;
    margin-bottom: 10px;
}

button {
    margin: 0 auto;
    height: 60px;
    width: 300px;
    line-height: 40px;
    padding: 10px;
    font-weight: 600;
    border-radius: 5px;
    color: white;
    background-color: brown;
}
</style>