@extends('layouts.admin')
@section('styles')

@endsection
@section('scripts')
@endsection

@section('content')
<div class="container">
    <admin-card id="reservation-form-card" header footer>
        <h3 slot="header">Reservation Form</h3>
        <section class="pure-form pure-form-stacked">
            <reservation-form reservation-rules="{{ $reservation_rules }}"></reservation-form>
        </section>
        <div slot="footer" class="pure-button-group" role="group">
            <button id="reservations-reset" type="button" class="pure-button">Reset</button>
            <button id="reservations-make" type="button" class="pure-button pure-button-primary">Make</button>
        </div>
    </admin-card>


</div>
@endsection

@section('modals')
<admin-modal header title="Reservation Confirmation" >

</admin-modal>
@endsection
