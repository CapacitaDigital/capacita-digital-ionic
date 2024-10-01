<script lang="ts">
import { defineComponent } from "vue";
import { RouterLink, useRouter  } from "vue-router";

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    urlImage: {
      type: String,
      required: true,
    }
  },
  setup(props, { emit, useRouter}) {

    const deleteCategory = async () => {

      try {

        const response = await fetch(`http://localhost:5158/api/categories/${props.id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        console.log('Categoria deletada com sucesso');
        // Aqui você pode adicionar lógica para atualizar a UI após a exclusão
        emit('categoryDeleted', props.id); // Emite o evento com o ID da categoria excluída
        window.location.reload(); // Recarrega a página
      } catch (error) {
        console.error('Erro ao deletar categoria:', error);
      }
    };

    return {
      id: props.id,
      name: props.name,
      description: props.description,
      status: props.status,
      userId: props.userId,
      urlImage: props.urlImage,
      deleteCategory,
    };
  },
});
</script>

<template>
  <div class="container" :style="{ backgroundColor: '#f2f2f2' }">
    <RouterLink class="button">
      <div id="figura">
        <img :src="urlImage" alt="">
      </div>
      <div>
        <p>{{ name }}</p>
        <button @click="deleteCategory" class="delete-button">Deletar</button>
      </div>
    </RouterLink>

  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap");

.container {
  display: flex;
  flex-direction: column;
  width: 145px;
  height: 155px;
  margin: 15px auto;
  box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.1);
  padding: 4px;
  border-radius: 10px;
  justify-content: center;
  background-color: #f2f2f2;
}

#figura {
  position: relative;
  top: -15px;
  left: 5px;
}

p {
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  top: 0px;
  color: #4d4d4d;
  font-family: "DM Sans", sans-serif;
  font-weight: 600;
  font-style: medium;
  font-size: 14px;
  margin-left: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.delete-button {
  position: relative;
  top: 15px;
  padding: 10px 10px;
  width: 100%;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  align-self: center;
}

.delete-button:hover {
  background-color: #ff1a1a;
}
</style>