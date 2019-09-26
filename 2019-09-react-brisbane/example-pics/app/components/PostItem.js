/** @jsx jsx */
import { jsx } from 'theme-ui'
import Link from 'next/link'

import LazyImage from './LazyImage'
import Tag from './Tag'

export default function PostItem({ id, title, tags, image }) {
  return (
    <Link href={`/post/${id}`} passHref>
      <a
        sx={{
          display: 'block',
          color: 'inherit',
          textDecoration: 'none',
          transition: 'all 200ms',
          cursor: 'pointer',
          bg: 'white',
          boxShadow: '0 20px 20px rgba(0,0,0,.08)',
          '&:hover, &:focus': {
            transform: 'translateY(-10px)',
            boxShadow: '0 40px 40px rgba(0,0,0,.16)'
          }
        }}
      >
        <article>
          <LazyImage src={image.thumbnail} alt={title} />
          <div sx={{ py: 4, px: 4 }}>
            <h3 sx={{ m: 0, fontSize: 5, fontWeight: 'bold', mb: 3 }}>
              {title}
            </h3>
            <div
              sx={{
                display: 'grid',
                gridAutoFlow: 'column',
                gridGap: 2,
                justifyContent: 'start'
              }}
            >
              {tags.map(({ name }, i) => (
                <Tag key={i}>#{name}</Tag>
              ))}
            </div>
          </div>
        </article>
      </a>
    </Link>
  )
}
