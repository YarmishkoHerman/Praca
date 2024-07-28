function validateForm() {
    var isValid = true;

    // Pobieranie elementów
    var firstName = document.getElementById("firstName");

    var lastName = document.getElementById("lastName");

    var email = document.getElementById("email");

    var password = document.getElementById("password");

    var confirmPassword = document.getElementById("confirmPassword");

    var companyName = document.getElementById("companyName");

    var address = document.getElementById("address");

    var nip = document.getElementById("nip");

    // Resetowanie błędów
    var errors = document.querySelectorAll('.error');
    errors.forEach(function(errorElement) {
        errorElement.style.display = 'none';
    });

    // Walidacja Imię
    if (firstName.value.trim() === "") {
        document.getElementById("firstNameError").style.display = 'block';
        isValid = false;
    }

    // Walidacja Nazwisko
    if (lastName.value.trim() === "") {
        document.getElementById("lastNameError").style.display = 'block';
        isValid = false;
    }

    // Walidacja e-mail
    var emailpattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailpattern.test(email.value.trim())) {
        document.getElementById("emailError").style.display = 'block';
        isValid = false;
    }

    // Walidacja hasła
    if (password.value.length < 8) {
        document.getElementById("passwordError").style.display = 'block';
        isValid = false;
    }

    // Walidacja powtórzenia hasła
    if (password.value !== confirmPassword.value) {
        document.getElementById("confirmPasswordError").style.display = 'block';
        isValid = false;
    }

    // Walidacja nazwy firmy
    if (companyName.value.trim() === "") {
        document.getElementById("companyNameError").style.display = 'block';
        isValid = false;
    }

    // Walidacja adresu
    if (address.value.trim() === "") {
        document.getElementById("addressError").style.display = 'block';
        isValid = false;
    }

    // Walidacja NIP
    var nipPattern = /^\d{10}$/;
    if (!nipPattern.test(nip.value.trim())) {
        document.getElementById("nipError").style.display = 'block';
        isValid = false;
    }

    // Jeżeli formularz jest poprawny, wyświetl alert
    if (isValid) {
        alert("Formularz został wypełniony poprawnie.");
    }
}
