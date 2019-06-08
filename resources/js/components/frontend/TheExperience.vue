<template>
    <div id="the-experience" class="content-body">
        <div class="triangle-top-left">
            <span>The Experience</span>
        </div>
        <div class="triangle-bottom-right"></div>
        <div class="content-image-container">
            <div id="the-experience-image" class="content-image" :class="imageRotateClass" :style="{ backgroundImage: 'url('+imageUrl+')'}"></div>
        </div>
        <div class="content" v-html="content"></div>
        <!-- <h3 class="the-experience-title">Overview</h3>
        <blockquote>{{ overview }}</blockquote>
        <h3 class="the-experience-title">Hibachi</h3>
        <blockquote>{{ teppanyaki }}</blockquote>
        <h3 class="the-experience-title">Sushi</h3>
        <blockquote>{{ sushi }}</blockquote> -->
    </div>
</template>

<script lang="ts" src="./the_experience.ts"></script>
