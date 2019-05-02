<?php

namespace App\Http\Controllers;
use App\Reservation;
use App\Rule;
use App\Company;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Storage;

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
        //page data
        $company = Company::find(1);
        $aboutUs = $company->aboutUs();
        $contactUs = $company->contactUs();
        $theExperience = $company->theExperience();
        // menu
        $happyhour = json_decode(Storage::disk('local')->get('public/json/happyhour.json'));
        $hibachi = json_decode(Storage::disk('local')->get('public/json/hibachi.json'));
        $lunch = json_decode(Storage::disk('local')->get('public/json/lunch.json'));
        $sushi = json_decode(Storage::disk('local')->get('public/json/sushi.json'));
        $ourMenu = json_encode([
            "happyHour"=> $happyhour,
            "hibachi"=>$hibachi,
            "lunch"=>$lunch,
            "sushi"=>$sushi
        ]);
        return view('home/index', compact([
            'disabledDates',
            'aboutUs',
            'contactUs',
            'ourMenu',
            'theExperience'
        ]));
    }
}
