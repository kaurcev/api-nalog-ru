import React, { useState } from 'react';

const ApiDocs = () => {
  const [activeTab, setActiveTab] = useState('search');

  const regions = [
    { code: '', name: 'Все регионы' },
    { code: '77', name: 'Москва' },
    { code: '78', name: 'Санкт-Петербург' },
    { code: '01', name: 'Республика Адыгея' },
    { code: '02', name: 'Республика Башкортостан' },
    { code: '03', name: 'Республика Бурятия' },
    { code: '04', name: 'Республика Алтай' },
    { code: '05', name: 'Республика Дагестан' },
    { code: '06', name: 'Республика Ингушетия' },
    { code: '07', name: 'Республика Кабардино-Балкария' },
    { code: '08', name: 'Республика Калмыкия' },
    { code: '09', name: 'Республика Карачаево-Черкесия' },
    { code: '10', name: 'Республика Карелия' },
    { code: '11', name: 'Республика Коми' },
    { code: '12', name: 'Республика Марий Эл' },
    { code: '13', name: 'Республика Мордовия' },
    { code: '14', name: 'Республика Саха (Якутия)' },
    { code: '15', name: 'Республика Северная Осетия-Алания' },
    { code: '16', name: 'Республика Татарстан' },
    { code: '17', name: 'Республика Тыва' },
    { code: '18', name: 'Республика Удмуртия' },
    { code: '19', name: 'Республика Хакасия' },
    { code: '20', name: 'Чеченская Республика' },
    { code: '21', name: 'Чувашская Республика' },
    { code: '22', name: 'Алтайский край' },
    { code: '23', name: 'Краснодарский край' },
    { code: '24', name: 'Красноярский край' },
    { code: '25', name: 'Приморский край' },
    { code: '26', name: 'Ставропольский край' },
    { code: '27', name: 'Хабаровский край' },
    { code: '28', name: 'Амурская область' },
    { code: '29', name: 'Архангельская область' },
    { code: '30', name: 'Астраханская область' },
    { code: '31', name: 'Белгородская область' },
    { code: '32', name: 'Брянская область' },
    { code: '33', name: 'Владимирская область' },
    { code: '34', name: 'Волгоградская область' },
    { code: '35', name: 'Вологодская область' },
    { code: '36', name: 'Воронежская область' },
    { code: '37', name: 'Ивановская область' },
    { code: '38', name: 'Иркутская область' },
    { code: '39', name: 'Калининградская область' },
    { code: '40', name: 'Калужская область' },
    { code: '41', name: 'Камчатский край' },
    { code: '42', name: 'Кемеровская область' },
    { code: '43', name: 'Кировская область' },
    { code: '44', name: 'Костромская область' },
    { code: '45', name: 'Курганская область' },
    { code: '46', name: 'Курская область' },
    { code: '47', name: 'Ленинградская область' },
    { code: '48', name: 'Липецкая область' },
    { code: '49', name: 'Магаданская область' },
    { code: '50', name: 'Московская область' },
    { code: '51', name: 'Мурманская область' },
    { code: '52', name: 'Нижегородская область' },
    { code: '53', name: 'Новгородская область' },
    { code: '54', name: 'Новосибирская область' },
    { code: '55', name: 'Омская область' },
    { code: '56', name: 'Оренбургская область' },
    { code: '57', name: 'Орловская область' },
    { code: '58', name: 'Пензенская область' },
    { code: '59', name: 'Пермский край' },
    { code: '60', name: 'Псковская область' },
    { code: '61', name: 'Ростовская область' },
    { code: '62', name: 'Рязанская область' },
    { code: '63', name: 'Самарская область' },
    { code: '64', name: 'Саратовская область' },
    { code: '65', name: 'Сахалинская область' },
    { code: '66', name: 'Свердловская область' },
    { code: '67', name: 'Смоленская область' },
    { code: '68', name: 'Тамбовская область' },
    { code: '69', name: 'Тверская область' },
    { code: '70', name: 'Томская область' },
    { code: '71', name: 'Тульская область' },
    { code: '72', name: 'Тюменская область' },
    { code: '73', name: 'Ульяновская область' },
    { code: '74', name: 'Челябинская область' },
    { code: '75', name: 'Забайкальский край' },
    { code: '76', name: 'Ярославская область' },
    { code: '79', name: 'Еврейская автономная область' },
    { code: '83', name: 'Ненецкий автономный округ' },
    { code: '86', name: 'Ханты-Мансийский автономный округ' },
    { code: '87', name: 'Чукотский автономный округ' },
    { code: '89', name: 'Ямало-Ненецкий автономный округ' },
    { code: '91', name: 'Республика Крым' },
    { code: '92', name: 'Севастополь' },
    { code: '95', name: 'Чеченская Республика' }
  ];

  return (
    <div>
      <h2>Документация API</h2>

      <div className='row'>
        <button onClick={() => setActiveTab('search')}>
          Поиск компаний
        </button>
        <button onClick={() => setActiveTab('regions')}>
          Список регионов
        </button>
        <button onClick={() => setActiveTab('examples')}>
          Примеры запросов
        </button>
      </div>

      {activeTab === 'search' && (
        <div>
          <h3>Поиск компаний</h3>
          <p>
            <strong>Endpoint:</strong> POST {window.location.protocol}//{window.location.host}/api/search
          </p>

          <h4>Параметры запроса (JSON):</h4>
          <ul>
            <li><strong>companyName</strong> (обязательный) - название компании или ИНН</li>
            <li><strong>region</strong> (опциональный) - код региона для фильтрации</li>
            <li><strong>page</strong> (опциональный) - номер страницы для пагинации</li>
          </ul>

          <h4>Ответ:</h4>
          <pre>
            {`{
  "status": true,
  "message": "Data retrieved successfully",
  "data": [
    {
        "p": "770401001",
        "r": "18.09.2002",
        "c": "ООО \"ЯНДЕКС\"",
        "t": "2D99156292902D53B9DC07FB1DF1C937A8470DF57DA25FCAA9A0A0DC7F392A5B4B1BAC881F9933349C64A0DE1CFE1397988BF6F8BAE019ECD922334B5D816657",
        "g": "ГЕНЕРАЛЬНЫЙ ДИРЕКТОР: Савиновский Артем Геннадьевич",
        "i": "7736207543",
        "k": "ul",
        "rn": "Г.Москва",
        "n": "ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ \"ЯНДЕКС\"",
        "o": "1027700229193"
    }
  ]
}`}
          </pre>

          <h4>Ошибки:</h4>
          <ul>
            <li><strong>400</strong> - Не указано название компании</li>
            <li><strong>429</strong> - Требуется CAPTCHA проверка</li>
            <li><strong>500</strong> - Внутренняя ошибка сервера</li>
          </ul>
        </div>
      )}

      {activeTab === 'regions' && (
        <div>
          <h3>Список регионов РФ</h3>
          <p>
            <strong>Endpoint:</strong> GET {window.location.protocol}//{window.location.host}/api/regions
          </p>

          <div>
            <table>
              <thead>
                <tr>
                  <th>Код</th>
                  <th>Регион</th>
                </tr>
              </thead>
              <tbody>
                {regions.map(region => (
                  <tr key={region.code}>
                    <td>{region.code || '(все)'}</td>
                    <td>{region.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'examples' && (
        <div>
          <h3>Примеры запросов</h3>

          <h4>Пример 1: Поиск по названию компании</h4>
          <pre>
            {`fetch('${window.location.protocol}//${window.location.host}/api/search', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    companyName: "Яндекс"
  })
})
.then(response => response.json())
.then(data => console.log(data));`}
          </pre>

          <h4>Пример 2: Поиск с фильтром по региону</h4>
          <pre>
            {`fetch('${window.location.protocol}//${window.location.host}/api/search', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    companyName: "7734567890",
    region: "77"
  })
})
.then(response => response.json())
.then(data => console.log(data));`}
          </pre>

          <h4>Пример 3: Получение списка регионов</h4>
          <pre>
            {`fetch('${window.location.protocol}//${window.location.host}/api/regions')
  .then(response => response.json())
  .then(data => console.log(data));`}
          </pre>
        </div>
      )}
    </div>
  );
};

export default ApiDocs;