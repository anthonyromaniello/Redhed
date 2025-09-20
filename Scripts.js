    console.log("=== DEBUG MODE DETECTION ===");
    
    // Get the user's preferred mode from cookies (darkMode or lightMode)
    var match = document.cookie.match(/(?:^|;\s*)mode=(darkMode|lightMode)/);
    var mode = match ? match[1] : "lightMode";
    console.log("Cookie mode found:", mode);

    // Function to set the correct mode class on the body and update icons/logos
    function setModeClass() {
        if (document.body) {
            console.log("Body classes before:", document.body.className);
            // Add the mode class if not already present
            if (!document.body.classList.contains(mode)) {
                document.body.classList.add(mode);
                console.log("Added mode class:", mode);
            }
            console.log("Body classes after:", document.body.className);

            // Set icons and logos based on mode (delayed to ensure DOM is ready)
            setTimeout(function () {
                const CompanyLogo = document.querySelector('.navbar-brand img');
                const iconImg = document.querySelector('.changeScreenModeIcon img');

                if (mode === 'darkMode') {
                    if (iconImg) iconImg.src = 'lightModeIcon.png'; // Show light icon in dark mode
                    if (CompanyLogo) CompanyLogo.src = 'RedhedLogoDM.png'; // Dark logo
                } else {
                    if (iconImg) iconImg.src = 'darkModeIcon.png'; // Show dark icon in light mode
                    if (CompanyLogo) CompanyLogo.src = 'RedhedLogoLM.png'; // Light logo
                }
            }, 100);

        } else {
            // If body isn't ready, try again shortly
            console.log("Body not ready, retrying...");
            setTimeout(setModeClass, 1);
        }
    }
    setModeClass();

    // When the DOM is loaded, dynamically load blog posts
    document.addEventListener('DOMContentLoaded', function () {

        const blogList = document.getElementById('blog-list');

        // Fetch blog posts from Posts.json
        fetch('posts.json')
            .then(response => response.json())
            .then(posts => {
                posts.forEach(post => {
                    // Create a new article element for each post
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
                            <span>By ${post.author}</span> • 
                            <span>${post.category}</span>
                        </div>
                        <div class="blog-post-content">
                            ${post.content}
                            <a href="#" class="read-more">Read Full Article</a>
                        </div>
                    `;

                    // Add the post to the blog list container
                    blogList.appendChild(postElement);
                });
            })
            .catch(error => console.error('Error loading blog posts:', error));

    });
