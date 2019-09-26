/** @jsx jsx */
import { jsx } from 'theme-ui'

export default function Tag(props) {
  return (
    <span
      sx={{
        lineHeight: 1,
        fontSize: 1,
        py: 2,
        px: 3,
        bg: 'primary',
        borderRadius: 20
      }}
      {...props}
    />
  )
}
