const newCommentHandler = async (event) => {
    event.preventDefault();

    // Get values from create post form
    const postTitle = document.querySelector('#post-title').value.trim();
    const postContent = document.querySelector('#post-content').value.trim();
    console.log(postTitle);
    console.log(postContent);

    if (postTitle && postContent) {
        const response = await fetch('/api/posts/', {
            method: 'POST',
            body: JSON.stringify({"title": postTitle, "post_content": postContent }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            // Redirects to dashboard if succesful
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};


document.querySelector('#post-form').addEventListener('submit', newPostHandler);

