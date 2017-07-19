export default {
    header: {
        title: 'KLZ Vorteilsclub Admin'
    },
    ui:     {
        confirmationDialog: {
            cancel:     'Abbrechen',
            confirm:    'Ja'
        }
    },
    fields: {
        benefits: {
            title:          'Titel',
            description:    'Beschreibung'
        },
        campaign:   {
            name:           'Name der Kampagne',
            description:    'Beschreibung',
            campaignId:     'CampaignId',
            fromDate:       'Start der Kampagne',
            dueDate:        'Ende der Kampagne'
        },
        locations: {
            name:       'Name',
            address:    'Addresse'
        }
    },
    campaign:   {
        noCampaign: 'Noch keine Kampagne vorhanden',
        listTitle:  'zugehörige Kampagnen:',
        addNew:     'Kampagne anlegen',
        delete:     'Kampagne löschen',
        edit:       'Kampagne bearbeiten',
        save:       'Kampagne speichern'
    },
    locations: {
        noLocation:     'Noch keine Location vorhanden.',
        addNew:         'Location hinzufügen',
        delete:         'Location löschen',
        addNewDialog: {
            title:      'Neue Location anlegen',
            addNew:     'Location anlegen',
            cancel:     'Abbrechen'
        }
    },
    vouchers: {
        noVoucher:      'Noch kein Gutschein anlegt.',
        addNew:         'Gutschein anlegen',
        addNewDialog:   {
            title:      'Neuen Gutschein anlegen'
        }
    }
}
