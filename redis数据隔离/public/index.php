<?php
// Redis 连接配置
$redis_host = 'redis';
$redis_port = 6379;

try {
    // 连接 Redis
    $redis = new Redis();
    $redis->connect($redis_host, $redis_port);

    // 获取所有用户键
    $user_keys = $redis->keys('user:*');
    
    // 准备一个数组存储用户数据
    $users = [];

    // 遍历用户键并获取数据
    foreach ($user_keys as $key) {
        $username = str_replace('user:', '', $key);
        $password = $redis->hGet($key, 'password');
        $age = $redis->hGet($key, 'age');
        $gender = $redis->hGet($key, 'gender');
        $users[] = [
            'username' => $username,
            'password' => $password,
            'age' => $age,
            'gender' => $gender
        ];
    }
} catch (Exception $e) {
    echo 'Connection failed: ' . $e->getMessage();
}
?>

<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>用户列表</title>
</head>
<body>
    <h1>用户列表</h1>
    <?php if (!empty($users)): ?>
        <table border="1">
            <tr>
                <th>用户名</th>
                <th>密码</th>
                <th>年龄</th>
                <th>性别</th>
            </tr>
            <?php foreach ($users as $user): ?>
                <tr>
                    <td><?php echo htmlspecialchars($user['username'], ENT_QUOTES, 'UTF-8'); ?></td>
                    <td><?php echo htmlspecialchars($user['password'], ENT_QUOTES, 'UTF-8'); ?></td>
                    <td><?php echo htmlspecialchars($user['age'], ENT_QUOTES, 'UTF-8'); ?></td>
                    <td><?php echo htmlspecialchars($user['gender'], ENT_QUOTES, 'UTF-8'); ?></td>
                </tr>
            <?php endforeach; ?>
        </table>
    <?php else: ?>
        <p>没有找到用户数据。</p>
    <?php endif; ?>
</body>
</html>
