@extends('layouts.admin')
@section('styles')

@endsection
@section('scripts')
<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.2.0/socket.io.dev.js"></script>
@endsection

@section('content')
<div class="container">
    <admin-card header footer id="card-reservation" class="card-primary">
        <h3 class="" slot="header">Reservations</h3>
        <admin-calendar store-hours="{{ $store_hours }}" time-interval="{{ $interval }}" events="{{ $calendar }}"></admin-calendar>
        <div id="footer-container" class="pure-button-group calendar-group-1" role="group" slot="footer">
            <button id="day" type="button" class="calendar-views pure-button pure-button-primary">Today</button>    
            <button id="week" type="button" class="calendar-views pure-button pure-button-secondary">Week</button>
            <button id="month" type="button" class="calendar-views pure-button pure-button-secondary">Month</button>
        </div>
    </admin-card>
</div>
@endsection

@section('modals')
<admin-modal header id="reservation-calendar" title="Reservation Calendar" >
    <!-- <admin-card header footer>
        <h3 slot="header">Reservation Details</h3>
        <div><calendar-detail></calendar-detail></div>
        <div id="footer-container" class="pure-button-group" role="group" slot="footer">
            <a href="{{ route('reservations.index') }}" class="pure-button button-success"><i class="fas fa-calendar-plus"></i> New Reservation</a>
        </div>
    </admin-card> -->
</admin-modal>
@endsection