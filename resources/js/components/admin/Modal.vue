<template>
    <div class="modal">
        <div class="modal-dialog">
            <div class="modal-header">
                <p>{{ title }}</p>
                <span class="modal-close">&times;</span>
            </div>
            <div class="modal-body">
                <slot></slot>
            </div>
            <div class="modal-footer">
                <button type="button" class="pure-button button-error" @click="close">close</button>
            </div>
        </div>
    </div>
</template>
<script lang="ts" src="./modal.ts"></script>