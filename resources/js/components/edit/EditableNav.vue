<template>
    <section class="floating-nav">
        <a id="editable-back" class="pure-button" href="/dashboard">Back</a>
        <button class="pure-button button-error" @click="reset">Reset All</button>
        <button id="publish-button" class="pure-button button-success" @click="publish">Publish <span>{{ changes }}</span></button>
    </section>
</template>

<script lang="ts" src="./editable_nav.ts"></script>
