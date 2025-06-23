'use client'

import { useEffect, useState } from 'react'
import FullScreenLoader from './FullScreenLoader'

interface Props {
  loading: boolean
  delay?: number
}

export default function DelayedLoader({ loading }: Props) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    let timer: NodeJS.Timeout

    if (loading) {
      timer = setTimeout(() => setShow(true))
    } else {
      setShow(false)
    }

    return () => clearTimeout(timer)
  }, [loading])

  return show ? <FullScreenLoader /> : null
}
