<script setup lang="ts">
import { IonContent, IonPage, IonGrid, IonRow, IonCol } from '@ionic/vue';
import { useRouter } from 'vue-router';

const router = useRouter();

async function getUser() {
    const response = await fetch('http://127.0.0.1:5245/api/user', {
        method: 'GET',
        headers: {
            'accept': 'application/json',
        },
    });
}

async function sendUserToAPI(user: any) {
    const response = await fetch('http://127.0.0.1:5245/api/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: user.displayName,
            email: user.email,
            userType: 'Student'
        }),
    });
}

</script>

<template>
    <ion-page>
        <ion-content>
            <div class="img">
                <img src="img/capas/estudo.jpeg" alt="Capacita Digital">
            </div>
            <div class="back"></div>
            <ion-grid>
                <ion-row>
                    <ion-col>
                        <div class="title">
                            <h1>Bem vindo!</h1>
                            <p>Entre na sua conta ou registre-se</p>
                        </div>
                    </ion-col>
                </ion-row>
            </ion-grid>
            <ion-grid>
                <ion-row class="buttons">
                    <div class="submit">
                        <RouterLink class="route" to="/register">Inscreva-se gratuitamente</RouterLink>
                    </div>
                    <div class="google">
                        <img src="img/googlecor.svg">
                        <button>Continuar com o Google</button>
                    </div>
                    <div class="login">
                        <RouterLink class="route" to="/professor">Entrar</RouterLink>
                    </div>
                </ion-row>
                <ion-row>
                    <div class="input"></div>
                </ion-row>
            </ion-grid>
        </ion-content>
    </ion-page>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');

.img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
}

.back {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 1), rgba(0, 0, 0, 1), rgba(0, 0, 0, 1));
    z-index: -1;
}

.title {
    display: flex;
    position: relative;
    top: 20.5rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
}

.title h1 {
    font-size: 2rem;
    font-weight: 700;
}

.title p {
    font-size: 1rem;
    font-weight: 400;
    text-align: center;
    color: #d4d1d1;
}

.buttons {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.submit {
    display: flex;
    position: relative;
    width: 95%;
    height: 3.5rem;
    top: 22rem;
    justify-content: center;
    align-items: center;
    padding: 15px;
    background-color: blueviolet;
    color: azure;
    font-weight: bold;
    border-radius: 5px;
}

.submit .route,
.login .route {
    color: azure;
    font-weight: bold;
}

.google {
    display: flex;
    position: relative;
    width: 95%;
    height: 3.5rem;
    top: 23rem;
    align-items: center;
    justify-content: center;
    padding: 15px;
    background-color: #1E1F24;
    color: azure;
    font-weight: bold;
    border-radius: 5px;
}

.google img {
    position: absolute;
    left: 20px;
    width: 25px;
    height: 25px;
}

.login {
    display: flex;
    position: relative;
    width: 95%;
    height: 3.5rem;
    top: 24rem;
    justify-content: center;
    align-items: center;
    padding: 15px;
    color: azure;
    font-weight: bold;
    border-radius: 5px;
    border: solid 2px #1E1F24;
}
</style>