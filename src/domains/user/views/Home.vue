<script setup lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import NavBotton from '@/domains/portuguese/components/NavBotton.vue';
import Card from '@/domains/user/components/Card.vue';
import CardEmpty from '@/domains/user/components/CardEmpty.vue';
import Header from '@/domains/reasoning/components/Header.vue';
import { ref, onMounted } from 'vue';
import Buzina from '@/domains/auth/components/Buzina.vue';
import { falar } from '@/utils/utils';

const frase = ref('SeleçãoTema');
interface Categoria {
  id: number;
  name: string;
  description: string;
  status: string;
  userId: number;
  urlImage: string;
}

const categorias = ref<Categoria[]>([]);

const fetchCategorias = async () => {
  try {
    const response = await fetch('http://localhost:5158/api/categories/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    categorias.value = data;
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
  }
};

onMounted(() => {
  fetchCategorias();
});
</script>

<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div>
        <Header color="#249B9B" />
        <Buzina :frase="frase" />
      </div>

      <div id="container">
        <Card v-for="categoria in categorias" :id="categoria.id.toString()"  :name="categoria.name"
          :description="categoria.description" :status="categoria.status" :userId="categoria.userId.toString()" :urlImage="categoria.urlImage" />
          <CardEmpty message="Criar categoria"  />
      </div>


    </ion-content>
    <div id="navButton">
      <NavBotton />
    </div>
  </ion-page>
</template>

<style scoped>
#container {
  display: flex;
  justify-content: space-around;
  margin-top: 60px;
  padding: 0px 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  overflow: hidden;
}
</style>