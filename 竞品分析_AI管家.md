# 竞品分析 · 交易所对话式 AI 助手

> 用途：AI 管家 PRD 第 1 章「竞品分析」；为待确认项决策提供参考
> 调研日期：2026-11-02　|　方法：联网公开资料（官方公告、媒体报道、评测文章），**未实测竞品 App**
> 信息源标注：【官】官方公告或官方账号　【媒】媒体或评测　【推】据公开信息推测
> 对照对象：我方原型 [AI管家_对话Agent.html](AI管家_对话Agent.html)、[规则台账_AI管家.md](规则台账_AI管家.md)

---

## 一、结论先行

1. **行业分成三种形态**：
   - ① App 内的**信息型助手**：只答不做（Binance AI 免费版、GateAI、Robinhood Cortex）。
   - ② App 内的**执行型 Agent**：对话里直接下单（Bitget GetAgent、Binance AI Pro）。
   - ③ **开放接口**：把交易能力开放给外部 AI 助手（ChatGPT、Claude 等）调用，例如 Bybit AI Skills、OKX Agent Trade Kit、Binance Agent OS、Coinbase for Agents、Gate for AI。

   我方定位是 ① + 有限的 ②：可查询、可解释，平仓和撤单在卡片内确认，不做自动策略。这与 Binance「免费助手 + 付费 Pro」的分层最接近。
2. **对话里直接确认交易已是行业常态**：GetAgent 在对话中生成订单预览卡，一键确认；Bybit 每笔实盘都要用户明确确认。这支持台账 R4（卡片内直接确认）。
3. **头部都在做主动推送和按用户经验调整界面**：Binance AI 每 4 小时更新一次市场简报，界面按用户经验分层（新手和老手看到的不同）。这和我方「看板 + 主动触达 + 阶段化看板」的方向一致，**我方的差异点要放在「风险推送落地」和「异常兜底」上**。
4. **客服类任务（充提查询、转人工）在公开资料里几乎没有竞品提到**，各家都集中在行情和交易上【推】。这是我方可以占的空位。
5. **能自动执行的产品都配了隔离机制**：Binance AI Pro 每个策略用独立子账户；Coinbase 的 Agent 交易只能动独立的组合。如果我方以后做批量操作或自动化（Q2），应该先参考这套隔离方式。

---

## 二、竞品清单与单品拆解

### 1. Binance（币安）· 产品矩阵最完整

| 产品 | 形态 | 关键信息 |
|---|---|---|
| **Binance AI**（免费） | 信息型助手 | 2026-10-12 面向英语用户上线，此前约 15 万人参与 beta；提供持仓盈亏总结、异动币种识别、文字和语音资讯、每 4 小时更新的市场简报、语音价格提醒；**界面按用户经验分层**：新手有引导和首次使用提示，老手看到更多数据；**不执行交易**【媒】 |
| **Binance AI Pro** | 执行型 Agent | 2026-10-19 正式版：用自然语言描述想法 → 生成策略 → 模拟盘测试 → 用户批准出资 → 在**独立子账户**中运行；支持现货和 U 本位合约；Standard 版免费，Premium 每月 19.99 USDC，按额度计费（每月 1000 万 vs 25 万）【官/媒】 |
| **Bibi** | 社区 AI | 在 Binance Square 里 @Bibi 即可提问：行情总结、30 秒白皮书摘要、代币对比、情绪变化【官/媒】 |
| **Agent OS** | 开放接口 | 2026-08-20 上线，用户授权后，外部 AI 助手可读取数据并下单【媒】 |

- **策略层**：免费信息助手引流，付费执行型 Pro 变现，再开放接口覆盖开发者，三层都做。
- **功能层**：亮点是按经验分层的界面和语音简报；免费版刻意不做执行，把风险隔离在 Pro 里。
- **体验层**：Web 端有独立域名 ai.binance.com；App 内入口位置在公开资料里没写【未实测】。
- **增长层**：靠免费版规模化（beta 15 万人），用额度和高级套餐转化付费。

### 2. Bitget · GetAgent · 执行型做得最深

- **定位**：对话式交易 Agent，可做行情分析、交易所和链上下单、组合报告、理财推荐、交易机器人【官/媒】。
- **时间线**：2025-07 上线 → 2025-09 升级（合约完整交易闭环、理财推荐、机器人）→ 2026-02 推出 Web 全屏版，并增强意图识别 → 后续扩大会员额度，开放给全部用户【官】。
- **入口**：首页「更多服务」、资产页、单币详情页；部分币种页会显示「GetAgent is analyzing」横幅【媒】。
- **交易确认**：在对话中生成订单预览卡（币种、预估成交价、类型、数量），**一键确认，不跳转页面**；链上交易多一步签名，展示网络和 Gas【媒】。
- **个性化**：会学习用户的交易风格，推送个性化提醒，用一句话就能生成持仓日报【媒】。
- **短板**【推】：公开资料没有提到异常处理（结果未知、数据过期）和合规拦截；评测多带推广性质。

