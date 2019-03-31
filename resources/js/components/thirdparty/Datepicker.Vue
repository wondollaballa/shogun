<template>

    <date-picker :lang="lang" v-model="date1" :not-before="new Date()" format="MM/DD/YYYY" oninput="updated"></date-picker>

</template>

<script lang="ts" src="./datepicker.ts"></script>