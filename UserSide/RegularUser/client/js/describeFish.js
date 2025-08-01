
    // 1) Подсветить рыбку чёрным, но отключить у неё навигацию
    const fishBtn = document.getElementById('fishBtn');
    if (fishBtn) {
      fishBtn.classList.add('active');
      fishBtn.addEventListener('click', e => {
        e.preventDefault();
        e.stopImmediatePropagation();
      }, true);
    }

        // === Превью фото на describeFish.html ===
    const selectImageBtn = document.getElementById('selectImage');
    const fishPhotoInput = document.getElementById('fishPhoto');
    const photoPreview   = document.getElementById('photoPreview');

    if (selectImageBtn && fishPhotoInput && photoPreview) {
      // Открываем диалог выбора файла
      selectImageBtn.addEventListener('click', () => {
        fishPhotoInput.click();
      });

      // Когда файл выбран — читаем и показываем
      fishPhotoInput.addEventListener('change', e => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = ev => {
          photoPreview.src           = ev.target.result;
          photoPreview.style.display = 'block';
        };
        reader.readAsDataURL(file);
      });
    }


    // 2) Стрелка влево возвращает на экран выбора локации
    const backBtnFish = document.getElementById('backBtnFish');
    if (backBtnFish) {
      backBtnFish.addEventListener('click', () => {
        window.location.href = 'selectLocation.html';
      });
    }

   // 3) Стрелка вправо — собирает данные и переходит на экран проверки
    const nextBtnFish = document.getElementById('nextBtnFish');
    if (nextBtnFish) {
      nextBtnFish.addEventListener('click', () => {
        // Собираем значения полей
        const fishType   = document.querySelector('input[name="fishType"]').value;
        const fishWeight = document.querySelector('input[name="fishWeight"]').value;
        const fishLength = document.querySelector('input[name="fishLength"]').value;
        const catchDate  = document.getElementById('catchDate').value;
        // берём src превью (или пустую строку)
        const photoPreview = document.getElementById('photoPreview');
        const photoSrc     = photoPreview && photoPreview.src ? photoPreview.src : '';

        // Сохраняем всё в sessionStorage
        sessionStorage.setItem('fishData', JSON.stringify({fishType,fishWeight,fishLength,catchDate,photoSrc}));

        // Переходим на экран проверки
        window.location.href = 'reviewPost.html';
      });
    }