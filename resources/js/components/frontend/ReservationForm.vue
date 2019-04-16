<template>
    <div class="reservation-form">
        <h5>Make Reservation Today</h5>
        <div class="pure-form">
            <fieldset class="pure-group" v-show="step===1">
                <input type="text" class="pure-u-1" name="name" placeholder="Name"/>
                <input type="text" class="pure-u-1" name="phone" placeholder="Phone"/>
                <input type="email" class="pure-u-1" name="email" placeholder="Email"/>
                <button class="pure-button pure-u-1 pure-btn-primary" @click="proceedStep">Start Reservation</button>
            </fieldset>
            <div v-show="step===2">
                <select id="party-size" class=" pure-u-1" name="Time" placeholder="Party Size">
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
                </select>
                <fieldset class="pure-group" >
                    <input type="text" class="pure-u-1" name="Date" placeholder="date and time"/>
                    <textarea type="text" class="pure-u-1" placeholder="special instructions"></textarea>
                </fieldset>
                <hr/>
                <label for="option-two" class="pure-radio">
                    <input id="option-two" type="radio" name="optionsRadios" value="option1" checked>
                    I would like the hibachi experience!
                </label>

                <label for="option-three" class="pure-radio">
                    <input id="option-three" type="radio" name="optionsRadios" value="option2">
                    Non-hibachi seating please.
                </label>
                <hr/>
                <div class="pure-button-group" role="group">
                    <button class="pure-button pure-u-1-5" @click="preceedStep">Back</button>
                    <button class="pure-button pure-u-4-5 pure-btn-primary" @click="finishReservation">Finish</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./reservation_form.ts"></script>