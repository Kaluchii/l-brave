<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesResources;
use Illuminate\Support\Facades\Log;
use Interpro\Entrance\Contracts\Extract\ExtractAgent;


class FrontController extends Controller
{
    private $extract;
    public function __construct(ExtractAgent $ext){
        $this->extract = $ext;
        $scripts = $this->extract->getBlock('scripts');
        view()->share([
            'scripts' => $scripts,
        ]);
    }


    public function getIndex(){
        $this->extract->tuneSelection('reviews_list')->sortBy('sorter','ASC');
        $this->extract->tuneSelection('excuses_list')->sortBy('sorter','ASC');

        $all_site = $this->extract->getBlock('all_site');
        $about = $this->extract->getBlock('about');
        $atmosphere = $this->extract->getBlock('atmosphere');
        $reviews = $this->extract->getBlock('reviews');
        $habit = $this->extract->getBlock('habit');
        $challenge = $this->extract->getBlock('challenge');
        $excuses = $this->extract->getBlock('excuses');
        $offers = $this->extract->getBlock('offers');
        return view('front.index.index', [
            'all_site' => $all_site,
            'about' => $about,
            'atmosphere' => $atmosphere,
            'reviews' => $reviews,
            'habit' => $habit,
            'challenge' => $challenge,
            'excuses' => $excuses,
            'offers' => $offers,
        ]);
    }
}