### 3. Bybit · 从教育助手转向开放接口

- **TradeGPT（2023）**：基于 ChatGPT + 自研插件的教育型助手，提供行情分析和多语言问答；**会用「成功概率百分比」的形式给策略和产品推荐**【媒】。
- **AI Trading Skill / AI Skills Hub（2026-03）**：通过 ChatGPT、Claude、Gemini 等外部助手用自然语言交易，覆盖 253 个接口：现货市价、限价、批量；合约止盈止损、条件单；后续加入跟单、机器人、双币理财【官/媒】。
- **安全设计**：**每笔实盘都要用户明确确认**；新用户先用测试网；双重来源校验，防范供应链攻击【媒】。

### 4. Gate · 强调数据透明

- **GateAI（2026-01）**：App 内行情助手，**数据不足或结论无法确认时会明确告知**【媒】。
- **Web 端（2026-03）**：**每个页面底部都有固定入口**，定位从「AI 交易助手」升级为「智能服务层」【媒】。
- **Gate for AI / GateClaw**：开放接口，覆盖 CEX、DEX、钱包、资讯、数据五大能力【媒】。

### 5. OKX · 暂无 App 内助手

- 公开资料里没有 App 内对话助手；重心在开放接口：Agent Trade Kit（MCP 工具包，有模拟环境）、OnchainOS，以及 2026-06 上线的 OKX AI 市场（AI 代理之间雇佣和结算）【媒】。

### 6. Coinbase · 走合规路线

- **Coinbase Advisor**：App 内对话式 AI，**以 SEC 注册投资顾问的身份**提供新闻解读、投资想法和组合策略；免责声明很长，交易细节由用户自己核对后确认【媒】。
- **Coinbase for Agents（2026-06）**：外部助手在用户设定的额度内交易，**每个会话在独立组合中运行，碰不到其他资产**；2026-09 扩展到美股和 ETF【媒】。

### 7. Robinhood · Cortex（券商参照）

- **Digests**：在个股详情页用通俗语言解释「为什么涨跌」，资料来源是新闻、分析师报告和平台数据；声明「不构成研究或建议」【官】。
- **组合 Digests**：针对用户持仓生成洞察，**只对 Gold 付费会员开放**（每月 5 美元）【官】。

### 8. Crypto.com · Amy（较早期参照）

- 2023 年试点的 ChatGPT 类助手，提供代币资讯、价格和历史事件，**定位是信息，不是投资建议**；另有资料称其用 Claude 生成个性化情绪分析【媒】。2025–2026 年的状态未查到。

> KuCoin：没有查到公开的 App 内 AI 助手资料，未纳入。

---

## 三、横向对比矩阵

### 功能对比

| 能力 | 我方原型 | Binance AI / Pro | Bitget GetAgent | Bybit | GateAI | Coinbase | Robinhood |
|---|---|---|---|---|---|---|---|
| 行情和资讯问答 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ 只有个股 |
| 持仓盈亏解释 | ✅ 按来源拆分 | ✅ 盈亏总结 | ✅ 日报 | ⚠️ | ❓ | ✅ | ✅ 付费 |
| 主动推送和简报 | ✅ 风险推送 + 看板要点 | ✅ 每 4 小时 + 语音 | ✅ 个性化提醒 | ❓ | ❓ | ❓ | ❓ |
| 按用户阶段调整界面 | ✅ 阶段化看板 | ✅ 按经验分层 | ❓ | ❌ | ❓ | ❓ | ❌ |
| 宏观、情绪、情景推演 | ✅ 只给方向 | ⚠️ 情绪 | ✅ 分析 | ✅ | ✅ | ✅ | ❌ |
| 对话内下单或开仓 | ⚠️ 只追问参数 | ✅ Pro 策略 | ✅ 卡片一键确认 | ✅ 外部助手 | ❓ | ✅ 外部助手 | ❌ |
| 对话内平仓、撤单 | ✅ 卡片内确认 | ✅ Pro | ✅ | ✅ | ❓ | ✅ | ❌ |
| 策略、机器人、模拟盘 | ❌ 不在本期 | ✅ Pro 核心 | ✅ | ✅ | ❓ | ⚠️ | ❌ |
| 充提查询、转人工 | ✅ | ❓ | ⚠️ 法币充提 | ❓ | ❓ | ❓ | ❌ |
| 异常兜底（追问、过期、结果未知） | ✅ 7 类 | ❓ | ❓ | ⚠️ 测试网 + 每笔确认 | ⚠️ 数据不足时告知 | ⚠️ 免责声明 | ⚠️ 免责声明 |
| 资金隔离 | — | ✅ 子账户 | ❓ | ❓ | ❓ | ✅ 独立组合 | — |
| 交易页、币种页内唤起 | ✅ 合约页 | ❓ | ✅ 币种页、资产页 | — | ✅ 全页固定入口 | ❓ | ✅ 个股页 |
| 付费分层 | ❓ 未定 | ✅ 免费 + 19.99 USDC/月 | ✅ 会员额度 | 免费 | 免费【推】 | ❓ | ✅ Gold |

