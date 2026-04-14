import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "地址与交通 | 彩虹胶囊旅舍 新山",
  description:
    "彩虹胶囊旅舍位于马来西亚新山 Taman Pelangi。提供从 JB Sentral 火车站、CIQ 关卡及拉金巴士总站的详细交通指引，含 Google 地图及 Grab 打车建议。",
  alternates: {
    canonical: "https://pelangicapsulehostel.com/zh/location",
    languages: {
      en: "https://pelangicapsulehostel.com/location",
      "zh-CN": "https://pelangicapsulehostel.com/zh/location",
    },
  },
  openGraph: {
    title: "地址与交通 | 彩虹胶囊旅舍",
    description: "新山 Taman Pelangi，26A Jalan Perang。距 CIQ 关卡约15分钟，距 JB Sentral 约10分钟。",
    url: "https://pelangicapsulehostel.com/zh/location",
    locale: "zh_CN",
    type: "website",
  },
};

const directions = [
  {
    from: "JB Sentral 火车站",
    distance: "约10分钟车程 / 5 公里",
    steps: [
      "从 JB Sentral 主出口前往打车/电召车区",
      "乘坐 Grab 或出租车前往 26A Jalan Perang, Taman Pelangi（约 RM8–12）",
      "或乘坐 P101 巴士从 JB Sentral 前往 Pelangi Leisure Mall（约15分钟），步行2分钟即到",
    ],
  },
  {
    from: "CIQ 关卡（马来西亚入境处）",
    distance: "约15分钟车程 / 6 公里",
    steps: [
      "过关后从大厅主出口前往打车区",
      "乘坐 Grab 或出租车前往 26A Jalan Perang, Taman Pelangi（约 RM10–15）",
      "如从新加坡乘坐 CW1/CW2 跨境巴士，在 JB Sentral 下车，再按上方指引前往",
    ],
  },
  {
    from: "拉金巴士总站（Larkin Terminal）",
    distance: "约15分钟车程 / 7 公里",
    steps: [
      "出总站后前往 Grab/出租车上车区",
      "乘坐 Grab 或出租车前往 26A Jalan Perang, Taman Pelangi（约 RM10–15）",
      "或乘坐 P101 巴士方向 JB Sentral，在 Pelangi Leisure Mall 站下车",
    ],
  },
  {
    from: "新加坡 Woodlands（步行过桥）",
    distance: "约20–30分钟（过关后打车约15分钟）",
    steps: [
      "乘坐新加坡 MRT 至 Woodlands 站，前往 CIQ 大厦",
      "过马来西亚入境手续后，乘坐 Grab 前往旅舍（约 RM10–15）",
      "建议高峰时段提前预留充足过关时间",
    ],
  },
];

export default function ZhLocationPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "地址与交通指引",
    description: "彩虹胶囊旅舍地址及各交通方式抵达方法",
    url: "https://pelangicapsulehostel.com/zh/location",
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
        <div className="pt-28 pb-16 container-custom">
          <div className="max-w-3xl mx-auto">
            {/* Page Header */}
            <div className="mb-4 flex items-center gap-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 text-xs font-medium">
                简体中文
              </span>
              <Link href="/location" className="text-xs text-stone-500 hover:text-stone-700 dark:hover:text-stone-300 transition-colors">
                English version →
              </Link>
            </div>
            <h1 className="font-display text-4xl font-semibold text-stone-900 dark:text-stone-100 mb-3">
              地址与交通
            </h1>

            {/* Address Card */}
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-6 mb-10">
              <h2 className="font-semibold text-stone-900 dark:text-stone-100 mb-2">旅舍地址</h2>
              <p className="text-stone-700 dark:text-stone-300">
                26A Jalan Perang, Taman Pelangi<br />
                80400 Johor Bahru, Johor, 马来西亚
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href="https://maps.app.goo.gl/maLXetUqYS5MtSLD9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-amber-700 text-white text-sm font-medium rounded-full hover:bg-amber-600 transition-colors"
                >
                  📍 Google 地图导航
                </a>
                <a
                  href="https://wa.me/60127088789"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-full hover:bg-green-500 transition-colors"
                >
                  💬 WhatsApp 咨询
                </a>
              </div>
            </div>

            {/* Check-in/out Times */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="bg-white dark:bg-stone-800 rounded-2xl p-5 border border-stone-100 dark:border-stone-700 text-center">
                <p className="text-stone-500 dark:text-stone-400 text-sm mb-1">入住时间</p>
                <p className="font-display text-2xl font-semibold text-stone-900 dark:text-stone-100">下午 2:00</p>
                <p className="text-stone-400 text-xs mt-1">24小时自助入住</p>
              </div>
              <div className="bg-white dark:bg-stone-800 rounded-2xl p-5 border border-stone-100 dark:border-stone-700 text-center">
                <p className="text-stone-500 dark:text-stone-400 text-sm mb-1">退房时间</p>
                <p className="font-display text-2xl font-semibold text-stone-900 dark:text-stone-100">中午 12:00</p>
                <p className="text-stone-400 text-xs mt-1">如需延迟退房请提前联系</p>
              </div>
            </div>

            {/* Directions */}
            <h2 className="font-display text-2xl font-semibold text-stone-900 dark:text-stone-100 mb-6">
              各交通方式抵达指引
            </h2>
            <div className="space-y-6 mb-12">
              {directions.map((d) => (
                <div key={d.from} className="bg-white dark:bg-stone-800 rounded-2xl p-6 border border-stone-100 dark:border-stone-700">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                    <h3 className="font-semibold text-stone-900 dark:text-stone-100">{d.from}</h3>
                    <span className="text-xs text-stone-500 dark:text-stone-400 bg-stone-100 dark:bg-stone-700 px-2 py-1 rounded-full">
                      {d.distance}
                    </span>
                  </div>
                  <ol className="space-y-2">
                    {d.steps.map((step, i) => (
                      <li key={i} className="flex gap-3 text-sm text-stone-700 dark:text-stone-300">
                        <span className="flex-shrink-0 w-5 h-5 bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 rounded-full text-xs font-semibold flex items-center justify-center mt-0.5">
                          {i + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>

            {/* Map embed */}
            <div className="rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-700 mb-10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.4!2d103.7594!3d1.48552!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMjknMDcuOSJOIDEwM8KwNDUnMzMuOCJF!5e0!3m2!1szh-CN!2smy!4v1"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="彩虹胶囊旅舍地图"
              />
            </div>

            {/* Nearby Attractions */}
            <div className="bg-white dark:bg-stone-800 rounded-2xl p-6 border border-stone-100 dark:border-stone-700">
              <h2 className="font-display text-xl font-semibold text-stone-900 dark:text-stone-100 mb-4">
                周边景点与餐饮
              </h2>
              <ul className="space-y-2 text-sm text-stone-700 dark:text-stone-300">
                <li>🛍️ Pelangi Leisure Mall — 步行2分钟</li>
                <li>🌙 Taman Pelangi 夜市 — 每周二晚，步行5分钟</li>
                <li>🍜 当地咖啡店与小贩中心 — 步行3分钟</li>
                <li>🕌 City Square 商场 — 约10分钟车程</li>
                <li>✈️ 新加坡 — 约30分钟（过关后）</li>
              </ul>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
