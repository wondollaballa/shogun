<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="description" content="Shogun administration page - designed by wondo">
        <meta name="author" content="Wondo Choung">
        <meta name="keyword" content="">
        <link rel="shortcut icon" href="img/favicon.png">
        <!-- CSRF Token -->
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>{{ env('APP_NAME') }} - Admin Page</title>
        <!-- Icons -->
        {{-- <link rel="stylesheet" type="text/css" href="{{ mix('/css/app.css') }}"> --}}
        <link rel="stylesheet" type="text/css" href="{{ mix('/css/themes/coreui/style.css') }}">
        <!-- Main styles for this application -->
        @yield('styles')
        <link rel="stylesheet" type="text/css" href="{{ mix('/css/views/admins/general.css') }}">
        
    </head>

    <body class="app header-fixed sidebar-fixed aside-menu-fixed aside-menu-hidden">
        <div id="grid">
            <nav class="nav-bar">
                @include('layouts.partials.nav')
            </nav>
            <aside class="left-nav on">
                @include('layouts.partials.sidebar_left')
            </aside>
            <main class="main-content">
                    @yield('content')
            </main>
            <aside class="right-nav off">
                @include('layouts.partials.sidebar_right')
            </aside>
            <!-- Footer -->
            <footer class="app-footer">
                @include('layouts.partials.footer')    
            </footer>
        </div>
        <div id="modals">
            @yield('modals')
        </div>
        <!-- Setup Scripts -->
        <script type="text/javascript" src="{{ mix('/js/backend.js') }}"></script>
        <!-- Custom scripts required by this view -->
        <script type="text/javascript" src="{{ mix('/js/views/admins/general.js') }}"></script>
        @yield('scripts')
    </body>

</html>