图例：✅ 支持　⚠️ 部分支持　❌ 不支持　❓ 公开资料未提及　— 不适用

### 策略对比

| 维度 | 我方 | Binance | Bitget | Bybit | Coinbase |
|---|---|---|---|---|---|
| 定位 | 主动陪伴型管家：风险 + 服务 + 交易辅助 | 全矩阵：信息、执行、开放接口 | 执行型交易 Agent | 开放接口 | 合规顾问 + 开放接口 |
| 写操作边界 | 只做平仓、撤单，卡片内确认 | 免费版不执行；Pro 在子账户中执行 | 卡片一键确认 | 每笔明确确认 | 用户核对后确认 |
| 合规姿态 | 只讲事实和影响（R5） | 「仅供辅助判断」 | 推荐理财和策略 | 曾用成功概率百分比 | 注册顾问身份 |

---

## 四、策略建议

### ✅ 可借鉴

| # | 借鉴点 | 来源 | 落地建议（对应台账） |
|---|---|---|---|
| 1 | 多入口唤起：币种页、资产页、交易页，每个页面底部有固定入口 | Bitget、Gate、Robinhood | 给 Q5 提供参考：不只是交易页顶栏，还可以在币种详情页加「为什么涨跌」入口 → **待你决策** |
| 2 | 按用户经验调整界面 | Binance AI | 我方已有阶段化看板；可以补一条规则，明确新手和老手看到的看板分别是什么 |
| 3 | 结论不确定时明确告知 | GateAI | 写进 H 类兜底：数据不足时说「无法确认」，不给结论 |
| 4 | 新用户先用模拟环境 | Bybit、OKX | 如果后续做对话内开仓，第一次可以引导到模拟盘【本期不做】 |
| 5 | 「为什么涨跌」放在详情页 | Robinhood | 可以把盈亏解释和新闻的入口挂在持仓卡和币种页上 |
| 6 | 语音简报和语音提醒 | Binance AI | 可选增强，**不建议放在 P0** |

### 🚫 不建议照搬

| # | 做法 | 来源 | 原因 |
|---|---|---|---|
| 1 | 用「成功概率百分比」给策略推荐 | Bybit TradeGPT | 和 R5「不给买卖建议、不给估算数值」冲突，合规风险高 |
| 2 | 自然语言生成策略并自动运行 | Binance AI Pro、Bitget | 本期已排除（R2），而且需要子账户隔离、模拟盘、计费等一整套配套 |
| 3 | 以注册投资顾问身份给建议 | Coinbase Advisor | 依赖特定牌照，不适用于我方 |
| 4 | 开放交易接口给外部 AI 助手 | Bybit、OKX、Binance、Coinbase | 这是另一条产品线，不属于 App 内助手的范围 |

### 💡 差异化方向

| # | 方向 | 依据 | 建议 |
|---|---|---|---|
| 1 | **风险推送的落地体验** | 竞品都有提醒，但公开资料没有提到「点开时数据已经变化」怎么处理【推】 | 把推送落地时刷新数据、风险降低后改结论做成卖点（原型里已有） |
| 2 | **客服和充提自助** | 竞品集中在行情和交易，充提查询、转人工摘要几乎没人提【推】 | 提币时间线、充值确认进度、带摘要转人工可以作为 P0，同时降低客服工单量 |
| 3 | **异常处理透明** | 只有 Gate 提到「数据不足时告知」 | 7 类兜底（尤其是「结果未知时禁止重复提交」）放进 PRD 和评审重点 |

### 📋 对台账的影响

