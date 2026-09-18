package data

// Three Simplified Chinese "visa run" articles for PRC-passport travellers
// crossing Singapore <-> Johor Bahru. Appended via init() so this file never
// touches blog.go directly (another agent is editing blog.go concurrently
// for Hindi posts). ReadingTimeMinutes is computed here the same way the
// main BlogPosts loader does, since that loader only runs once at package
// init before this file's init() appends more posts.
func init() {
	posts := []BlogPost{
		{
			Slug:          "zhongguo-huzhao-xinma-xuqian-fengxian-zhinan-2026",
			Title:         "中国护照持有者的新马\"续签\"(Visa Run)：常见做法与真实风险 (2026)",
			Excerpt:       "很多在新加坡工作或旅行的中国朋友，靠去新山\"过境一趟\"来续期。这样做到底合不合规？新马两边海关怎么看？本文引用官方规定与网友真实经历，讲清楚哪些是正常操作，哪些是在赌运气。",
			Date:          "2026-09-17",
			Category:      "签证与通关",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "8 min read",
			Tags:          []string{"中国护照", "签证", "新加坡", "新山", "visa-run", "马来西亚免签", "过关攻略"},
			FeaturedImage: "/images/blog/singapore-expat-visa-run-johor-bahru-guide-2026.webp",
			ImageAlt:      "新柔长堤边境口岸，许多持中国护照的旅客经此往返新加坡与新山",
			InLanguage:    "zh-CN",
			Content: `
<h2>什么是"Visa Run"（续签跑）？为什么会有人这样做？</h2>
<p>"Visa Run"指的是：签证或停留许可快到期时，出境一趟再入境，从而拿到一个新的停留期限。这个做法在新加坡和马来西亚两边的中国朋友圈子里都很常见——尤其是持短期签证在新加坡工作、陪读，或者持免签入境马来西亚旅居的人。</p>

<p>但"能不能这样做"和"这样做安不安全"是两件事。本文把两地官方规定和网友的真实经历放在一起，帮你分清楚。</p>

<h2>马来西亚一侧：免签政策的官方边界</h2>
<p>根据中国驻马来西亚大使馆发布的《关于中马互免签证协定的常见问题与解答》，中马互免签证的核心条款是：</p>
<blockquote>"持有效期不少于6个月的中国普通护照人员，以休闲旅游、探亲访友、商务活动、交流访问、私人事务、医疗为目的，单次停留不超过30日，且每180日累计停留不超过90日，可免办签证。"</blockquote>

<p>几个容易被忽略的细节：</p>
<ul>
  <li><strong>单次最多30天，180天内累计最多90天</strong>——不是"每次都能待30天，想待多少次都行"。如果你在180天窗口里已经用满90天，即使单次没超过30天，也可能在入境时被拒。</li>
  <li><strong>免签不包含定居、工作、学习</strong>。官方原文明确："定居，或从事工作、学习、新闻报道等不属于免签范围。"如果你实际上是在马来西亚"长住+打散工"，靠反复出入境来规避工作签证，这已经超出免签本意。</li>
  <li><strong>免签不能在马来西亚境内续期</strong>——必须出境才能拿到新的停留期。</li>
  <li>入境前72小时必须填写电子入境卡MDAC（据2026年相关报道整理，属强制项目），移民官会随机抽查往返机票、酒店订单及资金证明（网传建议准备约2000令吉现金或等值银行卡，此为经验性建议而非法律强制金额，请以入境时移民官要求为准）。</li>
</ul>

<p>官方设置180天/90天上限的用意很直接——原文写道，这是为了"避免滥用条款，防止个别人通过'短期重复入境'方式来规避签证申请制度"。换句话说，马来西亚移民局对"高频次续签"是有官方立场的，不是网友自己瞎猜。</p>

<h2>新加坡一侧：短期访客准证与"高风险旅客"标签</h2>
<p>新加坡移民与关卡局（ICA）官网关于短期访客准证（STVP）延期的说明中，没有直接使用"visa run"这个词，但明确了：延期申请必须在准证到期前14天内在线提交，ICA会"根据一系列因素综合考量申请"，处理需5个工作日。也就是说，反复出入境刷新准证，从来不是ICA设计的"正规续期渠道"——正规渠道是线上申请延期。</p>

<p>关于反复出入境本身，据多篇整理文章（单一来源，非ICA官方声明）分享的经验：</p>
<blockquote>"多次续签跑之后，官员可能会把你标记为'高风险旅客'，拒绝你未来入境。一旦被ICA或人力部（MOM）标记，再入境会变得困难得多。" —— 据网络文章整理转述</blockquote>

<p>同一篇文章还引用了一则Reddit网友的说法（单一来源，未经官方证实）：</p>
<blockquote>"千万不要为了新加坡搞visa run……如果被认定为可疑，很大概率会被拒绝入境，并且面临2年禁令。" —— 据一位网友分享，单一来源</blockquote>

<p>这类"2年禁令"的具体数字目前没有查到ICA官方公告佐证，请当作网友经验参考，而不是确定的法律后果。</p>

<h2>海关会问什么？怎样回答比较稳妥？</h2>
<p>综合以上信息来源，边境官员通常会问：</p>
<ul>
  <li>住在哪里？打算什么时候离境？（准备好确切的酒店订单或地址）</li>
  <li>来的目的是什么？（旅游/探亲/商务，如实说，不要用免签身份掩饰工作或长住）</li>
  <li>资金来源是否充足？（现金、银行卡、往返机票都可能被抽查）</li>
</ul>
<p>如果回答含糊、行程模式高度重复（比如同一天来回、频率异常高），官员有裁量权直接拒绝入境——即使你的证件本身仍在有效期内。这一点在多篇资料中都被反复强调，属于两地海关的共识做法，不是单一网友的猜测。</p>

<h2>什么样的"续签跑"相对安全？</h2>
<p>综合官方规定和经验分享，风险较低的做法大致是：</p>
<ul>
  <li>严格控制在180天内累计90天以内，不要卡着上限反复横跳。</li>
  <li>每次入境目的合理且可解释（真的是旅游、探亲、办事），不是靠这个身份长期打工或定居。</li>
  <li>准备好往返票、住宿证明、资金证明，不要空手过关。</li>
  <li>避免同一天来回的"打卡式"续签，适当拉开间隔、安排过夜，行程看起来更像正常旅行而不是刷新签证。</li>
</ul>

<p>如果你需要的其实是长期在新加坡工作或居留，续签跑不是长久之计——多篇资料都建议走正规的工作准证（EP/S Pass等）或合法的长期居留渠道，而不是靠反复出入境硬撑。</p>

<h2>顺路在新山过夜：Pelangi Capsule Hostel</h2>
<p>如果你的续签行程需要在新山停留一晚（无论是为了错开出入境高峰，还是单纯想歇一晚），<a href="/">Pelangi Capsule Hostel</a> 就在Taman Pelangi，距离新柔长堤关口车程约10-15分钟。胶囊房整洁独立，直接在官网预订首晚房价更优惠。可以参考我们另一篇《<a href="/blog/xingjiapo-qu-xinshan-zenme-qu-jiaotong-zhinan">从新加坡去新山怎么去？交通全攻略</a>》安排交通。</p>

<h2>免责声明</h2>
<p>本文仅供参考，不构成法律或移民建议。签证与入境政策随时可能调整，具体以马来西亚移民局（Imigresen Malaysia）、新加坡移民与关卡局（ICA）或您所在国驻当地使领馆的最新官方规定为准。涉及具体个案（尤其是曾被拒绝入境、有不良记录）请务必咨询专业移民顾问或直接联系官方机构核实。</p>

<h2>参考来源（核实日期：2026-09-17）</h2>
<ul>
  <li><a href="https://my.china-embassy.gov.cn/fwzc/lsyw/lszj/fhqz2024/cjwdvisa/202508/t20250801_11681383.htm" target="_blank" rel="noopener">中国驻马来西亚大使馆 —《关于中马互免签证协定的常见问题与解答》</a></li>
  <li><a href="https://www.ica.gov.sg/enter-depart/extend_short_stay" target="_blank" rel="noopener">新加坡移民与关卡局（ICA）— Seeking Extension of Visit Pass</a></li>
  <li><a href="https://www.paulhypepage.com/what-are-visa-runs-and-are-they-legal-in-singapore/" target="_blank" rel="noopener">Paul Hype Page — What is visa runs? Is visa runs legal in Singapore?（含Reddit引述，单一来源转述）</a></li>
  <li><a href="https://www.sohu.com/a/1018131987_121070940" target="_blank" rel="noopener">搜狐 —《2026 马来西亚入境政策：中国公民免签 30 天，这些细节必须注意》</a></li>
</ul>
`,
		},
		{
			Slug:          "xinjiapo-qu-xinshan-laihui-guocheng-2026",
			Title:         "从新加坡去新山走一趟再回来：实际流程、口岸选择与费用 (2026)",
			Excerpt:       "Woodlands还是Tuas？坐巴士还是自驾？本文按官方及实测资料整理从新加坡到新山（JB CIQ / KSL方向）来回一趟的完整步骤、时间和费用，附通关注意事项。",
			Date:          "2026-09-17",
			Category:      "交通攻略",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "7 min read",
			Tags:          []string{"新加坡", "新山", "过关", "长堤", "Tuas", "Woodlands", "交通攻略"},
			FeaturedImage: "/images/blog/causeway-guide.webp",
			ImageAlt:      "新柔长堤Woodlands关口，往返新加坡与新山的巴士通道",
			InLanguage:    "zh-CN",
			Content: `
<h2>两个口岸：新柔长堤（Woodlands）vs 第二通道（Tuas）</h2>
<p>新加坡到新山有两条陆路口岸，选哪条会直接影响你的时间和费用：</p>

<h3>新柔长堤 / Woodlands Checkpoint（对应马来西亚一侧 BSI，Bangunan Sultan Iskandar）</h3>
<p>这是绝大多数徒步旅客和巴士乘客使用的口岸。据整理资料，"如果你不是自驾，新柔长堤几乎肯定是更好的选择"——Causeway Link、Transnasional等巴士公司从女皇街巴士总站（Queen Street）、克兰芝地铁站（Kranji MRT）都有直达新山中央车站（JB Sentral）的班次。过关后步行或转乘Grab即可到Komtar JBCC、KSL City一带。</p>

<h3>第二通道 / Tuas Second Link（对应马来西亚一侧 Sultan Abu Bakar Complex）</h3>
<p>位于长堤以西约30公里，公共交通选择很少——据资料整理，"只有从文礼地铁站（Boon Lay MRT）出发的950号巴士，对大多数搭巴士或地铁的人来说基本不方便"。但如果你是自驾，第二通道在周末和高峰期通常比长堤顺畅得多：周末长堤堵车"可能长达两到四小时甚至更久"，而第二通道"明显更平静"。不过通行费也更高（新币约2.10元 vs 长堤约0.80元）。</p>

<p><strong>去KSL/City Square方向：优先选长堤（Woodlands）。</strong>这条路线直接连到新山的主要商圈，过关后走路或叫车很快就到。</p>

<h2>实际过关流程（巴士乘客）</h2>
<p>据整理资料说明，跨境巴士的流程是：</p>
<ol>
  <li>在新加坡上车（如女皇街、克兰芝地铁站或伍德兰兹巴士转换站）。</li>
  <li>巴士抵达新加坡关卡，<strong>全体乘客下车，步行通过新加坡移民检查</strong>。</li>
  <li>过关后走到马来西亚一侧的BSI大楼（长堤方向），<strong>重新刷卡/上同一运营商的接驳车</strong>继续前往新山中央车站或Larkin。</li>
  <li>在BSI完成马来西亚入境检查（护照/MDAC二维码查验）。</li>
  <li>抵达新山中央车站后，步行或转乘Grab到Komtar JBCC、KSL City等目的地，车程约10-15分钟。</li>
</ol>
<p>第二通道（Tuas）流程类似：通过自助闸机或人工柜台完成两地边检，再上同一辆车继续行程。</p>

<h2>什么时候过关比较顺？</h2>
<p>据交通资料整理，几个明显的规律：</p>
<ul>
  <li><strong>周二到周四上午10点-下午2点</strong>：人流较少，是过关的黄金时段。</li>
  <li><strong>工作日早7-9点、傍晚5-8点</strong>：通勤高峰，两个方向都很挤，尽量避开。</li>
  <li><strong>周五傍晚、公共假期前后</strong>：全天拥堵，建议清晨或深夜过关。</li>
  <li><strong>周末回程（尤其周日傍晚）</strong>：返回新加坡方向排队最长，"周日晚上的回程高峰"是很多人吃过亏的时段。</li>
</ul>
<p>如果周末去新山（比如去乐高乐园），资料建议"过夜比当天来回更划算"，可以避开周日傍晚的返程排队潮。</p>

<h2>费用参考（2026年）</h2>
<table>
<thead><tr><th>项目</th><th>费用</th></tr></thead>
<tbody>
<tr><td>新加坡出境通行费（长堤）</td><td>约新币0.80元</td></tr>
<tr><td>马来西亚道路费（Road Charge）</td><td>约RM20（自驾）</td></tr>
<tr><td>长堤巴士车费（女皇街/克兰芝 → 新山）</td><td>约新币1.50-2.50元</td></tr>
<tr><td>第二通道通行费</td><td>约新币2.10元（高于长堤）</td></tr>
<tr><td>新山CIQ到Pelangi/KSL一带Grab车费</td><td>约RM8-15</td></tr>
</tbody>
</table>

<h2>入境马来西亚别忘了这些</h2>
<p>无论走哪个口岸，持中国护照免签入境马来西亚都需要：</p>
<ul>
  <li>入境前72小时内在线填写马来西亚电子入境卡（MDAC），生成二维码备查——据整理报道，这是强制项目，未填可能无法入境。</li>
  <li>护照有效期需在6个月以上，并留有空白签证页。</li>
  <li>移民官可能随机抽查往返机票、酒店订单和资金证明，建议提前准备好电子或纸质凭证。</li>
</ul>

<h2>在新山过夜？Pelangi Capsule Hostel就在市区附近</h2>
<p>如果你选择在新山过夜再返回新加坡，<a href="/">Pelangi Capsule Hostel</a> 位于Taman Pelangi，距离新山CIQ和KSL City车程都在15分钟以内，胶囊房干净安静，直接官网预订首晚更划算。想了解更多本地玩法可以看《<a href="/blog/xinshan-ziyou-xing-gonglue-2026">新山自由行攻略 2026</a>》。</p>

<h2>免责声明</h2>
<p>本文交通路线与费用信息基于2026年相关整理资料，实际情况（票价、班次、通行费）可能随时调整，出发前请以Causeway Link、SBS Transit等运营商官网及马来西亚移民局最新公告为准。</p>

<h2>参考来源（核实日期：2026-09-17）</h2>
<ul>
  <li><a href="https://www.wahdah.sg/blog/woodlands-vs-tuas-checkpoint-which-crossing-should-you-use" target="_blank" rel="noopener">WAHDAH — Woodlands vs Tuas Checkpoint: Which Crossing Should You Use?</a></li>
  <li><a href="https://causewaytraffic.sg/guides/jb-traffic-complete-guide/" target="_blank" rel="noopener">CausewayTraffic.sg — JB Travel Guide 2026: SG to JB Crossing, Routes &amp; Weekend Planning</a></li>
  <li><a href="https://www.sohu.com/a/1018131987_121070940" target="_blank" rel="noopener">搜狐 —《2026 马来西亚入境政策：中国公民免签 30 天，这些细节必须注意》</a></li>
</ul>
`,
		},
		{
			Slug:          "malaixiya-90tian-mianqian-daoqi-zairujing-jingyan-2026",
			Title:         "马来西亚90天免签到期怎么办？中国公民再入境经验与常见误区 (2026)",
			Excerpt:       "中国护照免签入境马来西亚，很多人搞混了\"单次30天\"和\"180天累计90天\"的区别。本文用官方原文拆解规则，并整理网友真实的出关入关经验和常踩的坑。",
			Date:          "2026-09-17",
			Category:      "签证与通关",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "7 min read",
			Tags:          []string{"马来西亚免签", "中国护照", "MDAC", "90天规则", "再入境", "签证政策"},
			FeaturedImage: "/images/blog/xinshan-juzhu-tuijian-jiaonang-lvguan.webp",
			ImageAlt:      "马来西亚入境检查柜台，持中国护照旅客办理免签入境",
			InLanguage:    "zh-CN",
			Content: `
<h2>官方规则原文：不是"想待多久待多久"</h2>
<p>中国驻马来西亚大使馆发布的《关于中马互免签证协定的常见问题与解答》明确写道：</p>
<blockquote>"持有效期不少于6个月的中国普通护照人员，以休闲旅游、探亲访友、商务活动、交流访问、私人事务、医疗为目的，单次停留不超过30日，且每180日累计停留不超过90日，可免办签证。"</blockquote>

<p>拆开看两个数字：</p>
<ul>
  <li><strong>单次停留 ≤ 30天</strong>——每一次入境，最多给你30天。</li>
  <li><strong>180天窗口内累计 ≤ 90天</strong>——把任意连续180天里，你在马来西亚待过的天数加起来，不能超过90天。</li>
</ul>
<p>这意味着：即使你每次入境都只待29天、按规矩出境，如果180天内进出太频繁、累计天数逼近90天上限，下一次入境仍然可能因为"累计超限"被拒——这不是单次30天的问题，而是180天滚动窗口的问题。这一点官方FAQ里也解释了设置上限的原因：<strong>"避免滥用条款，防止个别人通过'短期重复入境'方式来规避签证申请制度。"</strong></p>

<h2>常见误区一：免签=可以定居或打工</h2>
<p>官方FAQ原文特别排除了这几类用途：<strong>"定居，或从事工作、学习、新闻报道等不属于免签范围。"</strong>换句话说，免签资格是给旅游、探亲、商务、交流、私事和医疗用的，不是给长期居留或工作用的身份。如果实际情况是长期住在马来西亚同时打散工，靠反复出入境续期本身就不在免签政策的设计范围内。</p>

<h2>常见误区二：入境卡随便填、材料不用带齐</h2>
<p>据2026年相关整理报道，入境前有几项硬性要求：</p>
<ul>
  <li><strong>马来西亚电子入境卡（MDAC）</strong>：入境前72小时内必须在官方网站在线填写，生成二维码备查，属强制项目，未填可能无法入境。</li>
  <li><strong>护照有效期</strong>：需在入境之日起6个月以上，并留有空白签证页。</li>
  <li><strong>随机抽查材料</strong>：移民官可能抽查往返机票、酒店订单，以及资金证明（网络文章建议准备约2000令吉现金或等值银行卡作为参考金额，属经验分享，并非法律明文规定的固定数额，具体以移民官现场要求为准）。</li>
</ul>
<p>这篇报道也指出一个常见误区："误认为免签等同无限制停留"，以及"误以为可以跳过MDAC电子入境卡填报"——这两点恰好是最容易让人在柜台被多问几句，甚至被要求补充材料的地方。</p>

<h2>再入境时，移民官可能怎么问？</h2>
<p>综合本系列前两篇文章引用的资料，边境官员的关注点通常集中在：</p>
<ul>
  <li>这次来马来西亚做什么？（如实说旅游/探亲/商务，不要含糊或前后矛盾）</li>
  <li>打算住多久、住哪里？（有确定的酒店订单会更顺利）</li>
  <li>资金是否充足、有没有返程/续程机票？</li>
</ul>
<p>如果入境记录显示你在过去180天内频繁出入境、每次停留天数都精确卡在上限附近，这种"高频、卡线"的模式本身就容易引起额外盘问——这是官方FAQ里"防止滥用条款"这句话在实际执行层面的体现，而不是空话。</p>

<h2>免签到期后，正确的做法是什么？</h2>
<ol>
  <li><strong>算清楚180天窗口内还剩多少额度</strong>，不要只看这一次的30天够不够用。</li>
  <li><strong>免签不能在马来西亚境内续期</strong>——到期前必须出境，才能在下次入境时获得新的停留期，且新一次入境仍然受180天累计90天的约束。</li>
  <li>如果确实需要在马来西亚长期停留（工作、学习、定居），应通过正规签证渠道申请，而不是靠反复出入境规避——这既是官方FAQ的明文排除范围，也是被拒风险最高的做法。</li>
  <li>准备好MDAC二维码、酒店订单、返程/续程票和资金证明再去关口，减少被抽查卡住的概率。</li>
</ol>

<h2>顺路安排：在新山过境点附近住一晚</h2>
<p>如果你的再入境安排需要经过新山（比如从新加坡方向出入境），<a href="/">Pelangi Capsule Hostel</a> 位于Taman Pelangi，距离新山CIQ车程约10-15分钟，胶囊房干净独立，官网直接预订首晚价格更优惠。出入境交通细节可参考《<a href="/blog/xinjiapo-qu-xinshan-laihui-guocheng-2026">从新加坡去新山走一趟再回来：实际流程与费用</a>》。</p>

<h2>免责声明</h2>
<p>本文仅供参考，不构成法律或移民建议。免签政策、停留天数及入境要求可能随时调整，请以马来西亚移民局（Imigresen Malaysia）及中国驻马来西亚大使馆最新官方公告为准，具体个案建议直接咨询官方机构或专业移民顾问。</p>

<h2>参考来源（核实日期：2026-09-17）</h2>
<ul>
  <li><a href="https://my.china-embassy.gov.cn/fwzc/lsyw/lszj/fhqz2024/cjwdvisa/202508/t20250801_11681383.htm" target="_blank" rel="noopener">中国驻马来西亚大使馆 —《关于中马互免签证协定的常见问题与解答》</a></li>
  <li><a href="https://www.sohu.com/a/1018131987_121070940" target="_blank" rel="noopener">搜狐 —《2026 马来西亚入境政策：中国公民免签 30 天，这些细节必须注意》</a></li>
</ul>
`,
		},
	}

	for i := range posts {
		posts[i].ReadingTimeMinutes = _blogComputeReadingTime(posts[i].Content)
	}
	BlogPosts = append(BlogPosts, posts...)
}
