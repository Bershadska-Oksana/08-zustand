"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes, PER_PAGE } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import EmptyListMessage from "@/components/EmptyListMessage/EmptyListMessage";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import css from "./NotesPage.module.css";

interface NotesClientProps {
  category?: string;
}

const NotesClient = ({ category }: NotesClientProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [category]);

  const { data, isFetching, isError } = useQuery({
    queryKey: ["notes", category, searchQuery, currentPage],
    queryFn: () => fetchNotes(searchQuery, category, currentPage, PER_PAGE),
    keepPreviousData: true,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox
          onChange={(e) => {
            setSearchQuery(e.target.value.trim());
            setCurrentPage(1);
          }}
          defaultValue={searchQuery}
        />
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
        <a href="/notes/action/create" className={css.button}>
          Create note +
        </a>
      </header>

      {notes.length > 0 && <NoteList notes={notes} />}
      {!notes.length && !isFetching && !isError && <EmptyListMessage />}
    </div>
  );
};

export default NotesClient;
