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


    onMounted(() => {
      const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;
      fetchData(id);
    });

    return { data, vogais, audios };
  }
});
</script>

<template>
  <div class="container">
    <div class="form">
      <ul class="container-letras">
        <input type="button" @click="console.log(vogais[index])" class="letras" v-for="(vogal, index) in vogais" :key="index" v-model="vogais[index]" />
      </ul>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
  justify-content: center;
}
.container-letras{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-evenly;
  gap: 10px;
  padding: 0px;
  margin: 0px ;
}
.letras {
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  padding: 0px;
  margin: 0px;
  background-color: transparent;
  height: 100px;
  width: 100px;
  border: 1px solid gray;
  border-radius: 50%;
  transition: 0.5s;

}
.letras:focus {
  background-color: rgb(71, 172, 219);
  color: white;
  font-weight: bolder;
  font-size:xx-large;
  transition: 0.5s;
}


</style>