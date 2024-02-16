import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

const BooksTable = ({ books }) => {
  return (
    <table className="w-full border-separate border-spacing-2">
      <thead>
        <tr>
          <th className="border border-slate-600 rounded-md">No</th>
          <th className="border border-slate-600 rounded-md">Title</th>
          <th className="border border-slate-600 rounded-md max-md:hidden ">
            Author
          </th>
          <th className="border border-slate-600 rounded-md max-md:hidden ">
            Publish Year
          </th>
          <th className="border border-slate-600 rounded-md">Operations</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book, index) => (
          <tr className="h-8" key={index}>
            <td className="border border-slate-700 text-center rounded-md">
              {index + 1}
            </td>
            <td className="border border-slate-700 text-center rounded-md">
              {book.title}
            </td>
            <td className="border border-slate-700 text-center rounded-md max-md:hidden ">
              {book.author}
            </td>
            <td className="border border-slate-700 text-center rounded-md max-md:hidden ">
              {book.publishYear}
            </td>
            <td className="border border-slate-700 text-center rounded-md">
              <div className="flex justify-center gap-x-4">
                <Link to={`/books/details/${book._id}`}>
                  <BsInfoCircle className="text-2x1 text-green-800" />
                </Link>
                <Link to={`/books/edit/${book._id}`}>
                  <AiOutlineEdit className="text-2x1 text-yellow-600" />
                </Link>
                <Link to={`/books/delete/${book._id}`}>
                  <MdOutlineDelete className="text-2x1 text-red-600" />
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BooksTable;
