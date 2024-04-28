import React, { useState, useEffect } from 'react';

const App = () => {
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    images: '',
    author: '',
  });

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [reactions, setReactions] = useState([]);

  useEffect(() => {
    fetchPosts();
    fetchComments();
    fetchReactions();

  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://localhost:7141/api/Posts');
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error.message);
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://localhost:7141/api/Posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to create post');
      }

      console.log('Post created successfully');

      fetchPosts();
    } catch (error) {
      console.error('Error creating post:', error.message);
    }
  };

  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });

  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://localhost:7141/api/Auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      });

      if (!response.ok) {
        throw new Error('Failed to signup');
      }

      console.log('User signed up successfully');
    } catch (error) {
      console.error('Error signing up:', error.message);
    }
  };
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://localhost:7141/api/Auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        throw new Error('Failed to login');
      }

      console.log('User logged in successfully');

    } catch (error) {
      console.error('Error logging in:', error.message);
    }
  };
 const [commentData, setCommentData] = useState({
  content: '',
  user: '',
  postId: 0,
});

const handleCommentChange = (e) => {
  setCommentData({ ...commentData, [e.target.name]: e.target.value });
};

const handleCommentSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch('https://localhost:7141/api/Comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentData),
    });

    if (!response.ok) {
      throw new Error('Failed to post comment');
    }

    console.log('Comment posted successfully');

  } catch (error) {
    console.error('Error posting comment:', error.message);
  }
};
const fetchComments = async () => {
  setLoading(true);
  try {
    const response = await fetch('https://localhost:7141/api/Comments');
    if (!response.ok) {
      throw new Error('Failed to fetch comments');
    }
    const data = await response.json();
    setComments(data);
  } catch (error) {
    console.error('Error fetching comments:', error.message);
  }
  setLoading(false);
};
  const [reactionData, setReactionData] = useState({
    isPositive: true,
    user: '',
    postId: 0,
    isCommentReaction: true,
  });
  const handleReactionChange = (e) => {
    setReactionData({ ...reactionData, [e.target.name]: e.target.value });
  };

  const handleReactionSubmit = async (e) => {
    e.preventDefault();

    try {
      const isPositiveValue = reactionData.isPositive === 'true';
      const isCommentReactionValue = e.target.isCommentReaction.checked;

      const response = await fetch('https://localhost:7141/api/PostReactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isPositive: isPositiveValue,
          user: reactionData.user,
          postId: parseInt(reactionData.postId), // Convert postId to integer if needed
          isCommentReaction: isCommentReactionValue,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to post reaction');
      }
      console.log('Reaction posted successfully');
    } catch (error) {
      console.error('Error posting reaction:', error.message);
    }
  };
  const fetchReactions = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://localhost:7141/api/PostReactions');
      if (!response.ok) {
        throw new Error('Failed to fetch reactions');
      }
      const data = await response.json();
      setReactions(data);
    } catch (error) {
      console.error('Error fetching reactions:', error.message);
    }
    setLoading(false);
  };
  return (
    <div>
      <h2>CREATE POST FORM</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
        />
        <textarea
          name="body"
          placeholder="Body"
          value={formData.body}
          onChange={handleChange}
        ></textarea>
        <input
          type="text"
          name="images"
          placeholder="Images URL"
          value={formData.images}
          onChange={handleChange}
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
      <h2>DISPLAY POST</h2>

      {loading ? (
        <p>Loading posts...</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
              <p>Author: {post.author}</p>
              {/* Add image display logic here if needed */}
            </li>
          ))}
        </ul>
      )}
      <h2>SIGNUP FORM</h2>

        {/* Signup Form */}
        <form onSubmit={handleSignupSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={signupData.name}
          onChange={handleSignupChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={signupData.email}
          onChange={handleSignupChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={signupData.password}
          onChange={handleSignupChange}
        />
        <input
          type="text"
          name="role"
          placeholder="Role"
          value={signupData.role}
          onChange={handleSignupChange}
        />
        <button type="submit">Signup</button>
      </form>
      <h2>LOGIN FORM</h2>

        {/* Login Form */}
        <form onSubmit={handleLoginSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={loginData.email}
          onChange={handleLoginChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={loginData.password}
          onChange={handleLoginChange}
        />
        <button type="submit">Login</button>
      </form>
      <h2>COMMENT POST FORM</h2>

       {/* Comment Form */}
       <form onSubmit={handleCommentSubmit}>
        <input
          type="text"
          name="content"
          placeholder="Comment"
          value={commentData.content}
          onChange={handleCommentChange}
        />
        <input
          type="text"
          name="user"
          placeholder="User"
          value={commentData.user}
          onChange={handleCommentChange}
        />
        <input
          type="number"
          name="postId"
          placeholder="Post ID"
          value={commentData.postId}
          onChange={handleCommentChange}
        />
        <button type="submit">Post Comment</button>
      </form>
       {/* Display Comments */}
       <h2>COMMENT DISPLAY</h2>
      {loading ? (
        <p>Loading comments...</p>
      ) : (
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>
              <p>{comment.content}</p>
              <p>User: {comment.user}</p>
              <p>Post ID: {comment.postId}</p>
            </li>
          ))}
        </ul>
      )}
            <h2>REACTION FORM</h2>

       {/* Reaction Form */}
       <form onSubmit={handleReactionSubmit}>
        <select name="isPositive" value={reactionData.isPositive} onChange={handleReactionChange}>
          <option value={true}>Positive</option>
          <option value={false}>Negative</option>
        </select>
        <input
          type="text"
          name="user"
          placeholder="User"
          value={reactionData.user}
          onChange={handleReactionChange}
        />
        <input
          type="number"
          name="postId"
          placeholder="Post ID"
          value={reactionData.postId}
          onChange={handleReactionChange}
        />
        <input
          type="checkbox"
          name="isCommentReaction"
          checked={reactionData.isCommentReaction}
          onChange={handleReactionChange}
        />
        <label htmlFor="isCommentReaction">Is Comment Reaction</label>
        <button type="submit">Post Reaction</button>
      </form>
        {/* Display Reactions */}
        <h2>DISPLAY REACTIONS</h2>
      {loading ? (
        <p>Loading reactions...</p>
      ) : (
        <ul>
          {reactions.map((reaction) => (
            <li key={reaction.id}>
              <p>User: {reaction.user}</p>
              <p>Post ID: {reaction.postId}</p>
              <p>Is Positive: {String(reaction.isPositive)}</p>
              <p>Is Comment Reaction: {String(reaction.isCommentReaction)}</p>
            </li>
          ))}
        </ul>
      )}
    </div>

  );
};

export default App;
