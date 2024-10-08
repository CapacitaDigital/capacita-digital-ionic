<script lang="ts">
import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router';

export default defineComponent({
    props: {
        title: {
            type: String,
            required: true
        },
        link: {
            type: String,
            required: true
        },
        editLink: {
            type: String,
            required: true
        }
    }
});
</script>

<template>
    <div class="card">
        <div class="content">
            <div class="shape"></div>
            <div class="head">
                <p>{{ title }}</p>
                <RouterLink :to="editLink"><img src="/img/group.png" alt=""></RouterLink>
            </div>
            <RouterLink :to="link" class="actions">
                <div class="action">
                    <img src="/img/livro.png" alt="actionImage">
                    <span>Atividades: <strong>3</strong></span>
                </div>
                <div class="action">
                    <img src="/img/nivel.png" alt="actionImage">
                    <span>Nivel: <strong>Fácil</strong></span>
                </div>
            </RouterLink>
        </div>
    </div>
</template>

<style scoped>

.card {
    text-decoration: none;
    color: aliceblue;
}

.content {
    background-color: #8F98FF;
    display: flex;
    flex-direction: column;
    position: relative;  
    width: 10rem;
    height: 6.5rem;
    align-items: flex-start;
    justify-content: flex-start;
    border-radius: 12px;
    padding: 0.2rem 0.4rem 0.2rem 0.4rem;
    gap: 0.4rem;
    overflow: hidden;
}

.shape {
    background-color: #182A88;
    color: #fff;
    position: absolute;
    top: 0;
    right: 0;
    width: 35px;
    height: 45px;
    border-radius: 30% 70% 0% 100% / 77% 0% 100% 23%;
    background-clip: content-box;
}

.actions {
    display: flex;
    flex-direction: column;
    gap: 0.2rem
}

.action {
    display: flex;
    gap: 0.4rem;
    font-size: 12px
}

.action span {
    color: #4D4D4D;
    font-weight: 600;
}

.action strong {
    color: white;
}

.action img {
    max-width: 1rem;
}


.content img {
    position: relative;
    width: 1.5rem;
}

.content #info {
    max-width: 1.4rem;
}

.head {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

p {
    font-weight: 600;
    font-size: 12px;
    max-width: 80%
}
</style>
