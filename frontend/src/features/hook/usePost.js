import { getFeed, createPost } from "../services/post.api";
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
    // Wrapped in useCallback to prevent unnecessary re-renders in components using it.
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

    // Memoized function to handle post creation.
    // Takes an image file and a caption as arguments.
    const handleCreatePost=useCallback(async(image, caption)=>{
        try {
            setLoading(true)
            setError(null)
            await createPost(image, caption)
        } catch (error) {
            setError(error.response?.data?.message || error.message || "Failed to create post")
            console.log(error)
        } finally {
            setLoading(false)
        }
    }, [setLoading, setError])

    return {loading,feed,post,error,handleGetFeed,handleCreatePost}
}