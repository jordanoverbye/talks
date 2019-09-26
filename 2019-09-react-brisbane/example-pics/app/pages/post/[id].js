/** @jsx jsx */
import { Fragment } from 'react'
import { jsx, Container } from 'theme-ui'
import { Global } from '@emotion/core'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { withApollo } from '../../lib/apollo'
import PostItem from '../../components/PostItem'

const GET_POST_QUERY = gql`
  query GET_POST($id: ID!) {
    Post(where: { id: $id }) {
      id
      title
      color
      image {
        thumbnail: publicUrlTransformed(
          transformation: {
            quality: "auto:best"
            width: "1600"
            height: "1600"
          }
        )
      }
      tags {
        name
      }
    }
  }
`

function PostPage() {
  const {
    query: { id }
  } = useRouter()
  const { loading, error, data } = useQuery(GET_POST_QUERY, {
    variables: {
      id
    }
  })

  if (error) return <p>Error</p>
  if (loading) return <div>Loading</div>

  const { Post } = data

  return (
    <Fragment>
      <Head>
        <title>{Post.title} — Pics of Billy</title>
      </Head>
      <Global
        styles={{
          body: {
            backgroundColor: Post.color
          }
        }}
      />
      <Container as="section" sx={{ pt: 0, pb: 4 }}>
        <Link href="/">
          <a>Back Home</a>
        </Link>
      </Container>
      <Container as="section" sx={{ pb: 6 }}>
        <PostItem {...Post} />
      </Container>
    </Fragment>
  )
}

export default withApollo(PostPage)
