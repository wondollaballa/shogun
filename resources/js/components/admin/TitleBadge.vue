<template>
    <span class="badge badge-grid" v-bind:class="badgeClasses">
        <span v-if="showTitle" class="badge-title">{{ title }}</span>
        <span class="badge-content">
            <slot></slot>
        </span>
    </span>
</template>

<script lang="ts" src="./title_badge.ts"></script>