<script lang="ts">
import { defineComponent } from "vue";
import { RouterLink } from "vue-router";

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
  setup(props, { emit }) {

    const deleteCategory = async () => {
      try {
        const response = await fetch(`http://localhost:5158/api/categories/${props.id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        console.log('Categoria deletada com sucesso');
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
  <div class="container">
    <RouterLink :to="{ name: 'Home' }" class="button">
      <div id="figura">
        <img :src="'http://localhost:5158' + urlImage" alt="">
      </div>
      <div class="content">
        <p>{{ name }}</p>
        <button @click="deleteCategory" class="delete-button">Deletar</button>
        
        <RouterLink
          :to="{
            name: 'EditCategory',
            params: {
              id: id,
              name: name,
              description: description,
              status: status,
              userId: userId,
              
            },
          }"
        >
          <button class="edit-button">Editar</button>
        </RouterLink>
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
  background-color: transparent;
}

#figura {
  position: relative;
  display: flex;
  width: 100%;
  background-color: transparent;
  justify-content: center;
  align-items: center;
}

img {
  height: 40px;
  width: 40px;
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 10px 0px;
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

.edit-button {
  position: relative;
  top: 15px;
  padding: 10px 10px;
  width: 100%;
  background-color: gray;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  align-self: center;
}

.delete-button:hover {
  background-color: red;
}

.edit-button:hover {
  background-color: gray;
}
</style>