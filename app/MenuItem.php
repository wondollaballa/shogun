<?php

namespace App;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;

class MenuItem extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'menu_id',
        'menu_section_id',
        'name',
        'description',
        'image',
        'price',
        'status'
    ];

    public function menuSection()
    {
        return $this->belongsTo(MenuSection::class, 'menu_section_id', 'id');
    }
    public function menu()
    {
        return $this->belongsTo(Menu::class, 'menu_id', 'id');
    }
}
