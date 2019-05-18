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
