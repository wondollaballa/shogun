<template>
    <div>
        <div id="search-bar" class="pure-form pure-u-1">
            <input type="text" class="pure-input-rounded" placeholder="search reservation" v-model="search" />
        </div>
        <search-results></search-results>
    </div>    
</template>

<script lang="ts" src="./search.ts"></script>