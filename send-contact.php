<?php
/**
 * SentinelCore Technologies - Secure Contact Form Handler (Hostinger Compatible)
 * Usage: Place in the public_html directory with index.html.
 * Adjust $recipient_email below to your business address.
 */

// 1. Strict Security Headers
header("X-Content-Type-Options: nosniff");
header("X-Frame-Options: DENY");
header("Content-Type: application/json; charset=UTF-8");

// Allow only POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Method Not Allowed. Only POST submissions are accepted."]);
    exit;
}

// 2. Configuration
// REPLACE THIS with your actual company mailbox hosted on Hostinger:
$recipient_email = "contact@sentinelcore.local"; 
$email_subject_prefix = "[Website Inquiry - SentinelCore]";

// 3. Honeypot Anti-Spam Check
// If the hidden 'website_url' field is filled, it was submitted by an automated bot
if (!empty($_POST['website_url'])) {
    http_response_code(200);
    echo json_encode(["status" => "success", "message" => "Thank you for reaching out."]);
    exit;
}

// 4. Sanitize and Extract Inputs
$full_name      = filter_input(INPUT_POST, 'fullName', FILTER_SANITIZE_SPECIAL_CHARS);
$business_email = filter_input(INPUT_POST, 'businessEmail', FILTER_SANITIZE_EMAIL);
$company_name   = filter_input(INPUT_POST, 'companyName', FILTER_SANITIZE_SPECIAL_CHARS);
$service_select = filter_input(INPUT_POST, 'serviceSelect', FILTER_SANITIZE_SPECIAL_CHARS);
$raw_message    = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_SPECIAL_CHARS);

// 5. Validation
$errors = [];

if (empty($full_name) || mb_strlen(trim($full_name)) < 2) {
    $errors[] = "Please provide your full name (minimum 2 characters).";
}

if (empty($business_email) || !filter_var($business_email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = "Please provide a valid business email address.";
}

if (empty($service_select)) {
    $errors[] = "Please select a service of interest.";
}

if (empty($raw_message) || mb_strlen(trim($raw_message)) < 15) {
    $errors[] = "Please provide a message outlining your requirements (minimum 15 characters).";
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(["status" => "error", "errors" => $errors]);
    exit;
}

// 6. Assemble Email Body
$email_subject = "{$email_subject_prefix} New Inquiry from {$full_name}";

$body  = "======================================================\n";
$body .= "SENTINELCORE TECHNOLOGIES - NEW CONTACT INQUIRY\n";
$body .= "======================================================\n\n";
$body .= "Full Name:       " . trim($full_name) . "\n";
$body .= "Business Email:  " . trim($business_email) . "\n";
$body .= "Company Name:    " . (!empty($company_name) ? trim($company_name) : "Not Specified") . "\n";
$body .= "Service Focus:   " . trim($service_select) . "\n";
$body .= "Submission Time: " . date("Y-m-d H:i:s T") . "\n";
$body .= "IP Address:      " . ($_SERVER['REMOTE_ADDR'] ?? 'Unknown') . "\n\n";
$body .= "Message Requirements:\n";
$body .= "------------------------------------------------------\n";
$body .= trim($raw_message) . "\n";
$body .= "======================================================\n";

// 7. Email Headers
$headers   = [];
$headers[] = "From: SentinelCore Web <noreply@" . ($_SERVER['SERVER_NAME'] ?? 'localhost') . ">";
$headers[] = "Reply-To: " . trim($business_email);
$headers[] = "X-Mailer: PHP/" . phpversion();
$headers[] = "MIME-Version: 1.0";
$headers[] = "Content-Type: text/plain; charset=UTF-8";

// 8. Dispatch Mail via PHP mail()
$mail_sent = @mail($recipient_email, $email_subject, $body, implode("\r\n", $headers));

if ($mail_sent) {
    http_response_code(200);
    echo json_encode([
        "status" => "success",
        "message" => "Your inquiry has been successfully transmitted. Our security team will review your requirements and respond promptly."
    ]);
} else {
    // Note: If local mail transfer agent is not configured, inform the user cleanly
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Unable to transmit email via the server mail agent. Please verify SMTP configuration in Hostinger hPanel."
    ]);
}
?>
