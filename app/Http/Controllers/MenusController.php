<?php

namespace App\Http\Controllers;
use App\Menu;
use App\Rule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class MenusController extends Controller
{

/**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {

    }

    public function index()
    {
        $rule = Rule::find(1);
        $reservation_rules = $rule->prepareForReservation(date('Y'), date('m'));
        $menu = new Menu;
        $menus = $menu->getAllMenus();
        return view('menu/index', compact([
            'menus',
            'reservation_rules'
        ]));
    }

    public function import()
    {
        // menu
        $happyhour = json_decode(Storage::disk('local')->get('public/json/happyhour.json'));
        $hibachi = json_decode(Storage::disk('local')->get('public/json/hibachi.json'));
        $lunch = json_decode(Storage::disk('local')->get('public/json/lunch.json'));
        $sushi = json_decode(Storage::disk('local')->get('public/json/sushi.json'));

        $lunchMenu = new Menu;
        $happyhourMenu = new Menu;
        $hibachiMenu = new Menu;
        $sushiMenu = new Menu;

        $lunchMenu->createMenuFromJson('Lunch', 0, $lunch);
        $happyhourMenu->createMenuFromJson('Happy Hour', 1, $happyhour);
        $hibachiMenu->createMenuFromJson('Hibachi', 2, $hibachi);
        $sushiMenu->createMenuFromJson('Sushi', 3, $sushi);
        return response()->json(['message'=>'successfully imported all json files']);
    }

    public function update(Request $request)
    {
        $menu= new Menu;
        $menus = $request->menus;
        if(count($menus) > 0) {
            if($menu->updateAll($menus)) {
                return response()->json(['success'=>'Updated all menu items']);
            }
        }
        return response()->json(['message'=>'could not save']);
    }

    public function upload(Request $request)
    {
        // $imgName = 'img'.strtotime(date('Y-m-d H:i:s')).$request->file('filepond')->getClientOriginalExtension();
        $path = $request->file('filepond')->store('public/images/menus/user');

        $relative = str_replace('public/', 'storage/', $path);

        return response()->json(['success'=>'Image successfully uploaded!','path'=> $relative]);
    }


}
