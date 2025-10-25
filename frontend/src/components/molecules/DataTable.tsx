import type { ReactNode } from "react";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";

export interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (item: T, index: number) => ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  error?: string | null;
  total?: number;
  page: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  rightHeader?: ReactNode;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}

export default function DataTable<T extends { id?: string | number }>({
  columns,
  data,
  loading,
  error,
  total,
  page,
  totalPages,
  onPageChange,
  searchQuery,
  onSearchChange,
  searchPlaceholder = "Cari data...",
  rightHeader,
  inputRef,
}: DataTableProps<T>) {
  if (error) return <p className="text-red-500">❌ {error}</p>;

  return (
    <div className="space-y-4">
      {/* 🔹 Header */}
      <div className="flex justify-between items-center">
        {onSearchChange && (
          <Input
            ref={inputRef}
            type="text"
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        )}
        {rightHeader}
      </div>

      {/* 🔹 Table */}
      <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-md bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr className="text-left text-gray-600">
              {columns.map((col, idx) => (
                <th
                  key={String(col.key) || idx}
                  className={`px-4 py-2 text-center ${col.className || ""}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-6 text-gray-500">
                  ⏳ Sedang memuat data...
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-4 text-gray-500">
                  📭 Tidak ada data yang cocok.
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr key={item.id ?? index} className="hover:bg-gray-50 transition">
                  {columns.map((col, cIndex) => (
                    <td
                      key={String(col.key) || cIndex}
                      className={`px-4 py-2 text-center ${col.className || ""}`}
                    >
                      {col.render ? col.render(item, index) : (item as any)[col.key as keyof T]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 🔹 Pagination */}
      <div className="flex justify-between items-center text-sm">
        <span>
          Halaman {page} dari {totalPages} {total && `(total ${total} item)`}
        </span>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            disabled={page === 1}
            onClick={() => onPageChange && onPageChange(page - 1)}
          >
            « Prev
          </Button>
          <span>{page}</span>
          <Button
            variant="secondary"
            size="sm"
            disabled={page === totalPages}
            onClick={() => onPageChange && onPageChange(page + 1)}
          >
            Next »
          </Button>
        </div>
      </div>
    </div>
  );
}
