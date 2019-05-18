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

    public function createSection($item)
    {
        $this->name = $item['name'];
        $this->menu_id = $item['menu_id'];
        $this->description = $item['description'];
        $this->image = $item['image'];
        $this->status = $item['status'];
        $this->order = $item['order'];
        $this->save();
    }

    public function updateOrDelete($item)
    {

        $section = $this->find($item['id']);
        if ($item['delete']) {
            $section->delete();
        } else {
            $section->menu_id = $item['menu_id'];
            $section->description = $item['description'];
            $section->image = $item['image'];
            $section->name = $item['name'];
            $section->order = $item['order'];
            $section->status = $item['status'];
            $section->save();
        }
    }
}
