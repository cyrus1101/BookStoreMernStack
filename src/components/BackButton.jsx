import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
const BackButton = ({ destination = "/" }) => {
  return (
    <div className="flex">
      <Link
        className="bg-sky-800 text-white px-4 py-1 rounded-lg w-fit"
        to={destination}
      >
        <BsArrowLeft className="text-2x1" />
      </Link>
    </div>
  );
};

export default BackButton;
