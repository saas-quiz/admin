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
            style="background-color: white; border-radius: 10px; margin: 10px"
          >
            <!-- Congratulations Section -->
            <tr>
              <td align="center">
                <h2 style="color: #10b981; margin-bottom: 10px">🎉 Congratulations ${name}!</h2>
                <p style="color: #374151">You have successfully completed Level 1 of the quiz. Here are your results:</p>
              </td>
            </tr>

            <!-- Result Summary Table -->
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

            <!-- Achievements Section -->
            <tr>
              <td>
                <h3 style="color: #10b981">Your Achievements 🎖</h3>
                <ul style="color: #374151; padding-left: 20px">
                  <li>✅ You have qualified for <b>Level 2</b></li>
                  <li>📜 You have earned an <b>E-Certificate</b></li>
                  <li>🎓 You are eligible for a <b>Scholarship up to 20%</b> on job-oriented courses</li>
                </ul>
              </td>
            </tr>

            <!-- Next Level Quiz Details -->
            <tr>
              <td>
                <h3 style="color: #10b981">📅 Next Level Quiz Details</h3>
                <p style="color: #374151">The <b>Level 2 Quiz</b> will be conducted at our institute on:</p>
                <ul style="color: #374151; padding-left: 20px">
                  <li><strong>Date:</strong> 28th February, Friday</li>
                  <li><strong>Slots Available:</strong> 2:00 - 3:00 PM | 3:00 - 4:00 PM</li>
                  <li><strong>Exam Duration:</strong> 1 Hour</li>
                </ul>
              </td>
            </tr>

            <!-- Call to Action -->
            <!-- <tr>
              <td align="center">
                <a
                  href="#"
                  style="
                    display: inline-block;
                    background-color: #10b981;
                    color: white;
                    padding: 10px 20px;
                    text-decoration: none;
                    border-radius: 5px;
                    font-size: 16px;
                  "
                  >Prepare for Level 2</a
                >
              </td>
            </tr> -->

            <!-- Contact Information -->
            <tr>
              <td align="center">
                <h3 style="color: #10b981">📍 Our Location</h3>
                <p style="color: #374151; font-size: 14px">
                  A-1, Deendayal Nagar Phase-1, Kanth Road near Sugandh Sweet, Moradabad
                  <br />
                  <br />
                  📞 Phone:
                  <a href="tel:+917906528421" style="color: #10b981; text-decoration: none">+91-7906528421</a>
                </p>
              </td>
            </tr>

            <!-- Social Media Links -->
            <tr>
              <td align="center">
                <h3 style="color: #10b981">Follow Us</h3>
                <p>
                  <a href="https://www.facebook.com/excellingtechnologies" style="margin: 0 10px"
                    ><img src="https://img.icons8.com/color/30/facebook.png" alt="Facebook"
                  /></a>
                  <a href="https://www.youtube.com/@excellingtechnologies" style="margin: 0 10px"
                    ><img src="https://img.icons8.com/color/30/youtube.png" alt="Youtube"
                  /></a>
                  <a href="https://instagram.com/excellingtechnologies?igshid=NTA5ZTk1NTc=" style="margin: 0 10px"
                    ><img src="https://img.icons8.com/color/30/instagram-new.png" alt="Instagram"
                  /></a>
                  <a href="https://www.linkedin.com/in/excelling-technologies-a75572170" style="margin: 0 10px"
                    ><img src="https://img.icons8.com/color/30/linkedin.png" alt="LinkedIn"
                  /></a>
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td align="center" style="padding-top: 20px">
                <p style="color: #4b5563; font-size: 14px">Keep learning and growing! 🚀</p>
                <p style="color: #4b5563; font-size: 12px">&copy; 2025 Excelling Technologies. All rights reserved.</p>
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
