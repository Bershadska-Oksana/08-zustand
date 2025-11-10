import CreateNoteFormWrapper from "./CreateNoteFormWrapper";
import css from "./page.module.css";

export const metadata = {
  title: "Create Note | NoteHub",
  description: "Create a new note in NoteHub",
  openGraph: {
    title: "Create Note | NoteHub",
    description: "Create a new note in NoteHub",
    url: "https://your-vercel-app.vercel.app/notes/action/create",
    images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
  },
};

export default function CreateNotePage() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <CreateNoteFormWrapper />
      </div>
    </main>
  );
}