| 动作 | 内容 |
|---|---|
| 结项 | Q15 竞品分析 → 本文档 |
| 新增待确认 | Q17 收费模式：全部免费，还是基础免费 + 高级额度付费（参考 Binance、Bitget、Robinhood）|
| 新增待确认 | Q18 是否在币种详情页或持仓卡上加 AI 入口（「为什么涨跌」），和 Q5 一起决策 |
| 新增待确认 | Q19 新手看板和老手看板的分层规则（参考 Binance AI 按经验分层） |

---

## 五、信息来源

- Binance AI Pro：[Morningstar / PR Newswire](https://www.morningstar.com/news/pr-newswire/20261019cn75206/binance-launches-binance-ai-pro-bringing-conversational-ai-strategy-building-to-users)、[Unite.AI](https://www.unite.ai/binance-ai-pro-turns-trading-ideas-into-tested-automated-workflows/)、[TokenPost](https://www.tokenpost.com/news/technology/34824)
- Binance AI 免费版：[BigGo Finance](https://finance.biggo.com/news/65f50aa9-16d7-4bb3-a8c3-546347ae98a5)、[Cryptopolitan](https://www.cryptopolitan.com/binance-launches-ai-market-assistant-as-exchanges-race-on-ai-edge/)、[Blockchain.News](https://blockchain.news/news/binance-ai-assistant-multi-asset-trading-expansion-2026)
- Binance Bibi / Agent OS：[Binance on X](https://x.com/binance/status/1993590550662967781)、[Coinfomania](https://coinfomania.com/binance-bibi-ai-whitepaper-summarizer-launch-2025/)、[Cryptonomist](https://en.cryptonomist.ch/2026/08/21/binance-ai-trading-platform-agent-os/)
- Bitget GetAgent：[BeInCrypto 使用教程](https://beincrypto.com/how-to-use-bitget-getagent/)、[AAP 升级公告](https://www.aap.com.au/aapreleases/globenewswire1001143234/)、[Benzinga](https://www.benzinga.com/crypto/cryptocurrency/25/08/47264443/bitget-expands-access-to-ai-agent-assisted-trading-with-public-launch-of-getagent)、[Bitget 帮助中心](https://www.bitget.com/support/articles/12560603858583)
- Bybit：[Cointelegraph · TradeGPT](https://cointelegraph.com/news/bybit-launches-ai-trade-gpt-for-market-analysis)、[Decrypt · AI Skills](https://decrypt.co/361006/bybit-launches-ai-skills-powering-ai-agents-for-crypto-trading-with-zero-setup-253-api-endpoints-and-growing)、[CFOtech](https://cfotech.asia/story/bybit-unveils-ai-trading-skill-for-automated-crypto-trades)、[AAP 升级公告](https://www.aap.com.au/aapreleases/cision20260320ae15264)
- Gate：[BeInCrypto · Gate for AI](https://beincrypto.com/gate-for-ai-agents-crypto-trading)、[BeInCrypto · GateClaw](https://beincrypto.com/gate-launches-gateclaw-ai-agent-platform)、[老虎财经](https://www.itiger.com/news/2617854460)
- OKX：[The Block](https://theblock.co/news/defi/2026-06-30-okx-ai-unveils-marketplace-for-agents-to-find-work-and-get-paid-in-stablecoins-406704)、[Unlock](https://unlock-bc.com/en/okx-launches-agent-trade-kit-for-ai-trading)
- Coinbase：[24/7 Wall St.](https://247wallst.com/investing/cryptocurrency/2026/10/23/coinbase-now-lets-ai-agents-trade-in-your-crypto-account-what-could-go-wrong/)、[DIGIT](https://www.digit.fyi/coinbase-launches-ai-investment-adviser-in-major-test-for-financial-regulation/)、[CoinDesk](https://www.coindesk.com/tech/2026/05/26/coinbase-s-base-launches-ai-tool-for-chatgpt-to-manage-crypto-wallets-and-defi-apps)
- Robinhood：[Robinhood Newsroom](https://robinhood.com/us/en/newsroom/digests-by-robinhood-cortex-uk)、[Robinhood Learn](https://robinhood.com/gb/en/learn/articles/cortex-digests-is-here)
- Crypto.com：[Cointelegraph](https://cointelegraph.com/news/crypto-com-chatgpt-based-ai-user-assistant-amy)

## 版本历史

| 版本 | 日期 | 阶段 | 变更摘要 |
|---|---|---|---|
| v1.0 | 2026-11-02 | Step 4 竞品调研 | 首版：8 家竞品拆解、横向对比、可借鉴 / 不建议照搬 / 差异化方向 |
