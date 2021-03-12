import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { actionCreators } from "../store";

const Todo = ({ text, id, onBtnClick }) => {
  return (
    <li>
      <Link to={`/${id}`}>
        {text}
        <button onClick={onBtnClick}>❌</button>
      </Link>
    </li>
  );
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onBtnClick: () => {
      dispatch(actionCreators.deleteTodo(ownProps.id));
    },
  };
};

export default connect(null, mapDispatchToProps)(Todo);
