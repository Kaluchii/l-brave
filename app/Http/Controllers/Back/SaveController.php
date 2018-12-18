<?php namespace App\Http\Controllers\Back;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Interpro\Entrance\Contracts\CommandAgent\UpdateAgent;
use Interpro\ImageAggr\Contracts\CommandAgents\OperationsAgent;
use Interpro\ImageAggr\Contracts\Settings\PathResolver;

class SaveController extends Controller
{
    private $operationsAgent;
    private $update;
    private $pathResolver;
    public function __construct(UpdateAgent $upd, OperationsAgent $operationsAgent, PathResolver $pathResolver){
        $this->update  = $upd;
        $this->pathResolver = $pathResolver;
        $this->operationsAgent = $operationsAgent;
    }

    private function  straightenArray( $array ){
        $result_array = [];
        // Перебираем блок или группу
        foreach($array as $field => $value){
            // Если поле массив (Тип: string, bool, int, text, float)
            if( is_array( $value ) ){
                // То перебираем поля массива
                foreach($value as $key => $val) {
                    // Если поле ЛОГИЧЕСКОЕ
                    if($field === 'bool'){
                        //============= Приводим к булевому типу =========
                        if($val === 'true'){
                            $result_array += [$key => true];
                        }else{
                            $result_array += [$key => false];
                        }
                        //==============
                    }else{
                        // Иначе просто выпрямляем
                        $result_array += [$key => $val];
                    }
                }
            }else{
                // Если не массив значит радное поле БЛОКА или ГРУПЫЫ
                if( $field === 'show'){
                    if( $value === 'true' ){
                        $result_array += [$field => true];
                    }else{
                        $result_array += [$field => false];
                    }
                }elseif($field != 'id'){
                    $result_array += [$field => $value];
                }

            }
        }
        return $result_array;
    }
    public function save(Request $request){
        $data = $request->all();
        try{
            // перебираем блоки

            foreach($data as $block_name => $block_value){
                // проверяем поля внутри
                // если поля то БЛОК
                // если массив числовой то ГРУППА
                if( !array_key_exists(0 ,$block_value ) ){
                    // BLOCK
                    $save_date = $this->straightenArray($block_value);
                    $this->update->update($block_name, 0, $save_date);
                }
                else{
                    // GROUP
                    foreach($block_value as $key => $val ){
                        // проверка на случай если прийдет массив например с 3 элемента
                        //  в js он будет такой
                        //  2: { object }
                        //  3: { object }
                        //  Тоесть всего 2 элемента
                        //Но в запрос придет
                        //  0: ''
                        //  1: ''
                        //  2: {}
                        //  0: {}
                        if($val != ''){
                            $save_date = $this->straightenArray($val);
                            $this->update->update($block_name,(int)$val['id'], $save_date);
                        }
                    }
                }
            }
            return ['error' => false, 'message' => ''];
        }catch(\Exception $error){
            return ['error' => true, 'message' => $error->getMessage()];
        }
    }
}
