'use strict'

import PropTypes           from 'prop-types'
import Component           from 'react-pure-render/component'
import {observer, inject}  from 'mobx-react'

@inject('items')
@observer
export default class ItemsList extends Component {

    static propTypes = {
        history:    PropTypes.object.isRequired,
        items:      PropTypes.object.isRequired
    }

    renderItems() {
        const {items: {data}, history} = this.props

        return (
            <div id="itemListInner">
                {Object.keys(data).map((id, i) => {
                    const item               = data[id]
                    // const imgUrlSmall     = item.image.alternateSizeUrls[512]
                    // const backgroundStyle = {background: 'transparent url(' + imgUrlSmall + ') 0 0 / cover  no-repeat'}

                    const hasSubObj          = typeof item.subObject === 'object'
                                            && item.subObject.id

                    return (
                        <div
                            className="itemListElement"
                            onClick={() => history.push('./items/' + id)}
                            key={'itemListElement_' + id}
                            // style={backgroundStyle}
                         >
                            <div className="itemListElementOverlay">
                                <span className="itemListElementTitle">{item.title}</span>
                                <span className="itemListElementInfo">
                                    <b>ID: </b>{id}<br />
                                    <b>SubObj: </b>{hasSubObj ? item.subObject.id : 'keine'}
                                </span>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }

    render() {
        const {items} = this.props

        return (
            <div id="itemList">
                {items.status !== 'success'
                ? <div>loading...</div>
                : this.renderItems()}
            </div>
        )
    }

}
