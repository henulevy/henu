

<?php

/*

$file_in=strval (file_get_contents("php://input")); 

$file_in=urldecode($file_in); */



$file_in=file_get_contents("php://input"); 

$myfile =fopen("./realCarGPSData.json","a") or die("Unable to open file!");
//realCarGPSData
fwrite($myfile ,$file_in);

fclose($myfile );

echo "保存成功";

?>


