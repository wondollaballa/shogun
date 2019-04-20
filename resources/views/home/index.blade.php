@extends('layouts/main')

@section('header')

    <div id="header-nav"></div>
    <frontend-logo></frontend-logo>
    <reservation-form id="reservation-container" disabled-dates="{{ $disabledDates }}" times="{{ $todayTime }}"></reservation-form>

@endsection

@section('nav')
    <div>
    </div>
@endsection

@section('content')

@endsection

@section('footer')

@endsection
