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
        $reservations->phone = preg_replace("/[^0-9]/", "", trim($request->phone));
        $reservations->email = trim($request->email);
        $reservations->party_size = preg_replace("/[^0-9]/", "", trim($request->party_size));
        $reservations->requested = date('Y-m-d H:i:s', strtotime(trim($request->requested)));
        $reservations->special_request = ($request->special_request) ? $request->special_request : null;
        $reservations->hibachi = $request->hibachi;
        $reservations->save();
        
        event(new ReservationEvent());
        event(new NotificationsEvent());
        return response()->json(['success'=>'Reservation is successfully added to calendar!']);

    }
    public function frontendMake(Request $request)
    {
        $validateData = $request->validate([
            'name' => 'required|max:255',
            'phone' => 'required|max:20',
            'email' => 'required|email',
            'party_size' => 'required|between:1,100',
            'date' => 'required',
            'time' => 'required'
        ]);

        $reservations = new Reservation();
        $reservations->name = trim(strip_tags($request->name));
        $reservations->phone = preg_replace("/[^0-9]/", "", trim(strip_tags($request->phone)));
        $reservations->email = trim(strip_tags($request->email));
        $reservations->party_size = preg_replace("/[^0-9]/", "", trim(strip_tags($request->party_size)));
        $reservations->requested = date('Y-m-d H:i:s', strtotime(trim(strip_tags($request->date).' '.strip_tags($request->time))));
        $reservations->special_request = ($request->special_request) ? trim(strip_tags($request->special_request)) : null;
        $reservations->hibachi = $request->hibachi;
        $reservations->save();
        
        event(new ReservationEvent());
        event(new NotificationsEvent());
        return response()->json(['success'=>'Reservation is successfully added to calendar!']);

    }

    public function getEvent(Reservation $reservation) {
    
        return response()->json($reservation);
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

    public function seat(Reservation $reservation, Request $request) {
        
        $seatCustomer = $reservation->seatCustomer($request);
        $editable = $request->editable;
        if($seatCustomer) {
            event(new ExpiredEvent($editable));
            event(new NotificationsEvent());
            return response()->json(['success'=>'Successfully seated your reservation.']);
        }
        return response()->json(['error'=>'Could not finish seating your customer. Try again.']);

    }

    public function unseat(Reservation $reservation, Request $request) {
        
        $revertCustomer = $reservation->revertSeatingCustomer($request);
        $editable = $request->editable;
        if($revertCustomer) {
            event(new ExpiredEvent($editable));
            event(new NotificationsEvent());
            return response()->json(['success'=>'Successfully reverted your reservation.']);
        }
        return response()->json(['error'=>'Could not finish reverting your reservation. Try again.']);

    }

    public function expired(Request $request) {
    
        $requested = $request->requested;
        $editable = $request->editable;
        $reservations = new Reservation();
        $updated = $reservations->setExpired($requested);
        event(new ExpiredEvent($editable));
        event(new NotificationsEvent());
        return response()->json($updated);
    }

    public function makeEventsWithEditable(Request $request)
    {
        $editable = $request->editable;
        $reservation = new Reservation;
        $calendar = $reservation->makeCalendar($editable);
        
        return response()->json([$calendar]);
    }

    public function updateTime(Reservation $reservation, Request $request)
    {
        $requested = $request->requested;

        $resEvents = $reservation->updateReservationTime($requested);
        
        if($resEvents) {
            $calendar = $reservation->makeCalendar(true);
            event(new NotificationsEvent());
            return response()->json(['status'=>true, 'message'=>'Successfully updated reservation', 'calendar'=>$calendar]);
        }
        
        return response()->json(['status'=>false, 'message'=>'Successfully updated reservation','calendar'=>$calendar]);
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
    public function store(Reservation $reservation, Request $request)
    {
        $validateData = $request->validate([
            'name' => 'required|max:255',
            'phone' => 'required|max:20',
            'email' => 'required|email',
            'party_size' => 'required|between:1,100',
            'requested' => 'required'
        ]);
        if($reservation->update([
            'name' => trim($request->name),
            'phone' => preg_replace("/[^0-9]/", "", trim($request->phone)),
            'email' => trim($request->email),
            'party_size' => preg_replace("/[^0-9]/", "", trim($request->party_size)),
            'requested' => $request->requested,
            'special_request' => ($request->special_request) ? $request->special_request : null,
            'status' => 1,
            'hibachi' => $request->hibachi,
            'no_show' => false
        ])) {
            event(new ReservationEvent());
            event(new NotificationsEvent());
            return response()->json(['success'=>'Reservation has been successfully updated!']);
        };

        return response()->json(['error'=>'There were problems with your form. Please check your updates and try again.']);
        
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
    public function destroy(Reservation $reservation)
    {
        if($reservation->delete()) {
            event(new ReservationEvent());
            event(new NotificationsEvent());
            return response()->json(['success'=>'Successfully deleted your reservation from the system.']);
        }

        response()->json(['error'=>'There were problems with deleting your reservation. Please try again.']);
    }
}
