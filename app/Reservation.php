<?php

namespace App;
use App\Rule;
use App\Message;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Carbon\Carbon;

class Reservation extends Model
{
    use SoftDeletes;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'phone',
        'email',
        'large_party',
        'party_size',
        'requested',
        'special_request',
        'no_show',
        'arrived_at',
        'seated_at',
        'seat_id',
        'status',
        'hibachi'
    ];

    public function company()
    {
        return $this->belongsTo(Company::class, 'company_id', 'id');
    }

    public function seat()
    {
        return $this->hasOne(Seat::class, 'seat_id', 'id');
    }

    public function prepareForAdmin()
    {
        $reservations = $this->all();
        // prettify data
        $reservations->filter(function( $value, $key ) {
            if (isset($value->phone)) {
                $value['phone_formatted'] = $this->formatPhone($value->phone);
            }
            return $value;
        });

        return json_encode($reservations);
    }

    public function prepareForAdminById()
    {
        if($this->phone) {
            $this->phone_formatted = $this->formatPhone($this->phone);
        }

        return $this;
    }

    public function makeCalendar($editable = false)
    {
        $now = Carbon::now(env('APP_TIMEZONE'));
        $start = $now->format('Y-m-d 00:00:00');
        $end = $now->format('Y-m-d 23:59:59');
        $nowYear = $now->startOfYear()->format('Y-m-d 00:00:00');
        $endYear = $now->addYear(1)->endOfYear()->format('Y-m-d 23:59:59');
        $rule = Rule::find(1);
        $interval = $rule->interval;

        $requested = $this->whereBetween('requested', [$nowYear, $endYear])->get();
        $calendar = [
            'monthly' => [],
            'weekly' => [],
            'daily' => []
        ];
        if (isset($requested) && count($requested) > 0) {
            $makeMonthly = [];
            foreach($requested as $value) {
                // setup
                $requested_date = Carbon::createFromFormat('Y-m-d H:i:s', $value->requested);
                $dayDate = $requested_date->format('Y-m-d');
                $weekKey = $requested_date->format('YW');
                $monthKey = $requested_date->format('Ymd');
                $dayTime = $requested_date->format('g:ia');
                $end = $requested_date->addMinutes($interval)->format('Y-m-d H:i:s');
                $hibachiSeating = ($value->hibachi == 1) ? $value->party_size.'H' : $value->party_size.'R';
                $titleBase = (!isset($value->special_request) || $value->special_request == '') ? "$hibachiSeating - $value->name" : "$hibachiSeating - $value->name - $value->special_request";
                $checkFinished = ($value->status == 3) ? true : false;
                $checkNoShow = (!$checkFinished && $value->no_show == true && $value->status == 2);
                $checkEditable = ($checkFinished) ? false : true;
                $eventTitle = ($value->no_show == true) ? "$titleBase - (Reservation has expired)" : $titleBase;

                if ($checkFinished) {
                    $eventBackgroundColor = '#000000';
                    $eventBorderColor = '#000000';
                    $eventTextColor = '#ffffff';
                } else if ($checkNoShow && !$checkFinished) {
                    $eventBackgroundColor = '#e5e5e5';
                    $eventBorderColor = '#5e5e5e';
                    $eventTextColor = '#5e5e5e';
                } else {
                    $eventBackgroundColor = '#BEFFC5';
                    $eventBorderColor = '#00C615';
                    $eventTextColor = '#005E0A';
                }
                $editableStatus = ($value->status == 3) ? false : $editable;
                array_push($calendar['daily'],[
                    'id' => $value->id,
                    'title' => $eventTitle,
                    'start' => $value->requested,
                    'end' => $end,
                    'editable' => $editableStatus,
                    'durationEditable' => false,
                    'backgroundColor' => $eventBackgroundColor,
                    'borderColor' => $eventBorderColor,
                    'textColor' => $eventTextColor
                ]);

                 // setup
                 $dayDate = $requested_date->format('Y-m-d 00:00:00');
                 $endDate = $requested_date->format('Y-m-d 23:59:59');
                 if (array_key_exists($monthKey, $makeMonthly)) {
                     $monthCount++;
                     $makeMonthly[$monthKey]['title'] =  "$monthCount reservation(s)";
                 } else {
                     $monthCount = 1;
                     $makeMonthly[$monthKey] = [
                         'title' => "$monthCount reservation(s)",
                         'start' => $dayDate,
                         'end' => $endDate,
                         'editable' => false,
                         'durationEditable' => false,
                     ];
                 }

            }
            if ($makeMonthly) {
                foreach($makeMonthly as $row) {
                    array_push($calendar['monthly'], $row);
                }
            }
        }
        return json_encode($calendar);
    }

    public function makeNotifications() {
        $location = env('APP_TIMEZONE');
        $start = Carbon::now($location)->format('Y-m-d 00:00:00');
        $end = Carbon::now($location)->format('Y-m-d 23:59:59');
        // today - all remaining
        $todayCount = $this->whereBetween('requested',[$start, $end])
            ->whereNull('seated_at')
            ->where('status',1)
            ->where('no_show',false)
            ->count();

        // all
        $allCount = $this->where('requested', '>=', $start)
            ->whereNull('seated_at')
            ->where('status',1)
            ->where('no_show',false)
            ->count();
        // messages
        $messages = new Message;
        $messagesCount = $messages->makeNotifications();
        return [
            'today' => $todayCount,
            'all' => $allCount,
            'messages' => $messagesCount
        ];
    }

    public function searchResultWithFormat($search) {
        if ($search == '') {
            return json_encode([]);
        }
        $searchString = "%$search%";
        $now = Carbon::now(env('APP_TIMEZONE'))->format('Y-m-d 00:00:00');

        $result = $this->where('name', 'like', $searchString)
            ->where('requested','>=', $now)
            ->orWhere('phone','like', $searchString)
            ->where('status', '<', 3)
            ->orderBy('requested','desc')
            ->get();

        // filter out and add in formatted values
        $result->filter(function($value, $key) {
            // update phone
            $value->phoneFormatted = $this->formatPhone($value->phone);
            $value->requestedFormatted = Carbon::createFromFormat('Y-m-d H:i:s', $value->requested)->format('D n/d/Y g:ia');
            return $value;
        });


        return json_encode($result);

    }

    public function setExpired($requested) {
        $rules = Rule::find(1);
        $interval = $rules->interval;
        $check = Carbon::createFromFormat('Y-m-d H:i:s', $requested)->subMinutes($interval)->format('Y-m-d H:i:s');
        if($this->where('requested','<=',$check)->where('status',1)->where('no_show',false)->update(['no_show'=> true, 'status' => 2 ])) {
            return true;
        }

        return false;

    }

    public function seatCustomer($request) {
        $dateTimeSeated = Carbon::now(env('APP_TIMEZONE'))->format('Y-m-d H:i:s');
        if ($this->update([
            'no_show'=>false,
            'status'=>$request->status,
            'seated_at' => $dateTimeSeated
        ])) {
            return true;
        }

        return false;
    }

    public function revertSeatingCustomer($request) {
        $dateTimeSeated = Carbon::now(env('APP_TIMEZONE'))->format('Y-m-d H:i:s');
        if ($this->update([
            'status'=>$request->status,
            'seated_at' => null
        ])) {
            return true;
        }

        return false;
    }

    public function updateReservationTime($requested) {
        $now = Carbon::now(env('APP_TIMEZONE'));
        $start = $now->format('Y-m-d H:i:s');
        $check = (strtotime($start) > strtotime($requested));
        if ($this->update([
            'status' =>  ($check) ? 2 : 1,
            'no_show' =>$check,
            'requested' => $requested
        ])) {
            return true;
        }
        return false;
    }

    public function getReservationWithFormat($id)
    {
        return $this->formatReservation($this->find($id));

    }

    private function formatReservation($data) {
        if(isset($data->phone)) {
            $data->phone = $this->formatPhone($data->phone);
        }

        return $data;
    }

    private function formatPhone($phone_number) {
        if (!isset($phone_number)) return;

        switch (strlen($phone_number)) {
            case 10:
            $split1 = substr($phone_number,0,3);
            $split2 = substr($phone_number,3,3);
            $split3 = substr($phone_number,6,4);
            return "($split1) $split2-$split3";
            break;

            case 7:
            $split1 = substr($phone_number,0,3);
            $split2 = substr($phone_number,3,4);
            return "$split1-$split2";
            break;

            default:
            return $phone_number;
            break;

        }
    }

    public function checkUnderCapacity($party_size = 0, $dateTime = null, $cap = 0)
    {
        if ($party_size == 0 && !isset($dateTime) && $cap = 0) {
            return true;
        }
        $sumPartySizeAtTimeSlot = $this->where('requested', $dateTime)->sum('party_size');
        return (($sumPartySizeAtTimeSlot + $party_size) <= $cap);
    }


}
