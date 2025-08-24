
    // 1) Считываем собранные данные
    const expertData = JSON.parse(sessionStorage.getItem('expertFishData')   || '{}');
    const location   = sessionStorage.getItem('selectedLocation')           || '';
    const user       = JSON.parse(sessionStorage.getItem('user')            || '{}');

    // 2) Заполняем поля на странице
    const fill = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.innerText = val;
    };
    fill('displayFishType',   expertData.fishType);
    fill('displaySeason',     expertData.season);
    fill('displayFishWeight', expertData.fishWeight);
    fill('displayFishLength', expertData.fishLength);
    fill('displayAmount',     expertData.amount);
    fill('displayCatchDate',  expertData.catchDate);
    fill('displayLocation',   location);

    const img = document.getElementById('displayPhoto');
    if (img && expertData.photoSrc) {
      img.src           = expertData.photoSrc;
      img.style.display = 'block';
    }

    // 3) ← Назад на describeFishExpert.html
    document.getElementById('backBtnReviewExpert')
      .addEventListener('click', () => {
        window.location.href = 'describeFishExpert.html';
      });

    // 4) ✔ Отправляем на сервер как «approved»
    document.getElementById('confirmBtnExpert')
      .addEventListener('click', async () => {
        
        const postBody = {
          user:     user.id,
          fishType:   expertData.fishType,
          season:     expertData.season,
          fishWeight: expertData.fishWeight,
          fishLength: expertData.fishLength,
          amount:     expertData.amount,
          catchDate:  expertData.catchDate,
          location: location,
          photoSrc:   expertData.photoSrc,
          status: 1 // всегда 1 для эксперта
        };
        try {
          const resp = await fetch('https://fishinmap.onrender.com/api/expert', {
            method:  'POST',
            headers: { 'Content-Type': 'application/json' },
            body:    JSON.stringify(postBody)
          });
          const result = await resp.json();
          if (!resp.ok) {
            alert(result.error || 'Failed to publish post.');
            return;
          }
          alert('Your expert post has been published!');
          window.location.href = 'FirstUserScrean.html';
        } catch (err) {
          console.error(err);
          alert('Network error. Please try again later.');
        }
      });
