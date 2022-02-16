import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, listUsers } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { USER_DELETE_RESET } from "../constants/userConstants";
import { useTranslation } from "react-i18next";
export default function UserListScreen(props) {
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;
  const userDelete = useSelector((state) => state.userDelete);
  const { loading: loadingDelete, error: errorDelete, success } = userDelete;
  const dispatch = useDispatch();
  useEffect(() => {
    if (success) {
      dispatch({ type: USER_DELETE_RESET });
    }
    dispatch(listUsers());
  }, [dispatch, success]);

  const deleteHandler = (user) => {
    if (window.confirm(`${t("are_you_sure_to_delete_user")}?`)) {
      dispatch(deleteUser(user._id));
    }
  };
  const { t } = useTranslation();
  return (
    <div>
      <div className="row">
        <h1>{t("users")}</h1>
      </div>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}

      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>{t("name")}</th>
              <th>{t("email")}</th>
              <th>Admin</th>
              <th>{t("actions")}</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? `${t("yes")}` : `${t("no")}`}</td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() => deleteHandler(user)}
                  >
                    {t("delete")}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
