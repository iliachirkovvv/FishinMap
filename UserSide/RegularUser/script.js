// === Обработка кнопки "Sign up" на главном экране (index.html) ===
const signupBtn = document.getElementById('signupBtn');
if (signupBtn) {
  signupBtn.addEventListener('click', function () {
    window.location.href = "signUpForUser.html";
  });
}

// === Обработка кнопки "Back" на экране регистрации (registerUser.html) ===
const backBtn = document.getElementById('backBtn');
if (backBtn) {
  backBtn.addEventListener('click', function () {
    window.location.href = "mainUserScrean.html";
  });
}

// === Обработка кнопки "Finish" на экране регистрации ===
const signupForm = document.getElementById('userSignupForm');
if (signupForm) {
  signupForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const password = document.querySelector('input[name="password"]').value;
    const verifyPassword = document.querySelector('input[name="verifyPassword"]').value;
    const errorDiv = document.getElementById('error');

    // Очистка предыдущих ошибок
    errorDiv.textContent = '';
    const errors = [];

    // Проверка пароля
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long.');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must include at least one uppercase letter.');
    }
    if (!/\d/.test(password)) {
      errors.push('Password must include at least one number.');
    }
    if (password !== verifyPassword) {
      errors.push('Passwords do not match.');
    }

    // Если есть ошибки — выводим их и останавливаем отправку
    if (errors.length > 0) {
      errorDiv.innerHTML = errors.join('<br>');
      return;
    }

    // Если всё хорошо — продолжаем как раньше
    const formData = new FormData(signupForm);
    const data = Object.fromEntries(formData);

    // 🚧 Здесь будет отправка на сервер
    console.log("User registration request:", data);

    alert("Your registration request has been sent to the admin for approval.");
  });
}