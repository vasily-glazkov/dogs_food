// Функция обработчик промиса
const onResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}

// Класс для работы с API
class Api {
    // Конструктор класса, принимает объект с параметрами для работы с API
    constructor({baseUrl, headers}) {
        // Заголовки запросов
        this._headers = headers;
        // Базовый URL API
        this._baseUrl = baseUrl;
    }

    // Метод для получения списка товаров
    getProductList() {
        return fetch(`${this._baseUrl}/products`, {
            headers: this._headers
        }).then(onResponse)
    }

    // Метод для получения информации о пользователе
    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        }).then(onResponse)
    }

    // Метод для установки информации о пользователе
    setUserInfo(dataUser) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(dataUser)
        }).then(onResponse)
    }

    // Метод для поиска товаров
    search(searchQuery) {
        return fetch(`${this._baseUrl}/products/search?query=${searchQuery}`, {
            headers: this._headers
        }).then(onResponse)
    }

    // Метод для изменения лайков товаров
    changeLikeProduct(productId, isLike) {
        return fetch(`${this._baseUrl}/products/likes/${productId}`, {
            method: isLike ? "DELETE" : "PUT",
            headers: this._headers
        }).then(onResponse)
    }
}

// Конфигурация для работы с API
const config = {
    baseUrl: 'https://api.react-learning.ru',
    headers: {
        'content-type': 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2UxMjZhZTU5Yjk4YjAzOGY3N2IyMTQiLCJncm91cCI6Imdyb3VwLTEwIiwiaWF0IjoxNjc1NzAwMzMwLCJleHAiOjE3MDcyMzYzMzB9.xaqaQlWEpBsjkmY7C7UhkMYBviBFvk_krC66-PEhUSQ'
    }
}

const api = new Api(config);

export default api;