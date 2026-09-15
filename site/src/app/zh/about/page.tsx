import type { Metadata } from "next";
import type { Route } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "关于我们 | 彩虹胶囊旅舍 新山",
  description:
    "了解彩虹胶囊旅舍的故事与理念。我们位于马来西亚新山，提供日式胶囊住宿，以亲民价格为背包客和旅行者打造舒适、安全的住宿体验。",
  alternates: {
    canonical: "https://pelangicapsulehostel.com/zh/about",
    languages: {
      en: "https://pelangicapsulehostel.com/about",
      "zh-CN": "https://pelangicapsulehostel.com/zh/about",
    },
  },
  openGraph: {
    title: "关于彩虹胶囊旅舍",
    description: "新山首家日式胶囊旅舍，以马来西亚式热情好客服务四方旅客。",
    url: "https://pelangicapsulehostel.com/zh/about",
    locale: "zh_CN",
    type: "website",
  },
};

export default function ZhAboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "关于彩虹胶囊旅舍",
    description: "彩虹胶囊旅舍的故事与理念",
    url: "https://pelangicapsulehostel.com/zh/about",
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
              <Link href="/about" className="text-xs text-stone-500 hover:text-stone-700 dark:hover:text-stone-300 transition-colors">
                English version →
              </Link>
            </div>
            <h1 className="font-display text-4xl font-semibold text-stone-900 dark:text-stone-100 mb-10">
              关于我们
            </h1>

            <div className="prose prose-stone dark:prose-invert prose-lg max-w-none">
              <section className="mb-10">
                <h2 className="font-display text-2xl font-semibold text-stone-800 dark:text-stone-200 mb-4">
                  我们的故事
                </h2>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                  彩虹胶囊旅舍（Pelangi Capsule Hostel）坐落于马来西亚柔佛新山 Taman Pelangi 核心地带，
                  是新山首批日式胶囊旅舍之一。我们相信，出门旅行不应为住宿费用所困扰——每位旅客都值得拥有
                  干净、安全、舒适的落脚之所。
                </p>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed mt-4">
                  &quot;Pelangi&quot; 在马来语中意为&quot;彩虹&quot;，寓意我们欢迎来自世界各地、不同背景的旅客。
                  从独行背包客到跨境工作者，从周末短游的新加坡旅客到长居月租客，
                  彩虹旅舍是您在新山最温馨的家。
                </p>
              </section>

              <section className="mb-10">
                <h2 className="font-display text-2xl font-semibold text-stone-800 dark:text-stone-200 mb-4">
                  为什么选择我们？
                </h2>
                <div className="grid md:grid-cols-2 gap-6 not-prose">
                  {[
                    {
                      icon: "🏯",
                      title: "日式设计理念",
                      desc: "每个胶囊舱均仿照日本胶囊旅馆设计，可锁门板、个人温控、USB充电，兼顾私密与舒适。",
                    },
                    {
                      icon: "💰",
                      title: "超值平价",
                      desc: "每晚仅需 RM35 起，含免费 WiFi、热水浴室、储物柜及公共厨房设施，性价比极高。",
                    },
                    {
                      icon: "🌏",
                      title: "绝佳地理位置",
                      desc: "距新加坡关卡仅30分钟，前往 City Square 商场、JB Sentral 火车站均极为便利。",
                    },
                    {
                      icon: "🔑",
                      title: "24小时自助入住",
                      desc: "无需等待前台，通过 WhatsApp 提前确认预订后，我们将发送入住密码，随时抵达均可入住。",
                    },
                    {
                      icon: "🛡️",
                      title: "安全有保障",
                      desc: "个人储物柜、门禁系统及独立锁定舱门，保障您的人身与财物安全。",
                    },
                    {
                      icon: "🤝",
                      title: "马来西亚式热情",
                      desc: "我们团队提供中英马三语服务，有任何问题随时通过 WhatsApp 联系，快速响应。",
                    },
                  ].map(({ icon, title, desc }) => (
                    <div key={title} className="bg-stone-50 dark:bg-stone-800 rounded-2xl p-5 border border-stone-100 dark:border-stone-700">
                      <div className="text-2xl mb-3">{icon}</div>
                      <h3 className="font-semibold text-stone-900 dark:text-stone-100 mb-2">{title}</h3>
                      <p className="text-sm text-stone-600 dark:text-stone-400">{desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="mb-10">
                <h2 className="font-display text-2xl font-semibold text-stone-800 dark:text-stone-200 mb-4">
                  旅舍基本资料
                </h2>
                <div className="bg-stone-100 dark:bg-stone-800 rounded-lg p-5 text-stone-700 dark:text-stone-300 not-prose">
                  <table className="w-full text-sm">
                    <tbody>
                      {[
                        ["旅舍名称", "彩虹胶囊旅舍 (Pelangi Capsule Hostel)"],
                        ["地址", "26A Jalan Perang, Taman Pelangi, 80400 Johor Bahru, Johor, 马来西亚"],
                        ["电话 / WhatsApp", "+60 12-708 8789"],
                        ["电子邮件", "pelangicapsulehostel@gmail.com"],
                        ["入住时间", "下午 2:00 起（24小时自助入住）"],
                        ["退房时间", "中午 12:00 前"],
                        ["价格", "每晚 RM35 起"],
                        ["接受付款方式", "现金、DuitNow QR、银行转账"],
                        ["服务语言", "中文、英文、马来文"],
                      ].map(([label, value]) => (
                        <tr key={label} className="border-b border-stone-200 dark:border-stone-700 last:border-0">
                          <td className="py-2.5 pr-4 font-medium text-stone-500 dark:text-stone-400 whitespace-nowrap align-top">
                            {label}
                          </td>
                          <td className="py-2.5">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="mb-10">
                <h2 className="font-display text-2xl font-semibold text-stone-800 dark:text-stone-200 mb-4">
                  联系我们
                </h2>
                <p className="text-stone-700 dark:text-stone-300 mb-4">
                  有任何问题或想直接预订，欢迎通过 WhatsApp 联系我们，我们提供中文服务。
                </p>
                <div className="flex flex-wrap gap-4 not-prose">
                  <Link
                    href="/book"
                    className="px-6 py-3 bg-amber-700 hover:bg-amber-600 text-white font-semibold rounded-full transition-colors"
                  >
                    立即预订
                  </Link>
                  <a
                    href="https://wa.me/60127088789"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-medium rounded-full transition-colors"
                  >
                    WhatsApp 咨询
                  </a>
                  <Link
                    href={"/zh/location" as Route}
                    className="px-6 py-3 bg-stone-200 dark:bg-stone-700 hover:bg-stone-300 dark:hover:bg-stone-600 text-stone-800 dark:text-stone-200 font-medium rounded-full transition-colors"
                  >
                    查看地址与交通
                  </Link>
                </div>
              </section>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
