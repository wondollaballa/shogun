@extends('layouts.admin_signin')

@section('styles')
@endsection

@section('scripts')
@endsection

@section('content')
    <admin-signin-form 
        method="POST" 
        :action="'{!! route('admin.auth') !!}'">
    </admin-signin-form>
@endsection