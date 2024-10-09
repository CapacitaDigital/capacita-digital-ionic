<script setup lang="ts">
import { IonContent, IonPage } from '@ionic/vue';
import NavBotton from '@/domains/portuguese/components/NavBotton.vue';

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
                <h1>Crie um novo módulo</h1>
                <form>
                    <div class="inputs">
                        <label for="titulo">Título do módulo: </label>
                        <input type="text" name="titulo" title="Titulo do Modulo" placeholder="Titulo do Modulo"/>
                    </div>
                    <div class="inputs">
                        <label for="nivel">Nível do módulo: </label>
                        <select name="nivel" id="nivel">
                            <option value="Fácil">Fácil</option>
                            <option value="Médio">Médio</option>
                            <option value="Difícil">Difícil</option>
                        </select>
                    </div>
                    <button>Enviar</button>
                </form>
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
    padding-top: 2rem;
}

h1 {
    font-size: 20px;
    font-weight: 600;
}

form {
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 0.8rem;
    max-width: 90%;
}

input, select {
    background-color: #fff;
    border: 2px solid #ccc;
    padding: 0.6rem 1rem;
    border-radius: 20px;
}

button {
    background-color: #00664F;
    padding: 0.8rem 1rem;
    border: 1px solid #f0f0f0;
    border-radius: 20px;
    color: #fff;
}

.inputs {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
}
</style>