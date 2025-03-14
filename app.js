
document.addEventListener('DOMContentLoaded', function() {
    // Selectors for elements we'll interact with
    const searchInput = document.querySelector('.header_left input');
    const createPostInput = document.querySelector('.createPost_Top input');
    const likeButton = document.querySelector('.bottom_bottom .bottom_option:first-child');
    const commentButton = document.querySelector('.bottom_bottom .bottom_option:nth-child(2)');
    const repostButton = document.querySelector('.bottom_bottom .bottom_option:nth-child(3)');
    const sendButton = document.querySelector('.bottom_bottom .bottom_option:nth-child(4)');
    const showMoreButton = document.querySelector('.down h2');
    const allOptionsInHeader = document.querySelectorAll('.header_right .option');
    const promoteJobButton = document.querySelector('.promote_button button');
    
    //  Initialize post count for new posts
    let postCount = 1;
    
    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('focus', function() {
            this.placeholder = 'Search';
        });
        
        searchInput.addEventListener('blur', function() {
            this.placeholder = 'Himanshu';
        });
        
        // Simple search functionality
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                alert(`Searching for: ${this.value}`);
                this.value = '';
            }
        });
    }
    
    // Create post functionality
    if (createPostInput) {
        createPostInput.addEventListener('focus', function() {
            // Make the create post box more prominent when focused
            document.querySelector('.createPost').style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.2)';
        });
        
        createPostInput.addEventListener('blur', function() {
            document.querySelector('.createPost').style.boxShadow = '0 0 5px rgba(0, 0, 0, 0.1)';
        });
        
        // Handle post creation when Enter is pressed
        createPostInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && this.value.trim() !== '') {
                createNewPost(this.value);
                this.value = '';
            }
        });
    }
    
    // Function to create a new post
    function createNewPost(content) {
        const allPosts = document.querySelector('.allPosts');
        const currentDate = new Date();
        const timeString = 'Just now';
        
        // Create HTML for new post
        const newPostHTML = `
            <div class="onePost">
                <div class="onePost_top">
                    <img src="./himanshu.jpg" alt="Profile" />
                    <div class="nameAndTime">
                        <h2>Himanshu</h2>
                        <p>Software Engineer</p>
                        <h4>${timeString}</h4>
                    </div>
                    <i class="fa fa-ellipsis-h"></i>
                </div>
                <div class="onePost_middle">
                    <p>${content}</p>
                </div>
                <div class="onePost_bottom">
                    <div class="bottom_top">
                        <div class="left">
                            <div class="icons">
                                <i class="fa fa-thumbs-up" style="color:green"></i>
                            </div>
                            <p>0 likes</p>
                        </div>
                        <div class="right">
                            <p>0 comments</p>
                            <h1>&middot;</h1>
                            <p>0 reposts</p>
                        </div>
                    </div>
                    <div class="bottom_bottom">
                        <div class="bottom_option">
                            <i class="fa fa-thumbs-up"></i>
                            <h2>Like</h2>
                        </div>
                        <div class="bottom_option">
                            <i class="fa fa-comments"></i>
                            <h2>Comment</h2>
                        </div>
                        <div class="bottom_option">
                            <i class="fa fa-retweet"></i>
                            <h2>Repost</h2>
                        </div>
                        <div class="bottom_option">
                            <i class="fa fa-paper-plane"></i>
                            <h2>Send</h2>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Insert new post at the beginning of the posts container
        allPosts.insertAdjacentHTML('afterbegin', newPostHTML);
        
        // Add event listeners to the new post's buttons
        const newPost = allPosts.querySelector('.onePost:first-child');
        setupPostInteractions(newPost);
        
        postCount++;
    }
    
    // Setup interactions for posts
    function setupPostInteractions(postElement) {
        const likeBtn = postElement.querySelector('.bottom_option:nth-child(1)');
        const commentBtn = postElement.querySelector('.bottom_option:nth-child(2)');
        const repostBtn = postElement.querySelector('.bottom_option:nth-child(3)');
        const sendBtn = postElement.querySelector('.bottom_option:nth-child(4)');
        const likeCounter = postElement.querySelector('.bottom_top .left p');
        const moreOptions = postElement.querySelector('.onePost_top i');
        
        let isLiked = false;
        let likeCount = 0;
        
        // Like functionality
        likeBtn.addEventListener('click', function() {
            isLiked = !isLiked;
            
            if (isLiked) {
                likeCount++;
                this.querySelector('i').style.color = 'blue';
                this.querySelector('h2').style.color = 'blue';
            } else {
                likeCount--;
                this.querySelector('i').style.color = '';
                this.querySelector('h2').style.color = '';
            }
            
            likeCounter.textContent = likeCount === 1 ? '1 like' : `${likeCount} likes`;
        });
        
        // Comment functionality
        commentBtn.addEventListener('click', function() {
            alert('Comment feature will be added soon!');
        });
        
        // Repost functionality
        repostBtn.addEventListener('click', function() {
            alert('Repost feature will be added soon!');
        });
        
        // Send functionality
        sendBtn.addEventListener('click', function() {
            alert('Send feature will be added soon!');
        });
        
        // More options menu
        if (moreOptions) {
            moreOptions.addEventListener('click', function() {
                const options = ['Edit Post', 'Delete Post', 'Hide Post', 'Report Post'];
                const optionChoice = prompt(`Choose an option:\n1. ${options[0]}\n2. ${options[1]}\n3. ${options[2]}\n4. ${options[3]}`);
                
                if (optionChoice && !isNaN(optionChoice)) {
                    const choice = parseInt(optionChoice);
                    if (choice >= 1 && choice <= 4) {
                        alert(`You selected: ${options[choice-1]}`);
                        
                        // Handle delete post
                        if (choice === 2) {
                            if (confirm('Are you sure you want to delete this post?')) {
                                postElement.remove();
                            }
                        }
                    }
                }
            });
        }
    }
    
    // Apply post interactions to existing posts
    document.querySelectorAll('.onePost').forEach(post => {
        setupPostInteractions(post);
    });
    
    // Toggle news section
    if (showMoreButton) {
        let isExpanded = false;
        
        showMoreButton.addEventListener('click', function() {
            isExpanded = !isExpanded;
            const newsItems = document.querySelectorAll('.txt ul li, .txt ul p');
            const icon = this.querySelector('i');
            
            if (isExpanded) {
                // Show additional news items
                this.textContent = 'Show less';
                this.appendChild(icon);
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
                
                // You would typically fetch more news items, but for demo just duplicate existing
                const newsList = document.querySelector('.txt ul');
                const clone = newsList.cloneNode(true);
                document.querySelector('.txt').insertBefore(clone, document.querySelector('.down'));
            } else {
                // Hide additional news items
                this.textContent = 'Show more';
                this.appendChild(icon);
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
                
                // Remove added news
                const newsLists = document.querySelectorAll('.txt ul');
                if (newsLists.length > 1) {
                    for (let i = 1; i < newsLists.length; i++) {
                        newsLists[i].remove();
                    }
                }
            }
        });
    }
    
    // Header navigation interactions
    allOptionsInHeader.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all options
            allOptionsInHeader.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to clicked option
            this.classList.add('active');
            
            // Handle different navigation options
            const optionText = this.querySelector('h3').textContent;
            alert(`Navigating to ${optionText}`);
        });
    });
    
    // Premium promotion
    document.querySelector('.premium').addEventListener('click', function() {
        alert('Upgrade to LinkedIn Premium for enhanced networking features!');
    });
    
    // My Items functionality
    document.querySelector('.my_items').addEventListener('click', function() {
        alert('View your saved items');
    });
    
    // Profile view
    document.querySelector('.left_profile').addEventListener('click', function() {
        alert('View your full profile');
    });
    
    // Job promotion
    if (promoteJobButton) {
        promoteJobButton.addEventListener('click', function() {
            alert('Create a job posting to find the perfect candidate!');
        });
    }
    
    // Add styles for active state
    const style = document.createElement('style');
    style.textContent = `
        .header_right .option.active {
            border-bottom: 2px solid #0a66c2;
        }
        .header_right .option:hover {
            color: #0a66c2;
            cursor: pointer;
        }
        .bottom_option:hover {
            background-color: rgba(0, 0, 0, 0.05);
            cursor: pointer;
        }
        .my_items:hover, .premium:hover, .profile_views:hover {
            background-color: rgba(0, 0, 0, 0.05);
            cursor: pointer;
        }
        .onePost_top i:hover, .right_top i:hover, .right_bottom i:hover {
            background-color: rgba(0, 0, 0, 0.1);
            border-radius: 50%;
            cursor: pointer;
        }
    `;
    document.head.appendChild(style);
});