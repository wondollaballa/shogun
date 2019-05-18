@extends('layouts.admin')
@section('styles')
<link href="https://unpkg.com/filepond/dist/filepond.css" rel="stylesheet">
@endsection
@section('scripts')
<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.2.0/socket.io.dev.js"></script>
@endsection

@section('content')
<menu-edit m="{{ $menus }}"></menu-edit>
@endsection

@section('modals')
<admin-modal header id="reservation-details" title="Reservation Details" rule="{{ $reservation_rules }}"></admin-modal>
<delete-confirmation header title="Are you sure?" id="reservation-delete-confirm"></delete-confirmation>
<items-modal></items-modal>
<image-modal></image-modal>
<!-- <section-image></section-image> -->
@endsection
