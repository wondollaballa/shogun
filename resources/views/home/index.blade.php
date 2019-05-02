@extends('layouts/main')
@section('scripts')
<script src="https://cdn.jsdelivr.net/npm/vanilla-lazyload@12.0.0/dist/lazyload.min.js"></script>
<script src="./js/shogun.js"></script>
@endsection
@section('header')
    <frontend-logo></frontend-logo>
    <reservation-form id="reservation-container" disabled-dates="{{ $disabledDates }}"></reservation-form>

@endsection

@section('nav')
    <shogun-nav image-src="{{ asset('./images/shogun_icon.png') }}"></shogun-nav>

@endsection

@section('content')
    <about-us text="{{ $aboutUs }}"></about-us>
    <the-experience text="{{ $theExperience }}"></the-experience>
    <our-menu text="{{ $ourMenu }}"></our-menu>
    <contact-us text="{{ $contactUs }}"></contact-us>
@endsection

@section('footer')
    <shogun-footer></shogun-footer>
@endsection

@section('modals')
<finish-modal id="finish-modal" title="Reservation Successfully Made!" hasBackground></finish-modal>
<menu-modal id="menu-modal" title="" hasBackground></menu-modal>
<message-modal></message-modal>
@endsection
