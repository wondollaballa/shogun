<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRulesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('rules', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('company_id');
            $table->string('name')->nullable();
            $table->text('store_hours')->nullable();
            $table->tinyInteger('interval');
            $table->text('blackout_dates')->nullable();
            $table->tinyInteger('max_size_per_interval');
            $table->tinyInteger('min_party_size');
            $table->tinyInteger('max_party_size');
            $table->tinyInteger('reservation_deadline');
            $table->tinyInteger('arrival_deadline');
            $table->boolean('large_party')->default(false);
            $table->tinyInteger('large_party_min_size')->default(8);
            $table->boolean('large_party_cancel_fee')->default(false);
            $table->decimal('large_party_cancel_fee_amount', 11, 2);
            $table->boolean('special_instructions')->default(true);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('rules');
    }
}
