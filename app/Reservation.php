<?php

namespace App;
use App\Rule;
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
        'large_party',
        'party_size',
        'requested',
        'special_request',
        'no_show',
        'arrived_at',
        'seated_at',
        'seat_id',
        'status'
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

    public function makeCalendar()
    {
        $now = Carbon::now('America/Chicago')->format('Y-m-d 00:00:00');
        $rule = Rule::find(1);
        $interval = $rule->interval;
        $reservations = Reservation::where('requested', '>=', $now)->get();
        $calendar = [
            'monthly' => [],
            'weekly' => [],
            'daily' => []
        ];
        if (isset($reservations) && count($reservations) > 0) {
            foreach($reservations as $value) {
                // setup

                $dayDate = Carbon::createFromFormat('Y-m-d H:i:s', $value->requested)->format('Y-m-d');
                $weekKey = Carbon::createFromFormat('Y-m-d H:i:s', $value->requested)->format('YW');
                $monthKey = Carbon::createFromFormat('Y-m-d H:i:s', $value->requested)->format('Ym');
                $dayTime = Carbon::createFromFormat('Y-m-d H:i:s', $value->requested)->format('g:ia');
                $end = Carbon::createFromFormat('Y-m-d H:i:s', $value->requested)->addMinutes($interval)->format('Y-m-d H:i:s');
                array_push($calendar['daily'],[
                    'id' => $value->id,
                    'title' => "$value->party_size, $value->name",
                    'start' => $value->requested,
                    'end' => $end,
                    'editable' => true,
                    'durationEditable' => false
                ]);

                if (array_key_exists($monthKey, $calendar['monthly'])) {
                    $monthCount++;
                    $calendar['monthly'][$monthKey]['title'] =  "$monthCount reservation(s)";
                } else {
                    $monthCount = 1;
                    $calendar['monthly'][$monthKey] = [
                        'title' => "$monthCount reservation(s)",
                        'start' => $dayDate,
                        'end' => $dayDate,
                    ];
                }
            }
        }
        return json_encode($calendar);
    }

    public function searchResultWithFormat($search) {
        if ($search == '') {
            return json_encode([]);
        }
        $searchString = "%$search%";
        $now = Carbon::now('America/Chicago')->format('Y-m-d 00:00:00');
        $result = $this->where('name', 'like', $searchString)
            ->orWhere('phone','like', $searchString)
            ->where('requested','>=', $now)
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


}
