import { useEffect } from 'react'
import  "../auth/styles/feed.scss"
import NewPost from '../../components/NewPost'
import { usePost } from '../hook/usePost'
const Feed = () => {
  const {feed,handleGetFeed,loading,error}=usePost()
  useEffect(()=>{
    handleGetFeed()
  },[])
  if(loading){
    return (
      <main className='feed-page'>
        <h1 className="loading">Feed is loading</h1>
      </main>
    )
  }
  if(error){
    return (
      <main className='feed-page'>
        <h1 className="error">{error}</h1>
      </main>
    )
  }
  if(!feed || feed.length===0){
    return (
      <main className='feed-page'>
        <h1 className="empty">No posts yet</h1>
      </main>
    )
  }
  return (
    <main className='feed-page'>
        <div className="feed">
            <h2 className="feed-header">Feed</h2>
            <div className="posts">
            {feed.map(post=>{
              return <NewPost key={post._id || post.id} user={post.user} post={post}/>
            })}
        </div>
        </div>
    </main>
  )
}

export default Feed