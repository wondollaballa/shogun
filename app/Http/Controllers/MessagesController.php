<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Message;
use App\Rule;
use App\Events\NotificationsEvent;
use App\Events\MessageEvent;
use Carbon\Carbon;
use Illuminate\Support\Facades\Mail;
use App\Mail\MessageSent;

class MessagesController extends Controller
{

    public function index()
    {
        $rule = Rule::find(1);
        $reservation_rules = $rule->prepareForReservation(date('Y'), date('m'));
        $messages = new Message;
        $new = json_encode($messages->getNewMessages());
        $viewed = json_encode($messages->getViewedMessages());
        $replied = json_encode($messages->getRepliedMessages());
        return view('messages.index', compact(['new', 'viewed', 'replied','reservation_rules']));
    }

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
        if ($messages->save()) {
            // send email
            Mail::to(env('MANAGER_EMAIL'))
                ->send(new MessageSent($messages->id));
        }
        event(new NotificationsEvent());
        event(new MessageEvent());
        return response()->json(['success'=>'Message has successfully sent!']);
    }

    public function update(Request $request, Message $message) {
        $status = $request->status;
        $message->status = $status;
        if ($status == 2) {
            $now = Carbon::now(env('APP_TIMEZONE'));
            $viewed = $now->format('Y-m-d H:i:s');
            $message->viewed = $viewed;
        }

        if($message->save()) {

            $new = json_encode($message->getNewMessages());
            $viewed = json_encode($message->getViewedMessages());
            $replied = json_encode($message->getRepliedMessages());
            event(new NotificationsEvent());
            return response()->json([
                'message'=>'Message has been updated!',
                'new'=>$new,
                'viewed'=>$viewed,
                'replied'=>$replied
            ]);
        }

        return response()->json(['message'=>'Message could not be updated..']);


    }
}
