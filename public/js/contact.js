document.addEventListener("DOMContentLoaded", function () {       
        document.getElementById("myForm").addEventListener("submit", (e) => {
            e.preventDefault();
            sendEmail();
            confirmEmail();
            successMessage();
        });

        function sendEmail() {
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const phone = document.getElementById("phone").value;
            const message = document.getElementById("message").value;


            Email.send({
                SecureToken : "6eeaebad-99d5-4bbe-b4dc-fffe9bbf9076",
                To: "prajins012@gmail.com",
                From: "prajins012@gmail.com",
                Subject: `USET - Query`,
                Body: `Name: ${name}<br>Email: ${email}<br>Phone: ${phone}<br>Message: ${message}`,
            }).then((message) => {});
        }

        function confirmEmail() {
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const phone = document.getElementById("phone").value;
            const message = document.getElementById("message").value;

               // Send a confirmation email to the user
               Email.send({
                SecureToken : "6eeaebad-99d5-4bbe-b4dc-fffe9bbf9076",
                To: email,
                From: "prajins012@gmail.com",
                Subject: `USET - Query Received`,
                Body: `Dear ${name},<br>We have received your message and will get back to you soon.<br>Thank you for contacting USET...`,
            }).then((message) => {});
        }

        function successMessage(){
            
                // Hide the form
                document.getElementById("disappear").style.display = "none";
                document.getElementById("disappear2").style.display = "none";
            
                // Display the success message
                document.getElementById("success-message").style.display = "block";
            
        }
    });