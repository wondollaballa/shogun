<?php

namespace App\Console;
use App\Reservation;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Carbon\Carbon;
use Illuminate\Support\Facades\Mail;
use App\Mail\ReservationReminder;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        'App\Console\Commands\ReservationReminders',
        Commands\ReservationReminders::class
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $schedule->command('reservation:reminders')
            ->everyMinute()
            ->timezone(env('APP_TIMEZONE'));
        // $schedule->call(function() {
        //     // get all reservations 15 minutes from now
        //     $minutes = 15;
        //     $now = Carbon::now(env('APP_TIMEZONE'));
        //     $fifteenFromNow = $now->addMinutes($minutes)->format('Y-m-d H:i:s');
        //     $reservations = Reservation::where('requested',$fifteenFromNow)->get();
        //     if (count($reservations) > 0) {
        //         foreach ($reservations as $value) {
        //             $email = $value->email;
        //             $id = $value->id;
        //             Mail::to($email)
        //                 ->send(new ReservationReminder($id));

        //         }
        //     }
        // })->everyMinute();

    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
