<template>
    <div class="modal" v-show="opened">
        <div class="modal-dialog">
            <div class="modal-header">
                <p>{{ title }}</p>
                <span class="modal-close" @click="closeModal">&times;</span>
            </div>
            <div class="modal-body">
                {{ message }}
            </div>
            <div class="modal-footer">

                <button type="button" class="pure-button button-error" @click="closeModal">close</button>

            </div>
        </div>
    </div>
</template>
<script lang="ts" src="./message_modal.ts"></script>
