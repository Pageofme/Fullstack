import React, { useState } from "react";
import AddUserInfor from "./AddUserInfor";
import DisplayInfor from "./DisplayInfor";
import "./DisplayInfor.scss";

const MyComponent = (props) => {
  const [listUser, setListUsers] = useState([
    { id: 1, name: "Hoang ga", age: 19 },
    { id: 2, name: "Hoang dz", age: 35 },
    { id: 3, name: "Hoang vip", age: 39 },
  ]);

  const handleAddNewUser = (newUser) => {
    setListUsers([newUser, ...listUser]);
  };

  const handleDeleteUser = (userId) => {
    let listUserClone = listUser;
    listUserClone = listUserClone.filter((item) => item.id !== userId);
    setListUsers(listUserClone);
    // this.setState({
    //   listUser: listUserClone,
    // });
  };

  return (
    <>
      {/* {JSON.stringify(test)} */}

      <br />
      <div className="a">
        <AddUserInfor handleAddNewUser={handleAddNewUser} />

        <br />
        <DisplayInfor listUser={listUser} handleDeleteUser={handleDeleteUser} />
      </div>
      <div className="b"></div>
    </>
  );
};

export default MyComponent;
