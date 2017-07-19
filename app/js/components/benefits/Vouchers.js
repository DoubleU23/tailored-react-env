'use strict'

import React              from 'react'
import PropTypes          from 'prop-types'
import Component          from 'react-pure-render/component'
import {observer, inject} from 'mobx-react'

import Paper              from 'material-ui/Paper'
import Dialog             from 'material-ui/Dialog'
import RaisedButton       from 'material-ui/RaisedButton'
import IconButton         from 'material-ui/IconButton'
import IconDelete         from 'material-ui/svg-icons/action/delete-forever'

@inject('benefits', 'messages', 'view')
@observer
export default class Vouchers extends Component {

    static propTypes = {
        // stores
        benefits:   PropTypes.object.isRequired,
        messages:   PropTypes.object.isRequired,
        view:       PropTypes.object.isRequired,
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
            addModalOpen: false
        }

        this.styles     = {
            voucherDeleteButton: {
                width:      '100%',
                height:     '100%',
                padding:    0,
                backgroundColor:    'rgba(153, 153, 153, 0.7)'
            },
            voucherDeleteButtonIcon: {
                width:          '76px',
                height:         '76px',
                boxShadow:      'rgba(0, 0, 0, 1) 0px 0px 150px',
                borderRadius:   '38px'
            },
            voucherPaper: {
                width:      '300px',
                height:     '150px',
                margin:     '0 10px 20px',
                display:    'inline-block'
            }
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
            benefits: benefitsStore,
            messages: {vouchers: msg}
        } = this.props

        const {vouchers} = campaign

        return (
            <div id="vouchers">
                <h3>
                    Gutscheine:&nbsp;
                    <a  href="#"
                        onClick={this.toggleAddModal.bind(this)}
                    >
                        {msg.addNew}
                    </a>
                </h3>

                <RaisedButton // ADD NEW BUTTON
                    backgroundColor="#666"
                    hoverColor="#999"
                    label={msg.addNew}
                    icon={<IconDelete />}
                    onClick={() => {
                        this.setState({addLocationOpen: true})
                    }}
                />

                <Dialog
                    title={msg.addNewDialog.title}
                    open={this.state.addModalOpen}
                    onRequestClose={this.toggleAddModal.bind(this)}
                >
                    <form id="voucherFileUpload">
                        <input
                            type="file"
                            multiple={false}
                            onChange={async e => {
                                const file      = e.target.files[0]
                                // tbd: get previewUrl by FileReader!?
                                // const reader    = new FileReader()
                                const response  = await benefitsStore.saveVoucher({id: benefitCode, file})
                                if (response.error) {
                                    // tbd: handle error
                                }
                                // const {voucherImage: imgUrl} = response
                                // this.setState({fileUrl: imgUrl})
                            }}
                        />
                    </form>
                    {/* <img src={this.state.fileUrl} /> */}
                </Dialog>
                {(vouchers == null || !vouchers.length)
                ?   <span>{msg.noVoucher}</span>
                :   vouchers.map(voucher => {
                    return (
                        <Paper
                            className="voucherPaper"
                            zDepth={3}
                            style={{
                                ...this.styles.voucherPaper,
                                background: 'transparent'
                                + ' url(' + voucher.voucherImage + ')'
                                + ' center center / cover no-repeat'
                            }}
                        >
                            <IconButton
                                key={'voucherDeleteButton_' + location.id}
                                className="voucherPaperDelete"
                                onClick={() => {
                                    this.props.view.confirmationDialog = {
                                        open:       true,
                                        content:    'Wollen Sie den Gutschein wirklich löschen?',
                                        action:     () => {
                                            benefitsStore.deleteVoucher({
                                                benefitCode,
                                                voucherId: voucher.id
                                            })
                                            this.props.view.confirmationDialog.open = false
                                        }
                                    }
                                }}
                                style={this.styles.voucherDeleteButton}
                                iconStyle={this.styles.voucherDeleteButtonIcon}
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
