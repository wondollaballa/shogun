<?php
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class RulesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
   
    public function run()
    {
        DB::table('rules')->insert([
            'company_id' => 1,
            'name' => 'Shogun Reservation Rules',
            'store_hours' => '[{"opened":false,"start":{"hh":"12","mm":"00","a":"pm"},"end":{"hh":"12","mm":"00","a":"am"}},{"opened":true,"start":{"hh":"12","mm":"00","a":"pm"},"end":{"hh":"12","mm":"00","a":"am"}},{"opened":true,"start":{"hh":"12","mm":"00","a":"pm"},"end":{"hh":"12","mm":"00","a":"am"}},{"opened":true,"start":{"hh":"12","mm":"00","a":"pm"},"end":{"hh":"12","mm":"00","a":"am"}},{"opened":true,"start":{"hh":"12","mm":"00","a":"pm"},"end":{"hh":"12","mm":"00","a":"am"}},{"opened":true,"start":{"hh":"12","mm":"00","a":"pm"},"end":{"hh":"12","mm":"00","a":"am"}},{"opened":true,"start":{"hh":"12","mm":"00","a":"pm"},"end":{"hh":"12","mm":"00","a":"am"}}]',
            'interval' => 15,
            'blackout_dates'=> null,
            'max_size_per_interval' => 0,
            'min_party_size' => 1,
            'max_party_size' => 0,
            'reservation_deadline'=>0,
            'arrival_deadline' => 0,
            'large_party' => true,
            'large_party_min_size' => 8,
            'large_party_cancel_fee' => false,
            'large_party_cancel_fee_amount' => 0,
            'special_instructions' => true,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
    }
}
