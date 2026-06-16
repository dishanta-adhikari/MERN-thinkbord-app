import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeftIcon } from "lucide-react";
import toast from "react-hot-toast";

import api from "../lib/axios.js";
import { NOTE_COLORS, COLOR_BUTTONS } from "../lib/noteColors.js";

const CreatePage = () => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    color: "blue",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.content.trim()) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);

    try {
      await api.post("/notes", formData);

      toast.success("Note created successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error creating note:", error);

      if (error.response?.status === 429) {
        toast.error("Slow down! You're creating notes too fast", {
          duration: 4000,
          icon: "💀",
        });
      } else {
        toast.error("Failed to create note");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to="/" className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" />
            Back to Notes
          </Link>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-6">Create New Note</h2>

              <form onSubmit={handleSubmit}>
                {/* Title */}
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>

                  <input
                    type="text"
                    placeholder="Note Title"
                    className="input input-bordered w-full"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        title: e.target.value,
                      })
                    }
                  />
                </div>

                {/* Content */}
                <div className="form-control mb-6">
                  <label className="label">
                    <span className="label-text">Content</span>
                  </label>

                  <textarea
                    placeholder="Write your note here..."
                    className="textarea textarea-bordered h-32 w-full"
                    value={formData.content}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        content: e.target.value,
                      })
                    }
                  />
                </div>

                {/* Color Picker */}
                <div className="mb-6">
                  <label className="label mb-4">
                    <span className="label-text font-medium">Note Color</span>
                  </label>

                  <div className="flex gap-3 flex-wrap">
                    {NOTE_COLORS.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            color,
                          })
                        }
                        className={`
                          w-8 h-8 rounded-full border-4 transition-all
                          ${COLOR_BUTTONS[color]}
                          ${
                            formData.color === color
                              ? "border-base-content scale-110"
                              : "border-transparent"
                          }
                        `}
                      />
                    ))}
                  </div>
                </div>

                {/* Submit */}
                <div className="card-actions justify-end">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
