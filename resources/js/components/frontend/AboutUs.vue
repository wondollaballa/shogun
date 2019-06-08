<template>
    <div id="about-us" class="content-body">
        <div class="triangle-top-left">
            <span>About Us</span>
        </div>
        <div class="triangle-bottom-right"></div>
        <div id="about-us-image-container" class="content-image-container">
            <div id="about-us-image" class="content-image" :class="imageRotateClass" :style="{ backgroundImage: 'url('+imageUrl+')'}"></div>
        </div>
        <blockquote v-html="content"></blockquote>
    </div>
</template>

<script lang="ts" src="./about_us.ts"></script>
