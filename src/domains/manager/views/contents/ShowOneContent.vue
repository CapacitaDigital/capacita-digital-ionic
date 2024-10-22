<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  setup() {
    const data = ref({
      id: 0,
      title: '',
      description: '',
      type: '',
      urlImage: '',
      urlsDocuments: [], // Add this line
      moduleId: 0 // Add this line
    });
    const vogais = ref<string[]>([]);
    const audios = ref<string[]>([]);
    const route = useRoute();

    const deserializeData = (dataString: string) => {
      try {
        const parsedData = JSON.parse(dataString);
        vogais.value = parsedData.vogais;
        audios.value = parsedData.audios;
      } catch (error) {
        console.error("Failed to deserialize data:", error);
      }
    };

    const fetchData = async (id: string) => {
      try {
        const response = await fetch(`http://localhost:8080/api/contents/${id}`, {
          method: 'GET',
          headers: {
            'accept': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Erro ao buscar atividades');
        }

        const result = await response.json();
        data.value = result;
        // Substitua /app/UploadedFiles por /images
        if ((data.value.urlImage) && (data.value.urlImage.includes('/app/wwwroot'))) {
          data.value.urlImage = data.value.urlImage.replace('/app/wwwroot', '/');
        } else if ((data.value.urlImage) && (data.value.urlImage.includes('/images/content'))) {
          data.value.urlImage = data.value.urlImage.replace('/images/content', '/images');
        }
        deserializeData(result.activityData); // Supondo que a string JSON esteja em result.activityData
        console.log("Data:", data.value);
      } catch (error) {
        console.error(error);
      }
    };

    const updateData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/contents/${data.value.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json',
          },
          body: JSON.stringify({
            id: data.value.id,
            title: data.value.title,
            description: data.value.description,
            type: data.value.type,
            activityData: JSON.stringify({
              vogais: vogais.value,
              audios: audios.value
            }),
            urlImage: data.value.urlImage,
            urlsDocuments: data.value.urlsDocuments,
            moduleId: data.value.moduleId
          })
        });

        if (!response.ok) {
          throw new Error('Erro ao atualizar atividades');
        }
        console.log("dados atualizados!");
        window.location.href = '/manager/contents';
      } catch (error) {
        console.error(error);
      }
    };

    onMounted(() => {
      const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;
      fetchData(id);
    });

    return { data, vogais, audios, updateData };
  }
});
</script>

<template>
  <div class="container">
    <div class="form">
      <img :src="'http://localhost:8080' + data.urlImage" :alt="data.urlImage">
      <form @submit.prevent="updateData">
        <label for="title">Título</label>
        <input v-model="data.title" name="title" type="text">
        <label for="description">Descrição</label>
        <input v-model="data.description" name="description" type="text">
        <label for="type">Tipo</label>
        <select v-model="data.type" name="type">
          <option value="ClassRoom">Aula</option>
          <option value="Exercise">Atividade</option>
        </select>

        <div>
          <h3>{{ data.title }}</h3>
          <ul>
            <input type="text" class="letras" v-for="(vogal, index) in vogais" :key="index" v-model="vogais[index]" />
          </ul>
          <h3>Audios</h3>
          <ul>
            <input type="text" v-for="(audio, index) in audios" :key="index" v-model="audios[index]" />
          </ul>
        </div>
        <button type="submit">atualizar</button>
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