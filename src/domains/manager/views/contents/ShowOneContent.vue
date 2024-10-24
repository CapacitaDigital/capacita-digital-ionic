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
      moduleId: 0, // Add this line
      urlsImages: [], // Add this line
      activityData: {} as { [key: string]: any }, // Add this line
      activityDataSerialized: {} 

    });

    const route = useRoute();

    const deserializeData = (dataString: string) => {
      try {
        data.value.activityData = JSON.parse(dataString);

      } catch (error) {
        console.error("Failed to deserialize data:", error);
      }
    };
    const serializeData = () => {
      try {
        data.value.activityDataSerialized = JSON.stringify(data.value.activityData);
      } catch (error) {
        console.error("Failed to serialize data:", error);
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

      } catch (error) {
        console.error(error);
      }
    };
    const addArrayItem = (key: string) => {
      if (Array.isArray(data.value.activityData[key])) {
        data.value.activityData[key].push('');
      }
    };

    const removeArrayItem = (key: string, index: number) => {
      if (Array.isArray(data.value.activityData[key])) {
        data.value.activityData[key].splice(index, 1);
      }
    };
    const fetchUrlImages = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/images', {
          method: 'GET',
          headers: {
            'accept': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Erro ao buscar imagens');
        }

        return await response.json();
      } catch (error) {
        console.error(error);
      }
    };
    const remove = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/contents/${data.value.id}`, {
          method: 'DELETE',
          headers: {
            'accept': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Erro ao deletar atividades');
        }
        console.log("atividade deletada!");
        window.location.href = '/manager/contents';
      } catch (error) {
        console.error(error);
      }
    };
    const updateData = async () => {
      try {
        serializeData();
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
            activityData: data.value.activityDataSerialized,
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
      fetchUrlImages().then(images => {
        data.value.urlsImages = images;
      });
    });

    return { addArrayItem, removeArrayItem, remove, data, updateData };
  }
});
</script>

<template>
  <div class="container">
    <div class="fundo">
      <img :src="'http://localhost:8080' + data.urlImage" :alt="data.urlImage">
    </div>
    <div class="form">


      <form @submit.prevent="updateData">

        <label for="urlImage">Imagem</label>
        <select v-model="data.urlImage" name="urlImage">
          <option class="option" v-for="image in data.urlsImages" :key="image" :value="image">
            <li>{{ (image as string).split('/').pop() }}</li>
          </option>
        </select>

        <label for="title">Título</label>
        <input v-model="data.title" name="title" type="text">

        <label for="description">Descrição</label>
        <input v-model="data.description" name="description" type="text">

        <label for="type">Tipo</label>
        <select v-model="data.type" name="type">
          <option value="ClassRoom">Aula</option>
          <option value="Exercise">Atividade</option>
          <option value="Assets">Recurso</option>
        </select>

        <div>
          <label>Dados da atividade</label>
          <h3>{{ data.activityData }}</h3>
          <div v-for="(value, key) in data.activityData" :key="key">
            <label :for="key.toString()">{{ key }}</label>
            <div class="container-campo" v-if="Array.isArray(value)">
              <div class="campo" v-for="(item, index) in value" :key="index">
                <input :id="`${key}-${index}`" v-model="data.activityData[key][index]" @input="data.activityData[key][index] = data.activityData[key][index].toUpperCase()" type="text">
                <button class="remove" type="button" @click="removeArrayItem(key.toString(), index)">Remover</button>
              </div>
              <button class="create" type="button" @click="addArrayItem(key.toString())">Adicionar Item</button>
            </div>
            <div v-else>
              <input :id="key.toString()" v-model="data.activityData[key]" type="text">
            </div>
          </div>
        </div>
        <button type="submit">atualizar</button>
        <button @click="remove">remover</button>
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

.fundo {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  background-color: transparent
}

.fundo>img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* Faz com que a imagem preencha a div, cortando partes da imagem se necessário */
}

select {
  width: 100px;
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
.container-campo {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 5px;
  color: white;
}
.campo {
  display: flex;
  gap: 10px;
  align-items: center;
}
.remove{
  background-color: red;
  color: white;
  border: 1px solid red;
  border-radius: 5px;
  padding: 5px;
  width: 80px;
  height: 50px;
  margin: 0px;
}
.create{
  background-color: green;
  color: white;
  border: 1px solid green;
  border-radius: 5px;
  padding: 5px;
  width: 80px;
  height: 50px;
  margin: 0px;
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