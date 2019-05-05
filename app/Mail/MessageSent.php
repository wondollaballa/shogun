<?php

namespace App\Mail;
use App\Message;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class MessageSent extends Mailable
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
        $messages = new Message;
        $message = $messages->find($this->id);

        return $this->subject('Shogun - Message from: '+$message->name)
            ->markdown('emails.message.sent', compact(['message']));
    }
}
