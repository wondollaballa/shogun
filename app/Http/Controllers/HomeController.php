<?php

namespace App\Http\Controllers;
use App\Reservation;
use App\Rule;
use Illuminate\Http\Request;
use Carbon\Carbon;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {

    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $rules = new Rule;
        $rule = $rules->find(1);
        $disabledDates = $rule->prepareDisabledDates();
        $carbon = Carbon::now(env('APP_TIMEZONE'));
        return view('home/index', compact(['disabledDates']));
    }
}
