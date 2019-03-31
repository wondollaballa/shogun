<?php

namespace App\Http\Controllers;

use App\User;
use App\Reservation;
use App\Rule;
use App\Events\CalendarPushed;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Events\ReservationEvent;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $rule = Rule::find(1);
        $res = new Reservation();
        $reservations = $res->prepareForAdmin();
        $calendar = $res->makeCalendar();
        $store_hours = $rule->fullCalendarBusinessHours();
        $interval = $rule->fullCalendarSlotDuration();
        $intervalLabel = $rule->fullCalendarSlotDurationLabel();

        return view('admins.index', compact(['store_hours','interval','intervalLabel', 'calendar']));
    }

    public function signin(Request $request)
    {
        if (auth()->check()) {
            $request->session()->flash('alert', [
                'message'=>'Welcome back!',
                'type'=>'alert-success'
            ]);
            return redirect()->route('admin.index');
        }

        return view('admins.signin');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
    
    public function authenticate(Request $request)
    {

        if (Auth::attempt(['username' => $request->username, 'password' => $request->password], $request->remember)) {
            if (Auth::user()->role_id > 3) {
                $request->session()->flash('alert', [
                    'message'=>'Successfully logged in, however, you are not authorized to view this page.',
                    'type'=>'alert-success'
                ]);
                return redirect()->route('home.index');
            } else {
                $request->session()->flash('alert', [
                    'message'=>'Successfully logged in as '.Auth::user()->email.'!',
                    'type'=>'alert-success'
                ]);
                //var_dump($request->session()->flash('intended_url'));
                // return ($request->session()->has('intended_url')) ? redirect()->to($request->session()->flash('intended_url')) : redirect()->route('admin.index');
                return redirect()->route('admin.index');
            }
        } else {
            $request->session()->flash('alert', [
                'message'=>'Authentication error! The username / password combination is incorrect. Please try again.',
                'type'=>'alert-danger'
            ]);
            return redirect()->route('admin.signin');
        }
    }

    public function logout(Request $request, User $user)
    {
        if (Auth::check()) {
            Auth::logout();
            $request->session()->flash('alert', [
                'message'=>'Successfully logged out!',
                'type'=>'alert-success'
            ]);

        } else {
            $request->session()->flash('alert', [
                'message'=>'Warning: no instances of a logged in session remaining. Please try logging in again.',
                'type'=>'alert-warning'
            ]);
        }

        return redirect()->route('admin.signin');
    }
}
