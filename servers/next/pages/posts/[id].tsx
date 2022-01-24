import Layout from '../../components/layout'
import { getAllPostIds, getPostData, PostData } from '../../lib/posts'

export default function Post({ postData }: { postData: PostData }) {
  return (
    <Layout>
      {postData.title}
      <br />
      {postData.id}
      <br />
      {postData.date}
    </Layout>
  )
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const postData = getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

