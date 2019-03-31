<template>

    <date-picker type="datetime" 
                 :lang="lang" 
                 v-model="dateTime" 
                 :not-before="new Date()" 
                 :not-after="notAfter"
                 format="MM/DD/YYYY h:mma" 
                 confirm
                 :disabled-days="disabledDays"
                 :time-picker-options="timePickerOptions"></date-picker>

</template>

<script lang="ts" src="./datetimepicker.ts"></script>