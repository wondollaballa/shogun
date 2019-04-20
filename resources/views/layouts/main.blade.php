<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <!-- <meta name="viewport" content="width=device-width, initial-scale=1"> -->
        <meta name="description" content="Shogun Hibachi in Tyler, Texas">
        <meta name="author" content="Wondo Choung">
        <meta name="keyword" content="Shogun, Hibachi, Japanese, Authentic, Restaurant, Tyler, Texas, Sushi, Show, Entertainment, Reservations">
        <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' />
        <meta http-equiv="ScreenOrientation" content="autoRotate:disabled">
        <link rel="icon" href="images/favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="images/favicon.ico" type="image/x-icon" />
        <!-- CSRF Token -->
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>{{ env('APP_NAME') }}</title>
        <!-- Theme -->
        <link rel="stylesheet" href="https://unpkg.com/purecss@1.0.0/build/pure-min.css" integrity="sha384-nn4HPE8lTHyVtfCBi5yW9d20FjT8BJwUXyWZT9InLYax14RDjBj46LmSztkmNP9w" crossorigin="anonymous">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.1/css/all.css" integrity="sha384-gfdkjb5BdAXd+lj+gudLWI+BXq4IuLW5IT+brZEZsLFm++aCMlF1V92rMkPaX4PP" crossorigin="anonymous">
        <link rel="stylesheet" type="text/css" href="{{ mix('/css/frontend.css') }}">
        <!-- Main styles for this application -->
        @yield('styles')
        
    </head>

    <body>
        <div id="container">
            <header>
                @yield('header')
            </header>
            <nav>
                @yield('nav')
            </nav>
            <main class="main-content">
                <!-- <frontend-alert alert="{{ json_encode(Session::get('alert')) }}" timer="5000"></frontend-alert> -->
                @yield('content')
            </main>
            <!-- Footer -->
            <footer>
                @yield('footer')
            </footer>
            @yield('modals')
        </div>
        
        <!-- Setup Scripts -->
        <script src="{{ mix('/js/frontend.js') }}"></script>
        <!-- Custom scripts required by this view -->
        @yield('scripts')
    </body>

</html>
