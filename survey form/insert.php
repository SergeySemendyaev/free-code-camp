<?php

$username='unaux_22234618';
$password='v4wd768sybih';
$database='unaux_22234618_survey_results';

$sex=$_POST['sex'];
$name=$_POST['name'];
$email=$_POST['email'];
$age=$_POST['age'];
$level=$_POST['level'];
$text=$_POST['text'];

mysql_connect('sql300.unaux.com',$username,$password);
@mysql_select_db($database) or die( "Unable to select database");

$query = "INSERT INTO survey_results VALUES ('','$sex','$name','$email','$age','$level','$text')";
mysql_query($query);

mysql_close();

echo 'form submitted';
?>