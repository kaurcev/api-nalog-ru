const express = require('express')
const path = require('path')
const fetch = require('node-fetch')
const cors = require('cors')

class CompanySearchService {
  static async executeSearch(companyName, region = '', page = '') {
    const bodyParams = new URLSearchParams()
    bodyParams.append('query', companyName)
    
    if (region) {
      bodyParams.append('region', region)
    }
    
    if (page) {
      bodyParams.append('page', page)
    }
    
    bodyParams.append('PreventChromeAutocomplete', '')

    const firstResponse = await fetch("https://egrul.nalog.ru/", {
      method: "POST",
      headers: {
        "accept": "application/json, text/javascript, */*; q=0.01",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "Referer": "https://egrul.nalog.ru/index.html"
      },
      body: bodyParams.toString()
    })

    if (!firstResponse.ok) {
      throw new Error(`First request failed: ${firstResponse.status}`)
    }

    const firstData = await firstResponse.json()

    if (firstData.captchaRequired) {
      throw new Error('CAPTCHA required')
    }

    const token = firstData.t
    const timestamp = Date.now()
    
    const secondResponse = await fetch(
      `https://egrul.nalog.ru/search-result/${token}?r=${timestamp}&_=${timestamp}`,
      {
        headers: {
          "Referer": "https://egrul.nalog.ru/index.html"
        }
      }
    )

    if (!secondResponse.ok) {
      throw new Error(`Second request failed: ${secondResponse.status}`)
    }

    return secondResponse.json()
  }
}

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

// Список регионов РФ
const regions = [
  { code: '', name: 'Все регионы' },
  // Республики (22)
  { code: '01', name: '(01) Республика Адыгея' },
  { code: '02', name: '(02) Республика Башкортостан' },
  { code: '03', name: '(03) Республика Бурятия' },
  { code: '04', name: '(04) Республика Алтай' },
  { code: '05', name: '(05) Республика Дагестан' },
  { code: '06', name: '(06) Республика Ингушетия' },
  { code: '07', name: '(07) Республика Кабардино-Балкария' },
  { code: '08', name: '(08) Республика Калмыкия' },
  { code: '09', name: '(09) Республика Карачаево-Черкесия' },
  { code: '10', name: '(10) Республика Карелия' },
  { code: '11', name: '(11) Республика Коми' },
  { code: '12', name: '(12) Республика Марий Эл' },
  { code: '13', name: '(13) Республика Мордовия' },
  { code: '14', name: '(14) Республика Саха (Якутия)' },
  { code: '15', name: '(15) Республика Северная Осетия — Алания' },
  { code: '16', name: '(16) Республика Татарстан' },
  { code: '17', name: '(17) Республика Тыва' },
  { code: '18', name: '(18) Республика Удмуртия' },
  { code: '19', name: '(19) Республика Хакасия' },
  { code: '20', name: '(20) Чеченская Республика' }, // Исторический код, часто используется
  { code: '21', name: '(21) Чувашская Республика' },
  { code: '91', name: '(91) Республика Крым' }, // Новый код для Крыма
  { code: '82', name: '(82) Республика Крым' }, // Альтернативный код (используется в ряде систем)

  // Края (9)
  { code: '22', name: '(22) Алтайский край' },
  { code: '23', name: '(23) Краснодарский край' },
  { code: '24', name: '(24) Красноярский край' },
  { code: '25', name: '(25) Приморский край' },
  { code: '26', name: '(26) Ставропольский край' },
  { code: '27', name: '(27) Хабаровский край' },
  { code: '28', name: '(28) Амурская область' }, // Это область, исправлено ниже
  { code: '29', name: '(29) Архангельская область' }, // Это область, исправлено ниже
  { code: '30', name: '(30) Астраханская область' }, // Это область, исправлено ниже
  { code: '41', name: '(41) Камчатский край' },
  { code: '59', name: '(59) Пермский край' },
  { code: '75', name: '(75) Забайкальский край' },
  { code: '80', name: '(80) Забайкальский край' }, // Альтернативный код

  // Области (46)
  { code: '28', name: '(28) Амурская область' },
  { code: '29', name: '(29) Архангельская область' },
  { code: '30', name: '(30) Астраханская область' },
  { code: '31', name: '(31) Белгородская область' },
  { code: '32', name: '(32) Брянская область' },
  { code: '33', name: '(33) Владимирская область' },
  { code: '34', name: '(34) Волгоградская область' },
  { code: '35', name: '(35) Вологодская область' },
  { code: '36', name: '(36) Воронежская область' },
  { code: '37', name: '(37) Ивановская область' },
  { code: '38', name: '(38) Иркутская область' },
  { code: '39', name: '(39) Калининградская область' },
  { code: '40', name: '(40) Калужская область' },
  { code: '42', name: '(42) Кемеровская область' },
  { code: '43', name: '(43) Кировская область' },
  { code: '44', name: '(44) Костромская область' },
  { code: '45', name: '(45) Курганская область' },
  { code: '46', name: '(46) Курская область' },
  { code: '47', name: '(47) Ленинградская область' },
  { code: '48', name: '(48) Липецкая область' },
  { code: '49', name: '(49) Магаданская область' },
  { code: '50', name: '(50) Московская область' },
  { code: '51', name: '(51) Мурманская область' },
  { code: '52', name: '(52) Нижегородская область' },
  { code: '53', name: '(53) Новгородская область' },
  { code: '54', name: '(54) Новосибирская область' },
  { code: '55', name: '(55) Омская область' },
  { code: '56', name: '(56) Оренбургская область' },
  { code: '57', name: '(57) Орловская область' },
  { code: '58', name: '(58) Пензенская область' },
  { code: '60', name: '(60) Псковская область' },
  { code: '61', name: '(61) Ростовская область' },
  { code: '62', name: '(62) Рязанская область' },
  { code: '63', name: '(63) Самарская область' },
  { code: '64', name: '(64) Саратовская область' },
  { code: '65', name: '(65) Сахалинская область' },
  { code: '66', name: '(66) Свердловская область' },
  { code: '67', name: '(67) Смоленская область' },
  { code: '68', name: '(68) Тамбовская область' },
  { code: '69', name: '(69) Тверская область' },
  { code: '70', name: '(70) Томская область' },
  { code: '71', name: '(71) Тульская область' },
  { code: '72', name: '(72) Тюменская область' },
  { code: '73', name: '(73) Ульяновская область' },
  { code: '74', name: '(74) Челябинская область' },
  { code: '76', name: '(76) Ярославская область' },

  // Города федерального значения (3)
  { code: '77', name: '(77) Москва' },
  { code: '78', name: '(78) Санкт-Петербург' },
  { code: '92', name: '(92) Севастополь' }, // Новый код для Севастополя
  { code: '94', name: '(94) Севастополь' }, // Альтернативный код (используется в ряде систем)
  { code: '99', name: '(99) Байконур' },
  // Автономная область (1)
  { code: '79', name: '(79) Еврейская автономная область' },

  // Автономные округа (4)
  { code: '83', name: '(83) Ненецкий автономный округ' },
  { code: '86', name: '(86) Ханты-Мансийский автономный округ — Югра' },
  { code: '87', name: '(87) Чукотский автономный округ' },
  { code: '89', name: '(89) Ямало-Ненецкий автономный округ' }
];

