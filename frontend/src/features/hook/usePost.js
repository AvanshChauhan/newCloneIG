import { getFeed } from "../services/post.api";
import { useContext } from "react";
import {PostContext} from "../post/Post.context"
export const usePost=()=>{
    const context=useContext(PostContext)
    const {loading,setLoading,post,setPost,feed,setFeed,error,setError}=context
    const handleGetFeed=async()=>{
        try {
            setLoading(true)
            setError(null)
            const data=await getFeed()
            setFeed(data.posts)
        } catch (error) {
            setError(error.response?.data?.message || error.message || "Failed to load feed")
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    return {loading,feed,post,error,handleGetFeed}
}