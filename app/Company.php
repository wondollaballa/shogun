<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Company extends Model
{
    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'nick_name',
        'email',
        'street',
        'suite',
        'city',
        'state',
        'country',
        'zipcode',
        'phone',
        'phone_option',
        'hours',
        'blackout_dates',
        'max_occupancy'
    ];

    public function reservations()
    {
        return $this->hasMany(Reservation::class, 'company_id', 'id');
    }

    public function seats()
    {
        return $this->hasMany(Seat::class, 'company_id', 'id');
    }

    public function support()
    {
        return $this->hasMany(Support::class, 'company_id', 'id');
    }

    public function rules()
    {
        return $this->hasMany(Rule::class, 'company_id', 'id');
    }
}
