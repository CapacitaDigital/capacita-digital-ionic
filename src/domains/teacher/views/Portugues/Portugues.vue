<script setup lang="ts">
import { IonContent, IonPage } from '@ionic/vue';
import NavBotton from '@/domains/portuguese/components/NavBotton.vue';
import CardModulos from '../../components/CardModulos.vue';
import CardNovoModulo from '../../components/CardNovoModulo.vue';
</script>

<template>
    <ion-page class="page">
        <ion-content>
            <div class="background-green">
                <img src="img/fundo.png" alt="Capacita Digital">
            </div>
            <div class="vetor">
                <img src="img/fundo.png" alt="Capacita Digital">
            </div>
            <div class="livro">
                <img src="img/study.png" alt="Capacita Digital">
            </div>
            <div class="content">
                <div class="areas">

                    <div class="title">
                        <h1>Português</h1>
                        <h2>Por prioridade</h2>
                    </div>
                    <div class="cards">
                        <CardModulos title="Conhecendo as letras" link="/manager/portugues" edit-link="/manager/portuguese/module/edit/" />
                        <CardModulos title="Conhecendo as letras" link="/manager/portugues" edit-link="/manager/portuguese/module/edit/" />
                        <CardModulos title="Conhecendo as letras" link="/manager/portugues" edit-link="/manager/portuguese/module/edit/" />
                        <CardNovoModulo link="/manager/portugues/module/new"></CardNovoModulo>
                    </div>

                </div>

            </div>
        </ion-content>
        <div id="navButton">
            <NavBotton />
        </div>
    </ion-page>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

* {
    /* Removed the  
 global background setting */
    font-family: "Poppins", sans-serif;
}

.background-green {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #00664F;
    z-index: -1;
}

.vetor {
    position: relative;
    top: 2.1rem;
    right: -7.5rem;
    width: 70%;
    height: 30%;
    z-index: -1;
}

.livro {
    position: relative;
    top: -6.5rem;
    right: -10.8rem;
    width: 55%;
    height: 30%;
    z-index: 1;
}

.img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
}

.content {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 55%;
    background: #FFF;
    border-radius: 40px 0 0 0;
    padding-left: 1rem;
}

.navButton {
    position: absolute;
    bottom: 0;
}

.title {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.title h1 {
    font-weight: bold;
    font-size: 20px;
    color: #212523;
    margin: 0;
}

.title h2 {
    margin: 0;
    font-size: 14px;
    color: #BCC1CD;
}

.cards {
    margin-top: 1rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
    margin-bottom: 1rem;
}


.cards a {
    padding: 0;

}

.cards-alunos {
    margin-top: 1rem;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
}
</style>