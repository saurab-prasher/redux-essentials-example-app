import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom/cjs/react-router-dom'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'
import { selectPostById } from './postsSlice'

const SinglePostPage = ({ match }) => {
  const { postId } = match.params

  const post = useSelector(selectPostById)

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }
  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <PostAuthor userId={post?.user} /> -
        <TimeAgo timestamp={post.date} />
        <ReactionButtons post={post} />
        <p className="post-content">{post.content}</p>
        <Link to={`/editPost/${post.id}`} className="button">
          Edit Post
        </Link>
      </article>
    </section>
  )
}

export default SinglePostPage
