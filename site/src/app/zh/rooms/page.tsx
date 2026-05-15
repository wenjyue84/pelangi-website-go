import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "胶囊房型与价格 | 彩虹胶囊旅舍 新山",
  description:
    "查看彩虹胶囊旅舍所有房型及价格。男女混住舱和女性专用舱，每晚 RM35 起。含个人温控、USB 充电、可锁门板及免费 WiFi。",
  alternates: {
    canonical: "https://pelangicapsulehostel.com/zh/rooms",
    languages: {
      en: "https://pelangicapsulehostel.com/rooms",
      "zh-CN": "https://pelangicapsulehostel.com/zh/rooms",
    },
  },
  openGraph: {
    title: "胶囊房型与价格 | 彩虹胶囊旅舍",
    description: "日式胶囊床位每晚 RM35 起。个人温控、USB充电、可锁门板、免费 WiFi。",
    url: "https://pelangicapsulehostel.com/zh/rooms",
    images: [{ url: "/images/capsule-1.webp", width: 1200, height: 630, alt: "彩虹胶囊旅舍胶囊床位" }],
    locale: "zh_CN",
    type: "website",
  },
};

const rooms = [
  {
    name: "混住胶囊舱",
    nameEn: "Mixed Dorm Capsule",
    price: "RM35",
    monthlyPrice: "RM594",
    description: "男女混住日式胶囊舱，适合独行旅客或小团队。每个舱位均配备可锁滑动门板，提供充足私密空间。",
    features: ["可锁滑动门板", "个人温控", "USB-A/C 充电", "可调节 LED 灯", "高密度泡沫床垫", "储物网格"],
    image: "/images/capsule-1.webp",
  },
  {
    name: "女性专用胶囊舱",
    nameEn: "Female-Only Capsule",
    price: "RM35",
    monthlyPrice: "RM594",
    description: "专为女性旅客设计的独立舱区，提供更安心的住宿环境，配置与混住舱完全相同。",
    features: ["仅限女性入住", "可锁滑动门板", "个人温控", "USB-A/C 充电", "可调节 LED 灯", "高密度泡沫床垫"],
    image: "/images/capsule-2.webp",
  },
];

export default function ZhRoomsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "胶囊房型与价格",
    description: "彩虹胶囊旅舍所有房型及价格",
    url: "https://pelangicapsulehostel.com/zh/rooms",
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
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-4 flex items-center gap-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 text-xs font-medium">
                简体中文
              </span>
              <Link href="/rooms" className="text-xs text-stone-500 hover:text-stone-700 dark:hover:text-stone-300 transition-colors">
                English version →
              </Link>
            </div>
            <h1 className="font-display text-4xl font-semibold text-stone-900 dark:text-stone-100 mb-3">
              胶囊房型与价格
            </h1>
            <p className="text-stone-500 dark:text-stone-400 mb-12">
              所有舱位均含免费 WiFi · 24小时入住 · 公共热水浴室 · 共享厨房
            </p>

            {/* Room Cards */}
            <div className="space-y-10 mb-16">
              {rooms.map((room) => (
                <div key={room.name} className="bg-white dark:bg-stone-800 rounded-3xl shadow-lg overflow-hidden border border-stone-100 dark:border-stone-700">
                  <div className="md:flex">
                    <div className="md:w-80 flex-shrink-0">
                      <Image
                        src={room.image}
                        alt={room.name}
                        width={640}
                        height={480}
                        className="w-full h-56 md:h-full object-cover"
                      />
                    </div>
                    <div className="p-8 flex flex-col justify-between flex-1">
                      <div>
                        <h2 className="font-display text-2xl font-semibold text-stone-900 dark:text-stone-100 mb-1">
                          {room.name}
                        </h2>
                        <p className="text-stone-500 dark:text-stone-400 text-sm mb-4">{room.nameEn}</p>
                        <p className="text-stone-700 dark:text-stone-300 mb-6">{room.description}</p>
                        <ul className="grid grid-cols-2 gap-y-2 gap-x-4 mb-6">
                          {room.features.map((f) => (
                            <li key={f} className="flex items-center gap-2 text-sm text-stone-600 dark:text-stone-400">
                              <span className="text-green-500">✓</span> {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex flex-wrap items-end justify-between gap-4">
                        <div>
                          <p className="text-3xl font-bold text-amber-700 dark:text-amber-400">
                            {room.price}
                            <span className="text-base font-normal text-stone-500 dark:text-stone-400">/晚</span>
                          </p>
                          <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
                            月租套餐：{room.monthlyPrice}/月
                          </p>
                          <p className="text-xs text-stone-400 dark:text-stone-500 mt-1">
                            * 外国游客须加收旅游税 RM10/间/晚
                          </p>
                        </div>
                        <Link
                          href="/book"
                          className="px-6 py-3 bg-amber-700 hover:bg-amber-600 text-white font-semibold rounded-full transition-colors"
                        >
                          立即预订
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Shared Facilities */}
            <div className="bg-white dark:bg-stone-800 rounded-3xl p-8 border border-stone-100 dark:border-stone-700 mb-12">
              <h2 className="font-display text-2xl font-semibold text-stone-900 dark:text-stone-100 mb-6">
                共用设施
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  "免费高速 WiFi",
                  "热水淋浴间",
                  "共用厨房（微波炉、热水壶）",
                  "个人储物柜",
                  "洗衣机与烘干机",
                  "行李寄存区",
                  "客厅休息区",
                  "饮水机",
                  "晾衣架",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-stone-700 dark:text-stone-300 text-sm">
                    <span className="text-green-500 text-base">✓</span> {item}
                  </div>
                ))}
              </div>
            </div>

            {/* House Rules */}
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-6 mb-12">
              <h2 className="font-display text-xl font-semibold text-stone-900 dark:text-stone-100 mb-4">
                住宿规则
              </h2>
              <ul className="space-y-2 text-stone-700 dark:text-stone-300 text-sm">
                <li>🕙 <strong>安静时间：</strong>晚上 10:00 至早上 8:00</li>
                <li>🚭 <strong>全面禁烟：</strong>旅舍所有区域均禁止吸烟</li>
                <li>🚫 <strong>禁止烹饪：</strong>提供微波炉和热水壶，不可使用明火</li>
                <li>🛂 <strong>入住须知：</strong>外国旅客需出示有效护照，本地旅客需出示身份证</li>
                <li>👶 <strong>年龄限制：</strong>18岁以下须由父母或法定监护人陪同</li>
              </ul>
            </div>

            {/* CTA */}
            <div className="text-center">
              <p className="text-stone-600 dark:text-stone-400 mb-6">有疑问？通过 WhatsApp 直接联系我们，中文服务。</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/book"
                  className="px-8 py-3 bg-amber-700 hover:bg-amber-600 text-white font-semibold rounded-full transition-colors"
                >
                  立即预订
                </Link>
                <a
                  href="https://wa.me/60127088789"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 bg-stone-100 dark:bg-stone-700 hover:bg-stone-200 dark:hover:bg-stone-600 text-stone-800 dark:text-stone-200 font-medium rounded-full transition-colors"
                >
                  WhatsApp 咨询
                </a>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
