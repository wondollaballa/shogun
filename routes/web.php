<?php
use App\Events\ReservationEvent;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Home Page
Route::get('/', 'HomeController@index')->name('home');

Route::get('/frequently-asked-questions', 'HomeController@faq')->name('home.faq');
// Route::get('/logout', 'HomeController@logout')->name('home.logout');
// Route::post('/attempt-login', 'HomeController@attemptLogin')->name('home.attempt_login');
Route::get('/thank-you', 'HomeController@thankYou')->name('home.thank_you');

// messages
Route::post('/messages/create', 'MessagesController@create')->name('messages.create');


// Reservations
Route::post('/reservations/index-post', 'ReservationController@indexPost')->name('reservation.index_post');
Route::get('/reservations/make', 'ReservationController@make')->name('reservation.make');
Route::post('/reservations/set', 'ReservationController@set')->name('reservation.set');

// Contactus
Route::get('/contact', 'ContactusController@index')->name('home.index');
Route::get('/contact/create', 'ContactusController@create')->name('contact.create');
Route::post('/contact/store', 'ContactusController@store')->name('contact.store');

Auth::routes();

// Reservations
Route::post('/reservations/frontend-make', 'ReservationsController@frontendMake')->name('reservation.frontendMake');
// rules
Route::post('/rules/get-times', 'RulesController@getTimes')->name('rules.getTimes');

Route::domain(env('APP_SUB_URL'))->group(function () {
    Route::group(['middleware' => ['subdomain']], function() {
        // Admin Access
        Route::get('/signin', 'AdminController@signin')->name('admin.signin');
        Route::get('/logout', 'AdminController@logout')->name('admin.logout');

        Route::post('/authenticate', 'AdminController@authenticate')->name('admin.auth');
        // Redirects if role_id > 3 (employee) or guests, check middleware/Authentice class if need to change
        Route::group(['middleware' => ['check:1']], function () {
        });
        Route::group(['middleware' => ['check:2']], function () {
            // users
            Route::get('/users', 'UsersController@index')->name('user.index');
            Route::get('/users/create', 'UsersController@create')->name('user.create');
            Route::delete('/users/{user}', 'UsersController@destroy')->name('user.destroy');
            Route::post('/users/store', 'UsersController@store')->name('user.store');
            Route::get('/users/{user}/show', 'UsersController@show')->name('user.show');
            Route::get('/users/{user}/edit', 'UsersController@edit')->name('user.edit');
            Route::patch('/users/{user}', 'UsersController@update')->name('user.update');
        });
        Route::group(['middleware' => ['check:3']], function () {
            // Admins
            Route::get('/dashboard', 'AdminController@index')->name('admin.index');

            // Customers
            Route::get('/customers', 'CustomerController@index')->name('customer.index');
            Route::get('/customers/create', 'CustomerController@create')->name('customer.create');
            Route::delete('/customers/{customer}', 'CustomerController@destroy')->name('customer.destroy');
            Route::post('/customers/store', 'CustomerController@store')->name('customer.store');
            Route::get('/customers/{customer}/show', 'CustomerController@show')->name('customer.show');
            Route::get('/customers/{customer}/edit', 'CustomerController@edit')->name('customer.edit');
            Route::patch('/customers/{customer}', 'CustomerController@update')->name('customer.update');

            // Contact Us
            Route::delete('/contact/{contactus}', 'ContactusController@destroy')->name('contact.destroy');
            Route::get('/contact/{contactus}/show', 'ContactusController@show')->name('contact.show');
            Route::get('/contact/{contactus}/edit', 'ContactusController@edit')->name('contact.edit');
            Route::patch('/contact/{contactus}', 'ContactusController@update')->name('contact.update');
            Route::post('/contact/{contactus}/mark-as-read', 'ContactusController@markAsRead')->name('contact.mark_as_read');
            Route::post('/contact/{contactus}/set-as-archive', 'ContactusController@setAsArchive')->name('contact.set_as_archive');
            Route::post('/contact/{contactus}/set-as-deleted', 'ContactusController@setAsDeleted')->name('contact.set_as_deleted');

            // Messages
            Route::patch('/messages/update/{message}', 'MessagesController@update')->name('message.update');
            Route::get('/messages', 'MessagesController@index')->name('message.index');

            // users
            Route::get('/users', 'UsersController@index')->name('user.index');
            Route::get('/users/create', 'UsersController@create')->name('user.create');
            Route::delete('/users/{user}', 'UsersController@destroy')->name('user.destroy');
            Route::post('/users/store', 'UsersController@store')->name('user.store');
            Route::get('/users/{user}/show', 'UsersController@show')->name('user.show');
            Route::get('/users/{user}/edit', 'UsersController@edit')->name('user.edit');
            Route::patch('/users/{user}', 'UsersController@update')->name('user.update');

            // Reservations
            Route::get('/reservations', 'ReservationsController@index')->name('reservations.index');
            Route::post('/reservations/destroy/{reservation}', 'ReservationsController@destroy')->name('reservations.destroy');
            Route::post('/reservations/make', 'ReservationsController@make')->name('reservations.make');
            Route::post('/reservations/expired', 'ReservationsController@expired')->name('reservations.expired');
            Route::post('/reservations/search', 'ReservationsController@search')->name('reservations.search');
            Route::post('/reservations/postManage', 'ReservationsController@postManage')->name('reservations.postManage');
            Route::get('/reservations/manage', 'ReservationsController@manage')->name('reservations.manage');
            Route::post('/reservations/make-events-with-editable', 'ReservationsController@makeEventsWithEditable')->name('reservations.makeEventsWithEditable');
            Route::get('/reservations/get-event/{reservation}', 'ReservationsController@getEvent')->name('reservations.getEvent');
            Route::get('/reservations/setEvent', 'ReservationsController@setEvent')->name('reservations.setEvent');

            Route::post('/reservations/seat/{reservation}', 'ReservationsController@seat')->name('reservations.seat');
            Route::post('/reservations/store/{reservation}', 'ReservationsController@store')->name('reservations.store');
            Route::post('/reservations/unseat/{reservation}', 'ReservationsController@unseat')->name('reservations.unseat');
            Route::post('/reservations/update-time/{reservation}', 'ReservationsController@updateTime')->name('reservations.updateTime');
            // Rules
            Route::patch('/rules/{rules}', 'RulesController@update')->name('rules.update');
            Route::post('/rules/blackout', 'RulesController@blackout')->name('rules.blackout');

            Route::post('/rules/store-hours', 'RulesController@storeHours')->name('rules.storehours');
            Route::post('/rules/store-options', 'RulesController@storeOptions')->name('rules.storeoptions');
            Route::get('/rules', 'RulesController@index')->name('rules.index');
        });
    });

});
Auth::routes();
