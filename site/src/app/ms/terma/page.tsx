import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
const tarikhKuatkuasa = "13 Mac 2026";
const kemaskiniTerakhir = "13 Mac 2026";

export const metadata: Metadata = {
  title: "Terma dan Syarat | Pelangi Capsule Hostel",
  description:
    "Terma dan Syarat Pelangi Capsule Hostel — polisi tempahan, polisi pembatalan dan bayaran balik, peraturan rumah, dan undang-undang yang terpakai. Didedahkan mengikut CPETTR 2024.",
  alternates: {
    canonical: "https://pelangicapsulehostel.com/ms/terma",
    languages: {
      en: "https://pelangicapsulehostel.com/terms",
      ms: "https://pelangicapsulehostel.com/ms/terma",
    },
  },
};

export default function TermaBMPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Terma dan Syarat",
    description: metadata.description,
    url: "https://pelangicapsulehostel.com/ms/terma",
    datePublished: "2026-03-13",
    dateModified: "2026-03-13",
    inLanguage: "ms",
    isPartOf: {
      "@type": "WebSite",
      name: "Pelangi Capsule Hostel",
      url: "https://pelangicapsulehostel.com",
    },
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-stone-50 dark:bg-stone-950" lang="ms">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="pt-28 pb-16 container-custom">
          <div className="max-w-3xl mx-auto">
            {/* Page Header */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 text-xs font-medium">
                  Bahasa Malaysia
                </span>
                <Link
                  href="/terms"
                  className="text-xs text-stone-500 hover:text-stone-700 dark:hover:text-stone-300 transition-colors"
                  lang="en"
                >
                  English version &rarr;
                </Link>
              </div>
              <h1 className="font-display text-4xl font-semibold text-stone-900 dark:text-stone-100 mb-3">
                Terma dan Syarat
              </h1>
              <p className="text-stone-500 dark:text-stone-400 text-sm">
                Tarikh kuat kuasa: {tarikhKuatkuasa} &middot; Kemaskini
                terakhir: {kemaskiniTerakhir}
              </p>
              <p className="text-stone-500 dark:text-stone-400 text-xs mt-2">
                Didedahkan mengikut Peraturan-Peraturan Perlindungan Pengguna
                (Urus Niaga Perdagangan Elektronik) 2024 (CPETTR 2024).
              </p>
            </div>

            {/* Content */}
            <div className="prose prose-stone dark:prose-invert prose-lg max-w-none">
              {/* Mandatory Trader Identity */}
              <section className="mb-8">
                <h2 className="font-display text-2xl font-semibold text-stone-800 dark:text-stone-200 mb-4">
                  Maklumat Peniaga
                </h2>
                <div className="bg-stone-100 dark:bg-stone-800 rounded-lg p-5 text-stone-700 dark:text-stone-300 not-prose">
                  <table className="w-full text-sm">
                    <tbody>
                      <tr className="border-b border-stone-200 dark:border-stone-700">
                        <td className="py-2 pr-4 font-medium text-stone-500 dark:text-stone-400 whitespace-nowrap">
                          Nama Perniagaan
                        </td>
                        <td className="py-2">Pelangi Capsule Hostel</td>
                      </tr>
                      <tr className="border-b border-stone-200 dark:border-stone-700">
                        <td className="py-2 pr-4 font-medium text-stone-500 dark:text-stone-400 whitespace-nowrap">
                          Alamat
                        </td>
                        <td className="py-2">
                          26A Jalan Perang, Taman Pelangi, 80400 Johor Bahru,
                          Johor, Malaysia
                        </td>
                      </tr>
                      <tr className="border-b border-stone-200 dark:border-stone-700">
                        <td className="py-2 pr-4 font-medium text-stone-500 dark:text-stone-400 whitespace-nowrap">
                          E-mel
                        </td>
                        <td className="py-2">
                          <a
                            href="mailto:pelangicapsule@gmail.com"
                            className="text-amber-700 dark:text-amber-400 underline"
                          >
                            pelangicapsule@gmail.com
                          </a>
                        </td>
                      </tr>
                      <tr className="border-b border-stone-200 dark:border-stone-700">
                        <td className="py-2 pr-4 font-medium text-stone-500 dark:text-stone-400 whitespace-nowrap">
                          Telefon
                        </td>
                        <td className="py-2">
                          <a
                            href="tel:+60127088789"
                            className="text-amber-700 dark:text-amber-400 underline"
                          >
                            +60 12-708 8789
                          </a>
                        </td>
                      </tr>
                      <tr className="border-b border-stone-200 dark:border-stone-700">
                        <td className="py-2 pr-4 font-medium text-stone-500 dark:text-stone-400 whitespace-nowrap">
                          Laman Web
                        </td>
                        <td className="py-2">pelangicapsulehostel.com</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4 font-medium text-stone-500 dark:text-stone-400 whitespace-nowrap">
                          Pendaftaran MOTAC
                        </td>
                        <td className="py-2">
                          {process.env.NEXT_PUBLIC_MOTAC_REG_NUMBER ||
                            "Berdaftar dengan MOTAC"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Description of Services */}
              <section className="mb-8">
                <h2 className="font-display text-2xl font-semibold text-stone-800 dark:text-stone-200 mb-4">
                  Perihalan Perkhidmatan
                </h2>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                  Pelangi Capsule Hostel menyediakan penginapan kapsul gaya
                  Jepun di Johor Bahru. Setiap kapsul dilengkapi dengan kawalan
                  suhu, lampu boleh laras, soket kuasa, dan Wi-Fi percuma.
                  Kemudahan termasuk bilik mandi berkongsi dengan pancuran air
                  panas, ruang tamu, dapur kecil (ketuhar gelombang mikro dan
                  cerek), serta loker peribadi.
                </p>
              </section>

              {/* Introduction */}
              <section className="mb-8">
                <h2 className="font-display text-2xl font-semibold text-stone-800 dark:text-stone-200 mb-4">
                  Pengenalan
                </h2>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                  Terma dan Syarat ini (&ldquo;Terma&rdquo;) mengawal
                  penggunaan laman web Pelangi Capsule Hostel serta semua
                  tempahan, pertanyaan, dan urus niaga yang dibuat melaluinya.
                  Dengan mengakses laman web ini atau membuat tempahan, anda
                  bersetuju untuk terikat dengan Terma ini. Jika anda tidak
                  bersetuju, sila jangan gunakan laman web atau perkhidmatan
                  kami.
                </p>
              </section>

              {/* 1. Pricing / Harga */}
              <section className="mb-8">
                <h2 className="font-display text-2xl font-semibold text-stone-800 dark:text-stone-200 mb-4">
                  1. Harga dan Bayaran
                </h2>
                <ul className="list-disc list-inside space-y-2 text-stone-700 dark:text-stone-300">
                  <li>
                    Semua harga dipaparkan dalam{" "}
                    <strong>Ringgit Malaysia (MYR)</strong> dan termasuk cukai
                    yang berkenaan melainkan dinyatakan sebaliknya.
                  </li>
                  <li>
                    Harga bilik bermula dari <strong>RM35 semalam</strong>{" "}
                    bergantung kepada jenis bilik dan musim.
                  </li>
                  <li>
                    <strong>Cukai Pelancongan (TTx): RM10 setiap bilik setiap malam</strong>{" "}
                    dikenakan kepada semua pelancong asing mengikut Akta Cukai
                    Pelancongan 2017. Warganegara Malaysia dan penduduk tetap
                    dikecualikan. Cukai ini dipaparkan sebagai item berasingan.
                  </li>
                  <li>
                    Harga tertakluk kepada perubahan tanpa notis terlebih dahulu
                    sehingga tempahan disahkan.
                  </li>
                </ul>
              </section>

              {/* 2. Cara Bayaran */}
              <section className="mb-8">
                <h2 className="font-display text-2xl font-semibold text-stone-800 dark:text-stone-200 mb-4">
                  2. Kaedah Pembayaran
                </h2>
                <ul className="list-disc list-inside space-y-2 text-stone-700 dark:text-stone-300">
                  <li>
                    Pembayaran boleh dibuat secara{" "}
                    <strong>tunai (MYR)</strong>,{" "}
                    <strong>DuitNow QR</strong>, atau{" "}
                    <strong>pindahan bank</strong> semasa daftar masuk, melainkan
                    diaturkan sebaliknya.
                  </li>
                  <li>
                    Untuk tempahan awal, deposit atau bayaran penuh mungkin
                    diperlukan seperti yang dimaklumkan semasa proses tempahan.
                  </li>
                  <li>
                    Semua harga yang dipaparkan di laman web ini termasuk cukai
                    yang berkenaan melainkan dinyatakan secara jelas (contohnya,
                    Cukai Pelancongan ditunjukkan secara berasingan).
                  </li>
                </ul>
              </section>

              {/* 3. Polisi Tempahan */}
              <section className="mb-8">
                <h2 className="font-display text-2xl font-semibold text-stone-800 dark:text-stone-200 mb-4">
                  3. Polisi Tempahan
                </h2>
                <ul className="list-disc list-inside space-y-2 text-stone-700 dark:text-stone-300">
                  <li>
                    Tempahan boleh dibuat melalui WhatsApp, borang pertanyaan
                    laman web kami, atau platform pihak ketiga (Agoda,
                    Booking.com).
                  </li>
                  <li>
                    Tempahan hanya disahkan selepas anda menerima pengesahan
                    bertulis daripada kami melalui WhatsApp atau e-mel.
                  </li>
                  <li>
                    Kami berhak untuk menolak atau membatalkan sebarang tempahan
                    mengikut budi bicara kami, termasuk dalam kes penipuan yang
                    disyaki atau pelanggaran Terma ini.
                  </li>
                </ul>
              </section>

              {/* 4. Daftar Masuk & Keluar */}
              <section className="mb-8">
                <h2 className="font-display text-2xl font-semibold text-stone-800 dark:text-stone-200 mb-4">
                  4. Daftar Masuk dan Daftar Keluar
                </h2>
                <div className="bg-stone-100 dark:bg-stone-800 rounded-lg p-5 text-stone-700 dark:text-stone-300 mb-4">
                  <p>
                    <strong>Daftar masuk:</strong> 3:00 petang dan seterusnya
                  </p>
                  <p>
                    <strong>Daftar keluar:</strong> Sebelum 12:00 tengah hari
                  </p>
                </div>
                <ul className="list-disc list-inside space-y-2 text-stone-700 dark:text-stone-300">
                  <li>
                    Daftar masuk awal atau daftar keluar lewat tertakluk kepada
                    ketersediaan dan mungkin dikenakan caj tambahan.
                  </li>
                  <li>
                    Semua tetamu mesti mengemukakan pasport yang sah (warga
                    asing) atau MyKad/IC (warganegara Malaysia) semasa daftar
                    masuk, seperti yang dikehendaki oleh peraturan hospitaliti
                    Malaysia.
                  </li>
                  <li>
                    Tetamu di bawah umur 18 tahun mesti diiringi oleh ibu bapa
                    atau penjaga yang sah.
                  </li>
                </ul>
              </section>

              {/* 5. Polisi Pembatalan dan Bayaran Balik */}
              <section className="mb-8">
                <h2 className="font-display text-2xl font-semibold text-stone-800 dark:text-stone-200 mb-4">
                  5. Polisi Pembatalan dan Bayaran Balik
                </h2>
                <ul className="list-disc list-inside space-y-2 text-stone-700 dark:text-stone-300">
                  <li>
                    <strong>Pembatalan percuma:</strong> Pembatalan yang dibuat
                    sekurang-kurangnya{" "}
                    <strong>48 jam sebelum daftar masuk</strong> akan menerima
                    bayaran balik penuh (jika bayaran telah dibuat terlebih
                    dahulu).
                  </li>
                  <li>
                    <strong>Pembatalan lewat:</strong> Pembatalan yang dibuat
                    kurang daripada 48 jam sebelum daftar masuk mungkin dikenakan
                    kadar malam pertama.
                  </li>
                  <li>
                    <strong>Tidak hadir:</strong> Kegagalan untuk daftar masuk
                    tanpa notis terlebih dahulu akan dikenakan jumlah tempahan
                    penuh.
                  </li>
                  <li>
                    Bayaran balik, jika berkenaan, akan diproses dalam{" "}
                    <strong>7&ndash;14 hari bekerja</strong> melalui kaedah
                    pembayaran asal.
                  </li>
                  <li>
                    Tempahan yang dibuat melalui platform pihak ketiga (Agoda,
                    Booking.com) tertakluk kepada polisi pembatalan platform
                    tersebut.
                  </li>
                </ul>
                <p className="text-stone-600 dark:text-stone-400 text-sm mt-3">
                  Polisi pembatalan ini mematuhi peruntukan terma kontrak adil
                  di bawah Akta Perlindungan Pengguna 1999.
                </p>
              </section>

              {/* 6. Cukai Pelancongan */}
              <section className="mb-8">
                <h2 className="font-display text-2xl font-semibold text-stone-800 dark:text-stone-200 mb-4">
                  6. Cukai Pelancongan (TTx)
                </h2>
                <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-5 mb-4">
                  <p className="text-stone-800 dark:text-stone-200 font-medium">
                    Cukai Pelancongan Malaysia: RM10 setiap bilik setiap malam
                  </p>
                </div>
                <ul className="list-disc list-inside space-y-2 text-stone-700 dark:text-stone-300">
                  <li>
                    Cukai Pelancongan Malaysia (TTx) adalah caj yang diwajibkan
                    oleh kerajaan di bawah Akta Cukai Pelancongan 2017 dan
                    Ketetapan Umum MyTTx No. 01/2025, ditadbir oleh Jabatan
                    Kastam Diraja Malaysia (JKDM).
                  </li>
                  <li>
                    Cukai ini dikenakan pada kadar RM10 setiap bilik setiap malam
                    dan terpakai kepada semua pelancong asing. Warganegara
                    Malaysia dan penduduk tetap dikecualikan.
                  </li>
                  <li>
                    Cukai Pelancongan dipaparkan sebagai item berasingan dalam
                    aliran tempahan kami.
                  </li>
                </ul>
              </section>

              {/* 7. Peraturan Rumah */}
              <section className="mb-8">
                <h2 className="font-display text-2xl font-semibold text-stone-800 dark:text-stone-200 mb-4">
                  7. Peraturan Rumah
                </h2>
                <ul className="list-disc list-inside space-y-2 text-stone-700 dark:text-stone-300">
                  <li>
                    <strong>Waktu senyap:</strong> 10:00 malam hingga 8:00 pagi
                    — sila kurangkan bunyi di kawasan kapsul dan kawasan bersama.
                  </li>
                  <li>
                    <strong>Dilarang merokok:</strong> Merokok dilarang sama
                    sekali di dalam semua premis hostel.
                  </li>
                  <li>
                    <strong>Dilarang dadah:</strong> Pemilikan atau penggunaan
                    dadah haram adalah dilarang dan akan mengakibatkan
                    pengusiran serta-merta.
                  </li>
                  <li>
                    <strong>Dilarang memasak:</strong> Memasak tidak
                    dibenarkan. Kemudahan ketuhar gelombang mikro dan cerek
                    disediakan di ruang tamu.
                  </li>
                  <li>
                    <strong>Barang peribadi:</strong> Gunakan loker yang
                    disediakan. Hostel tidak bertanggungjawab atas kehilangan,
                    kecurian, atau kerosakan harta benda peribadi.
                  </li>
                  <li>
                    <strong>Hormati tetamu lain:</strong> Sebarang tingkah laku
                    yang mengganggu tetamu lain boleh mengakibatkan pengusiran
                    tanpa bayaran balik.
                  </li>
                  <li>
                    <strong>Kerosakan harta benda:</strong> Tetamu
                    bertanggungjawab atas sebarang kerosakan yang disebabkan
                    kepada harta hostel.
                  </li>
                </ul>
              </section>

              {/* 8. Liabiliti */}
              <section className="mb-8">
                <h2 className="font-display text-2xl font-semibold text-stone-800 dark:text-stone-200 mb-4">
                  8. Liabiliti
                </h2>
                <ul className="list-disc list-inside space-y-2 text-stone-700 dark:text-stone-300">
                  <li>
                    Pelangi Capsule Hostel tidak bertanggungjawab atas sebarang
                    kehilangan, kerosakan, kecederaan, atau kematian yang timbul
                    daripada penginapan anda, kecuali jika disebabkan oleh
                    kecuaian besar kami.
                  </li>
                  <li>
                    Hostel tidak bertanggungjawab atas kehilangan atau kecurian
                    barang peribadi.
                  </li>
                  <li>
                    Kami tidak bertanggungjawab atas gangguan perkhidmatan yang
                    disebabkan oleh peristiwa di luar kawalan munasabah kami
                    (force majeure).
                  </li>
                </ul>
              </section>

              {/* 9. Privasi */}
              <section className="mb-8">
                <h2 className="font-display text-2xl font-semibold text-stone-800 dark:text-stone-200 mb-4">
                  9. Privasi dan Perlindungan Data
                </h2>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                  Kami mengumpul dan memproses data peribadi mengikut Akta
                  Perlindungan Data Peribadi 2010 (PDPA) Malaysia dan Akta
                  Pindaan 2024. Untuk butiran penuh tentang cara kami mengendalikan
                  data anda, sila lihat{" "}
                  <Link
                    href="/privacy-policy"
                    className="text-amber-700 dark:text-amber-400 underline hover:text-amber-800 dark:hover:text-amber-300"
                  >
                    Dasar Privasi
                  </Link>{" "}
                  kami.
                </p>
              </section>

              {/* 10. Undang-undang */}
              <section className="mb-8">
                <h2 className="font-display text-2xl font-semibold text-stone-800 dark:text-stone-200 mb-4">
                  10. Undang-Undang yang Terpakai
                </h2>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                  Terma ini ditadbir oleh dan ditafsirkan mengikut undang-undang
                  Malaysia. Sebarang pertikaian yang timbul daripada Terma ini
                  atau penggunaan perkhidmatan kami akan tertakluk kepada bidang
                  kuasa eksklusif mahkamah Johor Bahru, Johor, Malaysia.
                </p>
              </section>

              {/* 11. Perubahan */}
              <section className="mb-8">
                <h2 className="font-display text-2xl font-semibold text-stone-800 dark:text-stone-200 mb-4">
                  11. Perubahan kepada Terma Ini
                </h2>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                  Kami berhak untuk mengemaskini atau mengubah Terma ini pada
                  bila-bila masa. Perubahan akan disiarkan di halaman ini dengan
                  tarikh &ldquo;Kemaskini terakhir&rdquo; yang dikemaskini.
                  Penggunaan berterusan laman web ini selepas perubahan dibuat
                  bermaksud penerimaan Terma yang disemak semula.
                </p>
              </section>

              {/* 12. Hubungi Kami */}
              <section className="mb-8">
                <h2 className="font-display text-2xl font-semibold text-stone-800 dark:text-stone-200 mb-4">
                  12. Hubungi Kami
                </h2>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed mb-3">
                  Jika anda mempunyai soalan mengenai Terma ini, sila hubungi
                  kami:
                </p>
                <div className="bg-stone-100 dark:bg-stone-800 rounded-lg p-5 text-stone-700 dark:text-stone-300">
                  <p className="font-medium">Pelangi Capsule Hostel</p>
                  <p>26A Jalan Perang, Taman Pelangi</p>
                  <p>80400 Johor Bahru, Johor, Malaysia</p>
                  <p className="mt-2">
                    E-mel:{" "}
                    <a
                      href="mailto:pelangicapsule@gmail.com"
                      className="text-amber-700 dark:text-amber-400 underline hover:text-amber-800 dark:hover:text-amber-300"
                    >
                      pelangicapsule@gmail.com
                    </a>
                  </p>
                  <p>
                    WhatsApp:{" "}
                    <a
                      href="https://wa.me/60127088789"
                      className="text-amber-700 dark:text-amber-400 underline hover:text-amber-800 dark:hover:text-amber-300"
                    >
                      +60 12-708 8789
                    </a>
                  </p>
                </div>
              </section>

              {/* CPETTR 2024 Compliance Notice */}
              <section className="mb-8">
                <div className="bg-stone-100 dark:bg-stone-800 rounded-lg p-5 text-stone-600 dark:text-stone-400 text-sm">
                  <p className="font-medium text-stone-700 dark:text-stone-300 mb-2">
                    Notis Pematuhan CPETTR 2024
                  </p>
                  <p>
                    Halaman ini didedahkan mengikut Peraturan-Peraturan
                    Perlindungan Pengguna (Urus Niaga Perdagangan Elektronik)
                    2024 yang berkuat kuasa 25 Disember 2024, yang mewajibkan
                    semua maklumat urus niaga perdagangan elektronik disediakan
                    dalam Bahasa Malaysia kepada pengguna di Malaysia.
                  </p>
                  <p className="mt-2">
                    <Link
                      href="/terms"
                      className="text-amber-700 dark:text-amber-400 underline hover:text-amber-800 dark:hover:text-amber-300"
                      lang="en"
                    >
                      View in English &rarr;
                    </Link>
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
