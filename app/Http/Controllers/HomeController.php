<?php

namespace App\Http\Controllers;
use App\Reservation;
use App\Rule;
use App\Menu;
use App\Company;
use App\HomeContent;
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

    public function edit()
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
        // change later
        $headerContent = HomeContent::find(1);
        $aboutusContent = HomeContent::find(2);
        $theexperienceContent = HomeContent::find(3);
        $footerContent = HomeContent::find(4);

        return view('home/edit', compact([
            'disabledDates',
            'aboutUs',
            'contactUs',
            'menus',
            'theExperience',
            'headerContent',
            'aboutusContent',
            'theexperienceContent',
            'footerContent'
        ]));
    }

    public function uploadHeader(Request $request)
    {
        $path = $request->file('filepond')->store('public/images/home/header');

        $relative = str_replace('public/', 'storage/', $path);
        $request->session()->put('header-image',$relative);
        return response()->json(['success'=>'Image successfully uploaded!','path'=> $relative]);
    }
    public function revertHeader(Request $request)
    {
        if (!$request->session()->has('header-image')) {
            return response()->json(['message'=> 'no image to delete']);
        }
        $path = storage_path(str_replace('storage/','app/public/',$request->session()->pull('header-image')));
        unlink($path);
        return response()->json(['message'=> 'successfully deleted image']);
    }
    public function resetHeader(Request $request)
    {
        $path = storage_path(str_replace('storage/','app/public/',$request->session()->pull('header-image')));
        unlink($path);
        return response()->json(['message'=> 'successfully deleted image']);
    }
    public function uploadAboutUs(Request $request)
    {
        $path = $request->file('filepond')->store('public/images/home/aboutus');

        $relative = str_replace('public/', 'storage/', $path);

        return response()->json(['success'=>'Image successfully uploaded!','path'=> $relative]);
    }
    public function uploadTheExperience(Request $request)
    {
        $path = $request->file('filepond')->store('public/images/home/theexperience');

        $relative = str_replace('public/', 'storage/', $path);

        return response()->json(['success'=>'Image successfully uploaded!','path'=> $relative]);
    }
    public function uploadFooter(Request $request)
    {
        $path = $request->file('filepond')->store('public/images/home/footer');

        $relative = str_replace('public/', 'storage/', $path);

        return response()->json(['success'=>'Image successfully uploaded!','path'=> $relative]);
    }
}
