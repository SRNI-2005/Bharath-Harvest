import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuestion,
  faComments,
  faTags,
  faCheck,
  faClock,
  faUser,
  faReply,
  faTimes,
  faSearch,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";

// Synthetic data for initial posts
const initialPosts = [
  {
    id: 1,
    title: "Best practices for organic farming",
    content: "I'm new to organic farming. What are some effective natural pesticides I can use?",
    author: "RamaKrishna",
    date: "2025-06-10",
    tags: ["organic", "pesticides"],
    answers: [
      {
        id: 1,
        content: "Neem oil is very effective. Mix 2-3ml per liter of water and spray weekly.",
        author: "ExpertFarmer",
        date: "2025-06-11",
        isExpert: true
      },
      {
        id: 2,
        content: "I've had success with garlic and chili spray. Very cost-effective!",
        author: "LocalGrower",
        date: "2025-06-11"
      }
    ]
  },
  {
    id: 2,
    title: "Water management during summer",
    content: "How are you managing water resources during this hot summer?",
    author: "WaterWise",
    date: "2025-06-09",
    tags: ["water", "summer"],
    answers: [
      {
        id: 1,
        content: "Drip irrigation has worked wonders for me. Reduced water usage by 40%.",
        author: "TechFarmer",
        date: "2025-06-10"
      }
    ]
  },
  {
    id: 3,
    title: "Market prices for tomatoes",
    content: "Anyone know the current market rate for tomatoes in Bangalore?",
    author: "MarketSeeker",
    date: "2025-06-12",
    tags: ["market", "prices"],
    answers: []
  }
];

