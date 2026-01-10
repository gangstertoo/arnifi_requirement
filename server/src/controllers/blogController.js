import Blog from '../models/Blog.js';
import User from '../models/User.js';

export const getAllBlogs = async (req, res) => {
  try {
    const { category, author } = req.query;
    let filter = {};

    if (category) {
      filter.category = category;
    }

    if (author) {
      filter.author = { $regex: author, $options: 'i' };
    }

    const blogs = await Blog.find(filter)
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: 'Blogs retrieved successfully',
      blogs
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id).populate('userId', 'name email');

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json({
      message: 'Blog retrieved successfully',
      blog
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const createBlog = async (req, res) => {
  try {
    const { title, category, content, image } = req.body;
    const userId = req.userId;

    if (!title || !category || !content) {
      return res.status(400).json({ message: 'Title, category, and content are required' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newBlog = new Blog({
      title,
      category,
      author: user.name,
      content,
      image: image || null,
      userId
    });

    await newBlog.save();

    res.status(201).json({
      message: 'Blog created successfully',
      blog: newBlog
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, content, image } = req.body;
    const userId = req.userId;

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    if (blog.userId.toString() !== userId) {
      return res.status(403).json({ message: 'Unauthorized to update this blog' });
    }

    if (title) blog.title = title;
    if (category) blog.category = category;
    if (content) blog.content = content;
    if (image !== undefined) blog.image = image;
    blog.updatedAt = new Date();

    await blog.save();

    res.status(200).json({
      message: 'Blog updated successfully',
      blog
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    if (blog.userId.toString() !== userId) {
      return res.status(403).json({ message: 'Unauthorized to delete this blog' });
    }

    await Blog.findByIdAndDelete(id);

    res.status(200).json({
      message: 'Blog deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getUserBlogs = async (req, res) => {
  try {
    const userId = req.userId;

    const blogs = await Blog.find({ userId })
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: 'User blogs retrieved successfully',
      blogs
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
