<?php
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class MenusTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('menus')->insert([
            'name' => 'Lunch',
            'description' => 'MONDAY - FRIDAY 11:00 A.M. - 3:00 P.M.(EXCEPT HOLIDAY)',
            'image'=>null,
            'image_rotate'=>null,
            'status'=>1,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('menus')->insert([
            'name' => 'Happy Hour',
            'description' => 'Happy Hour (Mon-Fri 4pm-6pm)',
            'image'=>null,
            'image_rotate'=>null,
            'status'=>1,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('menus')->insert([
            'name' => 'Hibachi',
            'description' => null,
            'image'=>null,
            'image_rotate'=>null,
            'status'=>1,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('menus')->insert([
            'name' => 'Sushi',
            'description' => null,
            'image'=>null,
            'image_rotate'=>null,
            'status'=>1,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
    }
}
