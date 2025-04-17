# wp-react-frontend-task
This is a React-based frontend project that connects to a WordPress post via REST API. It displays blog posts, enables search, filtering by categories/tags, and includes pagination and a single post details view.

---

##  Technologies Used

- React JS (Frontend)
- WordPress (Backend with REST API)
- CSS for styling
- JavaScript for logic and API handling
- REST API to connect frontend with WordPress data

---

##  Features Implemented

1. **Create Blog Content**  
   Blog posts were created in the WordPress admin dashboard.

2. **Enable REST API**  
   WordPress REST API was enabled and configured.

3. **Test API Access**  
   API endpoints were tested using browser to ensure they fetch the correct data.

4. **Create a New React Application**  
   React app initialized using `create-react-app`.

5. **Fetch API**  
   Blog posts and related data are fetched using `fetch()` and React hooks.

6. **Display Blog Posts**  
   Posts are dynamically displayed on the homepage.

7. **Post Details Page**  
   A separate route and component shows full content of a selected blog post.

8. **Search Functionality**  
   A search bar allows users to filter posts by keywords.

9. **Pagination**  
   Posts are paginated for a better user experience.

10. **Categories/Tags Filter**  
    Posts can be filtered by categories and tags using dropdown.

---

##  How to Set Up the Project Locally

###  1. Setup WordPress Backend

- Install WordPress locally using XAMPP or another local server.
- Create blog posts and categories via the admin dashboard.
- Enable pretty permalinks (Settings → Permalinks → Post name).
- Access REST API:


###  2. Setup React Frontend

```bash
npx create-react-app wp-react-frontend
cd wp-react-frontend
npm install react-router-dom
npm start

##  Demo & Screenshots

###  Project Working Video:
 [ Working video](https://drive.google.com/file/d/1e7FbgNW9TfxjQ-i4ES-U3wOKxp-mq0Xe/view?usp=drive_link)

### 📸 Screenshots:
-  [Blog List View - Screenshot 1](https://drive.google.com/file/d/1zGKdGhfnxF4fMTsbho8Tifn5kcU-1dB-/view?usp=drive_link)  
- [Blog List View - Screenshot 2](https://drive.google.com/file/d/11qk8FYZH8q3-O1uBTId9qhKgVp8rQUxn/view?usp=drive_link)  

###  Post Detail Page :
 [Watch Post Detail Page in Action](https://drive.google.com/file/d/1T6403fafnegVe5q__h8rmURcDfvCgqE9/view?usp=drive_link)


