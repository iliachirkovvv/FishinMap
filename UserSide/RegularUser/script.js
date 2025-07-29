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
  const passwordInput = document.querySelector('input[name="password"]');
  const verifyPasswordInput = document.querySelector('input[name="verifyPassword"]');
  const errorDiv = document.getElementById('error');

  // Очистка ошибок при вводе
  [passwordInput, verifyPasswordInput].forEach(input => {
    input.addEventListener('input', () => {
      errorDiv.textContent = '';
    });
  });

  signupForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const password = passwordInput.value;
    const verifyPassword = verifyPasswordInput.value;

    // Проверка пароля — одна ошибка за раз
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
// отпарвка на сервер

    console.log("User registration request:", data);
    alert("Your registration request has been sent to the admin for approval.");
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

// === Обработка логина на экране входа (index.html) ===
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const errorDiv = document.getElementById('loginError'); // <div id="loginError"></div> должен быть в HTML

  // Убираем ошибку при любом вводе
  [usernameInput, passwordInput].forEach(input => {
    input.addEventListener('input', () => {
      if (errorDiv) errorDiv.textContent = '';
    });
  });

  loginForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    try {
      const response = await fetch('user.json');
      const user = await response.json();

      if (username === user.username && password === user.password) {
        window.location.href = 'FirstUserScrean.html';
      } else {
        if (errorDiv) {
          errorDiv.textContent = 'Incorrect username or password.';
        } else {
          alert('Incorrect username or password.');
        }
      }
    } catch (err) {
      console.error('Login error:', err);
      if (errorDiv) {
        errorDiv.textContent = 'Incorrect username or password.';
      } else {
        alert('Incorrect username or password.');
      }
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

  // Кнопка Вперёд (стрелка)
  const nextMapBtn = document.getElementById('nextMapBtn');
  if (nextMapBtn) {
    nextMapBtn.addEventListener('click', () => {
      window.location.href = 'describeFish.html';
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const fishBtn = document.getElementById('fishBtn');
  if (fishBtn) {
    // при переходе на новый экран — ставим активный стиль
    fishBtn.classList.add('active');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const page = window.location.pathname.split('/').pop();

  // === Экран добавления информации о рыбке (describeFish.html) ===
  if (page === 'describeFish.html') {
    // 1) Подсветить рыбку чёрным, но отключить у неё навигацию
    const fishBtn = document.getElementById('fishBtn');
    if (fishBtn) {
      fishBtn.classList.add('active');
      fishBtn.addEventListener('click', e => {
        e.preventDefault();
        e.stopImmediatePropagation();
      }, true);
    }

    // 2) Стрелка влево возвращает на экран выбора локации
    const backBtnFish = document.getElementById('backBtnFish');
    if (backBtnFish) {
      backBtnFish.addEventListener('click', () => {
        window.location.href = 'selectLocation.html';
      });
    }

    // 3) Стрелка вправо в будущем поведёт на следующий экран
    const nextBtnFish = document.getElementById('nextBtnFish');
    if (nextBtnFish) {
      nextBtnFish.addEventListener('click', () => {
        // TODO: заменить 'nextScreen.html' на реальный путь следующего экрана
        window.location.href = 'nextScreen.html';
      });
    }
  }
});

document.getElementById('selectImage').addEventListener('click', () => {
  document.getElementById('fishPhoto').click();
});

// показываем превью
document.getElementById('fishPhoto').addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    const img = document.getElementById('photoPreview');
    img.src = ev.target.result;
    img.style.display = 'block';
  };
  reader.readAsDataURL(file);
});
