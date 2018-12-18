<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Interpro\Entrance\Contracts\Extract\ExtractAgent;

class AdminController extends Controller
{
    private $extract;
    public function __construct(ExtractAgent $ext){
        $this->extract = $ext;
    }

    public function getIndex(){
        return view('back.layout');
    }

    public function getExample(){
        $block = $this->extract->getBlock('example');
        return view('back.blocks.example', [
            'block' => $block
        ]);
    }
}
