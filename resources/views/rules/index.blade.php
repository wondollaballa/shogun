@extends('layouts.admin')
@section('styles')

@endsection
@section('scripts')
@endsection

@section('content')
<div class="container">
    <admin-card header footer>
        <h3 slot="header">Basic Reservation Settings</h3>
        <section class="pure-form pure-form-stacked">
            <reservation-options p-interval="{{ $interval }}" p-cutoff="{{ $cutoff }}"></reservation-options>
        </section>
        <div slot="footer" class="pure-button-group" role="group">
            <button id="settings-reset" type="button" class="pure-button">Reset</button>
            <button id="settings-update" type="button" class="pure-button pure-button-primary" >Update</button>
        </div>
    </admin-card>
    <admin-card header footer>
        <h3 slot="header">Blackout Dates</h3>
        <section id="blackoutdates-container">
            <blackout-dates id="blackoutdates-element" bdates="{{ $blackout_dates }}" bset="{{ $blackout_set }}"></blackout-dates>
        </section>
        <div slot="footer" class="pure-button-group" role="group">
            <button id="blackout-reset" type="button" class="pure-button">Reset</button>
            <button id="blackout-cancel" type="button" class="pure-button button-error" disabled >Remove</button>
            <button id="blackout-update" type="button" class="pure-button pure-button-primary" >Update</button>
        </div>
    </admin-card>
    <admin-card header footer>
        <h3 slot="header">Store Hours</h3>
        <section>
            <store-hours id="store-hours" hours="{{ $store_hours }}"></store-hours>
        </section>
        <div slot="footer" class="pure-button-group" role="group">
            <button id="storehours-reset" type="button" class="pure-button">Reset</button>
            <button id="storehours-update" type="button" class="pure-button pure-button-primary">Update Store Hours</button>
        </div>
    </admin-card>
   
</div>
@endsection

@section('modals')
<admin-modal header id="reservation-calendar" title="Reservation Calendar" >
    
</admin-modal>
@endsection