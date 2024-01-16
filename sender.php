<?php
    $name = $_POST['name'];
    $email = $_POST['email'];
    $text = $_POST['message'];

	$to = "nikita_bol_product@wwm.agency"; 
	$date = date ("d.m.Y"); 
	$time = date ("h:i");
	$from = $email;
	$subject = "Заявка c сайта";

	
	$msg="
    Name: $name /n
    email: $email /n
    Message: $text"; 	
	mail($to, $subject, $msg, "From: $from ");
?>
