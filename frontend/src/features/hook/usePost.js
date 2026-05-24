import { getFeed ,createPost, likePost, unlikePost} from "../services/post.api";
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

    // Memoized function to handle post liking.
    const handleLikePost = useCallback(async (postId) => {
        try {
            // Optimistic update
            setFeed(prevFeed => prevFeed.map(p => 
                p._id === postId ? { ...p, isLiked: true } : p
            ))
            await likePost(postId)
        } catch (error) {
            // Revert on error
            setFeed(prevFeed => prevFeed.map(p => 
                p._id === postId ? { ...p, isLiked: false } : p
            ))
            console.log(error)
        }
    }, [setFeed])

    // Memoized function to handle post unliking.
    const handleUnlikePost = useCallback(async (postId) => {
        try {
            // Optimistic update
            setFeed(prevFeed => prevFeed.map(p => 
                p._id === postId ? { ...p, isLiked: false } : p
            ))
            await unlikePost(postId)
        } catch (error) {
            // Revert on error
            setFeed(prevFeed => prevFeed.map(p => 
                p._id === postId ? { ...p, isLiked: true } : p
            ))
            console.log(error)
        }
    }, [setFeed])

    return {loading,feed,post,error,handleGetFeed,handleCreatePost, handleLikePost, handleUnlikePost}
}