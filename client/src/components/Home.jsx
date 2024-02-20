import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "./Modal";
import { Link } from "react-router-dom";

const Home = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getUsers() {
      try {
        const response = await axios.get("/api/users");
        const users = response.data;
        //console.log(users);
        setUsers(users);
      } catch (error) {
        console.error(error);
      }
    }

    getUsers();
  }, [users]);

  // delete a single user
  const handleUserDelete = async (id) => {
    try {
      await axios
        .delete(`/api/users/${id}`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })
        .then((res) => {
          // console.log(res.data);
          alert(res.data.message);
          const filtereUsers = users.filter((item) => item._id !== id);
          setUsers(filtereUsers);
        });
    } catch (error) {
      console.log(error.response.data.message);
      const errMessage = error.response.data.message;
      alert(errMessage);
    }
  };

  // signout
  const handleSignOut = () => {
    localStorage.removeItem("access_token");
    alert("Sign out successfully!");
  };

  return (
    <div className=" my-12">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <button
          className="btn btn-primary"
          onClick={() => document.getElementById("my_modal_3").showModal()}
        >
          Create A User
        </button>
        <div className=" space-x-3 flex">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
            />
          </div>
          <Link to="/login">
            <button className="btn btn-outline btn-primary mr-3">Login</button>
          </Link>
          <button
            className="btn btn-outline btn-primary"
            onClick={handleSignOut}
          >
            Signout
          </button>
        </div>
      </div>
      <div className=" mt-8">
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead className=" bg-indigo-700 text-white rounded-md">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Job Title</th>
                <th>Company</th>
                <th>Manage User</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.jobTitle}</td>
                  <td>{user.company}</td>
                  <td className="space-x-5 text-white flex">
                  <Link to={`update-user/${user._id}`}> <button 
                    className="btn btn-xs btn-warning"
                  >
                    Edit
                  </button></Link>
                    <button
                      className="btn btn-xs btn-error"
                      onClick={() => handleUserDelete(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal />
    </div>
  );
};

export default Home;
