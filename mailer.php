<?php
    // My modifications to mailer script from:
    // http://blog.teamtreehouse.com/create-ajax-contact-form
    // Added input sanitizing to prevent injection

    // Only process POST reqeusts.
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Get the form fields and remove whitespace.
        $name = strip_tags(trim($_POST["txtName"]));
        $name = str_replace(array("\r","\n"),array(" "," "),$name);                
        $email = filter_var(trim($_POST["txtEmail"]), FILTER_SANITIZE_EMAIL);  
        $mobile = strip_tags(trim($_POST["txtMobile"]));
        $guests = $_POST['cmbGuestsNumber'];

        $checkedEvents  = 'None';
        if(isset($_POST['events']) && is_array($_POST['events']) && count($_POST['events']) > 0){
            $checkedEvents = implode(', ', $_POST['events']);
        }
        $selectedEvents = $checkedEvents;

        // Check that data was sent to the mailer.
        if ( empty($name) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            // Set a 400 (bad request) response code and exit.
            http_response_code(400);
            echo "Oops! There was a problem with your submission. Please complete the form and try again.";
            exit;
        }

        // Set the recipient email address.
        $recipient = "rsvp@mathieujennifer.com";
        //$recipient = "joseph@merheb.net";

        // Set the email subject.
        $subject = "New reservation from $name";

        // Build the email content.
        $email_content = "Name: $name\n";
        $email_content .= "Email: $email\n";
        $email_content .= "Mobile: $mobile\n";
        $email_content .= "Guests: $guests\n";
        $email_content .= "Events: $selectedEvents";

        // Build the email headers.
        $email_headers = "From: $name <$email>";
        //$email_headers .= "Content-type: text/html";

        // Send a copy to the Applier  
        $email_headers2 = "From: $name <$recipient>";
       // $email_headers2 .= "Content-type: text/html";
        $recipient2 = $email;
        $subject2 = "Mathieu and Jennifer Wedding Reservation";
        
        $email_content2 .= "Dear $name, \n\n";
        $email_content2 .= "Your place is reserved! \n";
        $email_content2 .= "Thank you for being part of your happily ever after. \n\n";
        $email_content2 .= "We Hope you enjoy yourself and can't wait to see you! \n\n";
        $email_content2 .= "Love, \n";
        $email_content2 .= "Mathieu & Jennifer \n";
        $email_content2 .= "www.mathieujennifer.com";

        // Send the email.
        if (mail($recipient, $subject, $email_content, $email_headers, '-fno-reply@mathieujennifer.com')) {
            // Set a 200 (okay) response code.
            http_response_code(200);
            echo "Thank You! Your message has been sent.";

            // Send Copy to the applier
            mail($recipient2, $subject2, $email_content2, $email_headers2, '-fno-reply@mathieujennifer.com');
        } else {
            // Set a 500 (internal server error) response code.
            http_response_code(500);
            echo "Oops! Something went wrong and we couldn't send your message.";
        }

    } else {
        // Not a POST request, set a 403 (forbidden) response code.
        http_response_code(403);
        echo "There was a problem with your submission, please try again.";
    }
?>
