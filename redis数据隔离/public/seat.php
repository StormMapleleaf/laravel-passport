<?php
// 使用setbit seats 座位号 值 来设置座位状态
$redis = new Redis();
$redis->connect('redis', 6379);

// 统计总访问次数
$redis->incr('page_views');

// 获取总访问次数
$totalViews = $redis->get('page_views');

echo "访问次数: " . $totalViews;
// 获取座位状态
$seatStatus = [];
for ($i = 0; $i < 100; $i++) {
    $seatStatus[$i] = $redis->getBit('seats', $i);
}

// 生成座位图
header('Content-Type: text/html; charset=utf-8');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>座位图</title>
    <style>
        #seat-container {
            display: grid;
            grid-template-columns: repeat(10, 30px);
            grid-template-rows: repeat(10, 30px);
            gap: 5px;
        }
        .seat {
            width: 30px;
            height: 30px;
            border: 1px solid #ccc;
            background-color: #0f0; /* 默认绿色表示未出售 */
        }
        .seat.sold {
            background-color: #f00; /* 红色表示已出售 */
        }
    </style>
</head>
<body>
    <h1>座位图</h1>
    <div id="seat-container">
        <?php foreach ($seatStatus as $status): ?>
            <div class="seat <?php echo $status ? 'sold' : ''; ?>"></div>
        <?php endforeach; ?>
    </div>
</body>
</html>
