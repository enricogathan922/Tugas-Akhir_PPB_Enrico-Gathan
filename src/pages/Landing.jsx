export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-indigo-50/30" />

        <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div className="space-y-6">
              <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                Kelola keuangan lebih mudah
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Atur uang dengan cara yang benar-benar{" "}
                <span className="text-blue-600">mudah</span>
              </h1>

              <p className="text-lg text-gray-600 leading-relaxed">
                Catat pemasukan, pengeluaran, dan target keuangan kamu. Ringan,
                cepat, dan bisa dipasang di HP seperti aplikasi biasa.
              </p>

              <div className="flex flex-wrap gap-3 pt-4">
                <a
                  href="/dashboard"
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-7 py-3.5 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md"
                >
                  Mulai Sekarang
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>

                <a
                  href="/about"
                  className="inline-flex items-center gap-2 bg-white text-gray-700 px-7 py-3.5 rounded-lg font-medium hover:bg-gray-50 transition-colors border border-gray-200"
                >
                  Tentang Kami
                </a>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center gap-6 pt-6 text-sm text-gray-500">
                <div className="flex items-center gap-1.5">
                  <svg
                    className="w-5 h-5 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Gratis</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <svg
                    className="w-5 h-5 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>No Ads</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <svg
                    className="w-5 h-5 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Installable</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl p-8 shadow-xl">
                <img
                  src="/logo.png"
                  alt="Finance Management"
                  className="w-full max-w-sm mx-auto drop-shadow-2xl"
                />
              </div>

              <div className="absolute -left-4 top-12 bg-white rounded-xl shadow-lg p-4 border border-gray-100 animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Income</div>
                    <div className="font-semibold text-gray-900">
                      +Rp 5.000.000
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="absolute -right-4 bottom-24 bg-white rounded-xl shadow-lg p-4 border border-gray-100 animate-pulse"
                style={{ animationDelay: "0.5s" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 12H4"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Expense</div>
                    <div className="font-semibold text-gray-900">
                      -Rp 1.250.000
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Track Otomatis
              </h3>
              <p className="text-gray-600 text-sm">
                Catat semua transaksi dengan mudah dan lihat laporan lengkap
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Target Keuangan
              </h3>
              <p className="text-gray-600 text-sm">
                Set target dan pantau progres tabungan atau investasi kamu
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Install ke HP
              </h3>
              <p className="text-gray-600 text-sm">
                Pakai seperti aplikasi native tanpa ribet download dari store
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
