export default {
    header: {
        title: 'KLZ Vorteilsclub Admin'
    },
    fields: {
        benefits: {
            title:          'Titel',
            description:    'Beschreibung',
            campaign:   {
                name:           'Name der Kampagne',
                description:    'Beschreibung',
                campaignId:     'CampaignId',
                fromDate:       'Start der Kampagne',
                dueDate:        'Ende der Kampagne',
                // locationFields
                locations: {
                    name:       'Name',
                    address:    'Addresse'
                }
            }
        }
    }
}
