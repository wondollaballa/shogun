<?php

namespace App\Http\Controllers;
use App\Reservation;
use App\Rule;
use App\Menu;
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
        // $happyhour = json_decode(Storage::disk('local')->get('public/json/happyhour.json'));
        // $hibachi = json_decode(Storage::disk('local')->get('public/json/hibachi.json'));
        // $lunch = json_decode(Storage::disk('local')->get('public/json/lunch.json'));
        // $sushi = json_decode(Storage::disk('local')->get('public/json/sushi.json'));

        // $lunchMenu = new Menu;
        // $happyhourMenu = new Menu;
        // $hibachiMenu = new Menu;
        // $sushiMenu = new Menu;

        // $lunchMenu->createMenuFromJson('Lunch', $lunch);
        // $happyhourMenu->createMenuFromJson('Happy Hour', $happyhour);
        // $hibachiMenu->createMenuFromJson('Hibachi', $hibachi);
        // $sushiMenu->createMenuFromJson('Sushi',$sushi);

        $lunch = Menu::find(1)->makeMenuSet();
        $happyhour = Menu::find(2)->makeMenuSet();
        $hibachi = Menu::find(3)->makeMenuSet();
        $sushi = Menu::find(4)->makeMenuSet();

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
