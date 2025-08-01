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
    window.location.href = "index.html";
  });
}

const signupForm = document.getElementById('userSignupForm');
if (signupForm) {
  const passwordInput        = document.querySelector('input[name="password"]');
  const verifyPasswordInput  = document.querySelector('input[name="verifyPassword"]');
  const errorDiv             = document.getElementById('error');

  // Очистка ошибок при вводе
  [passwordInput, verifyPasswordInput].forEach(input => {
    input.addEventListener('input', () => {
      errorDiv.textContent = '';
    });
  });

  signupForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const password = passwordInput.value;
    const verifyPassword = verifyPasswordInput.value;

    // Проверка пароля
    if (password.length < 8) {
      errorDiv.textContent = 'Password must be at least 8 characters long.';
      return;
    }
    if (!/[A-Z]/.test(password)) {
      errorDiv.textContent = 'Password must include at least one uppercase letter.';
      return;
    }
    if (!/\d/.test(password)) {
      errorDiv.textContent = 'Password must include at least one number.';
      return;
    }
    if (password !== verifyPassword) {
      errorDiv.textContent = 'Passwords do not match.';
      return;
    }

    // Всё в порядке — отправка данных
    const formData = new FormData(signupForm);
    const data = Object.fromEntries(formData);

    // Remove verifyPassword from data before sending
    delete data.verifyPassword;

    try {
      const resp = await fetch('https://fishinmap.onrender.com/api/auth/signup', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(data)
      });
      const result = await resp.json();

      if (!resp.ok) {
        // Покажи ошибку сервера
        errorDiv.textContent = result.error || 'Registration failed.';
        return;
      }

      // Успешно!
      alert("Your registration request has been sent to the admin for approval.");
      window.location.href = "index.html";

    } catch (err) {
      errorDiv.textContent = 'Network/server error, please try again.';
      console.error('Signup error:', err);
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const iconGroup = document.getElementById('sideIcons');

  if (hamburgerBtn && iconGroup) {
    hamburgerBtn.addEventListener('click', () => {
      iconGroup.classList.toggle('active');
    });
  }
});

// login
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  const emailInput    = document.getElementById('username');  // переименовал на email
  const passwordInput = document.getElementById('password');
  const errorDiv      = document.getElementById('loginError');

  // Сбросим ошибку при любом вводе
  [emailInput, passwordInput].forEach(i =>
    i.addEventListener('input', () => { if (errorDiv) errorDiv.textContent = ''; })
  );

  loginForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const email    = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
      if (errorDiv) errorDiv.textContent = 'Please enter email and password.';
      return;
    }

    try {
      const resp = await fetch('https://fishinmap.onrender.com/api/auth/login', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email, password })
      });

      const result = await resp.json();

      if (!resp.ok) {
        // 400 / 401 / 500
        if (errorDiv) errorDiv.textContent = result.error || 'Login failed';
        return;
      }

      // Успешный логин
      // Сохраним данные пользователя, если нужно
      sessionStorage.setItem('user', JSON.stringify(result.user));

      // Перейдём на главный экран
      window.location.href = 'FirstUserScrean.html';

    } catch (err) {
      console.error('Login error:', err);
      if (errorDiv) errorDiv.textContent = 'Network error, please try later.';
    }
  });
}

// === Переход на экран выбора локации по нажатию на рыбку ===
const fishBtnMain = document.getElementById('fishBtn');
if (fishBtnMain) {
  fishBtnMain.addEventListener('click', () => {
    window.location.href = 'selectLocation.html';
  });
}

// === Логика на selectLocation.html ===
document.addEventListener('DOMContentLoaded', () => {
  // Подсветить рыбку
  const fishBtn = document.getElementById('fishBtn');
  if (fishBtn) {
    fishBtn.classList.add('active');
  }

  // Кнопка Назад (крестик)
  const backMapBtn = document.getElementById('backMapBtn');
  if (backMapBtn) {
    backMapBtn.addEventListener('click', () => {
      window.location.href = 'FirstUserScrean.html';
    });
  }

  const nextMapBtn = document.getElementById('nextMapBtn');
  if (nextMapBtn) {
    nextMapBtn.addEventListener('click', () => {
      // 1) Читаем текущее значение поля локации
      const locationValue = document.querySelector('input[name="location"]').value;
      // 2) Сохраняем в sessionStorage
      sessionStorage.setItem('selectedLocation', locationValue);
      // 3) Решаем, куда идти дальше: обычный или эксперт-экран
     const user = JSON.parse(sessionStorage.getItem('user') || '{}');
     const nextScreen = (user.rank >= 4)
      ? 'describeFishExpert.html'   // эксперт видит свой экран
      : 'describeFish.html';        // обычный пользователь
     window.location.href = nextScreen;
      
    });
  }
});

