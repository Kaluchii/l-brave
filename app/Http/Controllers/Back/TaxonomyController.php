<?php namespace App\Http\Controllers\Back;

use App\Http\Controllers\Controller;
use Interpro\Core\Contracts\Taxonomy\Taxonomy;
use Interpro\Core\Contracts\Taxonomy\Types\AggrType;
use Interpro\Core\Contracts\Taxonomy\Types\AType;
use Interpro\Core\Contracts\Taxonomy\Types\BType;

class TaxonomyController extends Controller
{
	/**
	 * @return void
	 */
	public function __construct()
	{

	}

    function selectBImageType(BType $imageType)
    {
        $show_arr = $this->selectAggrTypeFields($imageType);

        $subs = $imageType->getSubs('original');

        $resizeType = $subs->getSub('resize');
        $cropType = $subs->getSub('crop');

        $show_arr['Тип resize'] = $this->selectAggrTypeFields($resizeType);
        $show_arr['Тип crope'] = $this->selectAggrTypeFields($cropType);

        return $show_arr;
    }

    function selectAggrTypeFields(AggrType $owner)
    {
        $show_arr = ['owns'=>[], 'refs'=>[], 'fields'=>[]];

        //Отдельно собственные поля
        $owns = $owner->getOwns();

        foreach($owns as $own)
        {
            $show_arr['owns'][$own->getName()] = $own->getFieldTypeName();
        }

        //Отдельно ссылки
        $refs = $owner->getRefs();

        foreach($refs as $ref)
        {
            $show_arr['refs'][$ref->getName()] = $ref->getFieldTypeName();
        }

        //Всё вместе
        $fields = $owner->getFields();

        foreach($fields as $field)
        {
            $show_arr['fields'][$field->getName()] = $field->getFieldTypeName();
        }

        return $show_arr;
    }

    function selectSubGroups(AType $superior)
    {
        $currentGroups = $superior->getGroups();

        $show_arr = [];

        foreach($currentGroups as $group)
        {
            $show_arr[$group->getName()] = $this->selectAggrTypeFields($group);

            $this->selectSubGroups($group);

            $show_arr[$group->getName()]['подгруппы'] = $this->selectSubGroups($group);
        }

        return $show_arr;
    }

    public function showTaxonomy(Taxonomy $tax)
    {
        $blocks = $tax->getBlocks();

        $show_arr = [];

        foreach($blocks as $block)
        {
            $show_arr[$block->getName()] = $this->selectAggrTypeFields($block);

            $show_arr[$block->getName()]['группы'] = $this->selectSubGroups($block);
        }

        $imageType = $tax->getType('image');

        $show_arr['Тип Image'] = $this->selectBImageType($imageType);

        dd($show_arr);
    }


}

