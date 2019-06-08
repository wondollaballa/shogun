@extends('layouts/main')
@section('scripts')
<script src="https://cdn.jsdelivr.net/npm/vanilla-lazyload@12.0.0/dist/lazyload.min.js"></script>
<script src="./js/shogun.js"></script>
@endsection
@section('header')
    <editable-header old-image="{{ $headerContent->image_src }}" image-rotate="{{ $headerContent->image_rotate }}" class="editable">
        <frontend-logo></frontend-logo>
        <reservation-form id="reservation-container" disabled-dates="{{ $disabledDates }}"></reservation-form>
    </editable-header>
@endsection

@section('nav')
    <shogun-nav image-src="{{ asset('./images/Shogun_icon.png') }}"></shogun-nav>

@endsection

@section('content')
    <about-us old-image="{{ $aboutusContent->image_src }}"
              image-rotate="{{ $aboutusContent->image_rotate }}"
              html-content="{{ $aboutusContent->html_content }}"></about-us>
    <the-experience old-image="{{ $theexperienceContent->image_src }}"
        image-rotate="{{ $theexperienceContent->image_rotate }}"
        html-content="{{ $theexperienceContent->html_content }}"></the-experience>
    <our-menu text="{{ $menus }}"></our-menu>
    <contact-us text="{{ $contactUs }}"></contact-us>
@endsection

@section('footer')
    <shogun-footer html-content="{{ $footerContent->html_content }}" company-info="{{ $contactUs }}"></shogun-footer>
@endsection

@section('modals')
<finish-modal id="finish-modal" title="Reservation Successfully Made!" hasBackground></finish-modal>
<menu-modal id="menu-modal" title="" hasBackground></menu-modal>
<message-modal></message-modal>
@endsection
