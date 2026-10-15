# eCharts/mine 数据维护说明（供 AI 使用）

本目录是一个基于 ECharts 的「日记统计」页面。核心数据是若干纯文本文件，
每行一条「写日记/打卡」的时间戳，由页面加载后做统计与预警。

## 目录结构

- `stat.html`：统计页面入口，引入 `js/` 下脚本并调用 `init()`。
- `js/init.js`：加载数据文件 → `parseDate` 解析 → 聚合 `monthlyData` / `hourlyData` / `daylyData` → 渲染。
- `js/monitoring.js`：基于统计数据做预警（当前 / 30 天 / 90 天 / 同比）。
- `js/*Echarts.js`：分别绘制月、日、小时图表。
- `data.txt`：**当前年度**的记录文件，日常新增记录都写到这里。
- `data20XX.txt`：按年份归档的历史记录（`data2023.txt`、`data2024.txt`、`data2025.txt`、`data2026.txt`）。
- `life/`、`work/`：其它相关资源。

`js/init.js` 中实际加载的文件列表：

```js
var fileUrls = ['data.txt', 'data2023.txt', 'data2024.txt', 'data2025.txt', 'data2026.txt'];
```

> 注意：`data.txt` 保存当年的记录；`data2026.txt` 目前为空占位，用于后续归档。

## 每条记录的格式

一行一条，纯时间戳，**不要**加逗号、引号或其它分隔符。

`js/init.js` 的 `parseDate` 支持以下格式（按字符串长度 / 是否含「年」判断）：

| 长度 / 特征 | 格式 | 示例 |
| --- | --- | --- |
| 14 位（推荐） | `YYYYMMDDHHmmss` | `20261014204712` |
| 12 位 | `YYYYMMDDHHmm` | `202610142047` |
| 10 位 | `YYMMDDHHmm` | `2610142047` |
| 含「年」字 | `YYYY年MM月DD日HH:mm:ss` | `2026年10月14日20:47:12` |

**统一使用 14 位 `YYYYMMDDHHmmss`**，与现有数据保持一致。

## 文件书写约定

- 每行一条记录，按时间先后追加在文件**末尾**（虽然 JS 会再排序，仍请保持有序，便于人工核对）。
- 使用 **LF** 换行；文件结尾保留一个换行符。
- 不要插入空行（加载时会过滤空行，但会破坏可读性），不要写表头。
- 数值只是时间戳，没有其它字段。

## 如何新增一条记录（AI 工作流）

1. 把用户给的可读时间（如 `2026年10月14日20:47:12`）转换为 14 位格式：
   年4位 + 月2位 + 日2位 + 时2位 + 分2位 + 秒2位 → `20261014204712`。
   补零到固定宽度，不加任何分隔符。
2. 在 `data.txt` 末尾追加该行（保持 LF、结尾换行）。
3. 验证：`git diff --numstat -- eCharts/mine/data.txt` 应显示少量新增、0 删除。
4. 按需提交/推送：

```bash
git add eCharts/mine/data.txt
git commit -m "feat(eCharts): 添加新的时间数据点到数据文件"
git push
```

## 新增一个年份（跨年时）

1. 新建 `data<新年份>.txt`（可为空文件占位）。
2. 在 `js/init.js` 的 `fileUrls` 数组中登记该文件。
3. `data.txt` 继续承载当前年度，或按既有习惯把上一年度内容归档到 `data20XX.txt`。

## 快速校验命令（PowerShell）

```powershell
# 查看末尾若干条
Get-Content eCharts\mine\data.txt -Tail 5
# 行数
(Get-Content eCharts\mine\data.txt).Count
# 检查是否存在非 14 位数字的行（正常应无输出）
Get-Content eCharts\mine\data.txt | Where-Object { $_ -notmatch '^\d{14}$' }
```
