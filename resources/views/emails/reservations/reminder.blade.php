@component('mail::message')
Dear {{ $reservation->name }},<br><br>
We would like to give you a friendly reminder of your upcoming reservation.<br>
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
    {{ $company->street }} <br>
    {{ $company->city }}, {{ $company->state }} {{ $company->zipcode }}
</blockquote>
<br>
Thank you,<br>
Shogun
@endcomponent
