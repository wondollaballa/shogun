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
        return $this->hasMany(MenuSection::class, 'menu_id', 'id')->orderBy('order', 'asc');
    }

    public function menuItems()
    {
        return $this->hasMany(MenuItem::class, 'menu_id', 'id')->orderBy('order','asc');
    }

    public function createMenuFromJson($title, $order, $obj)
    {
        // dd($obj);
        if (isset($obj)) {
            $this->name = $title;
            $this->description = $obj->description;
            $this->image = null;
            $this->status = 1;
            $this->order = $order;
            if($this->save()) {
                $sections = $obj->items;
                if (isset($sections)) {
                    $sectionOrder = 0;
                    foreach ($sections as $key => $value) {
                        $sectionOrder++;
                        $menuSection = new MenuSection;
                        $menuSection->menu_id = $this->id;
                        $menuSection->name = $key;
                        $menuSection->description = (isset($value->description)) ? $value->description : null;
                        $menuSection->image = $value->image;
                        $menuSection->order = $sectionOrder;
                        $items = $value->items;
                        $itemOrder = 0;
                        if ($menuSection->save()) {
                            if(count($items) > 0 ) {
                                foreach ($items as $ikey => $ivalue) {
                                    $itemOrder++;
                                    $menuItem = new MenuItem;
                                    $menuItem->menu_id = $this->id;
                                    $menuItem->menu_section_id = $menuSection->id;
                                    $menuItem->name = $ivalue->name;
                                    $menuItem->description = $ivalue->description;
                                    $menuItem->price = $ivalue->price;
                                    $menuItem->status = 1;
                                    $menuItem->image = null;
                                    $menuItem->order = $itemOrder;
                                    $menuItem->save();
                                }
                            }
                        }
                    }
                }

            }
        }
    }

    public function getAllMenus()
    {
        $all = $this->orderBy('order','asc')->get();
        if(isset($all)) {
            $all->map(function($v, $k) {
                $v->show = true;
                $v->delete = false;
                if (isset($v->menuSections)) {
                    $v['items'] = $v->menuSections;

                    if (isset($v['items'])) {
                        foreach($v['items'] as $key => $value) {
                            $v['items'][$key]['items'] = $value->menuItems;
                            $v['items'][$key]['show'] = true;
                            $v['items'][$key]['delete'] = false;
                            if(isset($v['items'][$key]['items'])) {
                                foreach($v['items'][$key]['items'] as $ikey => $ivalue) {
                                    $v['items'][$key]['items'][$ikey]['show'] = true;
                                    $v['items'][$key]['items'][$ikey]['delete'] = false;
                                }
                            }

                        }
                    }
                }
                return $v;
            });
        }
        return $all;
    }

    public function updateAll($menus)
    {
        collect($menus)->each(function($item) {
            $menu = new Menu;
            if ($item['id'] > 0) {
                $menu->menuUpdateOrDelete($item);
            } else {
                $menu->createMenu($item);
            }
            $sections = $item['items'];
            collect($sections)->each(function($section) {
                $sections = new MenuSection;
                if($section['id'] > 0) {
                    $sections->updateOrDelete($section);
                } else {
                    $sections->createSection($section);
                }
                $menuItems = $section['items'];
                collect($menuItems)->map(function($mItem) {
                    $menuItem = new MenuItem;
                    if($mItem['id'] > 0) {
                        $menuItem->updateOrDelete($mItem);
                    } else {
                        $menuItem->createItem($mItem);
                    }
                });
            });
        });
    }

    private function createMenu($item) {
        $this->name = $item['name'];
        $this->description = $item['description'];
        $this->image = $item['image'];
        $this->status = $item['status'];
        $this->order = $item['order'];
        $this->save();
    }

    private function menuUpdateOrDelete($item) {
        $menu = new Menu;
        $m = $menu->find($item['id']);
        if ($item['delete']) {
            $m->delete();
        } else {
            $m->description = $item['description'];
            $m->image = $item['image'];
            $m->name =$item['name'];
            $m->order = $item['order'];
            $m->status = $item['status'];
            $m->save();
        }
    }
}
