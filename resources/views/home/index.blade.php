@extends('layouts/main')

@section('header')
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
