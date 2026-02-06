export const fetchUser = async (userId) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }
  const user = await response.json();
  return user;
};

export const fetchPost = async (postId) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch post');
  }
  const post = await response.json();
  return post;
};

export const fetchAllUsers = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  const users = await response.json();
  return users;
};

export const fetchAllPosts = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  const posts = await response.json();
  return posts;
};

// Helper function to wrap promises for React Suspense
export const wrapPromise = (promise) => {
  let status = 'pending';
  let result;
  
  const suspender = promise.then(
    (res) => {
      status = 'success';
      result = res;
    },
    (err) => {
      status = 'error';
      result = err;
    }
  );

  return {
    read() {
      if (status === 'pending') {
        throw suspender;
      } else if (status === 'error') {
        throw result;
      } else if (status === 'success') {
        return result;
      }
    }
  };
};

// Create resource functions
export const createUserResource = (userId) => {
  return wrapPromise(fetchUser(userId));
};

export const createPostResource = (postId) => {
  return wrapPromise(fetchPost(postId));
};

export const createAllUsersResource = () => {
  return wrapPromise(fetchAllUsers());
};

export const createAllPostsResource = () => {
  return wrapPromise(fetchAllPosts());
};
