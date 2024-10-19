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
      <img :src="data.urlImage" alt="abc">
      <form @submit.prevent="updateData">
        <input v-model="data.title" name="title" type="text">
        <input v-model="data.description" name="description" type="text">
        <input v-model="data.type" name="type" type="text" placeholder="letra">

        <div>
          <h3>{{ data.title }}</h3>
          <ul>
            <input type="text" class="letras" v-for="(vogal, index) in vogais" :key="index" v-model="vogais[index]"  />
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
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

input {
  border: 1px solid gray;
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
  border: 1px solid gray;
  border-radius: 50%;
}

button {
  margin: 0 auto;
  height: 30px;
  width: 100px;
  border-radius: 5px;
  color: white;
  background-color: brown;
  border: 1px solid gray;
}
</style>