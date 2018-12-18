<?php

namespace App\Http\Controllers\Back;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesResources;
use Illuminate\Support\Facades\Log;
use Interpro\Core\Contracts\Taxonomy\Taxonomy;
use Interpro\Entrance\Contracts\Extract\ExtractAgent;
use Interpro\Extractor\Contracts\Selection\Tuner;
use Interpro\Feedback\Contracts\FeedbackAgent;
use ReCaptcha\ReCaptcha;


class MailController extends Controller
{
    private $feedback;
    public function __construct( FeedbackAgent $feedback){

        $this->feedback = $feedback;
        // Объявляем все шаблоны писем для форм

        $this->feedback->setBodyTemplate('sponsor_form', 'back/mail/sponsor_form_mail');

    }

    public function send(Request $request){
        try{
            $data = $request->all();

            $form = array_pull($data, 'form');

            $this->feedback->mail($form, $data);
            return ['error' => false];
        }catch(\Exception $error){
            return ['error' => true, 'error'=> $error->getMessage()];
        }
    }

    public function Captcha( Request $request )
    {
        $data = $request->all();
        $secret = '6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe';
        $recaptcha = new ReCaptcha($secret);
        $resp = $recaptcha->verify($data['g-recaptcha-response'], $_SERVER['REMOTE_ADDR']);
        if ($resp->isSuccess()) {
            $data['error'] = false;
        } else {
            $data['error'] = true;
        }
        return json_encode($data);
    }

}
