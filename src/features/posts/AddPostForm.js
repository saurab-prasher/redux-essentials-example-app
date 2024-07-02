import React, { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'
import { addNewPost } from './postsSlice'

const AddPostForm = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)

  const onTitleChanged = (e) => setTitle(e.target.value)
  const onContentChanged = (e) => setContent(e.target.value)
  const onAuthorChanged = (e) => setUserId(e.target.value)

  const canSave =
    [title, content, userId].every(Boolean) && addRequestStatus === 'idle'

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        setAddRequestStatus('pending')
        await dispatch(addNewPost({ title, content, user: userId })).unwrap()
        setTitle('')
        setContent('')
        setUserId('')
      } catch (err) {
        console.log('Failed to save the post: ' + err)
      } finally {
        setAddRequestStatus('idle')
      }
    }

    const userOptions = users.map((user) => {
      return (
        <option key={user.id} value={user.id}>
          {user.name}
        </option>
      )
    })
    return (
      <section>
        <h2>Add a New post</h2>
        <form>
          <label htmlFor="postTitle">Post title:</label>

          <input
            type="text"
            id="postTitle"
            name="postTitle"
            value={title}
            onChange={onTitleChanged}
          />

          <label htmlFor="postAuthor">Author:</label>
          <select name="postAuthor" id="postAuthor" onChange={onAuthorChanged}>
            <option value=""></option>
            {userOptions}
          </select>

          <label htmlFor="postContent">Content:</label>

          <textarea
            value={content}
            onChange={onContentChanged}
            name="postContent"
            id="postContent"
          />

          <button disabled={!canSave} onClick={onSavePostClicked} type="button">
            Save Post
          </button>
        </form>
      </section>
    )
  }
}
export default AddPostForm
