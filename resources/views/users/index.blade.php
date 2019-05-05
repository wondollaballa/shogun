@extends('layouts.admin')
@section('styles')

@endsection
@section('scripts')
<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.2.0/socket.io.dev.js"></script>
@endsection

@section('content')
<dashboard-page class="container">
    <admin-card header footer id="card-users" class="card-primary">
        <div class="card-header-grid" slot="header">
            <div v-show="true"></div>
            <h3>Users</h3>
            <div v-show="true"></div>
        </div>
        <user-table id="users-table" rows="{{ $allUsers }}"></user-table>
        <div id="footer-container" class="calendar-group-1" role="group" slot="footer">

        </div>
    </admin-card>
</dashboard-page>
@endsection

@section('modals')
<admin-modal header id="reservation-details" title="Reservation Details" rule="{{ $reservation_rules }}"></admin-modal>
<delete-confirmation header title="Are you sure?" id="reservation-delete-confirm"></delete-confirmation>
<user-modal header title="Update User Info"></user-modal>
@endsection
