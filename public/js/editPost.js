
const updatePostHandler = async (event) => {
    event.preventDefault();

    const postTitle = document.querySelector('#post-title-update').value.trim();
    const postContent = document.querySelector('#post-content-update').value.trim();
    console.log(postTitle);
    console.log(postContent);
    if (postTitle && postContent) {
        const id = event.target.getAttribute('data-id');
        const response = await fetch(`/api/posts/${id}`, {
            method: 'PUT',
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
}

const deletePostHandler = async (event) => {
    event.preventDefault();
    const editForm = document.querySelector('#post-edit-form');
    const id = editForm.getAttribute('data-id');
    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
    })

    if (response.ok) {
        document.location.replace(`/dashboard`);
    } else {
        alert(response.statusText);
    }
}

document.querySelector('#post-edit-form').addEventListener('submit', updatePostHandler);

document.querySelector('#deleteBtn').addEventListener('click', deletePostHandler);