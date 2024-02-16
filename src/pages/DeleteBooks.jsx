import { UserContext } from "../Context/UserContext";
import React, { useState, useContext } from "react";
import aixos from "axios";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useSnackbar } from "notistack";

const DeleteBooks = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { token } = useContext(UserContext);
  const handleDeleteBook = () => {
    setLoading(true);
    aixos
      .delete(`http://localhost:5555/books/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book Deleted successfully", { variant: "success" });
        navigate("/");
      })
      .catch((err) => {
        enqueueSnackbar("Error", { variant: "error" });
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Delete Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
        <h3 className="text-2xl">
          Are you sure you want to delete this book ?
        </h3>
        <button
          className="p-4 bg-red-600  text-white m-8 w-full"
          onClick={handleDeleteBook}
        >
          Yes, i do !
        </button>
      </div>
    </div>
  );
};

export default DeleteBooks;
