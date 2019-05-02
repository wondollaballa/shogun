@extends('layouts.admin')
@section('styles')

@endsection
@section('scripts')
<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.2.0/socket.io.dev.js"></script>
@endsection

@section('content')
<messages-page id="messages-page" messages-new="{{ $new }}" messages-viewed="{{ $viewed }}" messages-replied="{{ $replied }}"></messages-page>
@endsection

@section('modals')
@endsection
