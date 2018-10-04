import React, { Component } from 'react'
import { Grid } from 'react-bootstrap'
import { Header, Logo, IBIcon } from 'interbit-ui-components'
import { Switch, Route } from 'react-router-dom'

import NotFound from './containers/NotFoundPage'
import InteractiveChains from './containers/InteractiveChains'
import ExploreChain from './containers/ExploreChain'
import TodoList from './containers/TodoList'

import './css/index.css'
import navigation from './constants/navigation'
import paths from './constants/paths'

export default class App extends Component {
  render() {
    return (
      <div className="App ibweb app-todo-list">
        <Header
          navItems={navigation.headerNav}
          logo={<Logo className="sm hidden-xs" />}
          logoSm={<IBIcon className="visible-xs hidden-sm" />}
        />
        <Grid>
          <Switch>
            <Route exact path={paths.HOME} component={TodoList} />
            <Route exact path={paths.CHAINS} component={InteractiveChains} />
            <Route path={paths.BLOCK_EXPLORER} component={ExploreChain} />
            <Route exact path={paths.TODO_LIST} component={TodoList} />
            <Route component={NotFound} />
          </Switch>
        </Grid>
      </div>
    )
  }
}
