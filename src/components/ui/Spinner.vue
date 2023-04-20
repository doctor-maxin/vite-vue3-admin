<template>
    <div class="lds-dual-ring"></div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.lds-dual-ring {
    display: inline-block;
    max-width: 80px;
    max-height: 80px;
    height: 100%;
    aspect-ratio: 1 / 1;
    min-width: 15px;
    min-height: 15px;
}
.lds-dual-ring:after {
    content: " ";
    display: block;
    width: 100%;
    height: 100%;
    margin: 2px;
    border-radius: 50%;
    border: 2px solid #fff;
    border-color: #fff transparent #fff transparent;
    animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>