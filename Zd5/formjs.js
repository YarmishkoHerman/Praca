function validateForm() {
    let isValid = true;

    // Clear previous errors
    document.querySelectorAll('.error').forEach(error => error.innerText = '');

    // Get form values
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();
    const companyName = document.getElementById('companyName').value.trim();
    const address = document.getElementById('address').value.trim();
    const nip = document.getElementById('nip').value.trim();

    // Validate firstName
    if (firstName === '') {
        document.getElementById('firstNameError').innerText = 'Imię jest wymagane.';
        isValid = false;
    }

    // Validate lastName
    if (lastName === '') {
        document.getElementById('lastNameError').innerText = 'Nazwisko jest wymagane.';
        isValid = false;
    }

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        document.getElementById('emailError').innerText = 'Podaj poprawny adres e-mail.';
        isValid = false;
    }

    // Validate password
    if (password.length < 8) {
        document.getElementById('passwordError').innerText = 'Hasło musi mieć co najmniej 8 znaków.';
        isValid = false;
    }

    // Validate confirmPassword
    if (password !== confirmPassword) {
        document.getElementById('confirmPasswordError').innerText = 'Hasła muszą być identyczne.';
        isValid = false;
    }

    // Validate companyName
    if (companyName === '') {
        document.getElementById('companyNameError').innerText = 'Nazwa firmy jest wymagana.';
        isValid = false;
    }

    // Validate address
    if (address === '') {
        document.getElementById('addressError').innerText = 'Adres jest wymagany.';
        isValid = false;
    }

    // Validate NIP
    const nipPattern = /^\d{10}$/;
    if (!nipPattern.test(nip)) {
        document.getElementById('nipError').innerText = 'NIP musi zawierać dokładnie 10 cyfr.';
        isValid = false;
    }

    // If valid, alert success
    if (isValid) {
        alert('Formularz został poprawnie wypełniony.');
    }

    return isValid;
}