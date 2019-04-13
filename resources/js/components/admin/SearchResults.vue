<template>
    <div id="search-results" class="pure-menu pure-menu-scrollable" v-show="show">
        <ul class="search-list pure-menu-list">
            <li v-bind:key="key" v-for="(value, key) in searchResults"  @click="setClickedRow(key)">
                <title-badge show-title title="party">{{ value.party_size }}</title-badge> 
                <title-badge show-title title="name">{{ value.name }}</title-badge> 
                <title-badge show-title title="phone">{{ value.phoneFormatted }}</title-badge>
                <title-badge show-title title="requested">{{ value.requestedFormatted }}</title-badge>
            </li>
        </ul>
    </div>
</template>

<script lang="ts" src="./search_results.ts"></script>