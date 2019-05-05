<template>
    <ag-grid-vue class="ag-theme-balham"
                 :columnDefs="columnDefs"
                 :rowData="rowData"
                 rowSelection="single"
                 @row-clicked="onRowClicked($event)"></ag-grid-vue>
</template>
<script lang="ts" src="./user_table.ts"></script>
