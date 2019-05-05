<?php

namespace App\Console\Commands;
use App\Reservation;
use Illuminate\Console\Command;
use Carbon\Carbon;
use Illuminate\Support\Facades\Mail;
use App\Mail\ReservationReminder;

class ReservationReminders extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'reservation:reminders';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send an email to our reservation customers 15 minutes before their upcoming reservation';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        // get all reservations 15 minutes from now
        $res = new Reservation;
        $carbon = new Carbon;
        $minutes = 1;

        $now = $carbon->now('America/Chicago')->addMinutes($minutes)->format('Y-m-d H:i:s');
        // $fifteenFromNow = $now->addMinutes($minutes)->format('Y-m-d H:i:s');
        $reservations = $res->where('requested',$now)->get();
        // $reservations = $res->where('requested','2019-05-05 00:07:00')->get();
        // $reservations = $res->all();
        if (count($reservations) > 0) {
            foreach ($reservations as $value) {
                $email = $value->email;
                $id = $value->id;
                Mail::to($email)
                    ->send(new ReservationReminder($id));

            }
        }

    }
}
