/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsCount } from "../../../../redux/apicalls/postCalls";

export default function Pagination({ setCurrentPage, postsPerPage }) {
  const [active, setActive] = React.useState(1);
  const dispatch = useDispatch();
  const { postsCount } = useSelector((state) => state.post);
  let arr = [];
  for (let i = 0; i <Math.ceil(postsCount / postsPerPage); i++) {
    arr.push(i + 1);
  }
  useEffect(() => {
    dispatch(fetchPostsCount());
  }, []);
  const getItemProps = (index) => ({
    variant: active === index ? "filled" : "text",
    color: "gray",
    onClick: () => {
      setActive(index);
      setCurrentPage(index);
    },
    className: "rounded-full",
  });

  const next = () => {
    if (active === Math.ceil(postsCount / postsPerPage)) return;

    setActive(active + 1);
    setCurrentPage(active + 1);
  };

  const prev = () => {
    if (active === 1) return;

    setActive(active - 1);
    setCurrentPage(active - 1);
  };

  return (
    <div className="flex items-center gap-4 ">
      <Button
        variant="text"
        className="flex items-center gap-2 rounded-full"
        onClick={prev}
        disabled={active === 1}>
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
      </Button>
      <div className="flex items-center gap-2">
        {arr.map((item) => {
          return (
            <IconButton key={item} {...getItemProps(item)}>
              {item}
            </IconButton>
          );
        })}
      </div>
      <Button
        variant="text"
        className="flex items-center gap-2 rounded-full"
        onClick={next}
        disabled={active === Math.ceil(postsCount / postsPerPage)}>
        Next
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
}
