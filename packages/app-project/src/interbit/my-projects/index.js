// © 2018 BTL GROUP LTD -  This package is licensed under the MIT license https://opensource.org/licenses/MIT
const Immutable = require('seamless-immutable')
const {
  coreCovenant: {
    redispatch,
    remoteRedispatch,
    actionCreators: { createChildChain, startConsumeState }
  },
  rootCovenant: { reducer: rootReducer }
} = require('interbit-covenant-tools')

const sampleProjectList = require('./sampleProjects')
const interbitServices = require('./interbitServices')

const { actionTypes, actionCreators } = require('./actions')

const {
  actionCreators: projectActionCreators,
  authorizedRemoteActions
} = require('./projectActions')

const initialState = Immutable.from({
  // Shown in list of running chains
  chainMetadata: { chainName: 'My Projects' },

  // Basic account details for the owner of the chain
  // In future, this will be obtained from the account chain
  ownerProfile: {},

  // Projects owned by this user
  // Populated by read joins from the individual projects
  // Initially populated with sample projects
  myProjects: {},

  // Sample projects
  // TODO: Provide from the public chain
  sampleProjects: sampleProjectList,

  // TODO: Move to the public chain and provide using a read join to the DNS chain
  dns: {
    interbitServices
  }
})

const reducer = (state = initialState, action) => {
  if (action.type.endsWith('STROBE')) {
    return state
  }

  let nextState = rootReducer(state, action)
  console.log(action)
  switch (action.type) {
    case actionTypes.AUTHORIZED: {
      console.log('DISPATCH: ', action)
      const { providerChainId, joinName } = action.payload

      const consumeAction = startConsumeState({
        provider: providerChainId,
        mount: ['ownerProfile'],
        joinName
      })

      console.log('REDISPATCH: ', consumeAction)
      nextState = redispatch(nextState, consumeAction)
      return nextState
    }

    case actionTypes.CREATE_PROJECT: {
      console.log('DISPATCH: ', action)
      const {
        projectAlias,
        projectName,
        description,
        icon,
        launchUrl,
        sponsorChainConfig
      } = action.payload

      return createProjectChain(
        nextState,
        {
          projectAlias,
          projectName,
          description,
          icon,
          launchUrl
        },
        sponsorChainConfig
      )
    }

    case actionTypes.CREATE_SAMPLE_PROJECT: {
      console.log('DISPATCH: ', action)
      const { sampleProjectName, sponsorChainConfig } = action.payload
      const sampleProjectToCreate = findMatchingSampleProject(
        state,
        sampleProjectName
      )

      if (sampleProjectToCreate) {
        const {
          projectAlias,
          projectName,
          description,
          icon,
          launchUrl
        } = sampleProjectToCreate

        return createProjectChain(
          nextState,
          {
            projectAlias,
            projectName,
            description,
            icon,
            launchUrl
          },
          sponsorChainConfig
        )
      }

      return state
    }

    case actionTypes.CREATE_SAMPLE_PROJECTS: {
      console.log('DISPATCH: ', action)
      const { sponsorChainConfig } = action.payload
      const missingSampleProjects = findMissingSampleProjects(state)

      if (missingSampleProjects.length) {
        for (let i = 0; i < missingSampleProjects.length; i += 1) {
          const {
            projectAlias,
            projectName,
            description,
            icon,
            launchUrl
          } = missingSampleProjects[i]

          nextState = createProjectChain(
            nextState,
            {
              projectAlias,
              projectName,
              description,
              icon,
              launchUrl
            },
            sponsorChainConfig
          )
        }
        return nextState
      }

      return state
    }

    case actionTypes.FORWARD_ACTION_TO_PROJECT: {
      console.log('DISPATCH: ', action)

      const { projectAlias, actionToForward } = action.payload

      const projectChainId =
        state.getIn(['interbit', 'children', projectAlias, 'blockHash']) ||
        state.getIn(['interbit', 'newChildren', projectAlias, 'blockHash'])

      if (!projectChainId) {
        console.log(`Unknown project alias: ${projectAlias}`)
        throw new Error(`Unknown project alias: ${projectAlias}`)
      }

      if (!isValidProjectAction(state, actionToForward)) {
        console.log(`Invalid project action: ${actionToForward}`)
        throw new Error(`Invalid project action: ${actionToForward}`)
      }

      console.log('REMOTE DISPATCH: ', projectChainId, actionToForward)
      return remoteRedispatch(state, projectChainId, actionToForward)
    }

    default:
      return nextState
  }
}

const createProjectChain = (
  state,
  { projectAlias, projectName, description, icon, launchUrl },
  { covenantHash: childCovenantHash, sponsorChainId, blockMaster } = {}
) => {
  let nextState = state

  console.log('CREATING PROJECT CHAIN: ')
  const createChildChainAction = createProjectChainAction({
    projectAlias,
    childCovenantHash,
    sponsorChainId,
    blockMaster
  })

  console.log('REDISPATCH: ', createChildChainAction)
  nextState = redispatch(state, createChildChainAction)

  const updateChildChainAction = projectActionCreators.updateProject({
    projectName,
    description,
    icon,
    launchUrl
  })
  const forwardAction = actionCreators.forwardActionToProject({
    projectAlias,
    action: updateChildChainAction
  })

  console.log('REDISPATCH: ', forwardAction)
  nextState = redispatch(nextState, forwardAction)

  return nextState
}

const createProjectChainAction = ({
  projectAlias,
  childCovenantHash,
  sponsorChainId,
  blockMaster
}) => {
  const directoryJoinName = `Directory-${projectAlias}`

  return createChildChain({
    childAlias: projectAlias,
    parentShareConfig: {
      provide: [],
      consume: [
        {
          alias: projectAlias,
          path: ['myProjects', projectAlias],
          joinName: directoryJoinName
        }
      ],
      sendActionTo: [{ alias: projectAlias }],
      receiveActionFrom: []
    },
    childShareConfig: {
      provide: [
        {
          alias: 'parent',
          path: ['directoryEntry'],
          joinName: directoryJoinName
        }
      ],
      consume: [],
      sendActionTo: [],
      receiveActionFrom: [
        {
          alias: 'parent',
          authorizedActions: authorizedRemoteActions
        }
      ]
    },
    childCovenantHash,
    sponsorChainId,
    blockMaster
  })
}

const isValidProjectAction = (state, action) =>
  action &&
  action.type &&
  action.payload &&
  authorizedRemoteActions.indexOf(action.type) > -1

const findMatchingSampleProject = (state, sampleProjectName) =>
  state.sampleProjects.find(
    sampleProject => sampleProject.projectName === sampleProjectName
  )

const findMatchingProject = (state, projectName) =>
  Object.values(state.myProjects).find(
    project => project.projectName === projectName
  )

const findMissingSampleProjects = state =>
  state.sampleProjects.filter(
    sampleProject => !findMatchingProject(state, sampleProject.projectName)
  )

module.exports = {
  actionCreators,
  initialState,
  reducer
}
