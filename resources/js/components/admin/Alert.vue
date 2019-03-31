<template>
    <section class="alert toast" v-bind:class="typeClass">
        <article>{{ message }}</article>
    </section>
</template>

<script lang="ts" src="./alert.ts"></script>