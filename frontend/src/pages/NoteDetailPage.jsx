import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";
import api from "../lib/axios";

const NoteDetailPage = () => {
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load note");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id, navigate]);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this note?",
    );

    if (!confirmed) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted successfully");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete note");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setSaving(true);

      await api.put(`/notes/${id}`, {
        title: note.title,
        content: note.content,
      });

      toast.success("Note updated successfully");

      // Redirect to home page
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update note");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="btn btn-ghost">
            <ArrowLeftIcon className="size-4" />
            Back to Notes
          </Link>

          <button
            onClick={handleDelete}
            disabled={saving}
            className="btn btn-error btn-outline"
          >
            <Trash2Icon className="size-4" />
            Delete Note
          </button>
        </div>

        {/* Form Card */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              {/* Title */}
              <div className="form-control mb-6">
                <label className="label">
                  <span className="label-text font-medium">Title</span>
                </label>

                <input
                  type="text"
                  placeholder="Enter note title"
                  className="input input-bordered w-full"
                  value={note.title}
                  onChange={(e) =>
                    setNote((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                />
              </div>

              {/* Content */}
              <div className="form-control mb-6">
                <label className="label">
                  <span className="label-text font-medium">Content</span>
                </label>

                <textarea
                  rows={8}
                  placeholder="Write your note here..."
                  className="textarea textarea-bordered w-full"
                  value={note.content}
                  onChange={(e) =>
                    setNote((prev) => ({
                      ...prev,
                      content: e.target.value,
                    }))
                  }
                />
              </div>

              {/* Save Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  className="btn btn-success"
                >
                  {saving ? (
                    <>
                      <LoaderIcon className="size-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
