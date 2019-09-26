/** @jsx jsx */
import { jsx } from 'theme-ui'
import { keyframes } from '@emotion/core'
import { useState, useEffect, useMemo } from 'react'
import LazyLoad from 'react-lazyload'

export default function LazyImage({ className, alt, src }) {
  const ratio = 100 // This is wrong
  return (
    <div
      className={className}
      sx={{
        position: 'relative',
        paddingBottom: `${ratio}%`,
        overflow: 'hidden',
        bg: 'primary'
      }}
    >
      <LazyLoad height="100%" offset={100}>
        <LayLoadedImage alt={alt} src={src} />
      </LazyLoad>
    </div>
  )
}

const fadeInAnimation = keyframes`from { opacity: 0 } to { opacity: 1 }`

function LayLoadedImage({ alt, src }) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const img = new Image()
    img.onload = () => setLoaded(true)
    img.src = src
  }, [src])

  if (loaded) {
    return (
      <img
        css={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          width: '100%',
          animation: `${fadeInAnimation} 200ms linear`
        }}
        alt={alt}
        src={src}
      />
    )
  }

  return null
}
