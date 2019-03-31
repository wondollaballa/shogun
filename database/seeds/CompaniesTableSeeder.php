<?php

use Carbon\Carbon;
use Illuminate\Database\Seeder;

class CompaniesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('companies')->insert([
            'name' => "Shogun",
            'nick_name' => 'Shogun 1',
            'email' => 'shogunintyler@gmail.com',
            'street' => '5515 S Broadway Ave',
            'suite' => NULL,
            'city' => 'Tyler',
            'state' => 'Tx',
            'country' => 'US',
            'zipcode' => '75701',
            'phone' => '9035619890',
            'phone_option' => '',
            'hours' => NULL,
            'blackout_dates' => NULL,
            'max_occupancy' => 100,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
    }
}
