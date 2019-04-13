@extends('layouts.admin')
@section('styles')

@endsection
@section('scripts')
<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.2.0/socket.io.dev.js"></script>
@endsection

@section('content')
<dashboard-page class="container">
    <admin-card header footer id="card-reservation" class="card-primary">
        <div class="card-header-grid" slot="header">
            <div></div>
            <h3>Reservations</h3>
            <admin-switch title="Allow calendar to be editable"></admin-switch>
        </div>
        <admin-calendar store-hours="{{ $store_hours }}" time-interval="{{ $interval }}" events="{{ $calendar }}"></admin-calendar>
        <div id="footer-container" class="calendar-group-1" role="group" slot="footer">
            <a type="button" class=" pure-button button-error" href="{{ route('reservations.index') }}">New Reservation</a> 
            <div class="pure-button-group">
                <button id="day" type="button" class="calendar-views pure-button pure-button-primary">Today</button> 
                <button id="month" type="button" class="calendar-views pure-button pure-button-secondary">Month</button>
            </div>
        </div>
    </admin-card>
</dashboard-page>
@endsection

@section('modals')
<admin-modal header id="reservation-details" title="Reservation Details" rule="{{ $reservation_rules }}"></admin-modal>
<delete-confirmation header title="Are you sure?" id="reservation-delete-confirm"></delete-confirmation>
@endsection