<template>
    <fieldset>
        <div class="form-div" v-bind:class="{errors: showValidation && !nameValidated}">
            <label for="name">Name<span class="required">*</span></label>
            <input class="pure-u-1" name="name" type="text" placeholder="reservation name" v-model="name"/>
            <span class="pure-form-message" v-show="showValidation && !nameValidated">{{ nameErrorMessage }}</span>
        </div>
        <div class="form-div" v-bind:class="{errors: showValidation && !phoneValidated}">
            <label for="phone">Phone<span class="required">*</span></label>
            <input class="pure-u-1" name="phone" type="text" placeholder="###-###-####" v-model="phone"/>
            <span class="pure-form-message" v-show="showValidation && !phoneValidated">{{ phoneErrorMessage }}</span>
        </div>
        <div class="form-div" v-bind:class="{errors: showValidation && !emailValidated}">
            <label for="email">Email<span class="required">*</span></label>
            <input class="pure-u-1" name="email" type="email" placeholder="example@example.com" v-model="email"/>
            <span class="pure-form-message" v-show="showValidation && !emailValidated">{{ emailErrorMessage }}</span>
        </div>
        <div class="form-div" v-bind:class="{errors: showValidation && !partySizeValidated}">
            <label for="party_size">Party Size<span class="required">*</span></label>
            <input class="pure-u-1" name="party_size" type="text" placeholder="# of people" v-model="partySize"/>
            <span class="pure-form-message" v-show="showValidation && !partySizeValidated">{{ partySizeErrorMessage }}</span>
        </div>
        <div class="form-div" v-bind:class="{errors: showValidation && !requestedValidated}">
            <label for="requested">Reservation Date &amp; Time<span class="required">*</span></label>
            <date-time-picker class="pure-u-1" :interval="interval" :blackouts="blackouts" :not-after="notAfter" v-model="requested"></date-time-picker>
            <span class="pure-form-message" v-show="showValidation && !requestedValidated">{{ requestedErrorMessage }}</span>
        </div>
        <div class="form-div" v-bind:class="{errors: showValidation && !specialRequestValidated}">
            <label for="requested">Special Request</label>
            <textarea class="pure-u-1" placeholder="special requests (optional)" v-model="specialRequest"></textarea>
            <span class="pure-form-message" v-show="showValidation && !specialRequestValidated">{{ specialRequestErrorMessage }}</span>
        </div>
        <div class="form-div">
            <label for="requested">Hibachi</label>

            <label for="option-two" class="pure-radio">
                <input id="option-two" type="radio" name="optionsRadios" value="true" checked v-model="hibachi">
                Hibachi Seating
            </label>

            <label for="option-three" class="pure-radio">
                <input id="option-three" type="radio" name="optionsRadios" value="false" v-model="hibachi">
                Regular Seating
            </label>

        </div>
    </fieldset>
</template>

<script lang="ts" src="./reservation_form.ts"></script>