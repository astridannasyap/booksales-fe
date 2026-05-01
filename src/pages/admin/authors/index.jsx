import { useEffect, useState } from "react";
import { getAuthors, deleteAuthor } from "../../../_services/author";
import { Link } from "react-router-dom";

export default function AdminAuthors() {
  const [authors, setAuthors] = useState([]);
  const [openDropdownId, setOpenDropdownId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAuthors();
      setAuthors(data);
    }
    fetchData();
  }, []);

  const toggleDropdown = (id) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  }

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure to delete this author?");
    if (confirmDelete) {
      await deleteAuthor(id);
      setAuthors(authors.filter((author) => author.id !== id));
    }
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
      <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-visible">
        <div className="flex items-center justify-between p-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Authors</h2>
          <Link to="/admin/authors/create">
            <button className="flex items-center justify-center text-white bg-indigo-700 hover:bg-indigo-800 font-medium rounded-lg text-sm px-4 py-2">
              <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 011-1z" />
              </svg>
              Add Author
            </button>
          </Link>
        </div>
        <div className="overflow-x-auto overflow-y-visible">
          <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-4 py-3">No</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Photo</th>
                <th className="px-4 py-3">Bio</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {authors.length > 0 ? authors.map((author, index) => (
                <tr key={author.id} className="border-b dark:border-gray-700">
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{author.name}</td>
                  <td className="px-4 py-3">{author.photo}</td>
                  <td className="px-4 py-3">{author.bio}</td>
                  <td className="px-4 py-3 text-right relative">
                    <button
                      onClick={() => toggleDropdown(author.id)}
                      className="p-2 rounded-lg hover:bg-gray-100 font-bold text-gray-500 text-lg leading-none"
                    >
                      ⋮
                    </button>
                    {openDropdownId === author.id && (
                      <div className="absolute right-4 mt-1 w-36 bg-white border border-gray-200 rounded-lg shadow-xl z-50 overflow-hidden">
                        <Link
                          to={`/admin/authors/edit/${author.id}`}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                        >
                          ✏️ Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(author.id)}
                          className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" className="text-center px-4 py-3">Data tidak ditemukan</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}