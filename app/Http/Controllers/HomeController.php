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

        $homeContent = new HomeContent;

        $headerContent = $homeContent->prepareContent(1);
        $aboutusContent = $homeContent->prepareContent(2);
        $theexperienceContent = $homeContent->prepareContent(3);
        $footerContent = $homeContent->prepareContent(4);
        return view('home/index', compact([
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
        $homeContent = new HomeContent;
        $headerContent = $homeContent->prepareContent(1);
        $aboutusContent = $homeContent->prepareContent(2);
        $theexperienceContent = $homeContent->prepareContent(3);
        $footerContent = $homeContent->prepareContent(4);

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
        if(!$request->session()->has('header-image')) {
            return response()->json(['status'=>false]);
        }
        $path = storage_path(str_replace('storage/','app/public/',$request->session()->pull('header-image')));
        unlink($path);
        return response()->json(['message'=> 'successfully deleted image']);
    }
    public function uploadAboutUs(Request $request)
    {
        $path = $request->file('filepond')->store('public/images/home/aboutus');
        $relative = str_replace('public/', 'storage/', $path);
        $request->session()->put('aboutus-image',$relative);
        return response()->json(['success'=>'Image successfully uploaded!','path'=> $relative]);
    }
    public function revertAboutus(Request $request)
    {
        if (!$request->session()->has('aboutus-image')) {
            return response()->json(['message'=> 'no image to delete']);
        }
        $path = storage_path(str_replace('storage/','app/public/',$request->session()->pull('aboutus-image')));
        unlink($path);
        return response()->json(['message'=> 'successfully deleted image']);
    }
    public function uploadTheExperience(Request $request)
    {
        $path = $request->file('filepond')->store('public/images/home/theexperience');

        $relative = str_replace('public/', 'storage/', $path);
        $request->session()->put('theexperience-image',$relative);
        return response()->json(['success'=>'Image successfully uploaded!','path'=> $relative]);
    }
    public function revertTheExperience(Request $request)
    {
        if (!$request->session()->has('theexperience-image')) {
            return response()->json(['message'=> 'no image to delete']);
        }
        $path = storage_path(str_replace('storage/','app/public/',$request->session()->pull('theexperience-image')));
        unlink($path);
        return response()->json(['message'=> 'successfully deleted image']);
    }
    public function uploadFooter(Request $request)
    {
        $path = $request->file('filepond')->store('public/images/home/footer');

        $relative = str_replace('public/', 'storage/', $path);

        return response()->json(['success'=>'Image successfully uploaded!','path'=> $relative]);
    }
    public function publish(Request $request)
    {
        $homeContent = new HomeContent;
        $header = $request->header;
        $aboutus = $request->aboutus;
        $theexperience = $request->theexperience;
        $footer = $request->footerData;
        if ($homeContent->publishContent($header, $aboutus, $theexperience, $footer)) {
            return response()->json(['success'=>'successfully published front page.']);
        }
        return response()->json(['status'=>false]);
    }
}
