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
            'hasImage' => 1,
            'hasHtml' => 0,
            'name' => 'header',
            'image_src' => '../images/hibachi-2.jpg',
            'image_rotate'=> null,
            'html_content' => null,
            'created_at' => '2019-06-01 00:00:00',
            'updated_at' => '2019-06-01 00:00:00'
        ]);
        DB::table('home_contents')->insert([
            'hasImage' => 1,
            'hasHtml' => 1,
            'name' => 'aboutus',
            'image_src' => '../images/hibachi-6.jpg',
            'image_rotate' => null,
            'html_content' => null,
            'created_at' => '2019-06-01 00:00:00',
            'updated_at' => '2019-06-01 00:00:00'
        ]);
        DB::table('home_contents')->insert([
            'hasImage' => 1,
            'hasHtml' => 1,
            'name' => 'theexperience',
            'image_src' => '../images/hibachi-7.jpg',
            'image_rotate' => null,
            'html_content' => null,
            'created_at' => '2019-06-01 00:00:00',
            'updated_at' => '2019-06-01 00:00:00'
        ]);
        DB::table('home_contents')->insert([
            'hasImage' => 0,
            'hasHtml' => 1,
            'name' => 'footer',
            'image_src' => null,
            'image_rotate' => null,
            'html_content' => null,
            'created_at' => '2019-06-01 00:00:00',
            'updated_at' => '2019-06-01 00:00:00'
        ]);
    }
}
