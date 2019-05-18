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
        $menu = new Menu;
        $menus = $menu->getAllMenus();

        return view('home/index', compact([
            'disabledDates',
            'aboutUs',
            'contactUs',
            'menus',
            'theExperience'
        ]));
    }
}
