<?php
// 连接 Redis
$redis = new Redis();
$redis->connect('redis', 6379);

// 统计总访问次数
$redis->incr('page_views');

// 获取总访问次数
$totalViews = $redis->get('page_views');

echo "访问次数: " . $totalViews;
?>
