<?php

return [

    'scripts' => [
        'text' => ['before_body_close', 'after_body_open', 'before_head_close'],
    ],

    'all_site' => [
        'string' => ['inst', 'vk', 'fb', 'phone', 'copyright']
    ],

    'about' => [
        'text' => ['subtitle_text', 'text'],
        'image' => ['img']
    ],

    'atmosphere' => [
        'text' => ['subtitle_text'],
        /*'groups' => [
            'galleries' => [
                'string' => ['gallery_name', 'explanation'],
                'image' => ['img']
            ]
        ]*/
    ],

    'reviews' => [
        'groups' => [
            'reviews_list' => [
                'string' => ['person_name', 'person_occupation'],
                'text' => ['text', 'objectives'],
                'image' => ['img']
            ]
        ]
    ],

    'habit' => [
        'text' => ['subtitle_text', 'text'],
        'image' => ['img']
    ],

    'challenge' => [
        'text' => ['text']
    ],

    'excuses' => [
        'groups' => [
            'excuses_list' => [
                'string' => ['excuses_title'],
                'text' => ['text']
            ]
        ]
    ],

    'offers' => [
        'string' => [
            'offer_1_title', 'offer_2_title', 'offer_3_title',
            'offer_1_price', 'offer_2_price', 'offer_3_price',
            'offer_1_old_price', 'offer_2_old_price', 'offer_3_old_price',
            'offer_1_discount', 'offer_2_discount', 'offer_3_discount'
        ],
        'text' => ['text', 'offer_1_text', 'offer_2_text', 'offer_3_text'],
    ],

];
