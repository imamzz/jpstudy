import { useEffect, useRef, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import { fetchReview, setPage } from "@/features/user/review/reviewTableSlice";
import Button from "@/components/atoms/Button";
import ReviewDetailModal from "./ReviewDetailModal";
import type { ReviewItem } from "@/features/user/review/reviewTableSlice";
import DataTable, { type Column } from "@/components/molecules/DataTable";

export default function ReviewTable() {
  const dispatch = useAppDispatch();
  const { items, loading, error, page, pageSize, totalPages, total } =
    useAppSelector((state) => state.reviewTable);

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);
  const [selectedItem, setSelectedItem] = useState<ReviewItem | null>(null);
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
      fetchReview({ page, pageSize, search: debouncedSearch || undefined })
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

  const columns: Column<ReviewItem>[] = [
    {
      key: "no",
      header: "No",
      render: (_: ReviewItem, index: number) =>
        index + 1 + (page - 1) * pageSize,
      className: "w-5",
    },
    { 
      key: "type", 
      header: "Type", 
      render: (item: ReviewItem) => item.item_type,
      className: "w-10" },
    { 
      key: "kana", 
      header: "Kana", 
      render: (item: ReviewItem) => item.item_detail.kana,
      className: "w-10" },
    {
      key: "romaji",
      header: "Romaji",
      render: (item: ReviewItem) => (
        <span className="italic text-gray-500">{item.item_detail.romaji}</span>
      ),
      className: "w-5",
    },
    { 
      key: "aksi",
      header: "Aksi",
      render: (item: ReviewItem) => (
        <Button
          variant="primary"
          size="sm"
          onClick={() => setSelectedItem(item)}
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
        data={items}
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

      <ReviewDetailModal
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        item={selectedItem}
        bookmark={true}
      />
    </>
  );
}
