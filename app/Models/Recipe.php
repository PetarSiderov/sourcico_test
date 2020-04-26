<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Recipe extends Model
{
    protected $table = 'recipes';

    protected $fillable = ['id', 'recipe_name', 'recipe_source',
        'preparation_instructions', 'preparation_time', 'list_of_ingredients', 'ingredient_quantity'];

    public static function deleteRecipe($id)
    {
        return DB::table('test.recipes')->where('recipe_name','=', $id)->select('recipe_name')->delete();
    }

    /**
     * Dashboards are always in newindex
     * @return string|null
     */
    public function getConnectionName()
    {
        return 'mysql';
    }

    public static function CreateRecipe($validatedData)
    {
        DB::table('test.recipes')->insert([
            'recipe_name'=> $validatedData['name'],
            'recipe_source'=> '',
            'preparation_time' => $validatedData['preparationTime'],
            'preparation_instructions'=> $validatedData['preparationInstructions'],
            'list_of_ingredients' => json_encode($validatedData['ingredients']),
            'ingredient_quantity' => 0
        ]);
    }
}
