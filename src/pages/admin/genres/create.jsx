import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createGenre } from "../../../_services/genre";

export default function GenreCreate() {
  const [formData, setFormData] = useState({ name: "", description: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createGenre(formData);
      navigate("/admin/genres");
    } catch (error) {
      console.log(error);
      alert("Error Creating Genre");
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Create New Genre</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 mb-4">
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
              <input
                type="text" name="name" id="name"
                value={formData.name} onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5"
                placeholder="Genre name" required
              />
            </div>
            <div>
              <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
              <textarea
                name="description" id="description" rows="4"
                value={formData.description} onChange={handleChange}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Genre description..."
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button type="submit" className="text-white bg-indigo-700 hover:bg-indigo-800 font-medium rounded-lg text-sm px-5 py-2.5">
              Create Genre
            </button>
            <button type="reset" className="text-gray-600 border border-gray-600 hover:bg-gray-600 hover:text-white font-medium rounded-lg text-sm px-5 py-2.5">
              Reset
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}