<template>
    <div id="storehours">
        <!-- titles -->
        <div class="storehours-header">Day</div>
        <div class="storehours-header">Opened</div>
        <div class="storehours-header">Start</div>
        <div class="storehours-header">End</div>
        <!-- sunday -->
        <div class="storehours-day">Sun</div>
        <div class="storehours-other"><input id="remember" type="checkbox" v-model="storeHours[0].opened"></div>
        <div class="storehours-other"><vue-time-picker v-show="storeHours[0].opened" v-model="storeHours[0]['start']" format="hh:mma" ></vue-time-picker></div>
        <div class="storehours-other"><vue-time-picker v-show="storeHours[0].opened" v-model="storeHours[0]['end']" format="hh:mma" ></vue-time-picker></div>
        <!-- monday -->
        <div class="storehours-day">Mon</div>
        <div class="storehours-other"><input id="remember" type="checkbox" v-model="storeHours[1].opened"></div>
        <div class="storehours-other"><vue-time-picker v-model="storeHours[1].start" format="hh:mma" v-show="storeHours[1].opened"></vue-time-picker></div>
        <div class="storehours-other"><vue-time-picker v-model="storeHours[1].end" format="hh:mma" v-show="storeHours[1].opened"></vue-time-picker></div>
        <!-- tuesday -->
        <div class="storehours-day">Tue</div>
        <div class="storehours-other"><input id="remember" type="checkbox" v-model="storeHours[2].opened"></div>
        <div class="storehours-other"><vue-time-picker v-model="storeHours[2]['start']" format="hh:mma" v-show="storeHours[2].opened"></vue-time-picker></div>
        <div class="storehours-other"><vue-time-picker v-model="storeHours[2]['end']" format="hh:mma" v-show="storeHours[2].opened"></vue-time-picker></div>
        <!-- wednesday -->
        <div class="storehours-day">Wed</div>
        <div class="storehours-other"><input id="remember" type="checkbox" v-model="storeHours[3].opened"></div>
        <div class="storehours-other"><vue-time-picker v-model="storeHours[3]['start']" format="hh:mma" v-show="storeHours[3].opened"></vue-time-picker></div>
        <div class="storehours-other"><vue-time-picker v-model="storeHours[3]['end']" format="hh:mma" v-show="storeHours[3].opened"></vue-time-picker></div>
        <!-- thursday -->
        <div class="storehours-day">Thu</div>
        <div class="storehours-other"><input id="remember" type="checkbox" v-model="storeHours[4].opened"></div>
        <div class="storehours-other"><vue-time-picker v-model="storeHours[4]['start']" format="hh:mma" v-show="storeHours[4].opened"></vue-time-picker></div>
        <div class="storehours-other"><vue-time-picker v-model="storeHours[4]['end']" format="hh:mma" v-show="storeHours[4].opened"></vue-time-picker></div>
        <!-- friday -->
        <div class="storehours-day">Fri</div>
        <div class="storehours-other"><input id="remember" type="checkbox" v-model="storeHours[5].opened"></div>
        <div class="storehours-other"><vue-time-picker v-model="storeHours[5]['start']" format="hh:mma" v-show="storeHours[5].opened"></vue-time-picker></div>
        <div class="storehours-other"><vue-time-picker v-model="storeHours[5]['end']" format="hh:mma" v-show="storeHours[5].opened"></vue-time-picker></div>
        <!-- saturday -->
        <div class="storehours-day">Sat</div>
        <div class="storehours-other"><input id="remember" type="checkbox" v-model="storeHours[6].opened"></div>
        <div class="storehours-other"><vue-time-picker v-model="storeHours[6]['start']" format="hh:mma" v-show="storeHours[6].opened"></vue-time-picker></div>
        <div class="storehours-other"><vue-time-picker v-model="storeHours[6]['end']" format="hh:mma" v-show="storeHours[6].opened"></vue-time-picker></div>
    </div>
</template>

<script lang="ts" src="./store_hours.ts"></script>