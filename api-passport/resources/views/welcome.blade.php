<!DOCTYPE html>
<html>
<head>
    <title>江汉大学授权中心</title>
    <!-- Favicon -->
    <link rel="icon" href="{{ asset('jhun.png') }}" type="image/x-icon">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; background-color: #f5f5f5; color: #333; margin: 0; padding: 0;">

<header style="display: flex; justify-content: center; gap: 20px; padding: 20px; background-color: #ffffff; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
    <a href="{{ route('login') }}" style="text-decoration: none; color: #007bff; padding: 10px 20px; border-radius: 4px; transition: background-color 0.3s;" 
       onmouseover="this.style.backgroundColor='#e2e6ea';" onmouseout="this.style.backgroundColor='';">
       登录
    </a>
    <a href="{{ route('register') }}" style="text-decoration: none; color: #007bff; padding: 10px 20px; border-radius: 4px; transition: background-color 0.3s;" 
       onmouseover="this.style.backgroundColor='#e2e6ea';" onmouseout="this.style.backgroundColor='';">
       注册
    </a>
</header>

<div id="app" style="display: flex; flex-direction: column; align-items: center; max-width: 1200px; margin: 20px auto; padding: 20px;">
    <!-- Center Logo -->
    <img src="{{ asset('jhun.png') }}" alt="Logo" style="max-width: 150px; height: auto; margin-bottom: 20px;">

    <h1 style="text-align: center; color: #333; font-size: 2rem; margin-top: 20px;">
        欢迎进入江汉大学授权认证中心
    </h1>
</div>

</body>
</html>
