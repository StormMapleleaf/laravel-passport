<?php
// 配置数据库和 Redis 连接
$pgsql_host = 'postgres';
$pgsql_dbname = 'postgres';
$pgsql_user = 'hero';
$pgsql_password = '123456';

$redis_host = 'redis';
$redis_port = 6379;

try {
    // 连接 PostgreSQL
    $pgsql = new PDO("pgsql:host=$pgsql_host;dbname=$pgsql_dbname", $pgsql_user, $pgsql_password);

    // 连接 Redis
    $redis = new Redis();
    $redis->connect($redis_host, $redis_port);

    // 查询 PostgreSQL 中的用户数据
    $stmt = $pgsql->query('SELECT username, password FROM "user"');
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // 将用户数据存入 Redis
    foreach ($users as $user) {
        $redis->hSet('user:'.$user['username'], 'password', $user['password']);
        $redis->hSet('user:'.$user['username'], 'age', $user['age']);
        $redis->hSet('user:'.$user['username'], 'gender', $user['gender']);
    }
} catch (Exception $e) {
    echo 'Connection failed: ' . $e->getMessage();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // 从 Redis 中获取用户信息
    $stored_password = $redis->hGet('user:'.$username, 'password');

    if ($stored_password && $stored_password === $password) {
        // 登录成功，重定向到 index.php
        header('Location: index.php');
        exit();
    } else {
        // 登录失败，显示错误信息
        $error = '用户名或密码错误';
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>登录</title>
</head>
<body>
    <h2>登录</h2>
    <form method="POST" action="login.php">
        <label for="username">用户名:</label>
        <input type="text" id="username" name="username" required><br><br>
        <label for="password">密码:</label>
        <input type="password" id="password" name="password" required><br><br>
        <button type="submit">登录</button>
    </form>

    <?php if (isset($error)): ?>
        <p style="color:red;"><?php echo $error; ?></p>
    <?php endif; ?>
</body>
</html>
