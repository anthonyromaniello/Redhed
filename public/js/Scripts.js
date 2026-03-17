    console.log("=== DEBUG MODE DETECTION ===");
    
    // Get the user's preferred mode from cookies (darkMode or lightMode)
    var match = document.cookie.match(/(?:^|;\s*)mode=(darkMode|lightMode)/);
    var mode = match ? match[1] : "lightMode";
    console.log("Cookie mode found:", mode);

    // When the DOM is loaded, dynamically load blog posts
    document.addEventListener('DOMContentLoaded', function () {

        const blogList = document.getElementById('blog-list');

        // Fetch blog posts from Posts.json
        fetch('/data/Posts.json')
            .then(response => response.json())
            .then(posts => {
                posts.slice().reverse().forEach(post => {
                    // Create a new article element for each post

                    if(post.published) {
                        const postElement = document.createElement('article');
                        postElement.className = 'blog-post';

                        // Populate the post content with title, meta, and content
                        postElement.innerHTML = `
                            <h2 class="blog-post-title">${post.title}</h2>
                            <div class="blog-post-meta">
                                <span>Published on ${new Date(post.date).toLocaleDateString('en-US', { 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric' 
                                })}</span> • 
                                <span>${post.category}</span>
                            </div>
                            <div class="blog-post-content">
                                ${post.content}
                            </div>
                        `;

                        // Add the post to the blog list container
                        blogList.appendChild(postElement);

                    }
                });
            })
            .catch(error => console.error('Error loading blog posts:', error));

    });
