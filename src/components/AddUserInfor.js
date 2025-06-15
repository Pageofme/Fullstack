import React, { useState } from "react";

// class AddUserInfor extends React.Component {
//   state = {
//     name: "",
//     address: "Vietnam",
//     age: "",
//   };

//   handleOnChangeName = (event) => {
//     // this.state.name = event.target.value; => bad code (không được gán trực tiếp vì nó sẽ Không re-render, UI không cập nhật)
//     this.setState({
//       name: event.target.value,
//     });
//   };
//   handleOnChangeAge = (event) => {
//     this.setState({
//       age: event.target.value,
//     });
//   };
//   handleOnSubmit = (event) => {
//     event.preventDefault(); // Hàm chặn k cho reload lại trang

//     this.props.handleAddNewUser({
//       id: Math.floor(Math.random() * 100 + 1) + "-random",
//       name: this.state.name,
//       age: this.state.age,
//     });
//   };
//   render() {
//     return (
//       <div>
//         My name is {this.state.name} and I'm from {this.state.age}
//         <form
//           onSubmit={(event) => {
//             this.handleOnSubmit(event);
//           }}
//         >
//           <label>Your name: </label>
//           <input
//             type="text"
//             value={this.state.name}
//             onChange={(event) => {
//               this.handleOnChangeName(event);
//             }}
//           />
//           <label>Your age: </label>
//           <input
//             type="text"
//             value={this.state.age}
//             onChange={(event) => {
//               this.handleOnChangeAge(event);
//             }}
//           />
//           <button>Submit</button>
//         </form>
//         <p>I'm a boy</p>
//       </div>
//     );
//   }
// }

const AddUserInfor = (props) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("Viet Nam");
  const [age, setAge] = useState("");

  const handleOnChangeName = (event) => {
    setName(event.target.value);
  };
  const handleOnChangeAge = (event) => {
    setAge(event.target.value);
  };
  const handleOnSubmit = (event) => {
    event.preventDefault(); // Hàm chặn k cho reload lại trang

    props.handleAddNewUser({
      id: Math.floor(Math.random() * 100 + 1) + "-random",
      name: name,
      age: age,
    });
  };

  return (
    <div>
      My name is {name} and I'm from {age}
      <form
        onSubmit={(event) => {
          handleOnSubmit(event);
        }}
      >
        <label>Your name: </label>
        <input
          type="text"
          value={name}
          onChange={(event) => {
            handleOnChangeName(event);
          }}
        />
        <label>Your age: </label>
        <input
          type="text"
          value={age}
          onChange={(event) => {
            handleOnChangeAge(event);
          }}
        />
        <button>Submit</button>
      </form>
      <p>I'm a boy</p>
    </div>
  );
};
export default AddUserInfor;
