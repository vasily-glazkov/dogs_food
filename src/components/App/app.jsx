import { useState, useEffect } from "react";
import CardList from "../CardList/card-list";
import Footer from "../Footer/footer";
import Header from "../Header/header";
import Logo from "../Logo/logo";
import Search from "../Search/search";
import Sort from "../Sort/sort";
import "./index.css";
import SearchInfo from "../SearchInfo";
import api from "../../utils/api";
import useDebounce from "../../hooks/useDebounce";
import { isLiked } from "../../utils/product";

function App() {
  // устанавливаем состояния для карточек, поискового запроса
  // и для пользователя
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  // debounced версия поискового запроса
  const debounceSearchQuery = useDebounce(searchQuery, 300);

  // функция для совершения поисковых запросов с API для
  // поиска продуктов
  const handleRequest = () => {

    api
      .search(debounceSearchQuery)
      .then((searchResult) => {

        // обновляем карточки по результатам запроса
        setCards(searchResult);
      })
      .catch((err) => console.log(err));
  };

  // Используем useEffect хук для загрузки списка продуктов и
  // данных пользователя при загрузке компонента
  useEffect(() => {
    Promise.all([api.getProductList(), api.getUserInfo()])
      .then(([productsData, userData]) => {
          // обновляем состояние currentUser & cards
        setCurrentUser(userData);
        setCards(productsData.products);
      })
      .catch((err) => console.log(err));
  }, []);

  // Используем useEffect хук для вызова handleRequest при изменении
  // поля поиска
  useEffect(() => {
    handleRequest();
  }, [debounceSearchQuery]);


  // функция обрабатывает отправку данных из формы
  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleRequest();
  };


  // функция обрабатывает изменения в поле input
  const handleInputChange = (inputValue) => {
    setSearchQuery(inputValue);
  };


  // обновляет информацию о пользователе
  function handleUpdateUser(userUpdateData) {
    api.setUserInfo(userUpdateData).then((newUserData) => {
      setCurrentUser(newUserData);
    });
  }

  // обновляет лайки по продукту
  function handleProductLike(product) {
    const liked = isLiked(product.likes, currentUser._id);

    // обращаемся к api чтобы обновить статус лайка
    api.changeLikeProduct(product._id, liked).then((newCard) => {
      const newProducts = cards.map((cardState) => {
        return cardState._id === newCard._id ? newCard : cardState;
      });

      // Обновляем статус карточек
      setCards(newProducts);
    });
  }

  return (
    <>
      <Header user={currentUser} onUpdateUser={handleUpdateUser}>
        <>
          <Logo className="logo logo_place_header" href="/" />
          <Search onSubmit={handleFormSubmit} onInput={handleInputChange} />
        </>
      </Header>
      <main className="content container">
        <SearchInfo searchCount={cards.length} searchText={searchQuery} />
        <Sort />
        <div className="content__cards">
          <CardList
            goods={cards}
            onProductLike={handleProductLike}
            currentUser={currentUser}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
