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
        'image_rotate',
        'status'
    ];
    public function menuItems()
    {
        return $this->hasMany(MenuItem::class, 'menu_section_id', 'id')->orderBy('order', 'asc');
    }

    public function createSection($item, $menu_id)
    {
        $this->name = $item['name'];
        $this->menu_id = $menu_id;
        $this->description = $item['description'];
        $this->image = $item['image'];
        $this->image_rotate = $item['image_rotate'];
        $this->status = $item['status'];
        $this->order = $item['order'];
        if($this->save()) {
            return $this->id;
        }
    }

    public function updateOrDelete($item, $menu_id)
    {

        $section = $this->find($item['id']);
        if ($item['delete']) {
            $section->delete();
        } else {
            $section->menu_id = $menu_id;
            $section->description = $item['description'];
            $section->image = $item['image'];
            $section->image_rotate = $item['image_rotate'];
            $section->name = $item['name'];
            $section->order = $item['order'];
            $section->status = $item['status'];
            $section->save();
        }
    }
}
