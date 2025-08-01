
    const data     = JSON.parse(sessionStorage.getItem('fishData')       || '{}');
    const savedLoc = sessionStorage.getItem('selectedLocation')         || '';

    // 2) Заполняем поля
    const el = id => document.getElementById(id);
    if (el('displayFishType'))   el('displayFishType').innerText   = data.fishType   || '';
    if (el('displayFishWeight')) el('displayFishWeight').innerText = data.fishWeight || '';
    if (el('displayFishLength')) el('displayFishLength').innerText = data.fishLength || '';
    if (el('displayCatchDate'))  el('displayCatchDate').innerText  = data.catchDate  || '';
    if (el('displayLocation'))   el('displayLocation').innerText   = savedLoc;

    // 3) Показываем фото‑превью
    const img = el('displayPhoto');
    if (img && data.photoSrc) {
      img.src           = data.photoSrc;
      img.style.display = 'block';
    }

    // 4) ← Назад на describeFish.html
    const backBtn = el('backBtnReview');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        window.location.href = 'describeFish.html';
      });
    }

    // 5) ✔ Отправляем на сервер, alert и возвращаем на главный экран
const confirmBtn = el('confirmBtn');
if (confirmBtn) {
  confirmBtn.addEventListener('click', async () => {
    // 1) Берём залогиненного пользователя из sessionStorage
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    if (!user.id) {
      alert('User not logged in');
      return;
    }

    // 2) Собираем тело запроса
    const postBody = {
      user:     user.id,        // поле user в БД
      fishType:   data.fishType,
      fishWeight: data.fishWeight,
      fishLength: data.fishLength,
      catchDate:  data.catchDate,
      photoSrc:   data.photoSrc,
      location:   savedLoc
    };

    try {
      // 3) POST /api/posts
      const resp = await fetch('https://fishinmap.onrender.com/api/posts', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(postBody)
      });
      const result = await resp.json();

      // 4) Если сервер вернул ошибку
      if (!resp.ok) {
        alert(result.error || 'Failed to send post');
        return;
      }

      // 5) Успех
      alert('Your post has been sent to the admin for review.');
      window.location.href = 'FirstUserScrean.html';

    } catch (err) {
      console.error('Error sending post:', err);
      alert('Network error, please try later.');
    }
  });
}