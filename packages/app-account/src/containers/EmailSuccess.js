import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col, Well } from 'react-bootstrap'
import { interbitRedux } from 'interbit-ui-tools'
import { PRIVATE } from '../constants/chainAliases'

const { chainDispatch, selectors } = interbitRedux

const mapStateToProps = state => {
  const chainState = selectors.getChain(state, { chainAlias: PRIVATE })
  if (!chainState) {
    return {
      profile: {},
      blockchainDispatch: () => {}
    }
  }

  return {
    profile: chainState.profile
  }
}

const mapDispatchToProps = dispatch => ({
  blockchainDispatch: action => dispatch(chainDispatch(PRIVATE, action))
})

export class EmailSuccess extends Component {
  render() {
    return (
      <Grid>
        <div className="ibweb-page">
          <Row>
            <Col md={2} />
            <Col md={8}>
              <h1>Success! Check your email for the link to continue.</h1>
              <div className="ibweb-intro">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={2} />
            <Col md={8}>
              <Well className="ibweb-well email">
                Sent to email@emailprovider.com
              </Well>
            </Col>
          </Row>
        </div>
      </Grid>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmailSuccess)
