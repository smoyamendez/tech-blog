
const updatePostHandler = async (event) => {
    event.preventDefault();

    const postTitle = document.querySelector('#post-title').value.trim();
    const postContent = document.querySelector('#post-content').value.trim();

    if (postTitle && postContent) {
        const id = event.target.getAttribute('data-id');
        const response = await fetch(`/api/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify({"title": postTitle, "post_content": postContent }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            // Redirects to dashboard if succesful
            document.location.replace(`/dashboard`);
        } else {
            alert(response.statusText);
        }
    }
}

const deletePostHandler = async (event) => {
    event.preventDefault();
    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        document.location.replace(`/dashboard`);
    } else {
        alert(response.statusText);
    }
}

document.querySelector('#updateBtn').addEventListener('submit', updatePostHandler);

document.querySelector('#deleteBtn').addEventListener('submit', deletePostHandler);