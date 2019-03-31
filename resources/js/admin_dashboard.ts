
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
Vue.component('date-picker', require('./components/thirdparty/Datepicker.vue'));
Vue.component('date-time-picker', require('./components/thirdparty/DateTimePicker.vue'));
Vue.component('ag-grid-vue', require('./components/thirdparty/AgGridVue.vue'));
Vue.component('vue-time-picker', require('vue2-timepicker'));
/** custom */
Vue.component('admin-navbar', require('./components/admin/Navbar.vue'));
Vue.component('admin-leftbar', require('./components/admin/Leftbar.vue'));
Vue.component('admin-rightbar', require('./components/admin/Rightbar.vue'));
Vue.component('admin-footer', require('./components/admin/Footer.vue'));
Vue.component('admin-alert', require('./components/admin/Alert.vue'));
Vue.component('admin-card', require('./components/admin/Card.vue'));
Vue.component('admin-modal', require('./components/admin/Modal.vue'));
Vue.component('admin-calendar', require('./components/admin/Calendar.vue'));
Vue.component('title-badge', require('./components/admin/TitleBadge.vue'));
Vue.component('blackout-dates', require('./components/admin/BlackoutDates.vue'));
Vue.component('calendar-detail', require('./components/admin/CalendarDetail.vue'));
Vue.component('reservation-form', require('./components/admin/ReservationForm.vue'));
Vue.component('reservation-options', require('./components/admin/ReservationOptions.vue'));
Vue.component('search', require('./components/admin/Search.vue'));
Vue.component('search-results', require('./components/admin/SearchResults.vue'));
Vue.component('store-hours', require('./components/admin/StoreHours.vue'));

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key)))

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#admin'
});
