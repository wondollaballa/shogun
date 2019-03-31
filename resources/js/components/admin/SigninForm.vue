<template>

    <form id="admin-signin-form" class="pure-form" :method="method" :action="action">
        <input type="hidden" name="_token" :value="csrf" />
        <fieldset>
            <div id="username-group" class="pure-control-group" v-bind:class="{ 'errors': usernameIsNotValid }">

                <input id="name" name="username" type="text" placeholder="Username" v-model.trim="username" />
                <span class="pure-form-message" v-if="usernameIsNotValid">{{ usernameErrorMessage }}</span>
            </div>
            <br/>
            <div id="password-group" class="pure-control-group" v-bind:class="{ 'errors': passwordIsNotValid }">

                <input id="password" name="password" type="password" placeholder="Password" v-model.trim="password">
                <span class="pure-form-message" v-if="passwordIsNotValid">{{ passwordErrorMessage }}</span>
            </div>
            <br/>
            <div class="pure-controls">
                <label for="remember" class="pure-checkbox">
                    <input id="remember" type="checkbox" name="remember"> Remember me
                </label>
                <button type="button" class="pure-button pure-button-primary" v-on:click="formValidate">Submit</button>
            </div>
        </fieldset>
    </form>

</template>

<script lang="ts" src="./signinform.ts"></script>