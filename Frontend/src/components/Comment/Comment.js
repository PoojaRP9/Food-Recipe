import React, {useEffect, useState} from "react";
import { AiOutlineComment } from "react-icons/ai";
import "./Comment.css";
import axios from "axios";

function Comment() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  //   const [userProfile, setUserProfile] = useState('');

  useEffect(() => {
    axios.get("http://localhost:8080/api/comment/all").then((response) => {
      setComments(response.data);
    }).catch(e => console.log(e));
  }, []);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    if (newComment) {
      const commentData = {
        userId: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).id : null,
        comment: newComment,
      };
      axios.post("http://localhost:8080/api/comment/add", commentData).then(res => {
        console.log(res.data);
      }).catch(err => console.log(err));
      setComments(prevState => [...prevState, {user: JSON.parse(localStorage.getItem("user")).username, text: commentData.comment, date: new Date()}]);
      setNewComment("");
    }
  };

  const handleCommentCancel = () => {
    setNewComment("");
  };

  return (
    <div className="comment-section">
      <h2>
        <AiOutlineComment /> Post a Comment
      </h2>
      <div>
        <textarea
          type="text"
          value={newComment}
          onChange={handleCommentChange}
          placeholder="Add a comment"
          className="add-comment-textarea"
        />
        <div className="postandcancelBtn">
          <button onClick={handleCommentSubmit} className="post-btn">
            Post
          </button>
          <button onClick={handleCommentCancel} className="cancel-btn">
            Cancel
          </button>
        </div>
      </div>
      <div>
        {comments.map((comment, index) => (
          <div key={index} className="date-time">
            <div>
              <strong>{comment.user}</strong> - {new Date(comment.date).toLocaleDateString()} {new Date(comment.date).toLocaleTimeString()}
            </div>
            <div>{comment.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Comment;
