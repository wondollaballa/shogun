@component('mail::message')
<br>
<p>{{ $message->message }}</p>
<br>
<p>from,</p>
<p>{{ $message->name }}</p>
<br><br>
<p style="text-align:center;"><b><i>** This is an automated message sent from our homepage. **</i></b></p>
@endcomponent
