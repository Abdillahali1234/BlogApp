/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import EditComment from "./EditComment";
import { deleteCommentFn } from "../../../redux/apicalls/commentCalls";

export default function CommentList({ comments }) {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleDeletedComment = (idComment) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((isOk) => {
      if (isOk) {
        dispatch(deleteCommentFn(idComment));
      }
    });
  };
  return (
    <div>
      <div className="text-[25px] font-[600] capitalize border-b-[1px] border-black pb-[2px]">
        {comments?.length} comments
      </div>
      {comments?.map((comment) => {
        return (
          <div
            key={comment?._id}
            className="info-comment flex flex-col gap-[5px] border-[1px] border-[#222] p-[10px] my-[10px] rounded-[5px]">
            <div className="flex justify-between">
              <h2 className="capitalize text-[20px]">{comment?.userName}</h2>
              <h4 className="text-[#d35400]">
                {new Date(comment?.createdAt).toDateString()}
              </h4>
            </div>
            <div>
              <p>{comment?.text}</p>
            </div>
            {user?.id == comment?.userId && (
              <div className="flex gap-[5px] text-[20px]">
                <EditComment comment={comment?.text} commentId={comment?._id} />
                <i
                  className="bi bi-trash-fill text-[#d9534f] cursor-pointer"
                  onClick={()=>{
                    handleDeletedComment(comment?._id);
                  }}></i>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
