'use strict'

import axiosWrapped   from '../../../utils/axiosWrapped'

import {TimeoutError} from '../../../utils/Exceptions'

import {
    observable,
    extendObservable,
    action,
    computed,
    toJS
} from 'mobx'

import appConfig from '../../../config/appConfig'

const {
    api: {
        base: apiBase,
        endpoints: {
            benefits:   benefitsEndpoint,
            campaigns:  campaignsEndpoint,
            vouchers:   vouchersEndpoint,
            locations:  locationsEndpoint
        }
    }
} = appConfig

export default class BenefitsStore {

    constructor(state = {}) {
        extendObservable(this, {
            foo:        'bar',
            bar:        'foo',
            status:     'inactive',
            error:      false,
            data:       {},
            fetched:    false // false || timestamp
        }, state)

        if (process.env.IS_BROWSER) {
            window.BenefitsStore = this
        }
    }

    prepareData(data) {
        const dataSorted = {}
        data.forEach(benefit => {
            const id                = benefit.benefitCode

            dataSorted[id]          = benefit
            dataSorted[id].patched  = Date.now()

            // prepare locations object
            if (typeof dataSorted[id].campaign !== 'object') {
                dataSorted[id].campaign = {locations: []}
                // extendObservable(dataSorted[id].campaign, {
                //     locations: []
                // })
            }

            // add benefitCode/id to campaign
            if (dataSorted[id].campaign.benefitCode == null) {
                dataSorted[id].campaign.benefitCode = id
                dataSorted[id].campaign.id          = id
            }
        })
        console.log('this.data SORTED:', dataSorted)
        return observable(dataSorted)
    }

    @action.bound
    patch(id, benefitObj) {
        // add benefit relation per id
        const hasCampaign           = !!benefitObj.campaign && !!benefitObj.campaign.campaignId
        const campaignHasBenefitId  = hasCampaign
            ? !!benefitObj.campaign.benefitCode && !!benefitObj.campaign.id
            : false

        console.log('patching!!!', hasCampaign, campaignHasBenefitId)
        // refactor this
        if (hasCampaign && !campaignHasBenefitId) {
            benefitObj.campaign.id          = benefitObj.benefitCode
            benefitObj.campaign.benefitCode = benefitObj.benefitCode
        }
        this.data[id]           = extendObservable(this.data[id], toJS(benefitObj))
        this.data[id].patched   = Date.now()

        return this.data[id]
    }

    @action.bound
    async fetch() {
        this.status         = 'loading'
        this.error          = false

        const benefitsUrl   = apiBase + benefitsEndpoint
        const response      = await axiosWrapped('get', benefitsUrl, {
            responseType: 'json',
            auth: {
                username: 'bcUser',
                password: 'nope_you_will_never_know'
            }
        })

        if (response.error) {
            this.error = response.error
            this.status = 'error'
            // timeoutError !?
            console.log('[BenefitsStore.catch(err)]', this.error)
            if (this.error instanceof TimeoutError) {
                // special handling of TimeoutError?
            }

            return response
        }

        if (response && response.status === 200) {
            this.data    = this.prepareData(response.data)
            this.status  = 'success'
            this.fetched = Date.now()

            return response.data
        }
        else {
            // refactor: you should not get here
            // if you see this error => refactor
            let error = new Error(
                'Could not fetch ' + benefitsUrl + '\n'
            +   'StatusCode: response.status'
            )
            // refactor: return or throw here!? oO
            // depends, where/how we handle the errors
            return error
        }
    }

    @action.bound
    async saveCampaign(campaign) {
        let urlSuffix       = campaign.createNew ? '' : '/' + campaign.benefitCode,
            campaignUrl     = apiBase + campaignsEndpoint + urlSuffix,
            response        = await axiosWrapped(false, false, {
                method:         campaign.createNew ? 'post' : 'patch',
                url:            campaignUrl,
                responseType:   'json',
                auth:  {
                    username:   'bcUser',
                    password:   'nope_you_will_never_know'
                },
                data:   campaign
            })

        delete this.data[campaign.benefitCode].campaign.createNew

        this.data[campaign.benefitCode].patched = Date.now()

        return response
    }

    @action.bound
    createCampaign(id) {
        const benefit = this.data[id]
        extendObservable(benefit, {
            campaign: {
                id:             benefit.benefitCode >> 0,
                benefitCode:    benefit.benefitCode >> 0,
                campaignId:     '',
                description:    'I am an invention of the backend devs',
                dueDate:        '2018-09-28T10:04:00.000Z',
                fromDate:       '2017-07-01T10:04:00.000Z',
                name:           'generierte Campaign',
                type:           1,
                createNew:      true
            }
        })
    }

    @action.bound
    async deleteCampaign(id) {
        const campaignDeleteUrl = apiBase + campaignsEndpoint + '/' + id
        const response          = await axiosWrapped(false, false, {
            method:         'delete',
            url:            campaignDeleteUrl,
            responseType:   'json',
            auth:  {
                username:   'bcUser',
                password:   'nope_you_will_never_know'
            }
        })

        if (response.error || response.status !== 204) {
            return response.error
        }

        // delete locally
        this.data[id].campaign  = {}

        return true
    }

    @action.bound
    async saveVoucher({id, file}) {
        const formData         = new FormData()
        formData.append('image', file, 'RandomizeFileName')
        const voucherCreateUrl = apiBase + vouchersEndpoint + '/' + id
        const response         = await axiosWrapped(false, false, {
            method:         'post',
            url:            voucherCreateUrl,
            responseType:   'json',
            auth:  {
                username:   'bcUser',
                password:   'nope_you_will_never_know'
            },
            data:           formData
        })

        return response
    }

    @action.bound
    async deleteLocation({benefitCode, locationId}) {
        console.log('benefitCode, locationId', benefitCode, locationId)
        const campaign          = toJS(this.data[benefitCode].campaign)
        const locations         = campaign.locations

        const indexToDelete     = campaign.locations.findIndex(v => v.id === locationId)
        locations.splice(indexToDelete, 1)

        console.log('campaign, indexToDelete', campaign, indexToDelete)
        campaign.locations      = locations

        console.log('campaign after', campaign)

        // // delete on server
        const campaignDeleteUrl = apiBase + campaignsEndpoint + '/' + benefitCode
        const response          = await axiosWrapped(false, false, {
            method:         'patch',
            url:            campaignDeleteUrl,
            responseType:   'json',
            auth:  {
                username:   'bcUser',
                password:   'nope_you_will_never_know'
            },
            data:           campaign
        })

        if (response.error || response.status !== 204) {
            return response.error
        }

        // delete locally
        this.data[benefitCode].campaign.locations = locations

        return true
    }

    @action.bound
    addLocation({benefitCode, newLocation}) {
        const benefit       = this.data[benefitCode]
        const {campaign}    = benefit

        if (!(campaign.locations instanceof Array)) {
            benefit.campaign.locations = []
        }

        // refactor
        const getRandomInt = (min, max) => {
            min = Math.ceil(min)
            max = Math.floor(max)
            return Math.floor(Math.random() * (max - min + 1)) + min
        }
        newLocation.id      = getRandomInt(1, 9999)

        campaign.locations.push(newLocation)
        this.saveCampaign(campaign)
    }

    get foo() {
        return this.foo
    }

    set foo(value) {
        this.foo = value
        return true
    }

}
