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
            return DB::table('test.recipes')->get();
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
