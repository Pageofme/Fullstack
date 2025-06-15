import React, { useEffect, useState } from "react";
// import "./DisplayInfor.scss";

// class DisplayInfor extends React.Component {
//   render() {
//     console.log("Call me render: ");

//     const { listUser } = this.props;

//     // console.table(listUser);
//     return (
//       <div className="display-infor-container">
//         {true && (
//           <div>
//             {listUser.map((user) => {
//               return (
//                 <div key={user.id} className={user.age < 20 ? "red" : "green"}>
//                   <div>
//                     <div>My name is {user.name}</div>
//                     <div>My age is {user.age}</div>
//                   </div>
//                   <div>
//                     <button
//                       onClick={() => this.props.handleDeleteUser(user.id)}
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     );
//   }
// }
const DisplayInfor = (props) => {
  const { listUser } = props;

  const [isShowHideListUser, setShowHideListUser] = useState(true);

  const handleShowHideListUser = () => {
    setShowHideListUser(!isShowHideListUser);
  };

  console.log("Call me render");
  useEffect(() => {
    if (listUser.length === 0) alert("You deleted all users");
    console.log("Call me useEffect");
  }, [listUser]);

  return (
    <div className="display-infor-container">
      <div>
        <span onClick={() => handleShowHideListUser()}>
          {isShowHideListUser === true ? "Hide list user" : "Show list user"}
        </span>
      </div>

      {isShowHideListUser && (
        <div>
          {listUser.map((user) => {
            return (
              <div key={user.id} className={user.age < 20 ? "red" : "green"}>
                <div>
                  <div>My name is {user.name}</div>
                  <div>My age is {user.age}</div>
                </div>
                <div>
                  <button onClick={() => props.handleDeleteUser(user.id)}>
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DisplayInfor;
