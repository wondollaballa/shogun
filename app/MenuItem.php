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
    public function createItem($item, $menu_id, $menu_section_id)
    {
        $this->name = $item['name'];
        $this->menu_id = $menu_id;
        $this->menu_section_id = $menu_section_id;
        $this->description = $item['description'];
        $this->image = $item['image'];
        $this->price = $item['price'];
        $this->status = $item['status'];
        $this->order = $item['order'];
        if($this->save()) {
            return $this->id;
        }
    }

    public function updateOrDelete($item, $menu_id, $menu_section_id)
    {

        $menuItem = $this->find($item['id']);
        if ($item['delete']) {
            $menuItem->delete();
        } else {
            $menuItem->menu_id = $menu_id;
            $menuItem->menu_section_id = $menu_section_id;
            $menuItem->description = $item['description'];
            $menuItem->image = $item['image'];
            $menuItem->name = $item['name'];
            $menuItem->price = $item['price'];
            $menuItem->order = $item['order'];
            $menuItem->status = $item['status'];
            $menuItem->save();
        }
    }
}
