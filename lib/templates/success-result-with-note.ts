export const successResultWithNote = ({
  name,
  email,
  totalQuestions,
  attemptedQuestions,
  correctAnswers,
}: {
  name: string;
  email: string;
  totalQuestions: number;
  attemptedQuestions: number;
  correctAnswers: number;
}) => {
  return `<!DOCTYPE html>
<html>
  <head>
    <title>Student Result</title>
  </head>
  <body style="background-color: #f3f4f6; font-family: Arial, sans-serif; margin: 0; padding: 0">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
      <tr>
        <td align="center">
          <table
            role="presentation"
            width="600"
            cellspacing="0"
            cellpadding="20"
            border="0"
            style="background-color: white; border-radius: 10px; margin-top: 20px"
          >
            <tr>
              <td align="center">
                <h2 style="color: #10b981; margin-bottom: 10px">🎉 Congratulations ${name}!</h2>
                <p style="color: #374151">You have successfully completed the quiz. Here are your results:</p>
              </td>
            </tr>
            <tr>
              <td>
                <p style="color: #374151">
                  <strong>Note:</strong> Keep practicing to improve your score and enhance your skills!
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <table
                  width="100%"
                  cellspacing="0"
                  cellpadding="10"
                  border="1"
                  style="border-collapse: collapse; width: 100%; text-align: left"
                >
                  <tr style="background-color: #10b981; color: white">
                    <th style="padding: 10px">Total Questions</th>
                    <th style="padding: 10px">Attempted Questions</th>
                    <th style="padding: 10px">Correct Answers</th>
                  </tr>
                  <tr>
                    <td style="padding: 10px; color: #374151">${totalQuestions}</td>
                    <td style="padding: 10px; color: #374151">${attemptedQuestions}</td>
                    <td style="padding: 10px; color: #374151">${correctAnswers}</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding-top: 20px">
                <p style="color: #4b5563; font-size: 14px">Keep learning and growing! 🚀</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
};
