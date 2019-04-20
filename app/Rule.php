<?php

namespace App;
use DateTime;
use DatePeriod;
use DateInterval;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Carbon\Carbon;

class Rule extends Model
{
    use SoftDeletes;
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'company_id',
        'name',
        'store_hours',
        'interval',
        'blackout_dates',
        'max_size_per_interval',
        'min_party_size',
        'reservation_deadline',
        'arrival_deadline',
        'large_party',
        'large_party_min_size',
        'large_party_cancel_fee',
        'large_party_cancel_fee_amount',
        'special_instructions'
    ];
    
    public function company()
    {
        return $this->belongsTo(Company::class, 'company_id', 'id');
    }

    public function blackoutSet()
    {

        $blackout = json_decode($this->blackout_dates);
        $set = [];
        if($blackout) {
            foreach ($blackout as $key => $value) {
                $row = $value->date;
                $time = strtotime($row);
                $set[$time] = $row;
            }
        }
        return json_encode($set);
    }

    public function prepareStoreHours() 
    {
        return ($this->store_hours) ? $this->store_hours : json_encode([
            [
                'opened' => false,
                'start' => [
                    'hh'=> '12',
                    'mm'=> '00',
                    'a'=>'pm'
                ],
                'end' => [
                    'hh'=> '12',
                    'mm'=> '00',
                    'a'=>'am'
                ]
            ], [
                'opened' => true,
                'start' => [
                    'hh'=> '12',
                    'mm'=> '00',
                    'a'=>'pm'
                ],
                'end' => [
                    'hh'=> '12',
                    'mm'=> '00',
                    'a'=>'am'
                ]
            ], [
                'opened' => true,
                'start' => [
                    'hh'=> '12',
                    'mm'=> '00',
                    'a'=>'pm'
                ],
                'end' => [
                    'hh'=> '12',
                    'mm'=> '00',
                    'a'=>'am'
                ]
            ], [
                'opened' => true,
                'start' => [
                    'hh'=> '12',
                    'mm'=> '00',
                    'a'=>'pm'
                ],
                'end' => [
                    'hh'=> '12',
                    'mm'=> '00',
                    'a'=>'am'
                ]
            ], [
                'opened' => true,
                'start' => [
                    'hh'=> '12',
                    'mm'=> '00',
                    'a'=>'pm'
                ],
                'end' => [
                    'hh'=> '12',
                    'mm'=> '00',
                    'a'=>'am'
                ]
            ], [
                'opened' => true,
                'start' => [
                    'hh'=> '12',
                    'mm'=> '00',
                    'a'=>'pm'
                ],
                'end' => [
                    'hh'=> '12',
                    'mm'=> '00',
                    'a'=>'am'
                ]
            ], [
                'opened' => true,
                'start' => [
                    'hh'=> '12',
                    'mm'=> '00',
                    'a'=>'pm'
                ],
                'end' => [
                    'hh'=> '12',
                    'mm'=> '00',
                    'a'=>'am'
                ]
            ]
        ]);

    }

    public function prepareForReservation($year, $month) {
        return json_encode([
            'notAfter'=> $this->getNotAfter($year, $month),
            'disabledDays' => $this->getAllDisabledDates($year, $month),
            'interval' => $this->interval
        ]);
    }
    public function getNotAfter($year, $month) {
        $next_year = date("Y-m-d", strtotime("$month/01/$year +1 year"));
        return $next_year;
    }
    public function prepareTimeForFrontend($date = null) {
        $now = $this->setLocale()->format('Y-m-d');
        $carbon = Carbon::createFromFormat('Y-m-d', $date);
        $compare = $carbon->format('Y-m-d');
        $time = [];
        $store_hours = json_decode($this->store_hours);
        $dow = $carbon->dayOfWeek;
        $checkToday = ($now == $compare);
        $start = $store_hours[$dow]->start->hh.':'.$store_hours[$dow]->start->mm.$store_hours[$dow]->start->a;
        $end = $store_hours[$dow]->end->hh.':'.$store_hours[$dow]->end->mm.$store_hours[$dow]->end->a;
        return json_encode($this->setTimes($start, $end, $checkToday));

    }
    public function prepareDisabledDates() {
        $store_hours = json_decode($this->store_hours);
        $disabled_days = [];
        foreach($store_hours as $key => $value) {
            if ($value->opened) {
                continue;
            }
            $disabled_days = $this->getDaysNotTime($key, $disabled_days);
 
        }
        
        // add in blackout dates
        $disabled_days = $this->addBlackoutDatesNotTime($disabled_days);
        return json_encode($disabled_days);
    }
    private function getAllDisabledDates($year = null, $month = null) {
        // calculate how many months down the road can a user make a reservation (default end of year)
        $first = date($year.'-'.$month.'-01 00:00:00');

        $last = $this->getNotAfter($year, $month);

        
        $store_hours = json_decode($this->store_hours);
        $disabled_days = [];
        foreach($store_hours as $key => $value) {
            if ($value->opened) {
                continue;
            }
            $disabled_days = $this->getDays($key, $disabled_days);
      
        }
        // add in blackout dates
        $disabled_days = $this->addBlackoutDates($disabled_days);
        return $disabled_days;
    }

    private function setTimes($startTime, $endTime, $isToday) {
        $times = ['Select Time'];
        $interval = $this->interval * 60;
        $carbon = $this->setLocale();
        $t = $this->setLocale()->format('h:ma');
        // dd(Carbon::createFromFormat('Y-m-d H:ia', '1983-09-30 '.$t), Carbon::createFromFormat('Y-m-d H:ia', '1983-09-30 '.$startTime));
        $tc = Carbon::createFromFormat('Y-m-d H:ia', '1983-09-30 '.$startTime)->timestamp;
        $tc2 = Carbon::createFromFormat('Y-m-d H:ia', '1983-09-30 '.$t)->timestamp;
        $checkStart = ($tc > $tc2) ? $tc : $tc2 + $interval;
        $endString = ($endTime == '12:00am') ?  '1983-10-01 '.$endTime :  '1983-09-30 '.$endTime;
        $start = $this->roundToNearestInterval($checkStart, $this->interval);
        $end = Carbon::createFromFormat('Y-m-d h:ia', $endString)->timestamp - $interval;
        for ($i=$start; $i <= $end; $i += $interval) { 
            $time = Carbon::createFromTimestamp($i)->format('h:ia');
            array_push($times, $time);
        }
        return $times;
    }

    private function roundToNearestInterval($timestamp, $interval = 15) {
        $precision = 60 * $interval;
        return strtotime(date('Y-m-d H:i:s', round($timestamp / $precision) * $precision));
    }

    private function getDays($dow, $disabled_days) {
        $startY = date('Y');
        $startM = date('m');
        $endY = date('Y', strtotime('+1 year'));
        $endM = date('m');
        
        switch($dow) {
            case 0: // sunday
                $day = 'sunday';
                break;

            case 1: //monday
                $day = 'monday';
                break;

            case 2: //tuesday
                $day = 'tuesday';
                break;
            
            case 3: //wednesday
                $day = 'wednesday';
                break;
            
            case 4: //thursday
                $day = 'thursday';
                break;
            
            case 5: // friday
                $day = 'friday';
                break;

            default: // saturday
                $day = 'saturday';
                break;
            
        }
        $dates = new DatePeriod(
            new DateTime("first $day of $startY-$startM"),
            DateInterval::createFromDateString("next $day"),
            new DateTime("last day of $endY-$endM 23:59:59")
        );
        foreach($dates as $date) {
            $formatted = $date->format('Y-m-d 00:00:00');
            array_push($disabled_days, $formatted);
        }
        return $disabled_days;
    }

    private function getDaysNotTime($dow, $disabled_days) {
        $startY = date('Y');
        $startM = date('m');
        $endY = date('Y', strtotime('+1 year'));
        $endM = date('m');
        
        switch($dow) {
            case 0: // sunday
                $day = 'sunday';
                break;

            case 1: //monday
                $day = 'monday';
                break;

            case 2: //tuesday
                $day = 'tuesday';
                break;
            
            case 3: //wednesday
                $day = 'wednesday';
                break;
            
            case 4: //thursday
                $day = 'thursday';
                break;
            
            case 5: // friday
                $day = 'friday';
                break;

            default: // saturday
                $day = 'saturday';
                break;
            
        }
        $dates = new DatePeriod(
            new DateTime("first $day of $startY-$startM"),
            DateInterval::createFromDateString("next $day"),
            new DateTime("last day of $endY-$endM 23:59:59")
        );
        foreach($dates as $date) {
            $formatted = $date->format('D m/d/Y');
            array_push($disabled_days, $formatted);
        }
        return $disabled_days;
    }
    private function addBlackoutDatesNotTime($disabled_days) {
        $blackout_dates = json_decode($this->blackout_dates);
        if (!isset($blackout_dates)) { return $disabled_days; }
        foreach($blackout_dates as $blackout) {
            if ($blackout->date) {
                $formatted = date('Y-m-d', strtotime($blackout->date));
                array_push($disabled_days, $formatted);
            }
        }

        return $disabled_days;
    }
    private function addBlackoutDates($disabled_days) {
        $blackout_dates = json_decode($this->blackout_dates);
        if (!isset($blackout_dates)) { return []; }
        foreach($blackout_dates as $blackout) {
            if ($blackout->date) {
                $formatted = date('Y-m-d 00:00:00', strtotime($blackout->date));
                array_push($disabled_days, $formatted);
            }
        }

        return $disabled_days;
    }

    function fullCalendarSlotDuration() {
        $interval = $this->interval;
        return ($interval == 60) ? "01:00:00" :  "00:$interval:00";
    }

    function fullCalendarSlotDurationLabel() {
        $interval = $this->interval;
        return ($interval == 60) ? "01:00" :  "00:$interval";
    }

    function fullCalendarBusinessHours() {
        $store_hours = json_decode($this->store_hours);
        $sh_defined = [];
        foreach($store_hours as $day => $store_hour) {
            $opened = $store_hour->opened;
            if ($opened) { // store is opened 
                $startHour = $this->getFullCalendarTime($store_hour->start);
                $endHour = $this->getFullCalendarTime($store_hour->end);
                $index = $startHour+$endHour;
                if (!array_key_exists($index, $sh_defined)) {
                    $sh_defined[$index] = [
                        'start'=>$this->getFullCalendar24HourFormat($store_hour->start),
                        'end'=>$this->getFullCalendar24HourFormat($store_hour->end),
                        'dow'=> [$day]
                    ];
                } else {
                    $dow = $sh_defined[$index]['dow'];
                    array_push($dow, $day);
                    $sh_defined[$index]['dow'] = $dow;

                }
            }
        }
        $businessHours = [];
        foreach($sh_defined as $defined) {
            array_push($businessHours, $defined);
        }
        return json_encode($businessHours);
    }

    private function getFullCalendarTime($time) {
        if (!$time) {
            return null;
        }
        $value = date('H:i', strtotime("$time->hh:$time->mm $time->a"));
        return strtotime($value);
    }

    private function getFullCalendar24HourFormat($time) {
        if (!$time) {
            return null;
        }
        $value = date('H:i', strtotime("$time->hh:$time->mm $time->a"));
        
        return $value;
    }
    private function setLocale()
    {
        $location = env('APP_TIMEZONE');
        return Carbon::now($location);
    }


}
