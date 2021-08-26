import 'react-app-polyfill/ie11'
import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { useSunVox } from '../src'
import { useEffect, useState } from 'react'

const App = () => {
  const [sunvox, setReady] = useSunVox()
  const isLoaded = Boolean(sunvox)

  const [isInitialized, setIsInitialized] = useState(false)

  const initializeClicked = () => {
    sunvox.sv_init(0, 44100, 2, 0)
    setIsInitialized(true)
  }

  const deinitializeClicked = () => {
    sunvox.sv_deinit()
    setIsInitialized(false)
  }

  const closeAndOpenSlotClicked = () => {
    sunvox.sv_close_slot(0)
    sunvox.sv_open_slot(0)
  }

  const loadProjectClicked = () => {
    const req = new XMLHttpRequest()
    req.open("GET", "/NightRadio - machine 0005.sunvox", true)
    req.responseType = "arraybuffer"
    req.onload = function() {
      if (this.status !== 200) {
        return
      }
      const arrayBuffer = this.response
      if (!arrayBuffer) {
        return
      }
      const byteArray = new Uint8Array(arrayBuffer)
      sunvox.sv_load_from_memory(0, byteArray)
    }
    req.send(null)
  }

  const playFromBeginningClicked = () => {
    sunvox.sv_play_from_beginning(0)
  }

  const stopClicked = () => {
    sunvox.sv_stop(0)
  }

  const initializeButton = <button disabled={isInitialized} onClick={initializeClicked}>Initialize</button>
  const deinitializeButton = <button disabled={!isInitialized} onClick={deinitializeClicked}>Deinitialize</button>
  const closeAndOpenSlotButton = <button disabled={!isInitialized} onClick={closeAndOpenSlotClicked}>Close and Open
    Slot</button>
  const loadProjectButton = <button disabled={!isInitialized} onClick={loadProjectClicked}>Load Project</button>
  const playFromBeginningButton = <button disabled={!isInitialized} onClick={playFromBeginningClicked}>Play From
    Beginning</button>
  const stopButton = <button disabled={!isInitialized} onClick={stopClicked}>Stop</button>

  useEffect(() => {
    setReady(true)
    return () => {
      setReady(false)
    }
  })

  return (
    <div>
      {
        isLoaded ? <div>
          {initializeButton}
          {deinitializeButton}
          {closeAndOpenSlotButton}
          {loadProjectButton}
          {playFromBeginningButton}
          {stopButton}
        </div> : <p>Loading SunVox library...</p>
      }

    </div>
  )
}

ReactDOM.render(<App/>, document.getElementById('root'))
