import React              from 'react'
import Component          from 'react-pure-render/component'
import PropTypes          from 'prop-types'

import {inject, observer} from 'mobx-react'

import Drawer             from 'material-ui/Drawer'
import RaisedButton       from 'material-ui/RaisedButton'

if (process.env.IS_BROWSER) {
    require('./Sidebar.styl')
}

@inject('view', 'messages')
@observer
export default class SideBar extends Component {

    static propTypes = {
        // stores
        view:       PropTypes.object.isRequired,
        messages:   PropTypes.object.isRequired,
        // content
        children:   PropTypes.object.isRequired,
        // custom
        title:      PropTypes.string,
        subTitle:   PropTypes.string
    }

    render() {
        const {
            view:       viewStore,
            messages:   {sideBar: msg},
            title, subTitle
        } = this.props

        return (
            <Drawer
                containerClassName="sidebar"
                open={viewStore.sideBar.isOpen}
                openSecondary={true} // open on right side
                containerStyle={{
                    padding: '1rem 0.5rem',
                    backgroundColor: '#fff'
                }}
            >
                <h2 className="title">
                    {title || msg.title}
                    {subTitle &&
                    <span className="subTitle">{subTitle}</span>}
                </h2>

                {this.props.children}

                <RaisedButton
                    label="Close"
                    style={{width: '100%', marginTop: '1rem'}}
                    onClick={() => {
                        viewStore.sideBar.isOpen = false
                    }}
                />
            </Drawer>
        )
    }

}
