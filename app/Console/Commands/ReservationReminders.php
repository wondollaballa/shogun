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
        $minutes = 15;
        $now = $carbon->now(env('APP_TIMEZONE'))->addMinutes($minutes)->format('Y-m-d H:i:00');
        $reservations = $res->where('requested',$now)->get();
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
