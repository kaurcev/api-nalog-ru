// server.js
const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/search', async (req, res) => {
  try {
    const { companyName } = req.body;

    if (!companyName) {
      return res.status(400).json({ error: 'Не указано название компании' });
    }

    const firstResponse = await fetch("https://egrul.nalog.ru/", {
      method: "POST",
      headers: {
        "accept": "application/json, text/javascript, */*; q=0.01",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "Referer": "https://egrul.nalog.ru/index.html"
      },
      body: `query=${encodeURIComponent(companyName)}&PreventChromeAutocomplete=`
    });

    if (!firstResponse.ok) {
      throw new Error(`Ошибка первого запроса: ${firstResponse.status}`);
    }

    const firstData = await firstResponse.json();

    if (firstData.captchaRequired) {
      return res.status(400).json({ error: 'Требуется captcha' });
    }

    const token = firstData.t;
    const timestamp = Date.now();
    
    const secondResponse = await fetch(
      `https://egrul.nalog.ru/search-result/${token}?r=${timestamp}&_=${timestamp}`,
      {
        headers: {
          "Referer": "https://egrul.nalog.ru/index.html"
        }
      }
    );

    if (!secondResponse.ok) {
      throw new Error(`Ошибка второго запроса: ${secondResponse.status}`);
    }

    const secondData = await secondResponse.json();
    res.json(secondData);

  } catch (error) {
    console.error('Ошибка:', error);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
});

app.get('/api/docs', (req, res) => {
  res.json({
    description: "API для поиска информации о компаниях через сервис egrul.nalog.ru",
    endpoints: {
      "POST /api/search": {
        description: "Поиск компаний по названию",
        parameters: {
          companyName: "Название компании (обязательный параметр)"
        },
        example: {
          request: "POST /api/search { companyName: 'Яндекс' }",
          response: "Данные из ЕГРЮЛ в формате JSON"
        }
      }
    }
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
  console.log(`Откройте http://localhost:${PORT} в браузере`);
});