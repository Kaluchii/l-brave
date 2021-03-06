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
        $this->extract->tuneSelection('reviews_list')->sortBy('sorter','DESC');
        $this->extract->tuneSelection('excuses_list')->sortBy('sorter','DESC');
        $this->extract->tuneSelection('posts_list')->sortBy('sorter','DESC');
        $this->extract->tuneSelection('gallery_slides')->sortBy('sorter','DESC');
    }

    public function getIndex(){
        return view('back.layout');
    }


    public function getAll(){
        $block = $this->extract->getBlock('all_site');
        return view('back.blocks.all_site', [
            'block' => $block
        ]);
    }


    public function getTitleBlock(){
        $block = $this->extract->getBlock('title_block');
        return view('back.blocks.title_block', [
            'block' => $block
        ]);
    }


    public function getAbout(){
        $block = $this->extract->getBlock('about');
        return view('back.blocks.about', [
            'block' => $block
        ]);
    }


    public function getAtmosphere(){
        $block = $this->extract->getBlock('atmosphere');
        return view('back.blocks.atmosphere', [
            'block' => $block
        ]);
    }


    public function getSparring(){
        $block = $this->extract->getBlock('sparring');
        return view('back.blocks.sparring', [
            'block' => $block
        ]);
    }


    public function getGalleriesItem( $id ){
        $item = $this->extract->getGroupItem('galleries', $id);
        return view('back.groups.galleries.galleries', [
            'item' => $item
        ]);
    }


    public function getReviews(){
        $block = $this->extract->getBlock('reviews');
        return view('back.blocks.reviews', [
            'block' => $block
        ]);
    }


    public function getReviewsItem( $id ){
        $item = $this->extract->getGroupItem('reviews_list', $id);
        return view('back.groups.reviews_list.reviews_list', [
            'item' => $item
        ]);
    }


    public function getHabit(){
        $block = $this->extract->getBlock('habit');
        return view('back.blocks.habit', [
            'block' => $block
        ]);
    }


    public function getSigning(){
        $block = $this->extract->getBlock('signing_up');
        return view('back.blocks.signing_up', [
            'block' => $block
        ]);
    }


    public function getChallenge(){
        $block = $this->extract->getBlock('challenge');
        return view('back.blocks.challenge', [
            'block' => $block
        ]);
    }


    public function getExcuses(){
        $block = $this->extract->getBlock('excuses');
        return view('back.blocks.excuses', [
            'block' => $block
        ]);
    }


    public function getInstagram(){
        $block = $this->extract->getBlock('instagram');
        return view('back.blocks.instagram', [
            'block' => $block
        ]);
    }


    public function getExcusesItem( $id ){
        $item = $this->extract->getGroupItem('excuses_list', $id);
        return view('back.groups.excuses_list.excuses_list', [
            'item' => $item
        ]);
    }


    public function getOffers(){
        $block = $this->extract->getBlock('offers');
        return view('back.blocks.offers', [
            'block' => $block
        ]);
    }


    public function getMeta(){
        $block = $this->extract->getBlock('about');
        return view('back.blocks.meta', [
            'block' => $block
        ]);
    }


    public function getPost(){
        $block = $this->extract->getBlock('call_back_form');
        return view('back.blocks.mails', [
            'block' => $block
        ]);
    }


    public function getScripts(){
        $block = $this->extract->getBlock('scripts');
        return view('back.blocks.scripts', [
            'block' => $block
        ]);
    }
}
