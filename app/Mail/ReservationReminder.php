<?php

namespace App\Mail;
use App\Company;
use App\Reservation;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class ReservationReminder extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($id)
    {
        $this->id = $id;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $companies = new Company;
        $company = $companies->getCompanyWithFormat();
        $reservations = new Reservation;
        $reservation = $reservations->getReservationWithFormat($this->id);

        return $this->subject('Shogun reservation reminder')
            ->markdown('emails.reservations.reminder', compact(['company', 'reservation']));
    }
}
