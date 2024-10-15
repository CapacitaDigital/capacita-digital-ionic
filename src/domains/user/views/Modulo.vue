<script setup lang="ts">
import { IonPage } from '@ionic/vue';
import HeaderLevels from '@/domains/portuguese/components/HeaderLevels.vue';
import NavBotton from '@/domains/portuguese/components/NavBotton.vue';
import CardLevels from '@/domains/user/components/CardLevels.vue';
import { ref } from 'vue'
import Buzina from '@/domains/auth/components/Buzina.vue';
import { falar } from '@/utils/utils';
const frase = ref('SelecionarAtividade');



</script>

<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <div>
                <HeaderLevels :frase="frase" />
            </div>
            <div class="container">
                <CardLevels 
                title="Conhecendo as letras"
                image="img/abc.png"
                link="/att/roadMap"
                atividade="letras"
                />
                
                <CardLevels
                title="Sílabas e junções"
                image="img/alfabeto.png"
                link="/att/roadMap"
                atividade="silabas"
                />
            </div>
        </ion-content>
        <NavBotton />
    </ion-page>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    margin-top: 20px;
    gap: 30px;
    align-items: center;
}

.NavBotton {
    position: fixed;
    bottom: 0;
    width: 100%;
}

 
</style>