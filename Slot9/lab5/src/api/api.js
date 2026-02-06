export const fetchUser = async (userId) => {
  try {
    console.log('Fetching user ' + userId + '...');
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    
    if (!response.ok) {
      const errorMsg = `HTTP Error ${response.status}: Failed to fetch user`;
      console.error(errorMsg);
      throw new Error(errorMsg);
    }
    
    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const errorMsg = 'Response is not JSON format';
      console.error(errorMsg);
      throw new Error(errorMsg);
    }
    
    const user = await response.json();
    
    // Validate user data structure
    if (!user || typeof user !== 'object') {
      const errorMsg = 'Invalid user data structure';
      console.error(errorMsg);
      throw new Error(errorMsg);
    }
    
    console.log('Successfully fetched user ' + userId);
    return user;
  } catch (error) {
    // Check for network errors
    if (error.message.includes('Failed to fetch') || !navigator.onLine) {
      const networkError = new Error('Lỗi kết nối mạng: Không thể kết nối đến server. Vui lòng kiểm tra kết nối internet.');
      console.error('Network Error:', networkError.message);
      throw networkError;
    }
    
    console.error('Error fetching user:', error);
    throw error;
  }
};

export const fetchPost = async (postId) => {
  try {
    console.log('Fetching post ' + postId + '...');
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    
    if (!response.ok) {
      const errorMsg = `HTTP Error ${response.status}: Failed to fetch post`;
      console.error(errorMsg);
      throw new Error(errorMsg);
    }
    
    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const errorMsg = 'Response is not JSON format';
      console.error(errorMsg);
      throw new Error(errorMsg);
    }
    
    const post = await response.json();
    
    // Validate post data structure
    if (!post || typeof post !== 'object') {
      const errorMsg = 'Invalid post data structure';
      console.error(errorMsg);
      throw new Error(errorMsg);
    }
    
    console.log('Successfully fetched post ' + postId);
    return post;
  } catch (error) {
    // Check for network errors
    if (error.message.includes('Failed to fetch') || !navigator.onLine) {
      const networkError = new Error('Lỗi kết nối mạng: Không thể kết nối đến server. Vui lòng kiểm tra kết nối internet.');
      console.error('Network Error:', networkError.message);
      throw networkError;
    }
    
    console.error('Error fetching post:', error);
    throw error;
  }
};

export const fetchAllUsers = async () => {
  try {
    console.log('Fetching all users...');
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    
    if (!response.ok) {
      const errorMsg = `HTTP Error ${response.status}: Failed to fetch users`;
      console.error(errorMsg);
      throw new Error(errorMsg);
    }
    
    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const errorMsg = 'Response is not JSON format';
      console.error(errorMsg);
      throw new Error(errorMsg);
    }
    
    const users = await response.json();
    
    // Validate users data structure
    if (!Array.isArray(users)) {
      const errorMsg = 'Invalid users data structure - expected array';
      console.error(errorMsg);
      throw new Error(errorMsg);
    }
    
    console.log('Successfully fetched ' + users.length + ' users');
    return users;
  } catch (error) {
    // Check for network errors
    if (error.message.includes('Failed to fetch') || !navigator.onLine) {
      const networkError = new Error('Lỗi kết nối mạng: Không thể kết nối đến server. Vui lòng kiểm tra kết nối internet.');
      console.error('Network Error:', networkError.message);
      throw networkError;
    }
    
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const fetchAllPosts = async () => {
  try {
    console.log('Fetching all posts...');
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    
    if (!response.ok) {
      const errorMsg = `HTTP Error ${response.status}: Failed to fetch posts`;
      console.error(errorMsg);
      throw new Error(errorMsg);
    }
    
    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const errorMsg = 'Response is not JSON format';
      console.error(errorMsg);
      throw new Error(errorMsg);
    }
    
    const posts = await response.json();
    
    // Validate posts data structure
    if (!Array.isArray(posts)) {
      const errorMsg = 'Invalid posts data structure - expected array';
      console.error(errorMsg);
      throw new Error(errorMsg);
    }
    
    console.log('Successfully fetched ' + posts.length + ' posts');
    return posts;
  } catch (error) {
    // Check for network errors
    if (error.message.includes('Failed to fetch') || !navigator.onLine) {
      const networkError = new Error('Lỗi kết nối mạng: Không thể kết nối đến server. Vui lòng kiểm tra kết nối internet.');
      console.error('Network Error:', networkError.message);
      throw networkError;
    }
    
    console.error('Error fetching posts:', error);
    throw error;
  }
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
