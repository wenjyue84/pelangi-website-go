import type { Metadata } from "next";
import type { Route } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "彩虹胶囊旅舍 | 柔佛新山平价住宿",
  description:
    "柔佛新山彩虹胶囊旅舍 — 日式胶囊舱，每晚仅需 RM35 起。免费 WiFi、24小时自助入住、热水浴室、个人储物柜。毗邻新加坡，交通便利。",
  alternates: {
    canonical: "https://pelangicapsulehostel.com/zh",
    languages: {
      en: "https://pelangicapsulehostel.com",
      "zh-CN": "https://pelangicapsulehostel.com/zh",
    },
  },
  openGraph: {
    title: "彩虹胶囊旅舍 | 新山平价住宿 RM35起",
    description:
      "新山 Taman Pelangi 日式胶囊旅舍，每晚 RM35 起。免费高速 WiFi，24小时入住，热水淋浴，个人储物柜。距新加坡关卡仅 15 分钟车程。",
    url: "https://pelangicapsulehostel.com/zh",
    siteName: "Pelangi Capsule Hostel",
    locale: "zh_CN",
    type: "website",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "彩虹胶囊旅舍 — 新山日式胶囊床位",
      },
    ],
  },
};

export default function ZhHomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Hostel",
    "@id": "https://pelangicapsulehostel.com/#hostel",
    name: "彩虹胶囊旅舍",
    alternateName: "Pelangi Capsule Hostel",
    description:
      "位于马来西亚柔佛新山 Taman Pelangi 的日式胶囊旅舍。提供免费 WiFi、24小时自助入住、热水浴室及个人储物柜，距新加坡关卡约15分钟车程。",
    url: "https://pelangicapsulehostel.com/zh",
    inLanguage: "zh-Hans",
    isPartOf: {
      "@type": "WebSite",
      name: "Pelangi Capsule Hostel",
      url: "https://pelangicapsulehostel.com",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main id="main-content" className="min-h-screen bg-stone-50 dark:bg-stone-950" lang="zh-Hans">
        {/* Hero */}
        <section className="relative bg-stone-900 text-white pt-32 pb-24 px-4">
          <div className="container-custom max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-amber-700/30 border border-amber-600/40 text-amber-300 text-sm font-medium mb-6">
              新山 · 马来西亚
            </div>
            <h1 className="font-display text-5xl md:text-6xl font-semibold mb-6 leading-tight">
              彩虹胶囊旅舍
            </h1>
            <p className="text-xl text-stone-300 mb-4 max-w-2xl mx-auto">
              新山市中心日式胶囊住宿，每晚仅需 <strong className="text-amber-400">RM35</strong> 起
            </p>
            <p className="text-stone-400 mb-10 max-w-xl mx-auto">
              免费高速 WiFi · 24小时自助入住 · 热水淋浴 · 个人储物柜 · 距新加坡关卡15分钟
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/book"
                className="px-8 py-3 bg-amber-700 hover:bg-amber-600 text-white font-semibold rounded-full transition-colors"
              >
                立即预订
              </Link>
              <Link
                href={"/zh/rooms" as Route}
                className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-full border border-white/20 transition-colors"
              >
                查看房型
              </Link>
            </div>
          </div>
        </section>

        {/* Quick Info Cards */}
        <section className="py-16 container-custom -mt-12 relative z-10">
          <div className="grid md:grid-cols-3 gap-6">
            <Link href={"/zh/rooms" as Route} className="group">
              <div className="bg-white dark:bg-stone-800 p-8 rounded-3xl shadow-xl border border-stone-100 dark:border-stone-700 h-full hover:-translate-y-1 transition-transform duration-300">
                <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-2xl flex items-center justify-center mb-5 text-2xl">
                  🛏️
                </div>
                <h3 className="font-display text-xl font-semibold mb-2 text-stone-900 dark:text-stone-100">胶囊房型</h3>
                <p className="text-stone-600 dark:text-stone-400 text-sm">男女混住与女性专用舱，每晚 RM35 起。含个人温控、USB充电及可锁门板。</p>
              </div>
            </Link>

            <Link href={"/zh/location" as Route} className="group">
              <div className="bg-white dark:bg-stone-800 p-8 rounded-3xl shadow-xl border border-stone-100 dark:border-stone-700 h-full hover:-translate-y-1 transition-transform duration-300">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mb-5 text-2xl">
                  📍
                </div>
                <h3 className="font-display text-xl font-semibold mb-2 text-stone-900 dark:text-stone-100">交通位置</h3>
                <p className="text-stone-600 dark:text-stone-400 text-sm">距 CIQ 关卡约15分钟，距 JB Sentral 火车站约10分钟。前往新加坡极为便利。</p>
              </div>
            </Link>

            <Link href="/book" className="group">
              <div className="bg-white dark:bg-stone-800 p-8 rounded-3xl shadow-xl border border-stone-100 dark:border-stone-700 h-full hover:-translate-y-1 transition-transform duration-300">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-5 text-2xl">
                  📅
                </div>
                <h3 className="font-display text-xl font-semibold mb-2 text-stone-900 dark:text-stone-100">直接预订</h3>
                <p className="text-stone-600 dark:text-stone-400 text-sm">通过 WhatsApp 直接联系，享最优惠价格，无平台手续费。</p>
              </div>
            </Link>
          </div>
        </section>

        {/* Facilities */}
        <section className="py-20 bg-white dark:bg-stone-900">
          <div className="container-custom max-w-4xl mx-auto">
            <h2 className="font-display text-3xl font-semibold text-center mb-12 text-stone-900 dark:text-stone-100">
              设施与服务
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { icon: "📶", label: "免费高速 WiFi" },
                { icon: "🔒", label: "个人储物柜" },
                { icon: "🚿", label: "热水淋浴" },
                { icon: "❄️", label: "中央空调" },
                { icon: "🏠", label: "24小时自助入住" },
                { icon: "🍳", label: "共用厨房" },
                { icon: "👕", label: "洗衣设施" },
                { icon: "🎒", label: "行李寄存" },
              ].map(({ icon, label }) => (
                <div key={label} className="bg-stone-50 dark:bg-stone-800 rounded-2xl p-5">
                  <div className="text-3xl mb-3">{icon}</div>
                  <p className="text-sm font-medium text-stone-700 dark:text-stone-300">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AI-friendly factual content */}
        <section className="py-20 bg-stone-50 dark:bg-stone-950">
          <div className="container-custom max-w-3xl">
            <h2 className="font-display text-3xl font-semibold mb-10 text-center text-stone-900 dark:text-stone-100">
              关于彩虹胶囊旅舍
            </h2>
            <div className="space-y-8 text-lg text-stone-700 dark:text-stone-300 leading-relaxed">
              <div>
                <h3 className="font-display text-xl font-semibold mb-3 text-stone-900 dark:text-stone-100">
                  彩虹胶囊旅舍在哪里？
                </h3>
                <p>
                  彩虹胶囊旅舍位于马来西亚柔佛新山 Taman Pelangi，地址为 26A Jalan Perang, 80400 Johor Bahru。
                  距 CIQ 海关入境大厦约15分钟车程，距 JB Sentral 火车站约10分钟车程。
                  Grab 打车从 CIQ 到旅舍约 RM10–15，非常方便。
                </p>
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold mb-3 text-stone-900 dark:text-stone-100">
                  价格多少？
                </h3>
                <p>
                  胶囊床位每晚 RM35 起（约 SGD 10.50 / USD 7.50）。外国游客须额外缴纳马来西亚旅游税 RM10/间/晚。
                  长住月租套餐每月 RM594 起。通过我们官网或 WhatsApp 直接预订可享最优惠价格。
                </p>
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold mb-3 text-stone-900 dark:text-stone-100">
                  入住与退房时间
                </h3>
                <p>
                  入住时间：下午 2:00 起 &nbsp;|&nbsp; 退房时间：中午 12:00 前。
                  旅舍提供 24小时自助入住，抵达时将通过 WhatsApp 发送房间密码，全程无需等待前台。
                </p>
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold mb-3 text-stone-900 dark:text-stone-100">
                  如何从新加坡前往？
                </h3>
                <p>
                  从新加坡出发，可乘坐 CW1 或 CW2 跨境巴士，在 JB Sentral 下车，再转乘 Grab 前往旅舍（约 RM8–12）。
                  或乘坐新加坡地铁至 Woodlands CIQ，步行过桥进入马来西亚，再打车约15分钟即可到达。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-amber-700 text-white text-center">
          <div className="container-custom max-w-2xl">
            <h2 className="font-display text-3xl font-semibold mb-4">准备好入住了吗？</h2>
            <p className="text-amber-100 mb-8 text-lg">直接通过 WhatsApp 联系我们，享最低价格，无额外手续费。</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/book"
                className="px-8 py-3 bg-white text-amber-800 font-semibold rounded-full hover:bg-amber-50 transition-colors"
              >
                立即预订
              </Link>
              <a
                href="https://wa.me/60127088789"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-transparent border-2 border-white text-white font-medium rounded-full hover:bg-white/10 transition-colors"
              >
                WhatsApp 咨询
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
