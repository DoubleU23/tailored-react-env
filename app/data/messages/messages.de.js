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
            title:      'Name',
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
        addNew:     {
            title:  'Neue Location anlegen',
            button: 'Location anlegen'
        }
    }
}
