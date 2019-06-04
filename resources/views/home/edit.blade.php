@extends('layouts/main_editable')
@section('styles')
<link href="https://unpkg.com/filepond/dist/filepond.css" rel="stylesheet">
@endsection
@section('scripts')
<script src="https://cdn.jsdelivr.net/npm/vanilla-lazyload@12.0.0/dist/lazyload.min.js"></script>
<script src="../js/edit.js"></script>
@endsection
@section('header')
    <editable-header old-image="{{ $headerContent->imageSrc }}"></editable-header>
    <!-- <frontend-logo></frontend-logo>
    <reservation-form id="reservation-container" disabled-dates="{{ $disabledDates }}"></reservation-form> -->
@endsection

@section('nav')
    <shogun-nav image-src="{{ asset('./images/Shogun_icon.png') }}"></shogun-nav>
@endsection

@section('content')
    <about-us text="{{ $aboutUs }}" class="editable"></about-us>
    <the-experience text="{{ $theExperience }}" class="editable"></the-experience>
    <our-menu text="{{ $menus }}"></our-menu>
    <contact-us text="{{ $contactUs }}"></contact-us>
@endsection

@section('footer')
    <shogun-footer company-info="{{ $contactUs }}" class="editable"></shogun-footer>
@endsection

@section('modals')
<editable-header-modal></editable-header-modal>
<editable-aboutus-modal></editable-aboutus-modal>
<editable-theexperience-modal></editable-theexperience-modal>
<editable-footer-modal></editable-footer-modal>
@endsection
