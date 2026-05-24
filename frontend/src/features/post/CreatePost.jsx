import { useRef, useState } from "react";
import "../auth/styles/form.scss"
const CreatePost = () => {
  const[caption,setCaption]=useState("")
  const postImageInputFieldRef=useRef(null)
  function handleSubmit(e){
    e.preventDefault()
    const file=postImageInputFieldRef.current.files[0]
  }
  return (
    <main className="background">
      <div className="login-form">
        <h1>Create a post</h1>
        <form onSubmit={handleSubmit}>
          {/* <label htmlFor="post-image">Select image</label> */}
          <input ref={postImageInputFieldRef} type="file" name="post-image" id="post-image" />
          <input value={caption} onChange={(e)=>{setCaption(e.target.value)}} type="text" name="caption" placeholder="Enter caption" />
          <button type="submit">Create a post</button>
        </form>
      </div>
    </main>
  );
};
export default CreatePost;