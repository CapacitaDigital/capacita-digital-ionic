<script lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const data = ref({});
    const route = useRoute();

    onMounted(async () => {
      const id = route.params.id;
      try {
        const response = await fetch(`http://localhost:8080/api/content/${id}`, {
          method: 'GET',
          headers: {
            'accept': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Erro ao buscar atividades');
        }

        data.value = await response.json();
        console.log("Data:", data.value);
      } catch (error) {
        console.error(error);
      }
    });

    return { data };
  }
};
</script>

<template>
  <div class="container">
    <div class="form">
      <img src="/public/img/abc.png" alt="abc">
      <form action="" method="">
        <input name="title" type="text" value="vogais">

        <input class="letras" name="letra" type="text" value="A">
        <input class="letras" name="letra" type="text" placeholder="letra">
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
  text-align: center;
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