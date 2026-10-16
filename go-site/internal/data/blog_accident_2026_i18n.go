package data

// ZH + BM siblings of blog_accident_2026.go (road accident guide + Pelangi 24h CSR stay).
// Appended via init() so blog.go is not touched. ReadingTimeMinutes computed here
// because the main loader only runs once at package init.
// Police station name/street source: OpenStreetMap node 11733292044 (Balai Polis Taman Pelangi, Jalan Perang).
func init() {
	posts := []BlogPost{
		{
			Slug:         "jiaotong-yiwai-xinshan-youke-zenme-ban-zhinan",
			Title:        "游客在新山遇到交通意外怎么办？一步一步处理指南",
			Excerpt:      "在马来西亚遇到交通意外，先打谁的电话、要收集哪些证据、为什么警方报案很重要，以及 Pelangi 如何为意外受害者提供 24 小时免费住宿。",
			Date:         "2026-10-16",
			LastModified: "2026-10-16",
			Category:     "Travel Tips",
			Author:       "Pelangi Capsule Hostel",
			ReadTime:     "6 min read",
			Tags:         []string{"交通意外", "紧急情况", "警方报案", "新山", "游客安全"},
			ImageAlt:     "",
			InLanguage:   "zh-CN",
			AlternateEN:  "road-accident-in-johor-bahru-tourist-guide",
			AlternateMS:  "kemalangan-jalan-raya-johor-bahru-panduan-pelancong",
			Content: `
<div class="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-5 rounded mb-8 text-stone-700 dark:text-stone-300">
<p><strong>先打紧急电话：</strong>拨打 <strong>999</strong>（马来西亚警察、救护车、消防的紧急号码）。手机也可以拨 <strong>112</strong>。只要有人受伤，请先打电话，其他事情之后再说。</p>
</div>

<h2>简短版</h2>
<p>在国外遇到交通意外很吓人，尤其是你受伤、独自一人，或开的是租来的车。一步一步来：先确保安全、求助、记录现场，再向警方报案。本文介绍游客在新山的基本处理方式，也说明 Pelangi Capsule Hostel 如何提供休息的地方。</p>

<h2>第 1 步：确保安全并求助</h2>
<ol>
  <li><strong>检查自己和他人。</strong>有人受伤就拨 <strong>999</strong> 叫救护车，并告诉接线员你的位置（路名、附近地标，或分享手机定位）。</li>
  <li><strong>保持冷静，远离来往车辆。</strong>在安全的前提下，把自己和其他人带离行驶中的车辆。</li>
  <li><strong>不要在现场争吵，也不要承认责任。</strong>礼貌地交换资料，责任交给警方和保险公司判断。</li>
  <li><strong>不要急着移动车辆。</strong>是否可以移车，取决于有没有人受伤和警方的指示。不确定时，听从电话中或现场警员的指示，并先拍照。</li>
</ol>

<h2>第 2 步：收集证据</h2>
<p>证据日后对警方、保险公司和租车公司都有保护作用。如果你有能力，请收集：</p>
<ul>
  <li>所有车辆、车牌、损坏处、路面标线和周围环境的照片和短视频。</li>
  <li>对方司机的姓名、电话、驾照资料和车牌号码。</li>
  <li>目击者的姓名和联络方式。</li>
  <li>行车记录仪影片（如有），不要删除。</li>
  <li>趁记忆清楚，把时间、地点和经过写下来。</li>
</ul>
<p>如果你在收集前就被送去医院，可以请同行朋友或旅馆之后帮忙补收资料，并保留所有拿到的文件。</p>

<h2>第 3 步：向警方报案</h2>
<p>警方报告是保险、租车索赔和任何争议的关键文件。我们查到的资料显示，交通意外一般应尽快报案，通常是 <strong>24 小时内</strong>。太晚报案可能影响责任认定和索赔，但如果有正当理由（例如住院），警方可能接受迟报。规定可能变动，请向<strong>马来西亚皇家警察（PDRM）确认最新要求</strong>。</p>
<ol>
  <li>前往最近的警局；行动不便的话，请别人帮忙。</li>
  <li>带上护照、驾照、租车合约（如有）、照片和对方司机的资料。</li>
  <li>向警方要一份<strong>盖章的报案副本</strong>，保险公司会需要。</li>
  <li>如果住过院，请保留医疗报告，它可以证明延迟报案的正当理由。</li>
</ol>
<p><strong>住在 Pelangi？</strong>最近的警局是 <strong>Balai Polis Taman Pelangi（Taman Pelangi 警局），地址在 Jalan Perang, Taman Pelangi, Johor Bahru</strong>，就在我们胶囊旅馆旁边，不用跑远就能报案。开放时间和所需文件请直接向警局确认，也可以 WhatsApp 问我们，我们会告诉你怎么走。</p>

<h2>第 4 步：医院和医疗</h2>
<p>公立医院会收治包括外国人在内的紧急病人，但非公民通常比马来西亚人收费更高，所以旅游险或医疗险很重要。请保留所有收据和医疗报告。想看新山的医院、诊所清单和外国人费用，请读我们的指南：<a href="/blog/medical-emergency-johor-bahru-hospitals-clinics-foreigner-costs">Medical Emergency in Johor Bahru: Hospitals, Clinics and Foreigner Costs</a>（英文）。即使觉得没事，也建议做一次检查，有些伤过后才会显现。</p>

<h2>第 5 步：保险、租车和相关部门</h2>
<ul>
  <li><strong>租车：</strong>安全后尽快联络租车公司并按他们的指示处理。保留租车合约、警方报告和维修单，租车索赔通常需要这些文件。</li>
  <li><strong>保险：</strong>尽早联络你的旅游险或车险公司。他们通常会要盖章的警方报告、照片和所有车辆的资料。</li>
  <li><strong>陆路交通局（JPJ）：</strong>是否需要通知 JPJ（尤其是外国车牌或租来的车），视情况而定。请向警方、租车公司或 JPJ 确认。</li>
  <li><strong>你的大使馆：</strong>如果伤势严重，或护照在意外中遗失，请联络你国家的大使馆或领事馆，协助联系家人和补办证件。</li>
</ul>

<h2>Pelangi 会帮助意外受害者吗？</h2>
<p>会。作为社区关怀（CSR）的一部分，遇到交通意外、<strong>同时有警方报告和意外证据</strong>的旅客，可以在我们这里<strong>免费住 24 小时</strong>。让你有地方休息，也有时间联络家人，之后如需继续住宿，家人可以协助安排付款。此安排视房间情况和管理层决定而定。请先传讯息告诉我们你的情况，并准备好警方报告和证据给我们看。</p>
<p>WhatsApp 联络：<a href="https://wa.me/60103084289">+60 10-308 4289</a>（我们的 AI 助理 24 小时回复）。</p>

<h2>常见问题</h2>
<h3>在马来西亚遇到交通意外要打什么电话？</h3>
<p>警察、救护车、消防都拨 999。手机也可以拨 112。有人受伤请立刻打。</p>
<h3>交通意外后一定要报警吗？</h3>
<p>应该报。我们查到的资料显示，意外一般应在 24 小时内向警方报案，保险和租车索赔都需要盖章的警方报告。最新规定请向 PDRM 确认。</p>
<h3>意外后要收集哪些证据？</h3>
<p>现场和车辆的照片、视频，车牌号码，对方司机的资料，目击者联络方式，行车记录仪影片，以及你自己写的笔记。</p>
<h3>发生意外后一时付不出钱，Pelangi 可以帮忙吗？</h3>
<p>有警方报告和意外证据的受害者，可以免费住 24 小时，用来联络家人，视房间情况和管理层决定而定。抵达前请先传讯息给我们。</p>

<h2>相关指南</h2>
<ul>
  <li><a href="/blog/medical-emergency-johor-bahru-hospitals-clinics-foreigner-costs">新山医疗紧急情况（英文）</a></li>
  <li><a href="/zh/guide">入住和紧急信息</a></li>
  <li><a href="/contact">找到我们、联络我们</a></li>
  <li><a href="/tourist-help">游客紧急求助中心（英文）</a></li>
  <li><a href="/tourist-assistance">Pelangi 游客协助与 24 小时免费住宿（英文）</a></li>
</ul>

<p><small>本文只是一般信息，不是法律或医疗建议。规定和程序可能变动，请向警方、保险公司、租车公司和相关部门确认。</small></p>
`,
		},
		{
			Slug:         "kemalangan-jalan-raya-johor-bahru-panduan-pelancong",
			Title:        "Kemalangan Jalan Raya di Johor Bahru sebagai Pelancong: Apa yang Perlu Dibuat Langkah demi Langkah",
			Excerpt:      "Senarai semak yang tenang dan praktikal untuk pelancong yang cedera atau terkejut selepas kemalangan jalan raya di Malaysia: siapa yang perlu dihubungi, bukti yang perlu dikumpul, kenapa laporan polis penting, dan bagaimana Pelangi menawarkan penginapan percuma 24 jam kepada mangsa kemalangan.",
			Date:         "2026-10-16",
			LastModified: "2026-10-16",
			Category:     "Travel Tips",
			Author:       "Pelangi Capsule Hostel",
			ReadTime:     "6 min read",
			Tags:         []string{"kemalangan-jalan-raya", "kecemasan", "laporan-polis", "johor-bahru", "keselamatan-pelancong"},
			ImageAlt:     "",
			InLanguage:   "ms",
			AlternateEN:  "road-accident-in-johor-bahru-tourist-guide",
			AlternateZH:  "jiaotong-yiwai-xinshan-youke-zenme-ban-zhinan",
			Content: `
<div class="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-5 rounded mb-8 text-stone-700 dark:text-stone-300">
<p><strong>Nombor kecemasan dahulu:</strong> hubungi <strong>999</strong> (nombor kecemasan Malaysia untuk polis, ambulans dan bomba). <strong>112</strong> juga boleh digunakan dari telefon bimbit. Jika ada yang cedera, telefon dahulu sebelum buat apa-apa lain.</p>
</div>

<h2>Ringkasnya</h2>
<p>Kemalangan jalan raya di negara asing memang menakutkan, lebih-lebih lagi jika anda cedera, bersendirian atau memandu kereta sewa. Buat satu langkah pada satu masa: dapatkan keselamatan, dapatkan bantuan, rekod apa yang berlaku, dan buat laporan polis. Panduan ini merangkumi asas untuk pelawat di Johor Bahru, dan menerangkan bagaimana Pelangi Capsule Hostel boleh membantu dengan tempat berehat.</p>

<h2>Langkah 1: Selamatkan Diri dan Dapatkan Bantuan</h2>
<ol>
  <li><strong>Periksa diri sendiri dan orang lain.</strong> Jika ada yang cedera, hubungi <strong>999</strong> dan minta ambulans. Beritahu operator lokasi anda (nama jalan, mercu tanda berdekatan, atau kongsi lokasi telefon).</li>
  <li><strong>Bertenang dan jauhi lalu lintas.</strong> Jika selamat berbuat demikian, alihkan diri anda dan orang lain jauh dari kenderaan yang bergerak.</li>
  <li><strong>Jangan bertengkar atau mengaku salah di tempat kejadian.</strong> Tukar butiran dengan sopan dan serahkan soal kesalahan kepada polis dan syarikat insurans.</li>
  <li><strong>Jangan tergesa-gesa mengalihkan kenderaan.</strong> Peraturan memindahkan kereta selepas kemalangan bergantung pada sama ada ada yang cedera dan arahan polis. Jika ragu, ikut arahan polis melalui telefon atau di tempat kejadian, dan ambil gambar dahulu.</li>
</ol>

<h2>Langkah 2: Kumpul Bukti</h2>
<p>Bukti melindungi anda kemudian dengan polis, syarikat insurans dan syarikat sewa kereta. Jika mampu, kumpulkan:</p>
<ul>
  <li>Gambar dan video pendek semua kenderaan, nombor plat, kerosakan, tanda jalan dan persekitaran.</li>
  <li>Nama, nombor telefon dan butiran lesen pemandu lain, serta nombor plat kenderaan mereka.</li>
  <li>Nama dan butiran hubungan saksi.</li>
  <li>Rakaman kamera papan pemuka (dashcam), jika ada. Jangan padam.</li>
  <li>Masa, tempat dan apa yang berlaku, ditulis semasa masih segar dalam ingatan.</li>
</ul>
<p>Jika anda dibawa ke hospital sebelum sempat berbuat demikian, minta rakan, teman pelancongan atau hostel membantu mengumpul butiran kemudian, dan simpan setiap dokumen yang diberikan.</p>

<h2>Langkah 3: Buat Laporan Polis</h2>
<p>Laporan polis ialah dokumen utama untuk hampir semua urusan selepas itu: insurans, tuntutan kereta sewa dan sebarang pertikaian. Sumber yang kami semak menunjukkan kemalangan biasanya perlu dilaporkan kepada polis secepat yang munasabah, dan lazimnya dalam tempoh <strong>24 jam</strong>. Laporan lewat boleh merumitkan tanggungjawab dan tuntutan, walaupun polis mungkin menerima laporan lewat jika ada sebab sah, seperti berada di hospital. Peraturan boleh berubah, jadi <strong>sahkan keperluan semasa dengan Polis Diraja Malaysia (PDRM)</strong>.</p>
<ol>
  <li>Pergi ke balai polis yang terdekat, atau minta bantuan orang lain jika anda tidak boleh bergerak.</li>
  <li>Bawa pasport, lesen memandu, perjanjian sewa (jika ada), gambar dan butiran pemandu lain.</li>
  <li>Minta <strong>salinan laporan yang bercop</strong>. Anda memerlukannya untuk insurans.</li>
  <li>Jika anda dimasukkan ke hospital, simpan laporan perubatan. Ia boleh menyokong sebab sah bagi sebarang kelewatan.</li>
</ol>
<p><strong>Menginap di Pelangi?</strong> Balai polis terdekat ialah <strong>Balai Polis Taman Pelangi, Jalan Perang, Taman Pelangi, Johor Bahru</strong>, bersebelahan kapsul kami, jadi anda boleh membuat laporan tanpa perlu pergi jauh. Sila sahkan waktu operasi dan keperluan terus dengan balai polis, atau tanya kami di WhatsApp dan kami akan tunjukkan arahnya.</p>

<h2>Langkah 4: Hospital dan Rawatan Perubatan</h2>
<p>Hospital kerajaan merawat kes kecemasan termasuk warga asing, tetapi bukan warganegara biasanya dikenakan bayaran lebih tinggi daripada rakyat Malaysia, jadi insurans perjalanan atau kesihatan penting. Simpan setiap resit dan laporan perubatan. Untuk senarai hospital dan klinik di Johor Bahru serta kos biasa untuk warga asing, baca panduan kami: <a href="/blog/medical-emergency-johor-bahru-hospitals-clinics-foreigner-costs">Medical Emergency in Johor Bahru: Hospitals, Clinics and Foreigner Costs</a> (dalam bahasa Inggeris). Walaupun anda rasa sihat, pertimbangkan pemeriksaan kerana sesetengah kecederaan muncul kemudian.</p>

<h2>Langkah 5: Insurans, Kereta Sewa dan Pihak Berkuasa</h2>
<ul>
  <li><strong>Kereta sewa:</strong> hubungi syarikat sewa secepat selamat dan ikut arahan mereka. Simpan perjanjian sewa, laporan polis dan sebarang bil pembaikan kerana tuntutan sewa biasanya memerlukan dokumen ini.</li>
  <li><strong>Insurans:</strong> hubungi syarikat insurans perjalanan atau motor anda awal. Mereka biasanya meminta laporan polis yang bercop, gambar dan butiran semua kenderaan.</li>
  <li><strong>Jabatan Pengangkutan Jalan (JPJ):</strong> sama ada anda perlu memaklumkan JPJ, terutamanya untuk kenderaan berdaftar luar negara atau kereta sewa, bergantung pada keadaan anda. Sahkan dengan polis, syarikat sewa atau JPJ.</li>
  <li><strong>Kedutaan anda:</strong> jika anda cedera parah, atau pasport hilang dalam kemalangan, hubungi kedutaan atau konsulat anda untuk bantuan menghubungi keluarga dan menggantikan dokumen.</li>
</ul>

<h2>Adakah Pelangi Membantu Mangsa Kemalangan?</h2>
<p>Ya. Sebagai sebahagian daripada penjagaan komuniti (CSR) kami, pelancong yang terlibat dalam kemalangan jalan raya dan mempunyai <strong>laporan polis serta bukti kemalangan</strong> boleh menginap <strong>percuma selama 24 jam</strong>. Ini memberi anda tempat berehat dan masa menghubungi keluarga supaya mereka dapat membantu menguruskan bayaran untuk penginapan seterusnya. Ini tertakluk pada ketersediaan dan budi bicara pengurusan. Sila mesej kami dahulu dengan keadaan anda dan sediakan laporan polis serta bukti untuk ditunjukkan.</p>
<p>Hubungi kami di WhatsApp: <a href="https://wa.me/60103084289">+60 10-308 4289</a> (pembantu AI kami membalas 24/7).</p>

<h2>Soalan Lazim</h2>
<h3>Nombor apa yang perlu dihubungi selepas kemalangan jalan raya di Malaysia?</h3>
<p>Hubungi 999 untuk polis, ambulans dan bomba. Nombor 112 juga boleh digunakan dari telefon bimbit. Hubungi segera jika ada yang cedera.</p>
<h3>Adakah saya wajib membuat laporan polis selepas kemalangan?</h3>
<p>Anda patut. Sumber yang kami semak menunjukkan kemalangan biasanya perlu dilaporkan kepada polis dalam tempoh 24 jam, dan laporan polis bercop diperlukan untuk tuntutan insurans dan kereta sewa. Sahkan peraturan semasa dengan PDRM.</p>
<h3>Apakah bukti yang perlu dikumpul selepas kemalangan?</h3>
<p>Gambar dan video tempat kejadian serta kenderaan, nombor plat, butiran pemandu lain, hubungan saksi, rakaman dashcam dan nota bertulis anda sendiri.</p>
<h3>Bolehkah Pelangi membantu jika saya kemalangan dan tidak dapat membayar segera?</h3>
<p>Mangsa kemalangan yang mempunyai laporan polis dan bukti kemalangan boleh menginap percuma selama 24 jam untuk menghubungi keluarga, tertakluk pada ketersediaan dan budi bicara pengurusan. Mesej kami sebelum anda tiba.</p>

<h2>Panduan Berkaitan</h2>
<ul>
  <li><a href="/blog/medical-emergency-johor-bahru-hospitals-clinics-foreigner-costs">Kecemasan perubatan di Johor Bahru (bahasa Inggeris)</a></li>
  <li><a href="/ms/guide">Maklumat daftar masuk dan kecemasan</a></li>
  <li><a href="/contact">Cari dan hubungi kami</a></li>
  <li><a href="/tourist-help">Pusat bantuan kecemasan pelancong (bahasa Inggeris)</a></li>
  <li><a href="/tourist-assistance">Bantuan pelancong Pelangi dan penginapan percuma 24 jam (bahasa Inggeris)</a></li>
</ul>

<p><small>Artikel ini maklumat umum, bukan nasihat undang-undang atau perubatan. Peraturan dan prosedur boleh berubah, jadi sahkan dengan polis, syarikat insurans, syarikat sewa kereta dan pihak berkuasa berkaitan.</small></p>
`,
		},
	}

	for i := range posts {
		posts[i].ReadingTimeMinutes = _blogComputeReadingTime(posts[i].Content)
	}
	BlogPosts = append(BlogPosts, posts...)
}
