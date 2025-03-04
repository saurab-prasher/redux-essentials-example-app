import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'
import { postUpdated } from './postsSlice'
import { selectPostById } from './postsSlice'

const EditPostForm = ({ match }) => {
  const { postId } = match.params
  const post = useSelector(selectPostById)

  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)

  const dispatch = useDispatch()
  const history = useHistory()
  const onTitleChanged = (e) => setTitle(e.target.value)
  const onContentChanged = (e) => setContent(e.target.value)

  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(postUpdated({ id: postId, title, content }))
      history.push(`/posts/${postId}`)
    }
  }
  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">
          Post title:
          <input
            type="text"
            id="postTitle"
            name="postTitle"
            placeholder="What's on your mind"
            value={title}
            onChange={onTitleChanged}
          />
        </label>

        <label htmlFor="postContent">Content:</label>

        <textarea
          value={content}
          onChange={onContentChanged}
          name="postContent"
          id="postContent"
        />

        <button type="button" onClick={onSavePostClicked}>
          Save Post
        </button>
      </form>
    </section>
  )
}

export default EditPostForm
