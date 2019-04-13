<template>
    <div class="modal">
        <div class="modal-dialog confirmation">
            <div class="modal-header">
                <p>{{ title }}</p>
                <span class="modal-close" @click="close">&times;</span>
            </div>
            <div class="modal-body">
                <p>Are you sure you want to delete this reservation?</p>
            </div>
            <div class="modal-footer">
                <button class="pure-button button-error pure-u-1" @click="deleteReservation">Delete</button>
                
            </div>
        </div>
    </div>
</template>
<script lang="ts" src="./delete_confirmation.ts"></script>