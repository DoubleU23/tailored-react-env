'use strict'

import React               from 'react'
import PropTypes           from 'prop-types'
import Component           from 'react-pure-render/component'
import {observer, inject}  from 'mobx-react'

@inject('benefits')
@observer
export default class BenetfitsList extends Component {

    static propTypes = {
        history:    PropTypes.object.isRequired,
        benefits:   PropTypes.object.isRequired
    };

    renderBenefits() {
        const {benefits: {data}, history} = this.props

        return (
            <div id="beneftisListInner">

                {Object.keys(data).map((id, i) => {
                    const benefit           = data[id]
                    const imgUrlSmall       = benefit.image.alternateSizeUrls[512]
                    const backgroundStyle   = {background: 'transparent url(' + imgUrlSmall + ') 0 0 / cover  no-repeat'}

                    const hasCampaign       = typeof benefit.campaign === 'object'
                                           && benefit.campaign.campaignId

                    return (
                        <div
                            onClick={() => history.push('./benefits/' + id)}
                            key={'benefitListElement_' + id}
                            className="benefitListElement"
                            style={backgroundStyle}
                         >
                            <div className="benefitListElementOverlay">
                                <span className="benefitListElementTitle">{benefit.title}</span>
                                <span className="benefitListElementInfo">
                                    <b>ID: </b>{id}<br />
                                    <b>Kampagne: </b>{hasCampaign ? benefit.campaign.campaignId : 'keine'}
                                </span>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }

    render() {
        const {benefits} = this.props

        return (
            <div id="benefitsList">
                {benefits.status !== 'success'
                && <div>loading...</div>
                || this.renderBenefits()/* this.renderBenefits() */}
            </div>
        )
    }

}
