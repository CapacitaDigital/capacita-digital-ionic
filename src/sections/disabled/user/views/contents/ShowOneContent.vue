<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  setup() {
    const content = ref({
      id: 0,
      title: "",
      description: "",
      type: "",
      activityData: {},
      activityDataSerialized: "",
      urlImage: "",
      urlVideo: "",
      urlDocument: "",
      urlsDocuments: [],
      moduleId: 0,
    });
    const route = useRoute();

    const deserializecontent = (activityData: string) => {
      try {
        content.value.activityData = JSON.parse(activityData);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchData = async (id: string) => {
      try {
        const response = await fetch(`http://localhost:8080/api/contents/${id}`, {
          method: "GET",
          headers: {
            accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Erro ao buscar atividades");
        }

        const result = await response.json();
        content.value = result;
        console.log(content.value);

        // Substitua /app/UploadedFiles por /images
        if (content.value.urlImage && content.value.urlImage.includes("/app/wwwroot")) {
          content.value.urlImage = content.value.urlImage.replace("/app/wwwroot", "/");
        } else if (
          content.value.urlImage &&
          content.value.urlImage.includes(
            "/home/double/Repo/CapacitaDigital/CapacitaDigitalApi/wwwroot/"
          )
        ) {
          content.value.urlImage = content.value.urlImage.replace(
            "/home/double/Repo/CapacitaDigital/CapacitaDigitalApi/wwwroot/images",
            "/images"
          );
        } else if (
          content.value.urlImage &&
          content.value.urlImage.includes("/images/images/")
        ) {
          content.value.urlImage = content.value.urlImage.replace(
            "/images/images/",
            "/images"
          );
        }
        if (content.value.urlImage && content.value.urlImage.includes("/app/wwwroot")) {
          content.value.urlImage = content.value.urlImage.replace("/app/wwwroot", "/");
        } else if (
          content.value.urlImage &&
          content.value.urlImage.includes(
            "/home/double/Repo/CapacitaDigital/CapacitaDigitalApi/wwwroot/"
          )
        ) {
          content.value.urlImage = content.value.urlImage.replace(
            "/home/double/Repo/CapacitaDigital/CapacitaDigitalApi/wwwroot/images",
            "/images"
          );
        } else if (
          content.value.urlImage &&
          content.value.urlImage.includes("/images/images/")
        ) {
          content.value.urlImage = content.value.urlImage.replace(
            "/images/images/",
            "/images"
          );
        }
        content.value.urlDocument = content.value.urlsDocuments[0];
        if (
          content.value.urlDocument &&
          content.value.urlDocument.includes(
            "/home/double/Repo/CapacitaDigital/CapacitaDigitalApi/wwwroot/"
          )
        ) {
          content.value.urlDocument = content.value.urlDocument.replace(
            "/home/double/Repo/CapacitaDigital/CapacitaDigitalApi/wwwroot/",
            "/"
          );
        }
        deserializecontent(result.activityData); // Supondo que a string JSON esteja em result.activityData
      } catch (error) {
        console.error(error);
      }
    };

    onMounted(() => {
      const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;
      fetchData(id);
    });

    return { content };
  },
});
</script>

<template>
  <div class="container">
    <div class="fundo">
      <img :src="'http://localhost:8080' + content.urlImage" :alt="content.urlImage" />
    </div>
    <div class="form">
      <div class="title">
        <h1 for="title">{{ content.title }}</h1>
      </div>

      <div class="description">
        <p>{{ content.description }}</p>
      </div>

      <div class="documents" v-if="content.urlDocument">
        <label for="urlDocument">Documentos</label>
        <br />
        <button>
          <a :href="'http://localhost:8080' + content.urlDocument" target="_blank">{{
            content.urlDocument
          }}</a>
        </button>
      </div>

      <label for="urlVideo">Video do YouTube</label>
      <div class="youtube-video">
        <iframe
          width="560"
          height="315"
          :src="content.urlVideo"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </div>
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

.youtube-video {
  margin-top: 20px;
  width: 100%;
  height: 315px;
  /* Altura padrão para vídeos do YouTube */
}
.documents {
  margin-top: 20px;
}
.documents > label {
  font-size: large;
  color: #2e2e2e;
  font-weight: bold;
}
.documents > button > a {
  color: white;
  font-weight: 600;
}
.documents > button {
  margin-top: 10px;
  height: 60px;
  line-height: 40px;
  padding: 10px;
  font-weight: 600;
  border-radius: 5px;
  color: black;
  border: 1px solid #2e2e2e;
  background-color: #2e2e2e;
  transition: 0.5s;
}
button:hover {
  transition: 0.5s;
  background-color: brown;
}
.youtube-video iframe {
  width: 100%;
  height: 100%;
}

.fundo {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  background-color: transparent;
}

.fundo > img {
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

.containe-campo {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 5px;
  color: white;
}

.campo {
  display: flex;
  gap: 10px;
  padding: 0px;
  margin: 0px;
  align-items: center;
  text-align: center;
}

.remove {
  background-color: red;
  color: white;
  border: 1px solid red;
  border-radius: 5px;
  padding: 0px;
  width: 80px;
  height: 50px;
  margin: 0px;
}

.create {
  display: flex;
  flex-direction: column;
  background-color: green;
  color: white;
  border: 1px solid white;
  border-radius: 5px;
  padding: 30px;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  margin: 0px;
  justify-content: center;
  align-items: center;
  font-size: 60px;
  font-weight: 200;
}

.letras {
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  padding: 0px;
  margin: 0px;
  background-color: white;
  height: 50px;
  width: 50px;
  color: black;
  font-weight: bold;
  border: 1px solid black;
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
