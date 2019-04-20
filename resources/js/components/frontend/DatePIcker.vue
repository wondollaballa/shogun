<template>
    <div class="form-container">
        <label v-if="isLabel">{{ label }}</label>
        <flat-pickr v-model="selectedDate" :config="config" :class="validated ? 'validated' : ''"></flat-pickr>
    </div>
</template>

<script lang="ts" src="./date_picker.ts"></script>