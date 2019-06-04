<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class HomeContent extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'hasImage',
        'hasHtml',
        'name',
        'image_src',
        'html_content'
    ];
}
