import LocaleHelper from '../../../lib/Core/localization/LocaleHelper.js';
import '../../../lib/Gantt/localization/De.js';

const locale = {

    localeName : 'De',
    localeDesc : 'Deutsch',
    localeCode : 'de-DE',

    App : {
        'Localization demo' : 'Lokalisierungsdemo'
    },

    Button : {
        'Add column'    : 'Spalte hinzufügen',
        Apply           : 'Anwenden',
        'Display hints' : 'Tipps anzeigen',
        'Remove column' : 'Spalte entfernen'
    },

    Checkbox : {
        'Auto apply'  : 'Automatisch anwenden',
        Automatically : 'Automatisch'
    },

    CodeEditor : {
        'Code editor'   : 'Code-Editor',
        'Download code' : 'Code herunterladen'
    },

    Column : {
        Duration : 'Dauer',
        Finish   : 'Ende',
        Name     : 'Name',
        Start    : 'Anfang',
        WBS      : 'WBS'
    },

    Combo : {
        Theme    : 'Thema wählen',
        Language : 'Gebietsschema auswählen',
        Size     : 'Wähle die Größe aus'
    },

    Tooltip : {
        infoButton       : 'Klicken Sie hier, um Informationen anzuzeigen und das Thema oder Gebietsschema zu wechseln',
        codeButton       : 'Klicken Sie hier, um den integrierten Code-Editor anzuzeigen',
        hintCheck        : 'Aktivieren Sie diese Option, um beim Laden des Beispiels automatisch Hinweise anzuzeigen',
        fullscreenButton : 'Ganzer Bildschirm'
    },

    Shared : {
        'Full size'      : 'Volle Größe',
        'Locale changed' : 'Sprache geändert',
        'Phone size'     : 'Telefongröße'
    },

    FieldFilterPicker : {
        equals         : 'ist gleich',
        doesNotEqual   : 'ist nicht gleich',
        isEmpty        : 'ist leer',
        isNotEmpty     : 'ist nicht leer',
        contains       : 'enthält',
        doesNotContain : 'nicht enthält',
        startsWith     : 'beginnt mit',
        endsWith       : 'beginnt nicht mit',
        isOneOf        : 'ist eines von',
        isNotOneOf     : 'ist nicht eines von',

        isGreaterThan          : 'größer als',
        isLessThan             : 'kleiner als',
        isGreaterThanOrEqualTo : 'größer als oder gleich',
        isLessThanOrEqualTo    : 'kleiner als oder gleich',
        isBetween              : 'liegt zwischen',
        isNotBetween           : 'liegt nicht zwischen',

        isBefore     : 'ist vor',
        isAfter      : 'ist nach',
        isToday      : 'ist heute',
        isTomorrow   : 'ist morgen',
        isYesterday  : 'ist gestern',
        isThisWeek   : 'ist diese Woche',
        isNextWeek   : 'ist nächste Woche',
        isLastWeek   : 'ist letzte Woche',
        isThisMonth  : 'ist diesen Monat',
        isNextMonth  : 'ist nächsten Monat',
        isLastMonth  : 'ist letzten Monat',
        isThisYear   : 'ist dieses Jahr',
        isNextYear   : 'ist nächstes Jahr',
        isLastYear   : 'ist letztes Jahr',
        isYearToDate : 'ist im bisherigen Jahresverlauf',

        isTrue  : 'ist wahr',
        isFalse : 'ist falsch',

        selectAProperty  : 'Wählen einen Eigenschaft aus',
        selectAnOperator : 'Wählen einen Operator aus',
        caseSensitive    : 'Groß- und Kleinschreibung beachten',

        and : 'und',

        dateFormat : 'DD.MM.YYYY',

        selectOneOrMoreValues : 'Wählen einen oder mehrere Werte aus',
        enterAValue           : 'Einen Wert eingeben',
        enterANumber          : 'Eine Nummer eingeben',
        selectADate           : 'Wählen ein Datum'
    },

    FieldFilterPickerGroup : {
        addFilter : 'Filter hinzufügen'
    },

    Filter : {
        applyFilter   : 'Filter anwenden',
        filter        : 'Filter',
        editFilter    : 'Filter redigieren',
        on            : 'Auf',
        before        : 'Vor',
        after         : 'Nach',
        equals        : 'Gleichen',
        lessThan      : 'Weniger als',
        moreThan      : 'Mehr als',
        removeFilter  : 'Filter entfernen',
        disableFilter : 'Filter deaktivieren'
    },

    HeaderMenu : {
        collapseColumn : 'Spalte verbergen',
        expandColumn   : 'Spalte aufklappen'
    },

    Versions : {
        entityNames : {
            TaskModel       : 'Aufgabe',
            AssignmentModel : 'Auftrag',
            DependencyModel : 'Abhängigkeit',
            ProjectModel    : 'Projekt',
            ResourceModel   : 'Ressource',
            other           : 'Objekt'
        },

        entityNamesPlural : {
            TaskModel       : 'Aufgaben',
            AssignmentModel : 'Aufträge',
            DependencyModel : 'Abhängigkeiten',
            ProjectModel    : 'Projekte',
            ResourceModel   : 'Ressourcen',
            other           : 'Objekte'
        },

        transactionDescriptions : {
            update : '{n} {entities} geändert',
            add    : '{n} {entities} hinzugefügt',
            remove : '{n} {entities} entfernt',
            move   : '{n} {entities} verschoben',
            mixed  : '{n} {entities} geändert'
        },

        addEntity        : '{type} **{name}** hinzugefügt',
        removeEntity     : '{type} **{name}** entfernt',
        updateEntity     : '{type} **{name}** geändert',
        moveEntity       : '{type} **{name}** verschoben',
        addDependency    : 'Verbindung von **{from}** nach **{to}** hinzugefügt',
        addAssignment    : '**{resource}** zu **{event}** beauftragt',
        removeDependency : 'Verbindung von **{from}** nach **{to}** entfernt',
        removeAssignment : 'Auftrag von **{resource}** zu **{event}** entfernt',
        updateAssignment : 'Auftrag von **{resource}** zu **{event}** geändert',
        updateDependency : 'Verbingdung von **{from}** nach **{to}** geändert',
        noChanges        : 'Keine Änderungen',
        nullValue        : 'nichts',

        versionDateFormat : 'DD.MM.YYYY HH:mm',

        indented     : 'Rückte ein',
        outdented    : 'Rückte aus',
        cut          : 'Schnitt',
        pasted       : 'Fügte ein',
        undid        : 'Rückgängig gemacht',
        redid        : 'Neu gemacht',
        editedTask   : 'Aufgabe bearbeitet',
        movedTask    : 'Aufgabe verschoben',
        movedTasks   : 'Aufgaben verschoben',
        deletedTask  : 'Aufgabe gelöscht',
        deletedTasks : 'Aufgaben gelöscht'
    },

    PresetManager : {
        secondAndMinute : {
            name : 'Sekunden'
        },
        minuteAndHour : {
            topDateFormat : 'ddd DD.MM, HH:mm',
            name          : 'Minuten'
        },
        hourAndDay : {
            topDateFormat : 'ddd DD.MM',
            name          : 'Tag'
        },
        day : {
            name : 'Tag/stunden'
        },
        week : {
            name : 'Woche/stunden'
        },
        dayAndWeek : {
            name : 'Woche/tage'
        },
        dayAndMonth : {
            name : 'Monat'
        },
        weekAndDay : {
            displayDateFormat : 'HH:mm',
            name              : 'Woche'
        },
        weekAndMonth : {
            name : 'Wochen'
        },
        weekAndDayLetter : {
            name : 'Wochen/wochentage'
        },
        weekDateAndMonth : {
            name : 'Monate/wochen'
        },
        monthAndYear : {
            name : 'Monate'
        },
        year : {
            name : 'Jahre'
        },
        manyYears : {
            name : 'Mehrere Jahre'
        }
    },

    ColumnRename : {
        rename : 'Umbenennen'
    },

    RowCopyPaste : {
        copyRecord  : 'Kopieren',
        cutRecord   : 'Schnitt',
        pasteRecord : 'Einfügen',
        rows        : 'Zeilen',
        row         : 'Zeile'
    },

    CellCopyPaste : {
        copy  : 'Kopieren',
        cut   : 'Schnittn',
        paste : 'Einfügen'
    },

    RecurrenceFrequencyCombo : {
        None    : 'Keine Wiederholung',
        Daily   : 'täglich',
        Weekly  : 'wöchentlich',
        Monthly : 'monatlich',
        Yearly  : 'jährlich'
    },

    TaskEditorBase : {
        Information   : 'Informationen',
        Save          : 'Sparen',
        Cancel        : 'Stornieren',
        Delete        : 'Löschen',
        calculateMask : 'Aufgaben berechnen...',
        saveError     : 'Kann nicht speichern, bitte korrigieren Sie zuerst die Fehler',
        repeatingInfo : 'Anzeigen eines sich wiederholenden Ereignisses',
        editRepeating : 'Redigieren'
    },

    SchedulerAdvancedTab : {
        'Ignore resource calendar' : 'Ressourcenkalender ignorieren'
    },

    AdvancedTab : {
        'Ignore resource calendar' : 'Ressourcenkalender ignorieren'
    },

    RecurrenceTab : {
        title : 'Wiederholen'
    },

    EventSegments : {
        splitEvent    : 'Buchung unterbrechen',
        splitTask     : 'BVorgang unterbrechen',
        renameSegment : 'Umbenennen'
    },

    IgnoreResourceCalendarColumn : {
        'Ignore resource calendar' : 'Ressourcenkalender ignorieren'
    }

};

export default LocaleHelper.publishLocale(locale);
