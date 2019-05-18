<template>
    <div id="image-modal" class="modal" :class="opened ? 'opened': ''">
        <div class="modal-dialog">
            <div class="modal-header">
                <p>{{ title }}</p>
                <span class="modal-close" @click="closeDialog">&times;</span>
            </div>
            <div class="modal-body">
                <input class="fileUpload" type="file"/>
            </div>
            <div class="modal-footer">
                <button type="button" class="pure-button button-success pure-u-1" @click="closeDialog">Done</button>
            </div>
        </div>
    </div>
</template>
<script lang="ts" src="./image_modal.ts"></script>
