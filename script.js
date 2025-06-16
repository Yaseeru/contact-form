const submitBtn = document.getElementById("submit-btn")
const firstName = document.getElementById("firstName")
const lastName = document.getElementById("lastName")
const email = document.getElementById("email")
const queryType = document.getElementsByName("query-type")
const message = document.getElementById("message")
const consent = document.getElementById("consent")
const successMessage = document.getElementById("success-message")

submitBtn.addEventListener("click", (e) => {
     e.preventDefault()

     let selectedQueryType = ""
     Array.from(queryType).forEach((type) => {
          if (type.checked) selectedQueryType = type.value
     })

     checkError(firstName, lastName, email, selectedQueryType, message, consent)
})

// Validate Email Format
function validateEmail(email) {
     return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

// Check Error
function checkError(fname, lname, email, type, message, consent) {
     // Remove previous error messages
     document.querySelectorAll(".error-message").forEach(el => el.remove())

     const showError = (input, message) => {
          const error = document.createElement("p")
          error.className = "error-message"
          input.parentElement.appendChild(error)
          error.textContent = message
     }

     let hasError = false

     if (!fname.value.trim()) {
          fname.classList.add("error")
          showError(fname, "This field is required.")
          hasError = true
     }

     if (!lname.value.trim()) {
          lname.classList.add("error")
          showError(lname, "This field is required.")
          hasError = true
     }

     if (!email.value.trim() || !validateEmail(email.value)) {
          email.classList.add('error')
          showError(email, "Please enter a valid email address.")
          hasError = true
     }

     if (!type) {
          const radioGroup = document.querySelector(".radio-input")?.parentElement || document.body
          const error = document.createElement("p")
          error.className = "error-message"
          error.textContent = "Please select a query type."
          radioGroup.appendChild(error)
          hasError = true
     }

     if (!message.value.trim()) {
          message.classList.add("error")
          showError(message, "This field is required.")
          hasError = true
     }

     if (!consent.checked) {
          const parentElement = consent.parentElement;
          const error = document.createElement("p");
          error.className = "error-message";
          error.textContent = "To submit this form, please consent to being contacted.";
          parentElement.insertAdjacentElement("afterend", error);
          hasError = true;
     }


     if (!hasError) {
          handleFormSubmission(fname, lname, email, type, message, consent)
     }
}

// handleFormSubmission
function handleFormSubmission(fname, lname, email, type, message, consent) {
     successMessage.classList.remove("hidden")
     successMessage.innerHTML = `
     <div class="success-icon">
     <img src="./assets/images/icon-success-check.svg" alt="icon-success" />
     <h3>Message Sent!</h3>
     </div>
     <p>Thank you for Completing the form. We will be in touch soon.</p>
     `
}
