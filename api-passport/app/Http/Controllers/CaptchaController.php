<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class CaptchaController extends Controller
{
    public function show()
    {
        $image = imagecreate(120, 40);
        $background = imagecolorallocate($image, 255, 255, 255);
        $textColor = imagecolorallocate($image, 0, 0, 0);
        $captchaText = rand(1000, 9999);

        imagefilledrectangle($image, 0, 0, 120, 40, $background);
        imagestring($image, 5, 20, 10, $captchaText, $textColor);

        Session::put('captcha', $captchaText);

        header('Content-Type: image/png');
        imagepng($image);
        imagedestroy($image);
    }
}
