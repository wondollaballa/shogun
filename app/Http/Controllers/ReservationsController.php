<?php

namespace App\Http\Controllers;
use App\Reservation;
use App\Rule;
use App\Events\ExpiredEvent;
use App\Events\NotificationsEvent;
use App\Events\ReservationEvent;
use Illuminate\Http\Request;

class ReservationsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $rule = Rule::find(1);

        
        $reservation_rules = $rule->prepareForReservation(date('Y'), date('m'));
        

        return view('reservations.index', compact(['reservation_rules']));
    }

    public function make(Request $request)
    {
        
        $validateData = $request->validate([
            'name' => 'required|max:255',
            'phone' => 'required|max:20',
            'email' => 'required|email',
            'party_size' => 'required|between:1,100',
            'requested' => 'required'
        ]);
        $reservations = new Reservation();
        $reservations->name = trim($request->name);
        $reservations->phone = trim($request->phone);
        $reservations->email = trim($request->email);
        $reservations->party_size = trim($request->party_size);
        $reservations->requested = date('Y-m-d H:i:s', strtotime(trim($request->requested)));
        $reservations->special_request = ($request->special_request) ? $request->secial_request : null;
        $reservations->save();
        
        event(new ReservationEvent());
        event(new NotificationsEvent());
        return response()->json(['success'=>'Reservation is successfully added to calendar!']);

        
    }

    public function setEvent() {
        event(new NotificationsEvent());
        return response()->json(['success'=>'Event has been sent']);
    }

    public function search(Request $request) {
        $search = $request->search;
        $reservations = new Reservation();
        $searchResult = $reservations->searchResultWithFormat($search);
        return response()->json($searchResult);
    }

    public function expired(Request $request) {
    
        $requested = $request->requested;
        $reservations = new Reservation();
        $updated = $reservations->setExpired($requested);
        event(new ExpiredEvent());
        event(new NotificationsEvent());
        return response()->json($updated);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

}
