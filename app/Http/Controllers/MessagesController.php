<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MessagesController extends Controller
{
     /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $validateData = $request->validate([
            'name' => 'required|max:255',
            'email' => 'required|email',
            'message' => 'required'
        ]);
        $messages = new Message();
        $messages->name = trim($request->name);
        $messages->email = trim($request->email);
        $messages->message = trim($request->message);
        $messages->save();

        event(new MessageEvent());
        return response()->json(['success'=>'Message has successfully sent!']);


    }
}
