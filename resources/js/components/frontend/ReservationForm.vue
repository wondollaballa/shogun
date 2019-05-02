<template>
    <div class="reservation-form">
        <h5>Make Reservation Online</h5>
        <div>
            <h6 v-show="step===1">Or Call to Reserve</h6>
            <h5 v-show="step===1">(903) 561-9890</h5>
        </div>
        <div class="pure-form">
            <div id="reservation-form-1" v-show="step===1">
                <fieldset class="pure-group" >
                    <input type="text" class="pure-u-1" :class="validation.name ? 'validated' : ''" name="name" placeholder="Name" v-model="reservation.name"/>
                    <input type="text" class="pure-u-1" :class="validation.phone ? 'validated' : ''" name="phone" placeholder="Phone" v-model="reservation.phone"/>
                    <input type="email" class="pure-u-1" :class="validation.email ? 'validated' : ''" name="email" placeholder="Email" v-model="reservation.email"/>
                        
                </fieldset>

                <button class="pure-button pure-u-1" 
                        :class="validation.name && validation.phone && validation.email ? 'button-success' : ''" 
                        @click="proceedStep" 
                        :disabled="!validation.name && !validation.phone && !validation.email">Start Reservation</button>
            </div>
            <div id="reservation-form-2" v-show="step===2">
                <div id="reservation-form-scrollable">
                    <fieldset class="pure-group">
                        <div class="form-container">
                            <label @click="focusSelect('party-size')">Party Size</label>
                            <select id="party-size" class=" pure-u-1" name="Time" placeholder="Party Size" v-model="reservation.party_size" :class="validation.party_size ? 'validated' : ''">
                                <option value="0">please select a party size</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">10+</option>
                            </select>
                        </div>
                        <date-picker id="reservation-date" is-label label="Date" class="pure-u-1" :disabled-dates="disabledDates"></date-picker>

                        <div class="form-container">
                            <label @click="focusSelect('time-select')">Time</label>
                            <select id="time-select" class=" pure-u-1" name="Time" placeholder="Time" v-model="reservation.time" :class="validation.time ? 'validated' : ''">
                                <option v-for="(time, key) in selectableTimes" v-bind:value="time" v-bind:key="key">{{ time }}</option>
                            </select>
                        </div>
                    </fieldset>
                    <br/>
                    <fieldset class="pure-group">
                        <div class="form-container">
                            <label @click="focusSelect('special-instructions')">Optional</label>
                            <textarea id="special-instructions" type="text" class="pure-u-1" placeholder="special instructions" v-model="reservation.special_request"></textarea>
                        </div>
                    </fieldset>
                    <div>
                        <hr/>
                        <label for="option-two" class="pure-radio">
                            <input id="option-two" type="radio" name="optionsRadios" value="true" checked v-model="reservation.hibachi">
                            I would like the hibachi experience!
                        </label>

                        <label for="option-three" class="pure-radio">
                            <input id="option-three" type="radio" name="optionsRadios" value="false" v-model="reservation.hibachi">
                            Non-hibachi seating please.
                        </label>
                        <hr/>
                    </div>
                </div>
                <div class="pure-button-group" role="group">
                    <button class="pure-button pure-u-1-5" @click="preceedStep">Back</button>
                    <button class="pure-button pure-u-4-5" 
                        @click="finishReservation" 
                        :class="(validation.party_size && validation.date && validation.time) ? 'button-success' : ''">Finish</button>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script lang="ts" src="./reservation_form.ts"></script>