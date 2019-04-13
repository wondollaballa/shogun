<template>
    <div class="tgl-wrapper">
        <input class="tgl tgl-flat" type="checkbox" v-model="state" />
        <label class="tgl-btn" for="" @click="changeState"></label>
    </div>
</template>

<script lang="ts" src="./switch.ts"></script>