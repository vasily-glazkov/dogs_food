import s from './index.module.css';
import cn from 'classnames';
import Button from "../Button/button";

// Функция-компонента `Header` принимает в качестве параметров:
// - `children`: дочерние элементы этого компонента
// - `user`: данные о пользователе
// - `onUpdateUser`: функция, которая будет вызываться при нажатии кнопки "Изменить"
function Header({children, user, onUpdateUser}) {

    // Обработчик события клика на кнопку "Изменить"
    const handleClickButtonEdit = (e) => {
        // Отменяем стандартное поведение по умолчанию
        e.preventDefault();

        // Вызываем функцию `onUpdateUser` и передаем ей данные для обновления
        onUpdateUser({name: 'Vasily', about: 'Student'})
    }

    return (
        // тег `header` с классом `s.header` и дополнительным классом `cover`
        <header className={cn(s.header, 'cover')}>
            <div className="container">
                {/*Если есть данные о пользователе, отображаем email*/}
                {user?.email && <span>{user?.email}</span>}

                {/*Если есть данные о пользователе, отображаем имя*/}
                {user?.name && <span> {user?.name}</span>}

                {/*Компонент `Button` с типом `secondary` и текстом "Изменить"*/}
                <Button type='secondary' children='Изменить' onClick={handleClickButtonEdit}/>
                <div className={s.wrapper}>
                    {children}
                </div>
            </div>
        </header>

    )
}

export default Header;
