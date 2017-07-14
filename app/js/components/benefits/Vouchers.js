'use strict'

import React              from 'react'
import PropTypes          from 'prop-types'
import Component          from 'react-pure-render/component'
import {observer, inject} from 'mobx-react'

// import { Redirect }    from 'react-router'
import {
    observable,
    extendObservable,
    action
}                         from 'mobx'

import RaisedButton       from 'material-ui/RaisedButton'
import Paper              from 'material-ui/Paper'
import Dialog             from 'material-ui/Dialog'

import {DropUploader}     from 'react-file-upload'

if (process.env.IS_BROWSER) {
    require('../../../styles/react-file-upload.styl')
}

import appConfig from '../../../../config/appConfig'
const {
    api: {base: apiBase, endpoints: {vouchers: voucherEndpoint}}
} = appConfig

@inject('benefits', 'messages')
@observer
export default class Vouchers extends Component {

    static propTypes = {
        campaign: PropTypes.object.isRequired
        // custom
    }

    constructor(props) {
        super(props)

        this.state = {
            addModalOpen: false,
            fileUrl:      ''
        }
    }

    toggleAddModal() {
        this.setState({
            addModalOpen: !this.state.addModalOpen
        })
    }

    render() {
        const {vouchers} = this.props.campaign
        console.log(vouchers != null)

        return (
            <div id="locations">
                <h3>
                    Gutscheine:&nbsp;
                    <a  href="#"
                        onClick={this.toggleAddModal.bind(this)}
                    >
                        hinzufügen
                    </a>
                </h3>
                <Dialog
                    title="Add new Voucher"
                    open={this.state.addModalOpen}
                    onRequestClose={this.toggleAddModal.bind(this)}
                >
                    <input
                        type="file"
                        multiple={false}
                        onChange={e => {
                            console.log('[handleUpload] file', e.target.files)
                            const file = e.target.files[0]

                            const fileData = FileReader(file)
                            console.log('[handleUpload] fileData', fileData)
                        }}
                    />

                    <img src={this.state.fileUrl} />

                    {/* <DropUploader
                        url={apiBase + voucherEndpoint}
                        uploadHandler={(file, that) => {
                            console.log('[handleUpload] file', file)

                            const objectURL = URL.createObjectURL(file)
                            console.log('[handleUpload] thatobjectURL', objectURL)
                        }}
                        onChange={(e, handleFileChange) => {
                            console.log('[handleUpload] files', e.target.files)
                        }}
                    /> */}
                </Dialog>
                {(vouchers == null || !vouchers.length)
                ?   <span>Noch keine Gutscheine vorhanden</span>
                :   vouchers.map(location => {
                    return (
                        <Paper
                            className="locationPaper"
                            zDepth={3}
                            style={{
                                padding: '1.5rem 1rem',
                                margin: '0 10px 20px',
                                display: 'inline-block'
                            }}
                        >
                            kdsapojfposea
                        </Paper>
                    )
                })}
            </div>
        )
    }

}