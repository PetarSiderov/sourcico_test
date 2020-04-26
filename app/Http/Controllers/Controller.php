<?php

namespace App\Http\Controllers;

use http\Env\Response;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;
use App\Models\Recipe;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function saveRecipe(Request $request){
        try{
            $getAllArtributes = $request->all();

            Recipe::CreateRecipe($getAllArtributes['form']);
            return ['error' => false,
                     'message'=> 'Recipe inserted successfully'];
        }catch(\Exception $ex){
            return ['error'=> true,
                     'message' => $ex->getMessage()];
        }
    }
    public function getAllRecipes(){
        try{
            $list = DB::table('test.recipes')->get();
            $new_list= null;
            foreach($list as $key =>$l){
                $new_list[$key] =[
                    'id' => $l->id,
                    'recipe_name' => $l->recipe_name,
                    'recipe_source' => $l->recipe_source,
                    'preparation_time' => $l->preparation_time,
                    'preparation_instructions' => $l->preparation_instructions !== null ?
                        $l->preparation_instructions : '',
                    'list_of_ingredients' => $l->list_of_ingredients,
                    'ingredient_quantity' => $l->ingredient_quantity
                ];
            }
            return $new_list;
        } catch (\Exception $ex){
            return ['error' => true,
                    'message' => $ex->getMessage()];
        }
    }
    public function deleteRecipe($id){
        try{
            Recipe::deleteRecipe($id);
            return ['error' => false,
                'message'=> 'Recipe deleted successfully'];;
        } catch (\Exception $ex){
            return ['error' => true,
                'message' => $ex->getMessage()];
        }
    }
}
