/** @jsx jsx */
import { Fragment } from 'react'
import { jsx, Container } from 'theme-ui'
import { useQuery } from '@apollo/react-hooks'
import Head from 'next/head'
import gql from 'graphql-tag'
import { withApollo } from '../lib/apollo'
import PostItem from '../components/PostItem'

const ALL_POSTS_QUERY = gql`
  query ALL_POSTS {
    allPosts {
      id
      title
      image {
        thumbnail: publicUrlTransformed(
          transformation: { quality: "auto:best", width: "800", height: "800" }
        )
      }
      tags {
        name
      }
    }
  }
`

function IndexPage() {
  const { loading, error, data } = useQuery(ALL_POSTS_QUERY)

  if (error) {
    return <Container as="section">{error}</Container>
  }

  if (loading) {
    return <Container as="section">{loading}</Container>
  }

  const { allPosts } = data

  return (
    <Fragment>
      <Head>
        <title>Pics of Billy</title>
      </Head>
      <Container
        as="section"
        sx={{
          display: 'grid',
          gridAutoFlow: 'row',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gridGap: 4,
          pb: 6
        }}
      >
        {allPosts.map(post => (
          <PostItem {...post} key={post.id} />
        ))}
      </Container>
    </Fragment>
  )
}

export default withApollo(IndexPage)
