<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="Shogun administration page - designed by wondo">
        <meta name="author" content="Wondo Choung">
        <meta name="keyword" content="">
        <link rel="shortcut icon" href="img/favicon.png">
        <!-- CSRF Token -->
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>{{ env('APP_NAME') }} - Admin Page</title>
        <!-- Theme -->
        <link rel="stylesheet" href="https://unpkg.com/purecss@1.0.0/build/pure-min.css" integrity="sha384-nn4HPE8lTHyVtfCBi5yW9d20FjT8BJwUXyWZT9InLYax14RDjBj46LmSztkmNP9w" crossorigin="anonymous">
        <link rel="stylesheet" type="text/css" href="{{ mix('/css/signin.css') }}">
        <!-- Main styles for this application -->
        @yield('styles')
        
    </head>

    <body>
        <div id="signin">
            <admin-navbar id="navbar"></admin-navbar>
            <admin-alert id="alert" 
                         alert="{{ json_encode(Session::get('alert')) }}"
                         timer="5000">
            </admin-alert>
            <main class="main-content">
                @yield('content')
            </main>
            <!-- Footer -->
            <admin-footer class="app-footer"></admin-footer>
        </div>
        <!-- Setup Scripts -->
        <script src="{{ mix('/js/admin_signin.js') }}"></script>
        <!-- Custom scripts required by this view -->
        @yield('scripts')
    </body>

</html>
