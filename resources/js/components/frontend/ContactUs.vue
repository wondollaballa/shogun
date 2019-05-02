<template>
    <div id="contact-us" class="content-body">
        <div class="triangle-top-left">
            <span>Contact Us</span>
        </div>
        <div class="triangle-bottom-right"></div>

        <h3 class="contact-us-title">Store Hours</h3>
        <div id="store-hours-container">
            <div class="sh-row" v-for="(v, k) in storeHoursString" v-bind:key="'store-hours-'+k" :id="'sh-row-'+k">
                <div class="th">{{ v.day }}</div>
                <div class="td" v-if="v.opened">{{ v.start.hh }}:{{ v.start.mm }}{{ v.start.a }}-{{ v.end.hh }}:{{ v.end.mm }}{{ v.end.a }}</div>
                <div class="td" v-else>Closed</div>
            </div>

        </div>

        <h3 class="contact-us-title">Address</h3>
        <address class="contact-us-address">{{ store.street }}</address>
        <address class="contact-us-address">{{ store.city }}, {{ store.state }} {{ store.zipcode }}</address>
        <address class="contact-us-address">{{ store.phone }}</address>

        <h3 class="contact-us-title">Message Us</h3>
        <p class="contact-us-label">Got a question? Suggestions or concerns? Please fill out this form below and we will email you back a personal response.</p>
        <div id="contact-us-form-container" class="pure-form">
            <div id="contact-us-form" class="pure-group">
                <input id="contact-us-name" class="pure-u-1" :placeholder="validation.name ? 'full name' : 'full name (required field)'" type="text" v-model="fullName" :class="!validation.name ? 'errors' : ''"/>
                <input id="contact-us-email" class="pure-u-1" :placeholder="validation.email? 'email address': 'email (required field)'" type="email" v-model="email" :class="!validation.email ? 'errors' : ''"/>
                <textarea id="contact-us-message" class="pure-u-1" type="text" :placeholder="validation.message ? 'message' : 'message (required field)'" v-model="message" :class="!validation.message ? 'errors' : ''"></textarea>
                <button id="contact-us-send" class="pure-button pure-u-1 pure-button-primary" type="button" @click="submitMessage">Contact Us</button>
            </div>
        </div>
        <br/><br/><br/><br/><br/>
    </div>
</template>

<script lang="ts" src="./contact_us.ts"></script>
