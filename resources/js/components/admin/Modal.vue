<template>
    <div class="modal">
        <div class="modal-dialog">
            <div class="modal-header">
                <p>{{ title }}</p>
                <span class="modal-close" @click="close">&times;</span>
            </div>
            <div class="modal-body">
                <div class="pure-form">
                    <fieldset class="pure-group">
                        <input type="text" class="pure-input-1 reservation-modal-content" placeholder="Name" v-model="reservation.name" :disabled="!editable">
                        <input type="text" class="pure-input-1 reservation-modal-content" placeholder="Phone" v-model="reservation.phone" :disabled="!editable">
                        <input type="email" class="pure-input-1 reservation-modal-content" placeholder="Email" v-model="reservation.email" :disabled="!editable">
                    </fieldset>
                    <fieldset class="pure-group">
                        <input type="text" class="pure-input-1 reservation-modal-content" placeholder="Party Size" v-model="reservation.requested_formatted" :disabled="!editable" v-show="!editable"/>
                        <date-time-picker class="pure-input-1 reservation-modal-content" :interval="rules.interval" :blackouts="rules.disabledDays" :not-after="rules.notAfter" :date-time-requested="reservation.requested" v-show="editable"></date-time-picker>
                        <input type="text" class="pure-input-1 reservation-modal-content" placeholder="Party Size" v-model="reservation.party_size" :disabled="!editable"/>
                        <textarea type="text" class="pure-input-1 reservation-modal-content" placeholder="Special Request" v-model="reservation.special_request" :disabled="!editable"></textarea>
                    </fieldset>
                    <fieldset class="pure-group">
                        <select class="pure-u-1 modal-hibachi" v-model="reservation.hibachi" :disabled="!editable">
                            <option value="1">Hibachi seating</option>
                            <option value="0">Regular seating</option>
                        </select>
                    </fieldset>
                    <fieldset>
                        <button class="pure-button button-error pure-u-1" v-show="editable" @click="deleteConfirmation">Delete Reservation</button>
                    </fieldset>
                </div>
            </div>
            <div class="modal-footer">
            
                <button type="button" class="pure-button button-error" @click="close">close</button>
                <div class="pure-button-group" role="group">
                    <button class="pure-button" v-show="!editable && !finished" @click="allowEdit">Edit</button>
                    <button class="pure-button button-success" @click="save" v-show="editable && !finished">Save</button>
                    <button class="pure-button pure-button-primary" @click="seat" :disabled="editable" v-show="!finished">Seat Customer</button>
                    <button class="pure-button pure-button-primary" @click="unseat" :disabled="editable" v-show="finished">Revert Seating</button>

                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" src="./modal.ts"></script>