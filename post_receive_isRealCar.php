

<?php

/*

$file_in=strval (file_get_contents("php://input")); 

$file_in=urldecode($file_in); */



$file_in=file_get_contents("php://input"); 

$myfile =fopen("125.219.44.17/isRealCar.json","w") or die("Unable to open file!");

fwrite($myfile ,$file_in);

fclose($myfile );

echo "保存成功";

?>


