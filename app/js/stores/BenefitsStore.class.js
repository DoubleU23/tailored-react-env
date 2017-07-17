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
            campaigns:  campaignEndpoint
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
            const id = benefit.benefitCode

            dataSorted[id]         = benefit
            dataSorted[id].patched = Date.now()
            if (typeof dataSorted[id].campaign !== 'object') {
                dataSorted[id].campaign = {locations: []}
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

        if (hasCampaign && !campaignHasBenefitId) {
            benefitObj.campaign.id          = benefitObj.benefitCode
            benefitObj.campaign.benefitCode = benefitObj.benefitCode
        }
        this.data[id]           = extendObservable(this.data[id], toJS(benefitObj))
        this.data[id].patched   = Date.now()

        return this.data[id]
    }

    @action
    async fetch() {
        const benefitsUrl   = apiBase + benefitsEndpoint

        // console.log('[BenefitsStore] apiBase', apiBase)
        console.log('[BenefitsStore] benefitsUrl', benefitsUrl)

        this.status   = 'loading'
        this.error    = false

        console.log('process.env.BUILD_STATIC', [process.env.BUILD_STATIC])

        // refactor: workaround to static build
        // serve JSON directly
        let response

        response = await axiosWrapped('get', benefitsUrl, {
            responseType: 'json',
            auth: {
                username: 'bcUser',
                password: 'nope_you_will_never_know'
            }
        })

        console.log('BenefitsStore isError?', [response.error])
        console.log('BenefitsStore response', [response])
        console.log('BenefitsStore response.message', [response.message])

        if (response.error) {
            this.error = response.error
            this.status = 'error'
            // timeoutError !?
            console.log('[BenefitsStore.catch(err)]', this.error)
            if (this.error instanceof TimeoutError) {
                // special handling of TimeoutError?
            }
            // refactor: return or throw here!?
            // return response
            return response
        }

        if (response && response.status === 200) {
            // simulate Loading state
            // refactor: remove!
            setTimeout(() => {
                this.data    = this.prepareData(response.data)
                this.status  = 'success'
                this.fetched = Date.now()
            }, 800)


            // return Promise.resolve(response.data)
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
        // refactor the createNew!?

        let urlSuffix       = campaign.createNew ? '' : '/' + campaign.benefitCode,
            campaignUrl     = apiBase + campaignEndpoint + urlSuffix,
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
        console.log(this.data[id].campaign)
        const campaignDeleteUrl = apiBase + campaignEndpoint + '/' + id
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

    get foo() {
        return this.foo
    }

    set foo(value) {
        this.foo = value
        return true
    }

}
