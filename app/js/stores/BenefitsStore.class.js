import Promise from 'bluebird'
import axios          from 'axios'
import axiosWrapped   from '../../../utils/axiosWrapped'

import {TimeoutError} from '../../../utils/Exceptions'

import objectAssign   from 'object-assign-deep'

import {
    observable,
    extendObservable,
    action
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
            data:       observable({}),
            fetched:    false // false || timestamp
        }, state)

        if (process.env.IS_BROWSER) {
            window.BenefitsStore = this
        }
    }

    sortData(data) {
        const dataSorted = {}
        data.forEach(benefit => {
            dataSorted[benefit.benefitCode] = benefit
            dataSorted[benefit.benefitCode].patched = Date.now()
        })
        console.log('this.data SORTED:', dataSorted)
        return dataSorted
    }

    @action
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
        this.data[id] = objectAssign(this.data[id], benefitObj)
        this.data[id].didPatch = Date.now()

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
        if (process.env.BUILD_STATIC) {
            response      = {status: 200}
            response.data = require('../../../static/benefits.js').default
        }
        else {
            response = await axiosWrapped('get', benefitsUrl, {
                responseType: 'json',
                auth: {
                    username: 'bcUser',
                    password: 'nope_you_will_never_know'
                }
            })
        }

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
            // simulate server delay
            setTimeout(() => {
                this.data    = this.sortData(response.data)
                this.status  = 'success'
                this.fetched = Date.now()
            }, 1000)

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

    @action
    async saveCampaign(campaign) {
        console.log('savingCampaign?', campaign)

        let campaignUrl     = apiBase + campaignEndpoint + '/' + campaign.benefitCode,
            response        = await axiosWrapped(false, false, {
                method: 'patch',
                url:    campaignUrl,
                responseType: 'json',
                auth:  {
                    username: 'bcUser',
                    password: 'nope_you_will_never_know'
                },
                data:   campaign
            })

        return response
    }

    get foo() {
        return this.foo
    }

    set foo(value) {
        this.foo = value
        return true
    }

}