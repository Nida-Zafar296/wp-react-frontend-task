import React, { useEffect, useState } from 'react'; // useeffect used for fetch data from API...
import { useParams } from 'react-router-dom'; // extract post id from url
import './PostDetail.css'; // custom CSS

const PostDetail = () => {
  const { id } = useParams(); // Get post ID from URL
  const [post, setPost] = useState(null); // Store fetched post
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`http://localhost/nida-headless-cms/wp-json/wp/v2/posts/${id}?_embed`); 
        const data = await res.json(); // parse post data to json 
        setPost(data);
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false); // Stop loading regardless of success or failure
      }
    };

    fetchPost();
  }, [id]); // dependency array 

  if (loading)
    return (
      <div className="loading-container">
        <p>Loading...</p>
      </div>
    );

  // Get featured image URL if available
  const featuredImg = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;

  return (
    <div className="post-detail-container">
      {/* Post Title */}
      <h2
        className="post-detail-title"
        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
      />

      {/* Featured Image */}
      {featuredImg && (
        <img
          src={featuredImg}
          alt={post.title.rendered}
          className="post-detail-image"
        />
      )}

      {/* Post Content */}
      <div className="post-detail-content-wrapper">
        <div
          className="post-detail-content"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />
      </div>
    </div>
  );
};

export default PostDetail;