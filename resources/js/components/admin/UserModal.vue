<template>
    <div id="user-modal" class="modal" :class="opened ? 'opened': ''">
        <div class="modal-dialog">
            <div class="modal-header">
                <p>{{ title }}</p>
                <span class="modal-close" @click="closeDialog">&times;</span>
            </div>
            <div class="modal-body">
                <div class="pure-form">
                    <fieldset class="pure-group">
                        <label>Basic Information</label>
                        <input type="text" class="pure-input-1" :class="!validation.username ? 'errors': ''" placeholder="Username" v-model="user.username" :disabled="true">
                        <input type="text" class="pure-input-1" :class="!validation.first_name ? 'errors': ''" placeholder="First Name" v-model="user.first_name" :disabled="true">
                        <input type="text" class="pure-input-1" :class="!validation.last_name ? 'errors': ''" placeholder="Last Name" v-model="user.last_name" :disabled="true">
                        <input type="text" class="pure-input-1" :class="!validation.phone ? 'errors': ''" placeholder="Phone" v-model="user.phone" :disabled="true">
                        <input type="email" class="pure-input-1" :class="!validation.email ? 'errors': ''" placeholder="Email" v-model="user.email" :disabled="true">
                    </fieldset>
                    <fieldset class="pure-group">
                        <label>Update Password</label>
                        <input type="password" class="pure-input-1" :class="!validation.password ? 'errors': ''" placeholder="Enter new password" v-model="user.password">
                        <input type="password" class="pure-input-1" :class="!validation.password ? 'errors': ''" placeholder="Confirm new password" v-model="confirm">
                        <label class="error-label" v-show="!validation.password">{{ validation.password_label }}</label>
                    </fieldset>
                </div>
            </div>
            <div class="modal-footer">

                <button type="button" class="pure-button button-error" @click="closeDialog">close</button>
                <div class="pure-button-group" role="group">
                    <button type="button" class="pure-button button-success" @click="validateAndSave">Save</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" src="./user_modal.ts"></script>
