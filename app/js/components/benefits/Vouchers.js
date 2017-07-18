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
import IconButton         from 'material-ui/IconButton'
import IconDelete         from 'material-ui/svg-icons/action/delete-forever'
import IconCreate         from 'material-ui/svg-icons/content/create'

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
        benefits: PropTypes.object.isRequired,
        // custom
        campaign: PropTypes.object.isRequired,
        id:       PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]).isRequired
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
        const {
            id: benefitCode,
            campaign,
            benefits: benefitsStore
        } = this.props

        const {vouchers, campaignId} = campaign
        console.log(campaign)

        return (
            <div id="vouchers">
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
                    <form id="voucherFileUpload">
                        <input
                            type="file"
                            multiple={false}
                            onChange={e => {
                                console.log('[handleUpload] file', e.target.files)
                                const file      = e.target.files[0]
                                const reader    = new FileReader()
                                // reader.readAsBinaryString(file)
                                // console.log('[handleUpload] file.readAsBinaryString()', reader)
                                // this.setState({fileUrl: reader.result})
                                benefitsStore.saveVoucher({benefitCode, file})
                                // const fileData = new FileReader(file)
                            }}
                        />
                    </form>

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
                :   vouchers.map(voucher => {
                    return (
                        <Paper
                            className="voucherPaper"
                            zDepth={3}
                            style={{
                                width:      '300px',
                                height:     '150px',
                                margin:     '0 10px 20px',
                                display:    'inline-block',
                                background: 'transparent '
                                + 'url(' + voucher.voucherImage + ') '
                                + 'center center / cover no-repeat'
                            }}
                        >
                            <IconButton
                                key={'voucherDeleteButton_' + location.id}
                                className="voucherPaperDelete"
                                // tooltip={'Gutschein löschen'}
                                // tooltipPosition="top-right"
                                onClick={() => {
                                    benefitsStore.deleteVoucher({
                                        benefitCode,
                                        voucherId: voucher.id
                                    })
                                }}
                                style={{width: '100%', height: '100%', padding: 0, backgroundColor: 'rgba(153, 153, 153, 0.7)'}}
                                iconStyle={{
                                    width:          '76px',
                                    height:         '76px',
                                    boxShadow:      'rgba(0, 0, 0, 1) 0px 0px 150px',
                                    borderRadius:   '38px'
                                }}
                            >
                                <IconDelete />
                            </IconButton>
                        </Paper>
                    )
                })}
            </div>
        )
    }

}
