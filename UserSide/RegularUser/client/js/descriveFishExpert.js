
    // 1) Подсветить рыбку и отключить её навигацию
    const fishBtn = document.getElementById('fishBtn');
    if (fishBtn) {
      fishBtn.classList.add('active');
      fishBtn.addEventListener('click', e => {
        e.preventDefault();
        e.stopImmediatePropagation();
      }, true);
    }

    // 2) ← Назад на selectLocation.html
    const backExpert = document.getElementById('backBtnExpert');
    if (backExpert) {
      backExpert.addEventListener('click', () => {
        window.location.href = 'selectLocation.html';
      });
    }

    // 3) → Сбор полей эксперта и переход на reviewPostExpert.html
    const nextExpert = document.getElementById('nextBtnExpert');
    if (nextExpert) {
      nextExpert.addEventListener('click', () => {
        // читаем значения всех полей эксперта:
        const fishType   = document.querySelector('input[name="fishType"]').value;
        const season     = document.querySelector('input[name="Season"]').value;
        const fishWeight = document.querySelector('input[name="fishWeight"]').value;
        const fishLength = document.querySelector('input[name="fishLength"]').value;
        const amount     = document.querySelector('input[name="Amount"]').value;
        const catchDate  = document.querySelector('input[name="catchDate"]').value;

        // фото (если нужно, по аналогии с обычной страницей)
        const photoPreview = document.getElementById('photoPreview');
        const photoSrc     = photoPreview && photoPreview.src ? photoPreview.src : '';

        // сохраняем в sessionStorage
        const expertData = {
          fishType,
          season,
          fishWeight,
          fishLength,
          amount,
          catchDate,
          photoSrc
        };
        sessionStorage.setItem('expertFishData', JSON.stringify(expertData));

        // и переходим на экран проверки поста экспертом
        window.location.href = 'reviewPostExpert.html';
      });
    }