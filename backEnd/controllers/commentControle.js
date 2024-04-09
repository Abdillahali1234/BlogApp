const mongoose = require("mongoose");

const expressHandler = require("express-async-handler");

const { Comment } = require("../model/Comment.model");
const {
  validateCreateComment,
  validateUpdateComment,
} = require("../schema/CommentScheme");

/**------------------------------------------------------------------------------
 * @desc  create a new comment
 * 
 * @router /api/comments
 * 
 *@method POST 
 * 
 * @access private  (logged in user only and admin) 
 ----------------------------------------------------------------------------------*/

const CreateCommentCtrl = expressHandler(async (req, res) => {
  const { error } = validateCreateComment(req.body);

  if (error) {
    return res
      .status(400)
      .json({ message: "Error", comment: error.details[0].message });
  }
  const comment = await Comment.create({
    userId: req.user.id,
    text: req.body.text,
    postId: req.body.postId,
    userName: req.user.email.split("@")[0],
  });

  res.status(201).json({ message: "SUCCESS", comment: comment });
});

/**------------------------------------------------------------------------------
 * @desc   get all comments
 * 
 * @router /api/comments
 * 
 * @method  GET 
 * 
 * @access private  (  only  admin and logged in user ) 
 ----------------------------------------------------------------------------------*/
const getAllCommentsCtrl = expressHandler(async (req, res) => {
  const comments = await Comment.find().populate("userId", {
    "-password": false,
  });

  res.status(200).json({ message: "success", comments: comments });
});

/**------------------------------------------------------------------------------
 * @desc   delete comment
 * 
 * @router /api/comments/:id
 * 
 * @method  delete 
 * 
 * @access private  (  only  admin and  owner user to comment ) 
 ----------------------------------------------------------------------------------*/

const deleteCommentCtrl = async (req, res) => {
  const id = req.params.id;

  const comment = await Comment.findById(id);
  if (!comment) {
    return res.status(404).json({ message: "Fail", comment: "not found" });
  }

  if (req.user.isAdmin || req.user.id === comment.userId.toString()) {
    const comment=await Comment.findByIdAndDelete(id);
    res.status(200).json({ message: "success", comment: comment });
  } else {
    res.status(403).json({ message: "access denied" });
  }
};

/**------------------------------------------------------------------------------
 * @desc   update comment
 * 
 * @router /api/comments/:id
 * 
 * @method  PATCH
 * 
 * @access private  (  only owner user to comment ) 
 ----------------------------------------------------------------------------------*/

const updateCommentCtrl = expressHandler(async (req, res) => {
  const { error } = validateUpdateComment(req.body);
  const id = req.params.id;
  const comment = await Comment.findById(id);

  if (error) {
    return res.status(400).json({
      message: `Error ${error.details[0].message}`,
    });
  }

  if (!comment) {
    return res.status(404).json({ message: "Fail", comment: "not found" });
  }

  if (req.user.id === comment.userId.toString()) {
    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      {
        $set: {
          text: req.body.text,
        },
      },
      { new: true }
    );
    res.status(200).json({ message: "success", comment: updatedComment });
  } else {
    res.status(403).json({ message: "access denied" });
  }
});
module.exports = {
  CreateCommentCtrl,
  getAllCommentsCtrl,
  deleteCommentCtrl,
  updateCommentCtrl,
};
