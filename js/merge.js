/**
 * Получить элементы массива A в виде строки
 * 
 * @returns {string}
 *   Элементы массива
 */
function getA() {
    return jQuery('#arrayA').val();
}

/**
 * Получить элементы массива B в виде строки
 * 
 * @returns {string}
 *   Элементы массива
 */
function getB() {
    return jQuery('#arrayB').val();
}

/**
 * Конвертирует строковые значения массива в вещественные
 * 
 * @param {array} arr
 *   Входной массив
 * @returns {array}
 *   Вещественный массив
 */
function converArrayToFloat(arr) {
    if (Array.isArray(arr)) {
        var output = arr.map(function (item) {
            return parseFloat(item);
        });
    } else {
        output = arr;
    }
    return output;
}

/**
 * Проверяет упорядоченность массива по-возрастанию
 *
 * @param {double} arr
 *   Передаваемый массив массив
 * @return {boolean}
 *   Результат проверки
 */
function checkSortUp(arr) {
    var result = true;
    if (Array.isArray(arr) && arr.length > 1) {
        jQuery.each(arr, function (index) {
            if (arr[index] > arr[index + 1]) {
                result = false;
            }
        });
    }
    return result;
}

/**
 * Слияние упорядоченных массивов
 *
 * @param {double} a
 *   Cортированный по-возрастанию массив A
 * @param {double} b
 *   Cортированный по-возрастанию массив B
 * @return {array}
 *   Объединенный массив
 */
function merge(a, b) {
    var output = [];
    if (Array.isArray(a) && Array.isArray(b)) {
        // Выполняем опрерации до тех пор пока есть что сравнивать
        while (a.length > 0 && b.length > 0) {
            // Метод shift() удаляет первый элемент из массива
            // и возвращает его значение. 
            // Метод push() добавляет элемент в массив
            output.push(a[0] < b[0] ? a.shift() : b.shift());
        }
        // Метод concat() возвращает новый массив, состоящий из массива,
        // на котором он был вызван, соединённого с другими массивами и/или
        // значениями, переданными в качестве аргументов.
        return output.concat(a.length ? a : b);
    }
    return output;
}

/**
 * Выполняем действия когда DOM полностью загружен
 */
jQuery(document).ready(function () {
    // Отслеживаем изменение числа элементов любого из массивов
    jQuery('#arrayA, #arrayB').on('change keyup', function () {
        var inputA = getA(); // Ввведеные данные для массива A
        var inputB = getB(); // Ввведеные данные для массива B
        var regsym = /(^[-0-9 .]+)$/g; // Проверка на допустимые символы
        var regdot = /[.]{2,}/; // Проверка на множество точек
        var message = ''; // Сообщение пользователю
        // Обработка входных данных
        if (inputA === '') { // Текстовое поле массива A не заполнено
            message += 'Введите элементы массива A. ';
        } else if (inputB === '') { // Текстовое поле массива B не заполнено
            message = 'Введите элементы массива B. ';
        } else if (inputA.match(regsym) === null || inputA.match(regdot) !== null) {
            message = 'В массиве А содержатся недопустимые символы. ';
        } else if (inputB.match(regsym) === null || inputB.match(regdot) !== null) {
            message = 'В массиве B содержатся недопустимые символы. ';
        }
        if (message === '') {
            var arrayA = []; // Массив A
            var arrayB = []; // Массив B
            var arrayC = []; // Массив C
            var regval = /(-?[0-9]+(\.[0-9]+)?)/g;
            arrayA = converArrayToFloat(inputA.match(regval));
            arrayB = converArrayToFloat(inputB.match(regval));
            console.log(arrayA);
            if (checkSortUp(arrayA) !== true) {
                message = 'Массив A не упорядочен по-возрастанию';
            } else if (checkSortUp(arrayB) !== true) {
                message = 'Массив B не упорядочен по-возрастанию';
            } else {
                arrayC = merge(arrayA, arrayB);
                message = 'Результат слияния упрорядоченных массивов:';
                message = 'Массив С: <b>' + arrayC.join(' ') + '</b>';
            }
        }
        jQuery('#answer').html(message);
    });
});
