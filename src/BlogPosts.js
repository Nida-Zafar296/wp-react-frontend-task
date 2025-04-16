import React, { useEffect, useState } from 'react'; // usestate store post data...
import { Link } from 'react-router-dom'; // used to navigate between page or componenet 
import 'bootstrap/dist/css/bootstrap.min.css';
import './BlogPosts.css';  // custom CSS 

const BlogPosts = () => {
  // State: Posts, Categories, Tags, and User Input
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => { // define asynchronous function to fetch data 
      try {
        const [postsRes, categoriesRes, tagsRes] = await Promise.all([  
          fetch('http://localhost/nida-headless-cms/wp-json/wp/v2/posts?_embed'),
          fetch('http://localhost/nida-headless-cms/wp-json/wp/v2/categories'),
          fetch('http://localhost/nida-headless-cms/wp-json/wp/v2/tags'),
        ]);

        const [postsData, categoriesData, tagsData] = await Promise.all([
          postsRes.json(), // parse post data into json 
          categoriesRes.json(), 
          tagsRes.json(),
        ]);

        setPosts(postsData);
        setCategories(categoriesData);
        setTags(tagsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // empty dependency array means this effect run only once , when the component mounts 

  // Filter Logic
  const filterPosts = () =>
    posts.filter(post => {
      const titleMatch = post.title?.rendered?.toLowerCase().includes(searchTerm.toLowerCase()); // This checks whether the post's title matches the search term using the includes() function...
      const contentMatch = post.content?.rendered?.toLowerCase().includes(searchTerm.toLowerCase()); // ?. used to prevent error...
      const matchesSearch = titleMatch || contentMatch;

      const matchesCategory = selectedCategory
        ? post.categories.includes(parseInt(selectedCategory))
        : true;

      const matchesTag = selectedTag
        ? post.tags.includes(parseInt(selectedTag))
        : true;

      return matchesSearch && matchesCategory && matchesTag;
    });

  const filteredPosts = filterPosts(); // function returns an array of posts that match all the conditions, which is then assigned to filteredPosts

  // Pagination Logic
  const indexOfLastPost = currentPage * postsPerPage; // calculate the index of last page on the current page 
  const indexOfFirstPost = indexOfLastPost - postsPerPage; // calculate the index of first post on the current page 
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost); // get the post from the current page 
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage); // Math.ceil to round up the number of pages

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber); // update the current page when the current number is clicked 

  // JSX Rendering
  return (
    <div className="container my-4">
      <h2 className="mb-4 text-center">Latest Posts</h2>

      {/* Filters Section */}
      <div className="custom-filter-container mb-4">
        <div className="left-filters">
          {/* Category Dropdown */}
          <select
            className="form-select"
            value={selectedCategory} // category is selected in the dropdown, it will be stored in the selectedCategory
            onChange={e => setSelectedCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map(({ id, name }) => ( // Loop through categories and create an <option> for each category
              <option key={id} value={id}>{name}</option>
            ))}
          </select>

          {/* Tag Dropdown */}
          <select
            className="form-select"
            value={selectedTag}
            onChange={e => setSelectedTag(e.target.value)}
          >
            <option value="">Select Tag</option>
            {tags.map(({ id, name }) => ( // Loop through tags and create a option for for each tag
              <option key={id} value={id}>{name}</option>
            ))}
          </select>
        </div>

        {/* Search Bar */}
        <div className="search-bar-container">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="form-control search-input"
          />
        </div>
      </div>

      {/* Posts Grid */}
      <div className="row">
        {currentPosts.map(post => {
          const featuredImg = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;

          return (
            <div key={post.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100 shadow-sm">
                {featuredImg && (
                  <img
                    src={featuredImg}
                    alt={post.title?.rendered || 'Post Image'}
                    className="card-img-top"
                  />
                )}

                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">
                    <Link to={`/post/${post.id}`} className="text-decoration-none text-dark">
                      {post.title?.rendered}
                    </Link>
                  </h5>

                  <p
                    className="card-text"
                    dangerouslySetInnerHTML={{
                      __html: post.excerpt?.rendered?.substring(0, 100) + '...',
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Buttons */}
      <div className="pagination-container text-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`btn mx-1 ${currentPage === index + 1 ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BlogPosts;
