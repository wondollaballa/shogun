<template>
    <section>
        <article>
            <fieldset>
                <legend>Select Date</legend>
                <date-picker></date-picker>
            </fieldset>
        </article>
        <article id="blackoutdates-article">
            <fieldset id="blackoutdates-fieldset">
                <legend>Blackout Dates</legend>
                <div id="blackout-grid-container">
                    <ag-grid-vue id="blackout-grid"></ag-grid-vue>
                </div>
            </fieldset>
        </article>
    </section>

</template>

<script lang="ts" src="./blackout_dates.ts"></script>
