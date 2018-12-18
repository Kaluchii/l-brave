<?php

namespace App\Http\Controllers\Back;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Interpro\Entrance\Contracts\CommandAgent\DestructAgent;
use Interpro\Entrance\Contracts\CommandAgent\InitAgent;
use Interpro\Entrance\Contracts\CommandAgent\UpdateAgent;
use Interpro\ImageAggr\Contracts\CommandAgents\OperationsAgent;
use Interpro\ImageAggr\Contracts\Settings\PathResolver;


class GroupItemController extends Controller
{
    private $init;
    private $del;
    private $update;
    private $operation;
    private $pathResolver;

    public function __construct(InitAgent $int, DestructAgent $del, OperationsAgent $og, PathResolver $pr, UpdateAgent $upd){
        $this->init    = $int;
        $this->del     = $del;
        $this->operation = $og;
        $this->pathResolver = $pr;
        $this->update = $upd;
    }


    public function delete(){}

    public function newRow(Request $request){
        $data = $request->all();
        try{
            $new_item = $this->init->init($data['blockname'], [$data['fieldname'] => $data['value'], 'superior' => $data['superior']]);


            $view = view('back.groups.'.$data['blockname'].'.'.$data['blockname'].'_row' , [
                'item' => $new_item
            ])->render();

            return ['error' => false, 'message' => '', 'view' => $view];

        }catch(\Exception $error){
            return ['error' => true, 'message' => $error->getMessage()];
        }
    }

    public function newBox(Request $request){
        $data = $request->all();
        try{
            $new_item = $this->init->init($data['blockname'], [ 'superior' => $data['superior'] ] );


            $view = view('back.groups.'.$data['blockname'].'.'.$data['blockname'].'_box' , [
                'item' => $new_item
            ])->render();

            return ['error' => false, 'message' => '', 'view' => $view];

        }catch(\Exception $error){
            return ['error' => true, 'message' => $error->getMessage()];
        }
    }

    public function removeItem(Request $request){
        $data = $request->all();
        try{
            Log::info($data);
            $this->del->delete($data['block'], (int)$data['id']);


            return ['error' => false, 'message' => 'Элемент успешно удален'];

        }catch(\Exception $error){
            return ['error' => true, 'message' => $error->getMessage()];
        }

    }
    public function newImageItem(Request $request){
        $data = $request->all();
        try{
            $new_item = $this->init->init($data['entity_name'], [] );
            $this->operation->upload($data['entity_name'],(int)$new_item->id_field, $data['image_name'], $data['image_file']);
            $this->update->update($data['entity_name'],(int)$new_item->id_field , [ $data['image_name'] => ['alt' => '', 'update_flag' => true]  ]);

            $ext = $data['image_file']->guessClientExtension();
            $file_path = $this->pathResolver->getImagePath().'/'.$data['entity_name'].'_'.$new_item->id_field.'_'.$data['image_name'].'.'.$ext;

            return ['error' => false, 'image' => $file_path];

        }catch(\Exception $error){
            return ['error' => true, 'message' => $error->getMessage()];
        }
    }

}
