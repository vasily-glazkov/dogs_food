import { useEffect, useState } from "react"

// Хук useDebounce позволяет использовать задержку при изменении значения
// поля поискового запроса
const useDebounce = (value, delay) => {

    // Используем useState для управления значением с задержкой
    const [debounceValue, setDebounceValue] = useState(value);

    // Используем useEffect для обновления debounceValue после заданной задержки
    useEffect( () => {
        // Устанавливаем таймер на заданную задержку
        const timeout = setTimeout(() => {
            setDebounceValue(value);
        }, delay)

        // Очищаем таймер при удалении элемента
        return () => clearTimeout(timeout);
    }, [value, delay])

    // Возвращаем значение с задержкой
    return debounceValue;
}

export default useDebounce;