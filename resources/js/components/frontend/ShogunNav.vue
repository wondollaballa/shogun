<template>
    <nav>
        <div id="nav-grid">
        <a class="middle" href="/"><img :src="imageSrc"/></a>
        <a class="nav-items center middle" :class="(pointReached === 'about-us') ? 'active' : '' " @click="scrollToElement('about-us')">about us</a>
        <a class="nav-items center middle" :class="(pointReached === 'the-experience') ? 'active' : '' " @click="scrollToElement('the-experience')">the experience</a>
        <a class="nav-items center middle" :class="(pointReached === 'our-menu') ? 'active' : '' " @click="scrollToElement('our-menu')">our menu</a>
        <a class="nav-items center middle" :class="(pointReached === 'contact-us') ? 'active' : '' " @click="scrollToElement('contact-us')">contact us</a>
    </div>
    </nav>
</template>
<script lang="ts" src="./shogun_nav.ts"></script>
