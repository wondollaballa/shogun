<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateReservationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reservations', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('customer_id')->nullable();
            $table->string('name')->nullable();
            $table->string('phone')->nullable();
            $table->string('email')->nullable();
            $table->boolean('large_party')->default(false);
            $table->tinyInteger('party_size')->default(2);
            $table->datetime('requested')->nullable();
            $table->string('special_request')->nullable();
            $table->boolean('no_show')->default(false);
            $table->datetime('arrived_at')->nullable();
            $table->datetime('seated_at')->nullable();
            $table->integer('seat_id')->nullable();
            $table->boolean('hibachi')->default(false);
            $table->tinyInteger('status')->default(1);
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
        Schema::dropIfExists('reservations');
    }
}
