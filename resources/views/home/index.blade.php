@extends('layouts/main')

@section('header')
    <frontend-logo></frontend-logo>
    <reservation-form id="reservation-container" disabled-dates="{{ $disabledDates }}"></reservation-form>

@endsection

@section('nav')
    <div id="nav-grid">
        <a class="middle"><img src="{{ asset('./images/shogun_icon.png') }}"/> Shogun</a>
        <a class="nav-items center middle">about us</a>
        <a class="nav-items center middle">the experience</a>
        <a class="nav-items center middle">our menu</a>
        <a class="nav-items center middle">contact us</a>
    </div>
    <div id="nav-grid-mobile">
        <a class="middle"><img src="{{ asset('./images/shogun_icon.png') }}"/> Shogun</a>
        <div id="nav-menu" class="middle center">
            <select class="mobile-nav-items">
                <option>select menu</option>
                <option>about us</option>
                <option>the experience</option>
                <option>our menu</option>
                <option>contact us</option>
            </select>
        </div>
    </div>
@endsection

@section('content')

@endsection

@section('footer')

@endsection

@section('modals')
<finish-modal id="finish-modal" title="Reservation Successfully Made!" hasBackground></finish-modal>
<message-modal></message-modal>
@endsection
