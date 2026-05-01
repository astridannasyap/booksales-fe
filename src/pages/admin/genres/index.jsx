import { useEffect, useState } from "react";
import { getGenres, deleteGenre } from "../../../_services/genre";
import { Link } from "react-router-dom";

export default function AdminGenres() {
  const [genres, setGenres] = useState([]);
  const [openDropdownId, setOpenDropdownId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getGenres();
      setGenres(data);
    }
    fetchData();
  }, []);

  const toggleDropdown = (id) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  }

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure to delete this genre?");
    if (confirmDelete) {
      await deleteGenre(id);
      setGenres(genres.filter((genre) => genre.id !== id));
    }
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
      <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-visible">
        <div className="flex items-center justify-between p-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Genres</h2>
          <Link to="/admin/genres/create">
            <button className="flex items-center justify-center text-white bg-indigo-700 hover:bg-indigo-800 font-medium rounded-lg text-sm px-4 py-2">
              <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
              </svg>
              Add Genre
            </button>
          </Link>
        </div>
        <div className="overflow-x-auto overflow-y-visible">
          <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-4 py-3">No</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {genres.length > 0 ? genres.map((genre, index) => (
                <tr key={genre.id} className="border-b dark:border-gray-700">
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{genre.name}</td>
                  <td className="px-4 py-3">{genre.description}</td>
                  <td className="px-4 py-3 text-right relative">
                    <button
                      onClick={() => toggleDropdown(genre.id)}
                      className="p-2 rounded-lg hover:bg-gray-100 font-bold text-gray-500 text-lg leading-none"
                    >
                      ⋮
                    </button>
                    {openDropdownId === genre.id && (
                      <div className="absolute right-4 mt-1 w-36 bg-white border border-gray-200 rounded-lg shadow-xl z-50 overflow-hidden">
                        <Link
                          to={`/admin/genres/edit/${genre.id}`}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                        >
                          ✏️ Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(genre.id)}
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
                  <td colSpan="4" className="text-center px-4 py-3">Data tidak ditemukan</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}