<?php

use Carbon\Carbon;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'username' => 'taepark',
            'first_name' => 'Tae',
            'last_name' => 'Park',
            'role_id' => 1,
            'phone' => '9033307878',
            'email' => 'tae@shogunintyler.com',
            'password' => bcrypt('ilovepasta'),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('users')->insert([
            'username' => 'onedough83',
            'first_name' => 'Wondo',
            'last_name' => 'Choung',
            'role_id' => 1,
            'phone' => '2069315327',
            'email' => 'onedough83@gmail.com',
            'password' => bcrypt('0987poiu'),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        DB::table('users')->insert([
            'username' => 'blessue',
            'first_name' => 'Sooah',
            'last_name' => 'Kim',
            'role_id' => 1,
            'phone' => '2064304696',
            'email' => 'blessue@gmail.com',
            'password' => bcrypt('sooahndo!1216'),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

    }
}

