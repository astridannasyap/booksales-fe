import { useEffect, useState } from "react";
import { getMyTransactions } from "../../../_services/transactions";
import { bookImageStorage } from "../../../_api";
import { Link } from "react-router-dom";

export default function MyTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMyTransactions();
        setTransactions(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-8 antialiased md:py-12">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Riwayat Pembelian
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Daftar semua transaksi buku yang telah kamu lakukan.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-16">
            <svg
              className="animate-spin h-8 w-8 text-indigo-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              />
            </svg>
          </div>
        )}

        {/* Empty state */}
        {!loading && transactions.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <svg
              className="mb-4 h-16 w-16 text-gray-300 dark:text-gray-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M9 10H5a1 1 0 0 0-1 1v3m5-4h10M9 10V6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4m4 0v7a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-3"
              />
            </svg>
            <p className="text-lg font-semibold text-gray-500 dark:text-gray-400">
              Belum ada transaksi
            </p>
            <p className="mt-1 text-sm text-gray-400 dark:text-gray-500">
              Yuk mulai beli buku favoritmu!
            </p>
            <Link
              to="/books"
              className="mt-4 inline-flex items-center rounded-lg bg-indigo-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-800 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700"
            >
              Lihat Buku
            </Link>
          </div>
        )}

        {/* Transaction list */}
        {!loading && transactions.length > 0 && (
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6"
              >
                {/* Transaction header */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-200 pb-4 dark:border-gray-700 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center rounded-md bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10 dark:bg-indigo-900/30 dark:text-indigo-400">
                      {transaction.order_number}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(transaction.created_at)}
                  </p>
                </div>

                {/* Book detail */}
                <div className="flex items-center gap-4">
                  {transaction.book?.cover_photo && (
                    <img
                      src={`${bookImageStorage}/${transaction.book.cover_photo}`}
                      alt={transaction.book?.title}
                      className="h-20 w-14 rounded object-cover flex-shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-semibold text-gray-900 dark:text-white truncate">
                      {transaction.book?.title ?? "Buku tidak ditemukan"}
                    </p>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Harga satuan: {formatPrice(transaction.book?.price ?? 0)}
                    </p>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Jumlah: <span className="font-medium text-gray-700 dark:text-gray-300">
                        {transaction.book?.price
                          ? Math.round(transaction.total_amount / transaction.book.price)
                          : "-"} buku
                      </span>
                    </p>
                  </div>

                  {/* Total */}
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Total</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      {formatPrice(transaction.total_amount)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}