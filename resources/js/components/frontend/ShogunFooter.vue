<template>
    <div id="shogun-footer">
        <br/>
        <p>&copy; {{ year }} Shogun of Japan, all rights reserved.</p>
        <blockquote>{{ store.street }}, <br/>{{ store.city }}, {{ store.city }} {{ store.zipcode }}<br/>{{ store.phone }}</blockquote>
        <div class="special-html" v-html="content"></div>
    </div>
</template>

<script lang="ts" src="./shogun_footer.ts"></script>
