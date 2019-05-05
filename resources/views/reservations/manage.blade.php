@extends('layouts.admin')
@section('styles')

@endsection
@section('scripts')
@endsection

@section('content')
<div class="container">
    <admin-card header footer id="" class="card-primary">
        <section>
            <store-hours id="store-hours" hours=""></store-hours>
            <!-- <blackout-dates id="blackout-dates"></blackout-dates> -->
        </section>
    </admin-card>

</div>
@endsection

@section('modals')
<admin-modal header id="reservation-calendar" title="Reservation Calendar" >

</admin-modal>
<admin-modal header id="reservation-details" title="Reservation Details" rule="{{ $reservation_rules }}"></admin-modal>
<delete-confirmation header title="Are you sure?" id="reservation-delete-confirm"></delete-confirmation>
@endsection
