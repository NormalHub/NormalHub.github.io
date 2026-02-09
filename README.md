# NormalHub Site (Node.js)

这是一个用 Node.js 提供静态页面和导航的轻量站点。
首页会通过接口自动扫描项目根目录下的 HTML 文件与包含 `index.html` 的子目录，避免手工维护列表。

## Features
- 自动生成导航页列表
- 支持搜索过滤
- 静态文件托管（HTML/图片/目录）

## Requirements
- Node.js 18+ (推荐)

## Quick Start
1. 安装依赖：
   ```bash
   npm install
   ```
2. 启动服务：
   ```bash
   npm run dev
   ```
3. 打开浏览器访问：
   ```
   http://localhost:3000
   ```

## Project Structure
- `index.html` 导航页（前端）
- `server.js` Node.js 服务入口（Express）
- `chapters/` 小说章节数据
- `music/` 音乐资源
- `围城/` 子站点示例（包含 `index.html`）
- `云盘.html` 云盘与留言板页面（前端）
- `novel.html` 小说阅读页面（前端）
- `i.html` 其它页面

## API
### `GET /api/html-files`
返回可展示在导航页上的条目：
- 根目录下的 `.html` 文件
- 包含 `index.html` 的子目录

返回示例：
```json
{
  "files": [
    { "name": "novel", "path": "novel.html", "type": "file" },
    { "name": "围城", "path": "围城/index.html", "type": "dir" }
  ]
}
```

## Notes
- `index.html` 会调用 `/api/html-files` 获取列表。
- 如果某个页面不存在（例如 `m.html`、`p.html`），不会出现在列表中。

## License
Private / Internal
