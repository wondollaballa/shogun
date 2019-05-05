<template>
    <ag-grid-vue class="ag-theme-balham"
                 :columnDefs="columnDefs"
                 :rowData="rowData"
                 rowSelection="multiple"
                 @selection-changed="onSelectionChanged"></ag-grid-vue>
</template>
<script lang="ts" src="./aggridvue.ts"></script>
