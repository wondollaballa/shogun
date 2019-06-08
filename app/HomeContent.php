<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class HomeContent extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'hasImage',
        'hasHtml',
        'name',
        'image_src',
        'image_rotate',
        'html_content'
    ];

    public function prepareContent($id) {
        $content = $this->find($id);
        if (isset($content->html_content)) {
            $content->html_content = \html_entity_decode($content->html_content);
        }

        return $content;
    }
    public function publishContent($header, $aboutus, $theexperience, $footer) {
        $saved = 0;
        if (isset($header)) {
            $home = new HomeContent;
            $headerContent = $home->find(1);
            $headerContent->hasImage = true;
            $headerContent->hasHtml = false;
            if (isset($header['image'])) {
                $headerContent->image_src = $header['image'];
            }
            if (isset($header['imageRotate'])) {
                $headerContent->image_rotate = $header['imageRotate'];
            }
            if($headerContent->save()) {
                $saved++;
            }
        }
        if (isset($aboutus)) {
            $home = new HomeContent;
            $aboutusContent = $home->find(2);
            $aboutusContent->hasImage = true;
            $aboutusContent->hasHtml = true;
            if (isset($aboutus['image'])) {
                $aboutusContent->image_src = $aboutus['image'];
            }
            if (isset($aboutus['imageRotate'])) {
                $aboutusContent->image_rotate = $aboutus['imageRotate'];
            }
            if (isset($aboutus['html']) && $aboutus['html'] != null && $aboutus['html'] != '') {
                $aboutusContent->html_content = \htmlentities($aboutus['html']);

            }
            if($aboutusContent->save()) {
                $saved++;
            }
        }
        if (isset($theexperience)) {
            $thex = new HomeContent;
            $theexperienceContent = $thex->find(3);
            $theexperienceContent->hasImage = true;
            $theexperienceContent->hasHtml = true;
            if (isset($theexperience['image'])) {
                $theexperienceContent->image_src = $theexperience['image'];
            }
            if (isset($theexperience['imageRotate'])) {
                $theexperienceContent->image_rotate = $theexperience['imageRotate'];
            }
            if (isset($theexperience['html'])) {
                $theexperienceContent->html_content = \htmlentities($theexperience['html']);
            }
            if($theexperienceContent->save()) {
                $saved++;
            }
        }
        if (isset($footer)) {
            $home = new HomeContent;
            $footerContent = $home->find(4);
            $footerContent->hasImage = true;
            $footerContent->hasHtml = true;
            if(isset($footer['image'])) {
                $footerContent->image_src = $footer['image'];
            }
            if(isset($footer['imageRotate'])) {
                $footerContent->image_rotate = $footer['imageRotate'];
            }
            if(isset($footer['html'])) {
                $footerContent->html_content = \htmlentities($footer['html']);
            }
            if($footerContent->save()) {

                $saved++;
            }
        }

        if ($saved == 4) {
            return true;
        }
        return false;
    }
}
