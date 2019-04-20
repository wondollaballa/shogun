<template>
    <div id="header-logo" :class="[thinking ? 'thinking' :  '', passed ? 'passed' : '', failed ? 'failed' : '']"></div>
</template>

<script lang="ts" src="./logo.ts"></script>