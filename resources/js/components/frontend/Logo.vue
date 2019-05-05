<template>
    <div id="header-logo" :style="{ backgroundImage: 'url(../images/shogun_2.png)'  }" :class="[thinking ? 'thinking' :  '', passed ? 'passed' : '', failed ? 'failed' : '']"></div>
</template>

<script lang="ts" src="./logo.ts"></script>
