<?php

namespace App\Providers;

use Illuminate\Support\Facades\Blade;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
      /*Blade::directive('plural', function ($expression) {

        $pluralArray = explode("/", $expression);
        $count = (int)array_shift($pluralArray);

        $plural = $count%10==1 && $count%100!=11 ? 0 : ($count%10>=2 && $count%10<=4 && ($count%100<10 || $count%100>=20) ? 1 : 2);

        $result = $count . ' ' .$pluralArray[$plural];

//        $result = 'AAA';
        return "<?php echo {$result}; ?>";
      });*/
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
