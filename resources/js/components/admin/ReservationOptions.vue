<template>
    <fieldset>
        <legend>Basic Reservation Form Rules</legend>
        <div>
            <label for="interval">Reservation Interval (Displayed on time picker)</label>
            <select id="reservation-settings-interval" class="pure-u-1" v-model="interval_selected">
                <option v-for="option in intervals" :key="option.value" :value="option.value">
                    {{ option.text }}
                </option>
            </select>
            <span class="pure-form-message hide">This is a required field.</span>
        </div>
        <div>
            <label for="reservation_cap">Reservation Cap (per interval)</label>
            <input id="reservation-settings-reservation-cap" class="pure-u-1" v-model="reservation_cap"/>
            <span class="pure-form-message hide">This is a required field.</span>
        </div>
        <div>
            <label for="reservation_deadline">Reservation Cutoff (Minutes until allowed to reserve)</label>
            <select id="reservation-settings-reservation-deadline" class="pure-u-1" v-model="reservation_deadline_selected">
                <option v-for="option in reservation_deadline" :key="option.value" :value="option.value">
                    {{ option.text }}
                </option>
            </select>
            <span class="pure-form-message hide">This is a required field.</span>
        </div>

    </fieldset>
</template>

<script lang="ts" src="./reservation_options.ts"></script>
