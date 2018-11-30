

<?php

/*

$file_in=strval (file_get_contents("php://input")); 

$file_in=urldecode($file_in); */



//$file_in=file_get_contents("php://input"); 

$myfile =fopen("./cardata.json","r") or die("Unable to open file!");
fread($post_data,filesize($myfile));
fclose($myfile );

//初始化
$curl=curl_init();
//设置抓取的url
curl_setopt($curl, CURLOPT_URL, $url);
//设置post方式提交
curl_setopt($curl, CURLOPT_POST, 1);
//设置头文件的信息作为数据流输出
curl_setopt($curl, CURLOPT_HEADER, 0);
//设置获取的信息以文件流的形式返回，而不是直接输出。
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

curl_setopt($curl, CURLOPT_POSTFIELDS, $post_data);
//执行命令
$data=curl_exec($curl);
//关闭URL请求
curl_close($curl);
//显示获得的数据
echo $data;

?>


