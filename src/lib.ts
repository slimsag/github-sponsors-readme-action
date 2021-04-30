import {info, setFailed} from '@actions/core'
import {action, ActionInterface} from './constants'
import {retrieveData, generateTemplate} from './fetch'

/** Initializes and runs the action.
 *
 * @param {ActionInterface} configuration - The configuration object.
 */
export default async function run(
  configuration: ActionInterface
): Promise<void> {
  let errorState = false

  const settings = {
    ...action,
    ...configuration
  }

  try {
    info(`
    Sponsorship Action TODO: 📦 🚚
    
    📣 Maintained by James Ives (https://jamesiv.es)`)

    info('Checking configuration and initializing… 🚚')

    const response: any = await retrieveData()

    console.log(
      response.data.viewer.sponsorshipsAsMaintainer,
      response.data.viewer.sponsorshipsAsMaintainer.nodes[0]
    )

    generateTemplate(response)
  } catch (error) {
    errorState = true
    setFailed(error.message)
  } finally {
    info(
      `${
        errorState
          ? 'There was an error fetching the data. ❌'
          : 'The data was succesfully retrieved and saved! ✅ 🚚'
      }`
    )
  }
}
