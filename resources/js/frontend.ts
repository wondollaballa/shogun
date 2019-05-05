/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

import Vue from 'vue';

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */
/** 3rd party */
Vue.component('date-picker', require('./components/frontend/DatePicker.vue'));
/** custom */
Vue.component('frontend-logo', require('./components/frontend/Logo.vue'));
Vue.component('reservation-form', require('./components/frontend/ReservationForm.vue'));
Vue.component('finish-modal', require('./components/frontend/FinishModal.vue'));
Vue.component('menu-modal', require('./components/frontend/MenuModal.vue'));
Vue.component('message-modal', require('./components/frontend/MessageModal.vue'));
Vue.component('shogun-footer', require('./components/frontend/ShogunFooter.vue'));
Vue.component('shogun-nav', require('./components/frontend/ShogunNav.vue'));
/** PAGES */
Vue.component('about-us', require('./components/frontend/AboutUs.vue'));
Vue.component('contact-us', require('./components/frontend/ContactUs.vue'));
Vue.component('our-menu', require('./components/frontend/OurMenu.vue'));
Vue.component('the-experience', require('./components/frontend/TheExperience.vue'));




// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key)))

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#container'
});
