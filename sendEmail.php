<?php
//echo "hi email";
$to = "lareye.bd@gmail.com, bdnath.lict@gmail.com";
$senderEmail=$_POST['email'];
$subject =$_POST['subject'];
$message =$_POST['emailBody'];

// Always set content-type when sending HTML email
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

// More headers
$headers .= 'From: <'.$senderEmail.'>' . "\r\n";
$headers .= 'Cc: example@sdr.com' . "\r\n";
$send=mail($to,$subject,$message,$headers);
if($send==true){
	//echo "<script>alert('Email sended!');</script>";
	header('location:index.html');
}else{
	//echo "<script>alert('Email not sended!');</script>";
	header('location:index.html');
}
?>
