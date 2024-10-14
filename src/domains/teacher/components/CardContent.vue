<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        title: {
            type: String,
            required: true
        },
        data: {
            type: String,
            required: true
        }
    },
    methods: {
        navigateToContent() {
            console.log("Navigating with data:", this.data); // Adicionar log para depuração
            this.$router.push({
                path: '/content',
                query: { data: this.data }
            });
        }
    }
});
</script>
<template>
    <div class="container">
        <div class="foto">
            <a @click="navigateToContent" class="activity-link">
                <img src="/public/img/abc.png" alt="">
            </a>
        </div>
        <div class="texto">
            <p> {{ title }}
            </p>
        </div>

    </div>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;
}

.foto {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>