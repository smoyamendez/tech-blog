const newPostHandler = async (event) => {
    await event.preventDefault();

    // Get values from create post form
    const postTitle = document.querySelector('post-title').value.trim();;
    const postContent = document.querySelector('post-content').value.trim();;

    if (postTitle && postContent) {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({ postTitle, postContent }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            // Redirects to homepage if succesful
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
};

document.querySelector('#newPost').addEventListener('click', (event) => {
    document.location.replace('/dashboard/new')
});
document.querySelector('#post-form').addEventListener('submit', newPostHandler);

