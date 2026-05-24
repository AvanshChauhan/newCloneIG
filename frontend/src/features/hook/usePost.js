import { getFeed ,createPost} from "../services/post.api";
import { useContext, useCallback } from "react";
import {PostContext} from "../post/PostContext"
/**
 * Custom hook to manage post-related logic and state.
 * Provides functions to fetch the feed and create new posts.
 */
export const usePost=()=>{
    const context=useContext(PostContext)
    const {loading,setLoading,post,feed,setFeed,error,setError}=context

    // Memoized function to fetch the user's feed.
    const handleGetFeed=useCallback(async()=>{
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
    }, [setLoading, setError, setFeed])

    // Memoized function to handle post creation and update local feed.
    const handleCreatePost=useCallback(async(imageFile, caption)=>{
        try {
            setLoading(true)
            setError(null)
            const data = await createPost(imageFile, caption)
            // Add the new post to the beginning of the feed
            if (data.post) {
                setFeed(prevFeed => prevFeed ? [data.post, ...prevFeed] : [data.post])
            }
        } catch (error) {
            setError(error.response?.data?.message || error.message || "Failed to create post")
            console.log(error)
        } finally {
            setLoading(false)
        }
    }, [setLoading, setError, setFeed])

    return {loading,feed,post,error,handleGetFeed,handleCreatePost}
}