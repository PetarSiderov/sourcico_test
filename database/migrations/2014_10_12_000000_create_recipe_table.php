<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRecipeTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('test.recipes', function (Blueprint $table) {
            $table->id();
            $table->string('recipe_name')->unique();
            $table->string('recipe_source');
            $table->string('preparation_time')->nullable();
            $table->string('preparation_instructions');
            $table->string('list_of_ingredients');
            $table->string('ingredient_quantity');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('recipes');
    }
}
