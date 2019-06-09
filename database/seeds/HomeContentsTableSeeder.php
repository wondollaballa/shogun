<?php
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class HomeContentsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('home_contents')->insert([
            'hasImage' => true,
            'hasHtml' => false,
            'name' => 'header',
            'image_src' => '../images/hibachi-2.jpg',
            'image_rotate'=> null,
            'html_content' => null,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('home_contents')->insert([
            'hasImage' => true,
            'hasHtml' => true,
            'name' => 'aboutus',
            'image_src' => '../images/hibachi-6.jpg',
            'image_rotate' => null,
            'html_content' => null,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('home_contents')->insert([
            'hasImage' => true,
            'hasHtml' => false,
            'name' => 'theexperience',
            'image_src' => '../images/hibachi-7.jpg',
            'image_rotate' => null,
            'html_content' => null,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('home_contents')->insert([
            'hasImage' => false,
            'hasHtml' => true,
            'name' => 'footer',
            'image_src' => null,
            'image_rotate' => null,
            'html_content' => null,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
    }
}
