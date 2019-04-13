<?php

namespace App\Events;
use App\Reservation;
use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class ReservationEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $editable;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($editable = false)
    {
        $this->editable = $editable;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new Channel('reservation-event');
    }

    public function broadcastWith()
    {
        $reservations = new Reservation();
        
        return [
            'data' => $reservations->makeCalendar($this->editable),
            'notifications' => $reservations->makeNotifications()
        ];
    }
}
