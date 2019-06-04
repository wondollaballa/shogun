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
            'html_content' => null,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('home_contents')->insert([
            'hasImage' => true,
            'hasHtml' => true,
            'name' => 'aboutus',
            'image_src' => '../images/hibachi-6.jpg',
            'html_content' => '&lt;p&gt;Shogun Japanese Steak House has been a success since it was opened in Tyler, TX in 1992 by Tae Park , Shogun&acirc;��s Owner and CEO. Since then, Shogun of Japan has continued to satisfy dedicated customers for over 25 years. The restaurant is located on South Broadway and a few of the original employees are still with the company today. At Shogun of Japan you&acirc;��ll always find two separate Japanese dining experiences &acirc;�� a sushi bar, and Teppanyaki tables. Shogun specializes mainly in Teppanyaki cooking where the food is prepared and cooked on a Hibachi table in front of customers. Sushi bars and regular dining tables are available where Sushi or Habachi meals can also be served. The restaurant&acirc;��s main objective is to create a Japanese atmosphere to give our customers a feeling of having traveled to Japan for a delicious and authentic Japanese meal. Shogun of Japan not only gives you good food, but a happy dining experience and a great place to celebrate.&lt;/p&gt;',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('home_contents')->insert([
            'hasImage' => true,
            'hasHtml' => false,
            'name' => 'theexperience',
            'image_src' => '../images/hibachi-7.jpg',
            'html_content' => null,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('home_contents')->insert([
            'hasImage' => false,
            'hasHtml' => true,
            'name' => 'footer',
            'image_src' => null,
            'html_content' => null,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
    }
}
