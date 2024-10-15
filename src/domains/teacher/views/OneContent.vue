<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';

export default defineComponent({
  props: {
    data: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const ddata = ref({});

    const deserializeData = (dataString: string) => {
      try {
        return JSON.parse(dataString);
      } catch (error) {
        console.error("Failed to deserialize data:", error);
        return {};
      }
    };

    onMounted(() => {
      const params = new URLSearchParams(window.location.search);
      const date = {
        title: params.get('title'),
        letra : params.get('letra'),
        letrac: params.get('letrac')
      }
      ddata.value = deserializeData(props.data);
      console.log("Deserialized data:", ddata.value);
      console.log("DATE:", letras);
    });

    return { ddata };
  }
});
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

.container{
  display: flex;
  flex-direction: column;
}
form{
  display: flex;
  flex-direction: column;
  gap: 10px;
}
input{
  border: 1px solid gray;
}
.letras{
  text-align: center;
  background-color: transparent;
  height: 50px;
  width: 50px;
  border: 1px solid gray;
  border-radius: 50%;
}
button{
  margin: 0 auto;
  height: 30px;
  width: 100px;
  border-radius: 5px;
  color: white;
  background-color: brown;
  border: 1px solid gray;
}
</style>