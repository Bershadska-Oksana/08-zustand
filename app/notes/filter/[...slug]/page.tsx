import NotesClient from "./Notes.client";
import { NOTES_FILTER_ALL } from "@/lib/constants";

interface Props {
  params: { slug?: string[] };
}

const NotesPage = ({ params }: Props) => {
  const slug = params.slug ?? [];
  const category = slug[0] === NOTES_FILTER_ALL ? undefined : slug[0];

  return <NotesClient category={category} key={category} />;
};

export default NotesPage;
