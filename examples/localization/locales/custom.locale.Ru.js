import LocaleHelper from '../../../lib/Core/localization/LocaleHelper.js';
import '../../../lib/Gantt/localization/Ru.js';

const locale =  {

    localeName : 'Ru',
    localeDesc : 'Русский',
    localeCode : 'ru',

    App : {
        'Localization demo' : 'Демо локализации'
    },

    Button : {
        'Add column'    : 'Добавить колонку',
        'Display hints' : 'Показать подсказки',
        'Remove column' : 'Удалить колонку',
        Apply           : 'Применить'
    },

    Checkbox : {
        'Auto apply'  : 'Применять сразу',
        Automatically : 'Автоматически'
    },

    CodeEditor : {
        'Code editor'   : 'Редактор кода',
        'Download code' : 'Скачать код'
    },

    Column : {
        Duration : 'Длительность',
        Name     : 'Имя',
        Finish   : 'Конец',
        Start    : 'Начало',
        WBS      : 'СДР'
    },

    Combo : {
        Theme    : 'Выбрать тему',
        Language : 'Выбрать язык',
        Size     : 'Выбрать размер'
    },

    Shared : {
        'Locale changed' : 'Язык изменен',
        'Full size'      : 'Полный размер',
        'Phone size'     : 'Экран смартфона'
    },

    Tooltip : {
        infoButton       : 'Показать редактор кода',
        codeButton       : 'Показать информацию, переключить тему или язык',
        hintCheck        : 'Автоматически показывать подсказки при загрузке примера',
        fullscreenButton : 'На весь экран'
    }
};

export default LocaleHelper.publishLocale(locale);
