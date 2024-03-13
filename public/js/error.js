document.addEventListener('DOMContentLoaded', function () {
    const signupForm = document.getElementById('signup-form');
    const errorMessage = document.getElementById('error-message');
  
    signupForm.addEventListener('submit', async function (event) {
      event.preventDefault();
  
      // Retrieve form data
      const formData = new FormData(signupForm);
  
      // Send a POST request to the server
      try {
        const response = await fetch('/signup', {
          method: 'POST',
          body: formData,
        });
  
        if (response.status === 400) {
          // Display the error message sent by the server
          const data = await response.json();
          errorMessage.textContent = data.message;
        } else {
          // Handle other error cases if needed
          errorMessage.textContent = 'An error occurred.';
        }
      } catch (error) {
        console.error(error);
        errorMessage.textContent = 'An error occurred.';
      }
    });
  });
  