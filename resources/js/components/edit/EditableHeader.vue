<template>
    <section id="headerHome" class="header-section">
        <header  >
            <slot></slot>
        </header>
        <div id="header-image" :class="imageRotateClass" :style="{ backgroundImage: 'url('+imageUrl+')'}"></div>
    </section>
</template>

<script lang="ts" src="./editable_header.ts"></script>
