import s from './index.module.css';
import cn from 'classnames';
import Button from "../Button/button";


function Header({children, user, onUpdateUser}) {

    const handleClickButtonEdit = (e) => {
        e.preventDefault();
        onUpdateUser({name: 'Vasily', about: 'Student'})
    }

    return (

        <header className={cn(s.header, 'cover')}>
            <div className="container">
                {user?.email && <span>{user?.email}</span>}
                {user?.name && <span> {user?.name}</span>}
                <Button type='secondary' children='Изменить' onClick={handleClickButtonEdit}/>
                <div className={s.wrapper}>
                    {children}
                </div>
            </div>
        </header>

    )
}

export default Header;
