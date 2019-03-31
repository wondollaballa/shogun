<?php

namespace App\Http\Controllers;
use App\Rule;
use Illuminate\Http\Request;

class RulesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $rule_id = 1;
        $rule = Rule::find($rule_id);
        $blackout_dates = $rule->blackout_dates;
        $blackout_set = $rule->blackoutSet();
        $store_hours = $rule->prepareStoreHours();
        $interval = $rule->interval;
        $cutoff = $rule->reservation_deadline;
        return view('rules.index', compact(['blackout_dates', 'blackout_set', 'store_hours', 'interval', 'cutoff']));
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

    public function blackout(Request $request) 
    {
        $status = false;
        $blackout_dates = json_encode($request->blackout_dates);
        $rule_id = 1; // for now need to update when 2nd store available
        
        $rule = new Rule();
        $patch = $rule->find($rule_id);
        if ($patch) {

            if($patch->update(['blackout_dates' => $blackout_dates])) {
                $status = true;
            }
        } else {
            $rule->company_id = 1;
            $rule->blackout_dates = $blackout_dates;
            if($rule->save()) {
                $status = true;
            }
        }
    
        return response()->json([
            'status' => $status
        ]);
    }

    public function storeHours(Request $request) 
    {
        $status = false;
        $store_hours = $request->store_hours;
        $rule_id = 1; // for now need to update when 2nd store available
        
        $rule = new Rule();
        $patch = $rule->find($rule_id);
        if ($patch) {
            $patch->store_hours = $store_hours;
            if($patch->save()) {
                $status = true;
            }
        } else {
            $rule->company_id = 1;
            $rule->store_hours = $store_hours;
            if($rule->save()) {
                $status = true;
            }
        }
    
        return response()->json([
            'status' => $status
        ]);
    }
    public function storeOptions(Request $request) 
    {
        $status = false;
        $interval = $request->interval;
        $reservation_deadline = $request->reservation_deadline;
        $rule_id = 1; // for now need to update when 2nd store available
        
        $rule = new Rule();
        $patch = $rule->find($rule_id);
        if ($patch) {
            $patch->interval = $interval;
            $patch->reservation_deadline = $reservation_deadline;
            if($patch->save()) {
                $status = true;
            }
        } else {
            $rule->company_id = 1;
            $rule->interval = $interval;
            $rule->reservation_deadline = $reservation_deadline;
            if($rule->save()) {
                $status = true;
            }
        }
    
        return response()->json([
            'status' => $status
        ]);
    }
}
