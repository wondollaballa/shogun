<?php

namespace App;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;

class MenuSection extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'menu_id',
        'menu_section_id',
        'name',
        'description',
        'image',
        'status'
    ];
    public function menuItems()
    {
        return $this->hasMany(MenuItem::class, 'menu_section_id', 'id');
    }
}
