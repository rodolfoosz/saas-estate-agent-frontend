'use client'

import { useEffect, useState } from 'react'
import FullScreenLoader from './FullScreenLoader'

interface Props {
  loading: boolean
  delay?: number
}

export default function DelayedLoader({ loading, delay = 400 }: Props) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    let timer: NodeJS.Timeout

    if (loading) {
      timer = setTimeout(() => setShow(true), delay)
    } else {
      setShow(false)
    }

    return () => clearTimeout(timer)
  }, [loading, delay])

  return show ? <FullScreenLoader /> : null
}
