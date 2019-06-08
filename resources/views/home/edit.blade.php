@extends('layouts/main_editable')
@section('styles')
<link href="https://unpkg.com/filepond/dist/filepond.css" rel="stylesheet">
@endsection
@section('scripts')
<script src="https://cdn.jsdelivr.net/npm/vanilla-lazyload@12.0.0/dist/lazyload.min.js"></script>
<script src="../js/edit.js"></script>
@endsection
@section('nav')
    <editable-nav></editable-nav>
    <shogun-nav image-src="{{ asset('./images/Shogun_icon.png') }}"></shogun-nav>
@endsection
@section('header')
    <editable-header old-image="{{ $headerContent->image_src }}" image-rotate="{{ $headerContent->image_rotate }}" class="editable">
        <frontend-logo></frontend-logo>
        <reservation-form id="reservation-container" disabled-dates="{{ $disabledDates }}"></reservation-form>
    </editable-header>
@endsection

@section('content')
    <editable-aboutus class="editable" old-image="{{ $aboutusContent->image_src }}" image-rotate="{{ $aboutusContent->image_rotate }}" html-content="{{ $aboutusContent->html_content }}">
        <about-us old-image="{{ $aboutusContent->image_src }}" image-rotate="{{ $aboutusContent->image_rotate }}" html-content="{{ $aboutusContent->html_content }}" ></about-us>
    </editable-aboutus>
    <editable-theexperience class="editable" old-image="{{ $theexperienceContent->image_src }}" image-rotate="{{ $theexperienceContent->image_rotate }}" html-content="{{ $theexperienceContent->html_content }}">
        <the-experience old-image="{{ $theexperienceContent->image_src }}" image-rotate="{{ $theexperienceContent->image_rotate }}" html-content="{{ $theexperienceContent->html_content }}" ></the-experience>
    </editable-theexperience>
    <our-menu text="{{ $menus }}"></our-menu>
    <contact-us text="{{ $contactUs }}"></contact-us>
@endsection

@section('footer')
    <editable-footer class="editable">
        <shogun-footer html-content="{{ $footerContent->html_content }}" company-info="{{ $contactUs }}" ></shogun-footer>
    </editable-footer>
    <br/>
    <br/>
    <br/>
    <br/>

@endsection

@section('modals')
<editable-header-modal old-image="{{ $headerContent->image_src }}" rotate-class="{{ $headerContent->image_rotate }}"></editable-header-modal>
<editable-aboutus-modal old-image="{{ $aboutusContent->image_src }}" rotate-class="{{ $aboutusContent->image_rotate }}" html-content="{{ $aboutusContent->html_content }}"></editable-aboutus-modal>
<editable-theexperience-modal old-image="{{ $theexperienceContent->image_src }}" rotate-class="{{ $theexperienceContent->image_rotate }}" html-content="{{ $theexperienceContent->html_content }}"></editable-theexperience-modal>
<editable-footer-modal></editable-footer-modal>
@endsection
