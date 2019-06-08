<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateHomeContentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('home_contents', function (Blueprint $table) {
            $table->increments('id');
            $table->boolean('hasImage')->default(false);
            $table->boolean('hasHtml')->default(false);
            $table->string('name')->nullable();
            $table->string('image_src')->nullable();
            $table->string('image_rotate')->nullable();
            $table->text('html_content')->nullable();
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
        Schema::dropIfExists('home_contents');
    }
}
