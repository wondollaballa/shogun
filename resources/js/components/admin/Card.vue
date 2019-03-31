<template>
    <div class="card">
        <div class="card-header" >
            <slot name="header" v-if="header"></slot>
        </div>
        <div class="card-chart"> 
                <slot name="chart" v-if="chart"></slot>
        </div>
        <div class="card-body">
            <slot></slot>
        </div>
        <div class="card-footer" >
            <slot name="footer" v-if="footer"></slot>
        </div>
    </div>
</template>

<script lang="ts" src="./card.ts"></script>