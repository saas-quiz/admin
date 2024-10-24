export const forgotPasswordTemplate = (url: string, name: string) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Forgot Password</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }

        .email-container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        h2 {
            text-align: center;
            color: #333333;
        }

        p {
            color: #666666;
            line-height: 1.6;
        }

        .button {
            display: block;
            width: 200px;
            margin: 20px auto;
            padding: 10px 0;
            text-align: center;
            background-color: #007BFF;
            text-decoration: none;
            border-radius: 5px;
        }

        .footer {
            margin-top: 30px;
            text-align: center;
            color: #999999;
            font-size: 12px;
        }

    </style>
</head>
<body>
    <div class="email-container">
        <h2>Reset Your Password</h2>
        <p>Hello,</p>
        <p>We received a request to reset your password. Click the button below to reset it:</p>
        <a href="${url}" style="color:white;" class="button">Reset Password</a>
        <p>If you did not request a password reset, please ignore this email.</p>
        <p>Thank you,<br>${name}</p>
        <div class="footer">
            &copy; 2024 ${name}. All rights reserved.
        </div>
    </div>
</body>
</html>
`;
};
