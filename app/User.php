<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\SoftDeletes;

class User extends Authenticatable
{
    use Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'username',
        'first_name',
        'last_name',
        'phone',
        'email',
        'role_id',
        'password'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    // Relationships
    public function company()
    {
        return $this->belongsTo(Company::class, 'company_id', 'id');
    }

    public function getAndFormatAll()
    {
        $users = $this->format($this->where('role_id','!=',1)->orderBy('last_name', 'asc')->get());
        return json_encode($users);
    }

    public function format($data)
    {

        $data->map(function($v, $k) {
            if($v->phone) {
                $v->phoneFormatted = $this->formatPhone($v->phone);
                $v->role = $this->getRoleById($v->role_id);
            }
            return $v;
        });

        return $data;
    }

    private function getRoleById($id)
    {
        $roles = [
            1 => 'Superadmin',
            2 => 'Manager',
            3 => 'Employee'
        ];

        return $roles[$id];
    }

    private function formatPhone($phone_number) {
        if (!isset($phone_number)) return;

        switch (strlen($phone_number)) {
            case 10:
            $split1 = substr($phone_number,0,3);
            $split2 = substr($phone_number,3,3);
            $split3 = substr($phone_number,6,4);
            return "($split1) $split2-$split3";
            break;

            case 7:
            $split1 = substr($phone_number,0,3);
            $split2 = substr($phone_number,3,4);
            return "$split1-$split2";
            break;

            default:
            return $phone_number;
            break;

        }
	}
}
