@component('mail::message')
Dear {{ $reservation->name }},<br><br>
Thank you for making a reservation with us. We have received your reservation and are ready for your arrival! Please review the information below:<br>
@component('mail::table')
| Name      | Party | Date      | Time      |
|:---------:|:-----:|:---------:|:---------:|
|{{ $reservation->name }}|{{ $reservation->party_size }}|{{ date('D n/d/Y', strtotime($reservation->requested)) }}|{{ date('g:ia',strtotime($reservation->requested)) }}|
@endcomponent
@if(isset($reservation->special_request))
@component('mail::panel')
<h5 style="margin:0; padding:0; font-weight: 200;">Special Request</h5>
<p>{{ $reservation->special_request }}</p>
@endcomponent
@endif
If you have any questions or concerns or wish to change your reservation, please contact us at:<br>
<p style="text-align:center;"><b>{{ $company->formatPhone }}</b></p>
<blockquote style="text-align: center;">
{{ $company->street }}<br>{{ $company->city }}, {{ $company->state }} {{ $company->zipcode }}
</blockquote>
<br>
Thank you,<br>
Shogun
@endcomponent
