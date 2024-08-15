<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class CaptchaController extends Controller
{
    public function show()
    {
        $width = 120;
        $height = 40;

        // 创建图像资源
        $image = imagecreatetruecolor($width, $height);

        // 定义颜色
        $background = imagecolorallocate($image, 255, 255, 255); // 背景色
        $textColor = imagecolorallocate($image, 0, 0, 0); // 文字颜色
        $lineColor = imagecolorallocate($image, 150, 150, 150); // 干扰线颜色
        $noiseColor = imagecolorallocate($image, 200, 200, 200); // 噪点颜色

        // 填充背景
        imagefilledrectangle($image, 0, 0, $width, $height, $background);

        // 添加噪点
        for ($i = 0; $i < 50; $i++) {
            imagefilledrectangle($image, rand(0, $width), rand(0, $height), rand(0, $width), rand(0, $height), $noiseColor);
        }

        // 添加干扰线
        for ($i = 0; $i < 5; $i++) {
            imageline($image, rand(0, $width), rand(0, $height), rand(0, $width), rand(0, $height), $lineColor);
        }

        // 生成验证码文本
        $captchaText = rand(1000, 9999);
        Session::put('captcha', $captchaText);

        // 使用内置字体绘制文本
        imagestring($image, 5, 20, 10, $captchaText, $textColor);

        // 设置响应头并输出图像
        header('Content-Type: image/png');
        imagepng($image);
        imagedestroy($image);
    }
}
