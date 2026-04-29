import { useEffect, useState } from "react";
import { getAuthors } from "../../../_services/author";
import { Link } from "react-router-dom";

export default function AdminAuthors() {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAuthors();
      setAuthors(data);
    }
    fetchData();
  }, []);

  return (
    <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
      <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
        <div className="flex items-center justify-between p-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Authors</h2>
          <Link to="/admin/authors/create">
            <button className="flex items-center justify-center text-white bg-indigo-700 hover:bg-indigo-800 font-medium rounded-lg text-sm px-4 py-2">
              <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"/>
              </svg>
              Add Author
            </button>
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-4 py-3">No</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Photo</th>
                <th className="px-4 py-3">Bio</th>
              </tr>
            </thead>
            <tbody>
              {authors.length > 0 ? authors.map((author, index) => (
                <tr key={author.id} className="border-b dark:border-gray-700">
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{author.name}</td>
                  <td className="px-4 py-3">{author.photo}</td>
                  <td className="px-4 py-3">{author.bio}</td>
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