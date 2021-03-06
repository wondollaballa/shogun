<?php

use Illuminate\Database\Seeder;

class MenuSectionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('menu_sections')->insert([
            'menu_id'=>1,
            'name' => 'Entrees',
            'description' => 'All entrees are served with tepanyaki vegetable soup and salad. Fried rice additional 1.00',
            'image'=>'../images/menus/lunch/entrees.jpg',
            'image_rotate'=>null,
            'status'=>1,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('menu_sections')->insert([
            'menu_id'=>1,
            'name' => 'Add More',
            'description' => null,
            'image'=>'../images/menus/lunch/addmore.jpg',
            'image_rotate'=>null,
            'status'=>1,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('menu_sections')->insert([
            'menu_id'=>1,
            'name' => "Kid's Meal",
            'description' => null,
            'image'=>'../images/menus/lunch/kidsmeal.jpg',
            'image_rotate'=>null,
            'status'=>1,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('menu_sections')->insert([
            'menu_id'=>1,
            'name' => 'Sushi Lunch Special',
            'description' => null,
            'image'=>'../images/menus/lunch/sushi.jpg',
            'image_rotate'=>null,
            'status'=>1,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('menu_sections')->insert([
            'menu_id'=>1,
            'name' => 'Sushi Combo',
            'description' => null,
            'image'=>'../images/menus/lunch/sushi-combo.jpg',
            'image_rotate'=>null,
            'status'=>1,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('menu_sections')->insert([
            'menu_id'=>1,
            'name' => 'Fresh Bowls',
            'description' => null,
            'image'=>'../images/menus/lunch/fresh-bowl.jpg',
            'image_rotate'=>null,
            'status'=>1,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('menu_sections')->insert([
            'menu_id'=>1,
            'name' => 'Grilled Bowls',
            'description' => null,
            'image'=>'../images/menus/lunch/grilled-bowl.jpg',
            'image_rotate'=>null,
            'status'=>1,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('menu_sections')->insert([
            'menu_id'=>2,
            'name' => 'Food',
            'description' => null,
            'image'=>'../images/menus/happyhour/food.jpg',
            'image_rotate'=>null,
            'status'=>1,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('menu_sections')->insert([
            'menu_id'=>2,
            'name' => 'Drafts',
            'description' => null,
            'image'=>'../images/menus/happyhour/draft.jpg',
            'image_rotate'=>null,
            'status'=>1,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('menu_sections')->insert([
            'menu_id'=>2,
            'name' => 'Wines',
            'description' => null,
            'image'=>'../images/menus/happyhour/wines.jpg',
            'image_rotate'=>null,
            'status'=>1,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('menu_sections')->insert([
            'menu_id'=>2,
            'name' => 'House Cocktails',
            'description' => null,
            'image'=>'../images/menus/happyhour/housecocktails.jpg',
            'image_rotate'=>null,
            'status'=>1,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('menu_sections')->insert([
            'menu_id'=>2,
            'name' => 'Nigiri & Sashimi',
            'description' => null,
            'image'=>'../images/menus/happyhour/nigirisashimi.jpg',
            'image_rotate'=>null,
            'status'=>1,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('menu_sections')->insert([
            'menu_id'=>2,
            'name' => 'Most Wanted Half Rolls',
            'description' => null,
            'image'=>'../images/menus/happyhour/halfrolls.jpg',
            'image_rotate'=>null,
            'status'=>1,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('menu_sections')->insert([
            'menu_id'=>2,
            'name' => 'Specialty Cocktails',
            'description' => null,
            'image'=>'../images/menus/happyhour/specialtycocktails.jpg',
            'image_rotate'=>null,
            'status'=>1,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('menu_sections')->insert([
            'menu_id'=>3,
            'name' => 'Hibachi',
            'description' => null,
            'image'=>'../images/menus/hibachi/hibachi.jpg',
            'image_rotate'=>null,
            'status'=>1,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('menu_sections')->insert([
            'menu_id'=>3,
            'name' => 'Sushi',
            'description' => null,
            'image'=>'../images/menus/hibachi/sushi.jpg',
            'image_rotate'=>null,
            'status'=>1,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('menu_sections')->insert([
            'menu_id'=>3,
            'name' => 'Nigiri 2PC / Sashimi 5PC',
            'description' => null,
            'image'=>'../images/menus/hibachi/nigirisashimi.jpg',
            'image_rotate'=>null,
            'status'=>1,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('menu_sections')->insert([
            'menu_id'=>3,
            'name' => 'Shogun Specialty Rolls',
            'description' => null,
            'image'=>'../images/menus/hibachi/specialty.jpg',
            'image_rotate'=>null,
            'status'=>1,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('menu_sections')->insert([
            'menu_id'=>3,
            'name' => 'Side Orders',
            'description' => null,
            'image'=>'../images/menus/hibachi/miso.jpg',
            'image_rotate'=>null,
            'status'=>1,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('menu_sections')->insert([
            'menu_id'=>3,
            'name' => 'Desserts',
            'description' => null,
            'image'=>'../images/menus/hibachi/vanilla.jpg',
            'image_rotate'=>null,
            'status'=>1,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('menu_sections')->insert([
            'menu_id'=>3,
            'name' => 'Alchoholic Beverages',
            'description' => null,
            'image'=>'../images/menus/hibachi/beer.jpg',
            'image_rotate'=>null,
            'status'=>1,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('menu_sections')->insert([
            'menu_id'=>3,
            'name' => 'House Cocktails',
            'description' => null,
            'image'=>'../images/menus/hibachi/housecocktails.png',
            'image_rotate'=>null,
            'status'=>1,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        DB::table('menu_sections')->insert([
            'menu_id'=>3,
            'name' => 'Appetizers',
            'description' => null,
            'image'=>'../images/menus/hibachi/edamame.jpg',
            'image_rotate'=>null,
            'status'=>1,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('menu_sections')->insert([
            'menu_id'=>3,
            'name' => 'Kara-Age Plate',
            'description' => null,
            'image'=>'../images/menus/hibachi/karaage.jpg',
            'image_rotate'=>null,
            'status'=>1,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('menu_sections')->insert([
            'menu_id'=>3,
            'name' => 'Sauces',
            'description' => null,
            'image'=>'../images/menus/hibachi/sauces.jpg',
            'image_rotate'=>null,
            'status'=>1,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('menu_sections')->insert([
            'menu_id'=>3,
            'name' => 'Beverages (Non-Alchohol)',
            'description' => null,
            'image'=>'../images/menus/hibachi/beverage.jpg',
            'image_rotate'=>null,
            'status'=>1,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('menu_sections')->insert([
            'menu_id'=>3,
            'name' => 'Wine',
            'description' => null,
            'image'=>'../images/menus/hibachi/cabernet.png',
            'image_rotate'=>null,
            'status'=>1,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('menu_sections')->insert([
            'menu_id'=>3,
            'name' => 'Sake',
            'description' => null,
            'image'=>'../images/menus/hibachi/sake.jpg',
            'image_rotate'=>null,
            'status'=>1,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('menu_sections')->insert([
            'menu_id'=>3,
            'name' => 'Specialty Cocktails',
            'description' => null,
            'image'=>'../images/menus/hibachi/maitais.png',
            'image_rotate'=>null,
            'status'=>1,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('menu_sections')->insert([
            'menu_id'=>4,
            'name' => 'Sushi',
            'description' => null,
            'image'=>'../images/menus/sushi/maki.jpg',
            'image_rotate'=>null,
            'status'=>1,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('menu_sections')->insert([
            'menu_id'=>4,
            'name' => 'Shogun Classic Rolls',
            'description' => null,
            'image'=>'../images/menus/sushi/caterpillarroll.jpg',
            'image_rotate'=>null,
            'status'=>1,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('menu_sections')->insert([
            'menu_id'=>4,
            'name' => 'Nigiri 2PC / Sashimi 5PC',
            'description' => null,
            'image'=>'../images/menus/sushi/nigiri2.jpg',
            'image_rotate'=>null,
            'status'=>1,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('menu_sections')->insert([
            'menu_id'=>4,
            'name' => 'Shogun Specialty Rolls',
            'description' => null,
            'image'=>'../images/menus/sushi/specialtyrolls.jpg',
            'image_rotate'=>null,
            'status'=>1,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
    }
}
