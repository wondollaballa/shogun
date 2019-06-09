<template>
    <div id="image-modal" class="modal" :class="opened ? 'opened': ''">
        <div class="modal-dialog">
            <div class="modal-header">
                <p>{{ title }}</p>
                <span class="modal-close" @click="closeDialog">&times;</span>
            </div>
            <div class="modal-body">

                <div>
                    <input class="fileUpload" type="file"/>
                    <button class="pure-button button-error" @click="rotate(-1)">rotate -</button>
                    <button class="pure-button button-success" @click="rotate(1)">rotate +</button>
                </div>
                <div class="preview-container">
                    <div id="preview-image-header" class="preview-image" :class="getRotateClass()" :style="{ backgroundImage: 'url('+imagePath+')'  }"></div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="pure-button button-success pure-u-1" @click="closeDialog">Apply</button>
            </div>
        </div>
    </div>
</template>
<script lang="ts" src="./image_modal.ts"></script>
