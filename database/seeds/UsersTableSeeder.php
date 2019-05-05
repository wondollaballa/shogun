<?php

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

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
            'email' => 'tae@tylershogun.com',
            'password' => Hash::make('shogun903!Tae'),
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
            'password' => Hash::make('0987poiu'),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        DB::table('users')->insert([
            'username' => 'shogunhost',
            'first_name' => 'employee',
            'last_name' => 'shogun',
            'role_id' => 3,
            'phone' => '9035619890',
            'email' => 'tae@tylershogun.com',
            'password' => Hash::make('shogun903!Host'),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

    }
}