app.post('/api/search', async (req, res) => {
  try {
    const { companyName, region, page } = req.body

    if (!companyName?.trim()) {
      return res.status(400).json({
        status: false,
        message: 'Company name is required'
      })
    }

    const data = await CompanySearchService.executeSearch(companyName, region, page)
    
    res.json({
      status: true,
      message: 'Data retrieved successfully',
      data: data.rows || []
    })

  } catch (error) {
    console.error('Search error:', error.message)

    const statusCode = error.message.includes('CAPTCHA') ? 429 : 500
    
    res.status(statusCode).json({
      status: false,
      message: error.message.includes('CAPTCHA') 
        ? 'CAPTCHA verification required' 
        : 'Internal server error'
    })
  }
})

app.get('/api/docs', (req, res) => {
  res.json({
    description: "Company search API using official government data",
    version: "1.0.0",
    endpoints: {
      "POST /api/search": {
        description: "Search for company information in official registry",
        parameters: {
          companyName: {
            type: "string",
            required: true,
            description: "Legal company name or INN"
          },
          region: {
            type: "string",
            required: false,
            description: "Region code for filtering"
          }
        },
        response: {
          status: "boolean",
          message: "string",
          data: "Company[]"
        }
      },
      "GET /api/regions": {
        description: "Get list of available regions",
        response: "Region[]"
      }
    }
  })
})

app.get('/api/regions', (req, res) => {
  res.json(regions)
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.use((error, req, res, next) => {
  console.error('Unhandled error:', error)
  res.status(500).json({
    status: false,
    message: 'Unexpected server error'
  })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`Open http://localhost:${PORT} in browser`)
})

module.exports = app