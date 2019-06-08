<template>
    <section id="editable-footer" class="editable">
        <slot></slot>
        <div v-html="content"></div>
    </section>
</template>

<script lang="ts" src="./editable_footer.ts"></script>
