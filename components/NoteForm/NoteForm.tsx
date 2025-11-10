"use client";

import { useState } from "react";
import { useNoteStore } from "@/lib/store/noteStore";
import { createNote } from "@/lib/api";
import css from "./NoteForm.module.css";

interface NoteFormProps {
  onClose?: () => void;
}

const NoteForm = ({ onClose }: NoteFormProps) => {
  const { draft, setDraft, clearDraft } = useNoteStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setDraft({ [e.target.name]: e.target.value });
    if (e.target.name === "title" && e.target.value.trim() !== "") {
      setError(""); // прибираємо червоне повідомлення
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Валідація: title обов'язкове
    if (!draft.title.trim()) {
      setError("Please enter a title");
      return;
    }

    try {
      setIsSubmitting(true);
      await createNote(draft);
      clearDraft();
      onClose?.();
    } catch (err) {
      console.error(err);
      alert("Failed to create note");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={draft.title}
        onChange={handleChange}
        className={error ? css.errorInput : ""}
      />
      {error && <div className={css.errorMessage}>{error}</div>}

      <textarea
        name="content"
        placeholder="Content"
        value={draft.content}
        onChange={handleChange}
      />

      <select name="tag" value={draft.tag} onChange={handleChange}>
        <option value="Todo">Todo</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
      </select>

      <div className={css.buttons}>
        <button type="submit" disabled={isSubmitting}>
          Save
        </button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
