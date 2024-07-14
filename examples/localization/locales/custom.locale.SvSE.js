import LocaleHelper from '../../../lib/Core/localization/LocaleHelper.js';
import '../../../lib/Gantt/localization/SvSE.js';

const locale =  {

    localeName : 'SvSE',
    localeDesc : 'Svenska',
    localeCode : 'sv-SE',

    App : {
        'Localization demo' : 'Lokaliseringsdemo'
    },

    Button : {
        'Add column'    : 'Lägg till kolumn',
        'Display hints' : 'Visa tips',
        'Remove column' : 'Ta bort kolumn',
        Apply           : 'Verkställ'
    },

    Checkbox : {
        'Auto apply'  : 'Auto applicera',
        Automatically : 'Automatiskt'
    },

    CodeEditor : {
        'Code editor'   : 'Kodredigerare',
        'Download code' : 'Ladda ner kod'
    },

    Column : {
        Duration : 'Varaktighet',
        Name     : 'Namn',
        Finish   : 'Slut',
        Start    : 'Start',
        WBS      : 'WBS'
    },

    Combo : {
        Theme    : 'Välj tema',
        Language : 'Välj språk',
        Size     : 'Välj storlek'
    },

    Shared : {
        'Full size'      : 'Full storlek',
        'Locale changed' : 'Språk ändrat',
        'Phone size'     : 'Telefonstorlek'
    },

    Tooltip : {
        infoButton       : 'Klicka för att visa information och byta tema eller språk',
        codeButton       : 'Klicka för att visa den inbyggda kodredigeraren',
        hintCheck        : 'Markera för att automatiskt visa tips när du laddar exemplet',
        fullscreenButton : 'Fullskärm'
    }

};

export default LocaleHelper.publishLocale(locale);
