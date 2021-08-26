import { useEffect, useState } from 'react'
import { svlib } from './sunvox-lib-loader'
import * as library from './sunvox-lib-loader'

export const useSunVox = ({
  initialSunvox,
  initialReady = false,
}: {
  initialSunvox?: any
  initialReady?: Boolean
} = {}) => {
  const [sunvox, setSunvox] = useState(initialSunvox)
  const [ready, setReady] = useState(initialReady)
  useEffect(() => {
    console.log('ready', ready)
    if (ready) {
      svlib()
      setSunvox(library)
    }
  }, [ready])
  useEffect(() => {
    console.log('sunvox', sunvox)
  }, [sunvox])
  return [sunvox, setReady]
}
