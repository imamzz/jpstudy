import { useEffect, useRef, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import { fetchGrammar, setPage } from "@/features/user/grammar/grammarSlice";
import Button from "@/components/atoms/Button";
import GrammarDetailModal from "./GrammarDetailModal";
import type { Grammar } from "@/features/user/grammar/grammarSlice";
import DataTable, { type Column } from "@/components/molecules/DataTable";

export default function GrammarTable() {
  const dispatch = useAppDispatch();
  const { words, loading, error, page, pageSize, totalPages, total } =
    useAppSelector((state) => state.grammar);

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);
  const [selectedWord, setSelectedWord] = useState<Grammar | null>(null);
  const [keepFocus, setKeepFocus] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // 🔸 Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery.trim());
    }, 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // 🔹 Fetch vocab
  useEffect(() => {
    let isCancelled = false;
    dispatch(
      fetchGrammar({ page, pageSize, search: debouncedSearch || undefined })
    )
      .unwrap()
      .then(() => {
        if (!isCancelled && keepFocus && inputRef.current) {
          inputRef.current.focus();
        }
      })
      .catch(() => {});
    return () => {
      isCancelled = true;
    };
  }, [dispatch, page, pageSize, debouncedSearch]);

  // 🔹 Reset halaman ke 1 saat search berubah
  useEffect(() => {
    if (searchQuery) dispatch(setPage(1));
  }, [searchQuery, dispatch]);

  // 🔹 Klik luar input → lepas fokus
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setKeepFocus(false);
      } else {
        setKeepFocus(true);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🔹 Ketik otomatis fokus ke input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key.length === 1 &&
        !e.ctrlKey &&
        !e.metaKey &&
        !e.altKey &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        if (inputRef.current) {
          inputRef.current.focus();
          setSearchQuery((prev) => prev + e.key);
          setKeepFocus(true);
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const columns: Column<Grammar>[] = [
    {
      key: "no",
      header: "No",
      render: (_: Grammar, index: number) => index + 1 + (page - 1) * pageSize,
      className: "w-5",
    },
    {
      key: "pattern",
      header: "Pattern",
      className: "w-10",
      render: (grammar: Grammar) => grammar.pattern,
    },
    {
      key: "romaji",
      header: "Romaji",
      render: (grammar: Grammar) => (
        <span className="italic text-gray-500">{grammar.romaji}</span>
      ),
      className: "w-10",
    },
    {
      key: "meaning",
      header: "Arti",
      className: "w-65",
      render: (grammar: Grammar) => grammar.meaning,
    },
    {
      key: "aksi",
      header: "Aksi",
      render: (grammar: Grammar) => (
        <Button
          variant="primary"
          size="sm"
          onClick={() => setSelectedWord(grammar)}
        >
          Lihat
        </Button>
      ),
      className: "w-5",
    },
  ];

  return (
    <>
      <DataTable
        columns={columns}
        data={words}
        loading={loading}
        error={error}
        total={total}
        page={page}
        totalPages={totalPages}
        onPageChange={(p) => dispatch(setPage(p))}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Cari kosakata..."
        inputRef={inputRef}
      />

      <GrammarDetailModal
        isOpen={!!selectedWord}
        onClose={() => setSelectedWord(null)}
        grammar={selectedWord}
        bookmark={true}
      />
    </>
  );
}
