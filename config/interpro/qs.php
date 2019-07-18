<?php

return [

    'scripts' => [
        'text' => ['before_body_close', 'after_body_open', 'before_head_close'],
    ],

    'all_site' => [
        'string' => ['inst', 'vk', 'fb', 'phone', 'copyright']
    ],

    'title_block' => [
        'text' => ['objectives'],
        'string' => ['client_name_1', 'profession_1', 'specifications_1',
                     'client_name_2', 'profession_2', 'specifications_2']
    ],

    'about' => [
        'text' => ['subtitle_text', 'text'],
        'image' => ['img']
    ],

    'atmosphere' => [
        'text' => ['subtitle_text'],
        'string' => ['channel_name', 'explanation', 'channel_link'],
        'image' => ['img'],
        'groups' => [
            'galleries' => [
                'string' => ['gallery_name', 'explanation'],
                'image' => ['img']
            ],
            'gallery_slides' => [
                'image' => ['img'],
                'galleries' => ['superior']
            ],
        ]
    ],

    'sparring' => [
      'text' => ['subtitle', 'text_1', 'text_2', 'text_3', 'text_4'],
        'string' => ['etiquette_title'],
        'groups' => [
            'etiquette_list' => [
                'text' => ['text']
            ]
        ]
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

    'signing_up' => [
        'text' => ['text']
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

    'instagram' => [
        'groups' => [
            'posts_list' => [
                'string' => ['post_link'],
                'image' => ['img']
            ]
        ]
    ],

    'offers' => [
        'string' => [
            'offer_1_title', 'offer_2_title', 'offer_3_title',
            'offer_1_price', 'offer_2_price', 'offer_3_price',
            'offer_1_old_price', 'offer_2_old_price', 'offer_3_old_price',
            'offer_1_discount', 'offer_2_discount', 'offer_3_discount',
            'stock'
        ],
        'text' => ['text', 'offer_1_text', 'offer_2_text', 'offer_3_text'],
        'image' => ['img_1', 'img_2', 'img_3']
    ],

];
