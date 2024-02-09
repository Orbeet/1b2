<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require "phpmailer/src/Exception.php";
    require "phpmailer/src/PHPMailer.php";

    $mail = new PHPMailer(true);
    $mail->CharSet = "UTF-8";
    $mail->setLanguage('en', 'phpmailer/language');
    $mail->IsHTML(true);

    // от кого письмо
    $mail->setFrom('nikita_bol_product@wwm.agency', '1xbet-affiliates.com');
    // кому отправить
    $mail->addAddress('nikita_bol_product@wwm.agency');
    // Тема письма
    $mail->Subject = 'Hi, this is "1xbet-affiliates.com"';
    // тело письма
    $body = '<h1>1xbet-affiliates.com</h1>';

    if(trim(!empty($_POST['name']))){
        $body.='<p><strong>Name:</strong> '.$_POST['name'].'</p>';
    }
    if(trim(!empty($_POST['email']))){
        $body.='<p><strong>E-mail:</strong> '.$_POST['email'].'</p>';
    }
    if(trim(!empty($_POST['message']))){
        $body.='<p><strong>Message:</strong> '.$_POST['message'].'</p>';
    }


    $mail->Body = $body;

    // отправляем
    if (!$mail->send()) {
        $message = 'Error';
    } else {
        $message = 'Thank you! Form has been sent!';
    }

    $response = ['message' => $message];

    header('Content-type: application/json');
    echo json_encode($response);
?>    
    
    