const Community = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', content: '', tags: '' });
  const [selectedPost, setSelectedPost] = useState(null);
  const [newAnswer, setNewAnswer] = useState('');
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  // Load posts from localStorage or use initial data
  useEffect(() => {
    const savedPosts = localStorage.getItem('communityPosts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      setPosts(initialPosts);
      localStorage.setItem('communityPosts', JSON.stringify(initialPosts));
    }
  }, []);

  // Save posts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('communityPosts', JSON.stringify(posts));
  }, [posts]);

  const handleSubmitPost = (e) => {
    e.preventDefault();
    const newPostData = {
      id: posts.length + 1,
      ...newPost,
      author: "CurrentUser", // In a real app, this would come from auth
      date: new Date().toISOString().split('T')[0],
      tags: newPost.tags.split(',').map(tag => tag.trim()),
      answers: []
    };
    setPosts([newPostData, ...posts]);
    setNewPost({ title: '', content: '', tags: '' });
  };

  const handleSubmitAnswer = (e) => {
    e.preventDefault();
    if (!selectedPost || !newAnswer.trim()) return;

    const updatedPosts = posts.map(post => {
      if (post.id === selectedPost.id) {
        return {
          ...post,
          answers: [...post.answers, {
            id: post.answers.length + 1,
            content: newAnswer,
            author: "CurrentUser", // In a real app, this would come from auth
            date: new Date().toISOString().split('T')[0]
          }]
        };
      }
      return post;
    });

    setPosts(updatedPosts);
    setNewAnswer('');
  };

  const filteredPosts = filter === 'all' 
    ? posts 
    : filter === 'unanswered' 
      ? posts.filter(post => post.answers.length === 0)
      : posts.filter(post => post.answers.length > 0);
  const filteredAndSearchedPosts = filteredPosts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#FEFAE0]/ pt-[100px]">
      {/* Hero Section */}
      <div className="bg-[#283618] text-[#FEFAE0] py-12">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold mb-4">
              <FontAwesomeIcon icon={faComments} className="mr-3" />
              Farmer's Community Hub
            </h1>
            <p className="text-lg opacity-90 mb-8">Share knowledge, get answers, grow together</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsPostModalOpen(true)}
              className="bg-[#DDA15E] text-[#283618] px-6 py-3 rounded-lg font-semibold hover:bg-[#BC6C25] transition-colors duration-300"
            >
              <FontAwesomeIcon icon={faQuestion} className="mr-2" />
              Ask a Question
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-8 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-3 text-[#606C38]" />
            <input
              type="text"
              placeholder="Search questions, topics, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[#DDA15E]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#606C38] bg-[#FEFAE0]/30"
            />
          </div>
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faFilter} className="text-[#606C38]" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="p-2 border border-[#DDA15E]/30 rounded-lg bg-[#FEFAE0]/30 focus:outline-none focus:ring-2 focus:ring-[#606C38]"
            >
              <option value="all">All Questions</option>
              <option value="answered">Answered</option>
              <option value="unanswered">Unanswered</option>
            </select>
          </div>
        </div>

        {/* Questions Grid */}
        <div className="grid gap-6">
          <AnimatePresence>
            {filteredAndSearchedPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-[#DDA15E]/20"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-[#283618]">{post.title}</h3>
                    <span className="text-sm text-[#606C38] bg-[#606C38]/10 px-3 py-1 rounded-full">
                      <FontAwesomeIcon icon={faClock} className="mr-2" />
                      {post.date}
                    </span>
                  </div>
                  <p className="text-[#283618]/80 mb-4">{post.content}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map(tag => (
                      <span
                        key={tag}
                        className="bg-[#DDA15E]/10 text-[#BC6C25] text-sm px-3 py-1 rounded-full flex items-center"
                      >
                        <FontAwesomeIcon icon={faTags} className="mr-2" />
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center text-sm text-[#606C38]">
                    <div className="flex items-center">
                      <FontAwesomeIcon icon={faUser} className="mr-2" />
                      Posted by {post.author}
                    </div>
                    <div className="flex items-center">
                      <FontAwesomeIcon icon={faComments} className="mr-2" />
                      {post.answers.length} answers
                    </div>
                  </div>

                  {/* Answers Section */}
                  {post.answers.length > 0 && (
                    <div className="mt-6 space-y-4">
                      {post.answers.map(answer => (
                        <motion.div
                          key={answer.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="bg-[#FEFAE0]/30 p-4 rounded-lg border border-[#DDA15E]/20"
                        >
                          <p className="text-[#283618]/90 mb-2">{answer.content}</p>
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center text-[#606C38]">
                              <FontAwesomeIcon icon={faUser} className="mr-2" />
                              {answer.author}
                              {answer.isExpert && (
                                <span className="ml-2 bg-[#606C38]/20 text-[#606C38] px-2 py-1 rounded-full text-xs">
                                  Expert
                                </span>
                              )}
                            </div>
                            <span className="text-[#606C38]/70">{answer.date}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* Answer Button or Form */}
                  {selectedPost?.id === post.id ? (
                    <motion.form
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      onSubmit={handleSubmitAnswer}
                      className="mt-4"
                    >
                      <textarea
                        placeholder="Share your knowledge..."
                        className="w-full p-3 border border-[#DDA15E]/30 rounded-lg bg-[#FEFAE0]/30 focus:outline-none focus:ring-2 focus:ring-[#606C38] h-24 mb-3"
                        value={newAnswer}
                        onChange={(e) => setNewAnswer(e.target.value)}
                        required
                      />
                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          type="submit"
                          className="bg-[#606C38] text-[#FEFAE0] px-4 py-2 rounded-lg hover:bg-[#4d5a27] transition-colors duration-300"
                        >
                          <FontAwesomeIcon icon={faReply} className="mr-2" />
                          Submit Answer
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          type="button"
                          onClick={() => setSelectedPost(null)}
                          className="bg-[#DDA15E]/10 text-[#BC6C25] px-4 py-2 rounded-lg hover:bg-[#DDA15E]/20 transition-colors duration-300"
                        >
                          <FontAwesomeIcon icon={faTimes} className="mr-2" />
                          Cancel
                        </motion.button>
                      </div>
                    </motion.form>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedPost(post)}
                      className="mt-4 text-[#606C38] hover:text-[#4d5a27] font-medium flex items-center"
                    >
                      <FontAwesomeIcon icon={faReply} className="mr-2" />
                      Add an Answer
                    </motion.button>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* New Question Modal */}
      <AnimatePresence>
        {isPostModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl w-full max-w-2xl"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-[#283618]">
                    <FontAwesomeIcon icon={faQuestion} className="mr-2" />
                    Ask a Question
                  </h2>
                  <button
                    onClick={() => setIsPostModalOpen(false)}
                    className="text-[#606C38] hover:text-[#4d5a27]"
                  >
                    <FontAwesomeIcon icon={faTimes} className="text-xl" />
                  </button>
                </div>
                <form onSubmit={handleSubmitPost} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="What's your question?"
                      className="w-full p-3 border border-[#DDA15E]/30 rounded-lg bg-[#FEFAE0]/30 focus:outline-none focus:ring-2 focus:ring-[#606C38]"
                      value={newPost.title}
                      onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder="Provide more details about your question..."
                      className="w-full p-3 border border-[#DDA15E]/30 rounded-lg bg-[#FEFAE0]/30 focus:outline-none focus:ring-2 focus:ring-[#606C38] h-32"
                      value={newPost.content}
                      onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Add tags (comma-separated) e.g., organic, pests, soil"
                      className="w-full p-3 border border-[#DDA15E]/30 rounded-lg bg-[#FEFAE0]/30 focus:outline-none focus:ring-2 focus:ring-[#606C38]"
                      value={newPost.tags}
                      onChange={(e) => setNewPost({...newPost, tags: e.target.value})}
                    />
                  </div>
                  <div className="flex justify-end gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => setIsPostModalOpen(false)}
                      className="px-4 py-2 text-[#606C38] hover:bg-[#606C38]/10 rounded-lg transition-colors duration-300"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="bg-[#606C38] text-[#FEFAE0] px-6 py-2 rounded-lg hover:bg-[#4d5a27] transition-colors duration-300"
                    >
                      Post Question
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Community;
