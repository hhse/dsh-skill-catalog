# DSH Skill Catalog

A left-sidebar panel for the [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) (DSH) Web UI that lists the skills visible to a session.

在 DSH 左侧栏加一个「技能库」入口：按所选会话的工作目录与 Agent 预设列出可见技能，点击即可复制 `/技能名`。

## 功能

- 左侧栏星形图标 → 中央面板，两列卡片（窄屏自动收成一列）
- 按名称搜索；悬停卡片显示描述、适用场景与「仅用户」标记
- 点击卡片复制 `/技能名`，粘贴到对话输入框即可调用
- 顶部可切换会话（默认最近的非空白会话）
- 插件安装、Agent 预设切换、连接重置后自动刷新
- 跟随宿主明暗主题；文案中英双语，随 DSH 语言设置切换

## 工作原理

Client 侧只读取 DSH 已挂载的两个 Remote：

| Remote | 用途 |
|---|---|
| `ctx.remote.session.list({})` | 会话列表（标题、工作目录、运行状态） |
| `ctx.remote.skills.list({ sessionId })` | 该会话可见的用户可调用技能 |

Host 侧的 `sessionSkillCatalog` 只读会话头（cwd / preset）解析技能目录，**不会激活冷 Agent**。面板只展示 frontmatter 摘要（name、description、whenToUse、path、modelInvocable），不加载技能正文。

## 安装

本仓库是一个 DSH bundle（`dsh.bundle.patch` + `dsh.client`），不是 npm 包：

1. 克隆或下载本仓库到本机
2. 在 DSH 的 **设置 → 插件 → 插件管理器** 中，以本地目录作为 bundle 安装
3. 左侧栏出现星形图标后即可使用

依赖 DSH 自带的 `@deepseek-ai/dsh-api-remotes` 与技能远程服务，无需额外安装运行时。

## 兼容性

- DSH Web profile（`dsh.client.platform: web`）
- 需要 `session/list` 与 `skills/list` Remote 可用（`@deepseek-ai/dsh-api-session-controller` 默认挂载）
- 没有可读会话时，面板显示「还没有会话」提示

## 结构

```
.
├── package.json        # bundle 清单：dsh.bundle.patch、dsh.client、locale/icon 导出
├── cordis.patch.yml    # 插入 skill-catalog 行
├── index.js            # Host 半区（空 apply）
├── client.js           # 侧栏图标 + 技能面板（数据、搜索、复制、样式）
├── locale/
│   ├── en.json         # 插件管理器里的标题与描述
│   └── zh.json
└── icon.svg
```

## 开发

修改 `client.js` 后刷新页面即可（本地 link 安装时无需重装）。Host 半区目前为空，所有逻辑都在浏览器侧。

## License

未声明（All rights reserved）。如需开源授权，可自行添加 LICENSE。
