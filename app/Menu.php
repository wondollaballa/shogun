<?php

namespace App;
use App\Menu;
use App\MenuSection;
use App\MenuItem;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'name',
        'description',
        'image',
        'status'
    ];
    public function menuSections()
    {
        return $this->hasMany(MenuSection::class, 'menu_id', 'id');
    }

    public function menuItems()
    {
        return $this->hasMany(MenuItem::class, 'menu_id', 'id');
    }

    public function createMenuFromJson($title, $obj)
    {
        // dd($obj);
        if (isset($obj)) {
            $this->name = $title;
            $this->description = $obj->description;
            $this->image = null;
            $this->status = 1;
            if($this->save()) {
                $sections = $obj->items;
                if (isset($sections)) {

                    foreach ($sections as $key => $value) {
                        $menuSection = new MenuSection;
                        $menuSection->menu_id = $this->id;
                        $menuSection->name = $key;
                        $menuSection->description = (isset($value->description)) ? $value->description : null;
                        $menuSection->image = $value->image;
                        $items = $value->items;

                        if ($menuSection->save()) {
                            if(count($items) > 0 ) {
                                foreach ($items as $ikey => $ivalue) {

                                    $menuItem = new MenuItem;
                                    $menuItem->menu_id = $this->id;
                                    $menuItem->menu_section_id = $menuSection->id;
                                    $menuItem->name = $ivalue->name;
                                    $menuItem->description = $ivalue->description;
                                    $menuItem->price = $ivalue->price;
                                    $menuItem->status = 1;
                                    $menuItem->image = null;
                                    $menuItem->save();
                                }
                            }
                        }
                    }
                }

            }
        }
        var_dump("done with $title");
    }

    public function makeMenuSet()
    {
        if(isset($this->menuSections)) {
            $this['items'] = $this->menuSections;

            if (isset($this['items'])) {
               foreach($this['items'] as $key => $value) {
                   $this['items'][$key]['items'] = $value->menuItems;
               }
            }
        }
        return $this;
    }
}
