'use strict'

import React              from 'react'
import PropTypes          from 'prop-types'
import Component          from 'react-pure-render/component'
import {observer, inject} from 'mobx-react'

import FlatButton         from 'material-ui/FlatButton'
import IconCreate         from 'material-ui/svg-icons/content/create'

@inject('items', 'messages', 'view')
@observer
export default class ItemDetails extends Component {

    static propTypes = {
        // stores
        items:      PropTypes.object.isRequired,
        view:       PropTypes.object.isRequired,
        messages:   PropTypes.object.isRequired,
        // router
        match:      PropTypes.object.isRequired
    };

    constructor(props) {
        super(props)

        this.state = {
            editMode:   false
        }
    }

    renderValueOrInput(fieldName, noInput = false) {
        const {
            items:      itemStore,
            match:      {params: {id}},
            messages:   {fields: msg}
        }          = this.props
        const item = itemStore.data[id]
        let fieldValue, fieldTitle,
            innerJSX

        fieldValue = item[fieldName]
        fieldTitle = msg.items[fieldName]

        if (noInput || !this.state.editMode) {
            innerJSX = fieldValue || <i>Noch kein(e) {fieldTitle} vorhanden.</i>
        }
        else {
            innerJSX = (
                <input
                    style={{width: '100%'}}
                    type="textfield"
                    // no null values => force controlled input!
                    value={fieldValue || ''}
                    onChange={e => {
                        item[fieldName] = e.currentTarget.value
                    }}
                />
            )
        }
        return (
            <div className="itemsDetailsField">
                <span className="fieldName label">{fieldTitle}</span><br />
                {innerJSX}
                <br /><br />
            </div>
        )
    }

    toggleEditMode() {
        console.log('toggleEditMode called')
        this.setState({editMode: !this.state.editMode})
        return true
    }

    render() {
        const {
            match:      {params: {id}},
            messages:   {itemDetails: msg},
            view
        } = this.props

        const toggleEditMode = this.toggleEditMode.bind(this)

        return (
            <div id="detailView">
                <h3 style={{margin: 0}}>Detail für #{id}</h3>
                <br />

                {this.renderValueOrInput('id', true)}
                {this.renderValueOrInput('title')}
                {this.renderValueOrInput('description')}

                <FlatButton
                    style={{margin: '1.5rem 1rem 1rem 0'}}
                    backgroundColor="#666"
                    hoverColor="#999"
                    icon={<IconCreate />}
                    label={!this.state.editMode ? msg.edit : msg.save}
                    onClick={() => {
                        !this.state.editMode
                            ? toggleEditMode()
                            : view.confirmationDialog = {
                                open:       true,
                                title:      'Are you sure?',
                                content:    'Are you REALLY sure?',
                                action:     'close'
                            }
                    }}
                />
            </div>
        )
    }

}
