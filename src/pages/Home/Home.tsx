import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import "./style.scss";
import { TaskProps } from "../../components/Task/Task";
import Form from "../../components/Form/Form";
import Task from "../../components/Task/Task";
import Pagination from "../../components/Pagination/Pagination";
import { RootState } from "../../redux/store";
import { changePage } from "../../redux/features/pagination/paginationSlice";

const Home = () => {
  const dispatch = useDispatch()
  const tasks = useSelector((state: RootState) => state.task.tasks);
  const curPage = useSelector((state: RootState) => state.pagination.pages.currentPage);
  const [curItem, setCurItem] = useState<number>(curPage * 3);
  const currentPaginationData = tasks.slice(curItem - 3, curItem);

  useEffect(() => {
    setCurItem(curPage * 3)
  }, [curPage]);

  // Move to previous page if item isn't on existing page
  useEffect(() => {
    if(curPage > Math.ceil(tasks.length / 3)) {
      dispatch(changePage(Math.ceil(tasks.length / 3)));
    }
  }, [tasks, curPage, dispatch]);

  return (
    <div className="home-container">
      <div className="home-left">
        <Form />
        <Pagination />
      </div>
      <div className="home-right">
        {currentPaginationData.map((task: TaskProps) => (
          <Task key={task.id} {...task} />
        ))}
      </div>
    </div>
  );
};

export default Home;
