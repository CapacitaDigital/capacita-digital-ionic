<script setup lang="ts">
import { IonContent, IonPage } from '@ionic/vue';
import { ref } from 'vue';
import { onMounted } from 'vue';
import CardModules from '@/domains/manager/components/CardModules.vue';

/*
    * Tasks necessárias
    * 1. Buscar todas os modulos relacionados a categoria 
    * 2. Reutilizar esse componente
    * 3. Montar a consulta => SELECT * FROM modules WHARE categioriaId = {{ categoria.id }};
    * 4. Criar uma action no Controller que faça a consulta
*/

const props = defineProps({
        id: {
            type: Number,
            required: true
        }
    });

onMounted(async () => {
    try {
        const response = await fetch('http://localhost:8080/api/modules', {
            method: 'GET',
            headers: {
                'accept': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Erro ao buscar modulos');
        }
        const data = await response.json();
        modules.value = data;
    } catch (error) {
        console.error(error);
    }
});

</script>

<template>
    <ion-page class="page">
        <ion-content>
            <div class="content">
                <div class="areas">
                    <div class="title">
                        <h1>Português</h1>
                        <h2>mais recentes</h2>
                    </div>
                    <div class="cards">
                        <CardModules v-for="module in modules" :key="module.id" 
                            :id="module.id"
                            :title="module.title"
                            :description="module.description"
                            :nivel="module.nivel"
                            :status="module.status"
                         />
                    </div>

                </div>

            </div>
        </ion-content>
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

.img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
}

.content {
    position: relative;
    width: 100vw;
    height: 100vh;
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

<script setup lang="ts">
import { IonContent, IonPage } from '@ionic/vue';
import { ref } from 'vue';
import { onMounted } from 'vue';
import CardModules from '@/domains/manager/components/CardModules.vue';

// Preciso receber o ID e pesquisar o modulo no banco



const module = ref({});

onMounted(async () => {
    try {
        const response = await fetch(`http://localhost:8080/api/modules/${props.id}`, {
        method: 'GET',
        headers: {
            'accept': 'application/json',
        },
        });
        if (!response.ok) {
            throw new Error('Erro ao buscar modulos');
        }
        const data = await response.json();
        module.value = data;
    } catch (error) {
        console.error(error);
    }
});
