<?php

namespace App;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Carbon\Carbon;

class Message extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'company_id',
        'name',
        'email',
        'message',
        'viewed',
        'status',
    ];

    public function makeNotifications() {
        $location = env('APP_TIMEZONE');

        // all
        $messages = $this->where('status',1)
            ->count();
        // messages
        return $messages;
    }

    public function getNewMessages() {
        return $this->formatForAdmin($this->where('status',1)->orderBy('id','desc')->get());
    }
    public function getViewedMessages() {
        return $this->formatForAdmin($this->where('status',2)->orderBy('viewed','desc')->get());
    }
    public function getRepliedMessages() {
        return $this->formatForAdmin($this->where('status',3)->orderBy('updated_at', 'desc')->take(100)->get());
    }

    private function formatForAdmin($data) {
        $data->map(function($v, $k) {
            $v->formatViewed = ($v->viewed) ? Carbon::createFromFormat('Y-m-d H:i:s', $v->viewed)->setTimezone(env('APP_TIMEZONE'))->format('D n/d/Y g:ia') : null;
            $v->formatCreatedAt = Carbon::createFromFormat('Y-m-d H:i:s', $v->created_at)->setTimezone(env('APP_TIMEZONE'))->format('D n/d/Y g:ia');
            $v->formatUpdatedAt = Carbon::createFromFormat('Y-m-d H:i:s', $v->updated_at)->setTimezone(env('APP_TIMEZONE'))->format('D n/d/Y g:ia');
            return $v;
        });
        return $data;
    }
}
