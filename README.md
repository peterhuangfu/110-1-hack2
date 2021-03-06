# 110-1 Web Programming Hackathon 2 -- Simple Forum

## 在開始 Coding 前

1. 如果你還沒看過 [preREADME.md](https://hackmd.io/@UTZnTlSqR46n46iMn1U_lQ/H1b03gV_d)，請先看過並確保你已經完成上面的事項。

2. 在 `/wp1101/hack2/` 目錄，安裝底下套件：
```
yarn add react-router-dom axios moment cypress cors dotenv express mongoose uuid @material-ui/core @material-ui/icons
```
3. 同樣在 hack2 目錄，安裝底下套件：
```
yarn add -D @babel/cli @babel/core @babel/node @babel/preset-env nodemon
``` 

4. 從 Ceiba 上下載 `hack2.zip`。請直接在 `/wp1101/hack2/` 底下解壓縮，若有重複的檔案一律直接覆蓋。
> 使用 Macbook 的同學可能會解壓縮出另一個資料夾，請將資料夾裡的檔案全部移到 hack2 底下，請注意是否有將 .env .babelrc .gitignore 一起移過去。

5. 檔案結構如下:
```
.
├── README.md
├── cypress
│   └── integration
│       └── public.spec.js
├── cypress.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── server
│   ├── models
│   │   └── post.js
│   ├── routes
│   │   └── post.js
│   ├── server.js
│   └── upload.js
└── src
    ├── App.css
    ├── App.js
    ├── appbar.js
    ├── board.js
    ├── edit.js
    ├── guide.js
    ├── index.css
    ├── index.js
    ├── instance.js
    ├── logo.png
    ├── noMatch.js
    ├── post.js
    ├── reportWebVitals.js
    └── setupTests.js
```

6. 欲執行 frontend，打開 terminal / cmd 執行：
```
cd wp1101/hack2
yarn start
```
7. 欲執行 backend，打開第二個 terminal / cmd 分頁，執行：
```
cd wp1101/hack2
yarn server
```

8. 請仔細閱讀以下的 checkpoints 以及 requirements。

9. **前端將會是 localhost:3000，後端將會是 localhost:4000**。

## 題目說明
這次題目是一個非常單純的類似論壇/討論區的系統。

> 在前端，你需要把 database 裡面的每一篇文章都呈現出來，每一篇貼文都可以被點進去以查看更詳細的內容，同時也可以被刪除。不論是新增/刪除貼文，都應該要返回到貼文列表的畫面。
> 在後端，你需要把 server 連接上 MongoDB (i.e. 你的 Mongoose 帳號)，server 在啟動以後會把題目所需到的示範資料寫入你的 database。你必須接收前端傳過來的參數並完成題目要求的四個 API function。

**<span style="color:red">[Warning] 給同學的示範資料，跟助教批改用的資料不會一樣，所以請同學在寫的時候注意，不要把前端的資料寫死，不然一定拿不到分數。</span>**

以下是每一筆資料的詳細資料型態：
![](https://i.imgur.com/jJZSP7v.png)

## 題目的檔案架構
### 前端
![](https://i.imgur.com/xXmkiKM.png)

### 後端
![](https://i.imgur.com/ANmXYlA.png)

## 題目 Functions 說明
### 前端 (src / containers / App.js)
- `post.js`
    - `getPostDetail()`：去跟後端要某篇特定貼文的資料
    - `delPost()`：請求後端刪掉一筆特定的貼文
- `edit.js`
    - `handleSubmit()`：將輸入的文字標題、內容，連同生成的 `postId`、時間一起傳到後端並寫入 database

**考試時，若發現沒有自己需要的 functions，請自己寫，因為助教不打算硬性規定函數的名字跟傳的方式。**

## Checkpoints & Requirements
1. **連接 MongoDB 並成功開啟 server(20%)**
    - 請參考 .env.defaults 然後加入自己的 .env，將自己的 Mongo 連結貼上去，並在 server.js 加入適當的程式碼，讓後端可以連接到資料庫
    - **請不要將 Mongo 連結寫死在 server.js，因為批改測試會用助教自己的 .env.，如果寫死會直接零分**
    - 在 server.js 加上連接 Mongo 的程式碼後，請在 callback function 加上這兩行程式碼 (把 example data 寫入 database)：
        ```
        if (process.env.MODE === 'EXAM')
            dataInit()
        ```
        - 第一次開啟 server 後可以檢查 database 是否有被寫入四筆 example data，**若有的話請將上述這兩行程式碼註解掉，免得資料庫的資料一直被洗掉**
    - dboptions 可加可不加

2. **從後端取得所有貼文資料 (20%)**
    2-(1). **Backend (10%)**
    - 可能需要修改的檔案：`server/routes/post.js`
    - 要求：請在 `server/routes/post.js` 中新增一個適當的 API ，取得 DB 中的所有貼文資料後，將時間順序**由新到舊**排列後回傳
    - 方法：`GET`
    - 路徑：`/api/getAllPosts`
    - 參數：無
    - 回傳格式：
        - 若成功從 DB 取得資料請以 `status code 200` 回傳，並同時回傳 `message: "success"`：
        ```json
        {
            "message": "success",
            "data": [Post]
        }
        ```
        - 若 DB 出現任何錯誤，或者 DB 回傳空陣列，則以 `status 403` 回傳，並同時回傳 `message: "error"`，data 回傳 null：
        ```json
        {
            "message": "error",
            "data": null
        }
        ```
    - 關於排列順序的部分，你從 DB 取得的應該會是一個 `Post` 的陣列，關於 `Post` 的 Schema 可以參考 `server/models/post.js`。請利用 `Post` 的 `timestamp` 來進行排序，使**較新的貼文順序在前，較舊的貼文順序在後**
    - Hint：可以使用 `moment().diff()`
    
    2-(2). **Frontend (10%)**
    - 可能需要修改的檔案：`src/board.js`
    - 要求：請修改 `src/board.js` 中的 `useEffect()` ，並利用 state hook 將 `posts` 這個 state 修改成從後端 `GET /getAllPosts` 得到的資料
        - (instance 已加上 `/api`)
    - **此功能實作完成後，可以嘗試在 DB 創一些假資料，檢查資料以及顯示順序是否正確**

3. **取得單一貼文的詳細資料 (20%)**
    3-(1). **Backend (10%)**
    - 可能需要修改的檔案：`server/routes/post.js`
    - 要求：請在 `server/routes/post.js` 中新增一個適當的 API ，透過 query string 取得 DB 中指定 `postId` 的貼文資料並回傳
    - 方法：`GET`
    - 路徑：`/api/getPostDetail`
    - 參數：`pid` (代表指定的`postId`)
    - 回傳格式：
        - 若成功從 DB 取得資料請以 `status code 200` 回傳，並同時回傳 `message: "success"`：
        ```json
        {
            "message": "success",
            "post": Post
        }
        ```
        - 若 DB 出現任何錯誤，或者 DB 沒有回傳資料，則以 `status 403` 回傳，並同時回傳 `message: "error"`，post 回傳 null：
        ```json
        {
            "message": "error",
            "post": null
        }
        ```
    3-(2). **Frontend (10%)**
    - 可能需要修改的檔案：`src/post.js`
    - 要求：請修改 `src/post.js` 中的 `getPostDetail()` ，並利用 state hook 將 `data` 這個 state 修改成從後端 `GET /getPostDetail` 所得到的資料。接著修改 `useEffect()` 使得載入這個 component 時呼叫 `getPostDetail()` 以更新 state。
        - (instance 已加上 `/api`)

    
4. **新增一篇貼文 (20%)**

    4-(1). **Backend (10%)**
    
    - 可能需要修改的檔案：`server/routes/post.js`
    - 要求：請在 `server/routes/post.js` 中新增一個適當的 API ，透過 query string 新增一則貼文到 DB 中
    - 方法：`POST`
    - 路徑：`/api/createPost`
    - 參數：一則貼文必須包含下列四個參數：
    ```json
    {
        postId,
        title,
        content,
        timestamp
    }
    ```
    - 回傳格式：
        - 若成功在 DB 新增貼文請以 `status code 200` 回傳，並同時回傳 `message: "success"`：
        ```json
        {
            "message": "success"
        }
        ```
        - 若 DB 出現任何錯誤，或者 DB 沒有回應，則以 `status 403` 回傳，並同時回傳 `message: "error"`，post 回傳 null：
        ```json
        {
            "message": "error",
        }
        ```
        - **請注意，若回傳時沒有附帶 `message` 或是出現任何拼字不正確，會拿不到分數！(例如：將 `message` 寫成 `msg`，諸如此類。)**
    
    
    4-(2). **Frontend (10%)**
    
    - 可能需要修改的檔案：`src/edit.js`
    - 請在 ```<Textfield />``` 加上適當的 attribute，把輸入 title 跟 content 的文字存起來
    - 請確保 title 與 content 頭尾兩端皆沒有空白，若兩端有空白則應去除，**沒有去除就不可以成功傳送到後端**
        - Hint : `trim()`
    - 完成 `handleSubmit()`，將新的貼文透過 `POST /createPost` 傳送到後端
        - instance 已加上 `/api`
    - 每則新增的貼文必須至少包含下面四個 properties：
        - `postId, title, content, timestamp`
    - postId 請透過 uuid 這個套件來產生
        - Hint : `uuidv4()`
    - timestamp 直接生成本地端時間就好
    - 成功新增貼文後必須返回貼文列表，並顯示更新後的所有貼文 (`handleSubmit()` 裡面的 `setTimeout` 已經幫你們寫好了)

5. **刪除一篇貼文 (20%)**

    5-(1). **Backend (10%)**
    
    - 可能需要修改的檔案：`server/routes/post.js`
    - 要求：請在 `server/routes/post.js` 中新增一個適當的 API ，透過 query string 刪除 DB 中指定 `postId` 的貼文資料
    - 方法：`DELETE`
    - 路徑：`/api/deletePost`
    - 參數：`pid` (代表指定的`postId`)
    - 回傳格式：
        - 若成功從 DB 刪除資料請以 `status code 200` 回傳，並同時回傳 `message: "success"`：
        ```json
        {
            "message": "success"
        }
        ```
        - 若 DB 出現任何錯誤，或者 DB 沒有回應，則以 `status 403` 回傳，並同時回傳 `message: "error"`，post 回傳 null：
        ```json
        {
            "message": "error",
        }
        ```
        - **請注意，若回傳時沒有附帶 `message` 或是出現任何拼字不正確，會拿不到分數！(例如：將 `message` 寫成 `msg`，諸如此類)**
    
    5-(2). **Frontend (10%)**
    
    - 前端可能需要修改的檔案：```src/post.js```
    - 請在 ```<IconButton />``` 加上適當的 attribute，讓使用者可以點下去的時候觸發刪除的功能
    - 完成 `delPost()`，並將此函數綁在上述的 `IconButton` 上。
    - 將欲刪除的貼文透過 `DELETE /deletePost` 傳送到後端
        - (instance 已加上 `/api`)
    - 成功刪除貼文後必須返回貼文列表，並顯示更新後的所有貼文 (`delPost()` 裡面的 `setTimeout` 已經幫你們寫好了)

## Running Tests
1. 請先確保你的前端有在 `localhost:3000` 運作；確保你的後端有在 `localhost:4000` 運作。

2. 將一開始註解掉的這兩行程式碼**反註解 (請注意，如果 db 裡面的資料數量剛好是四筆的話，請先把資料數弄成不是四筆的狀態，這樣這個函數才會起作用)**：
    ```
    if (process.env.MODE === 'EXAM')
        dataInit()
    ```

3. 在 `wp1101/hack2` 底下輸入 `yarn test`，並等待測試結果。

## Push your code to Github
```
cd wp1101
git add hack2
git commit -m "commit message"
git push
```
