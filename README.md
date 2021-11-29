# 110-1 Web Programming Hackathon 2 -- Simple Forum

## 在開始 Coding 前

1. 如果你還沒看過 [preREADME.md](https://hackmd.io/@UTZnTlSqR46n46iMn1U_lQ/H1b03gV_d)，請先看過並確保你已經完成上面的事項。

2. 在 `/wp1101/hack2/` 目錄，安裝底下套件：
```
yarn add react-router-dom uuid axios cors dotenv express mongoose @material-ui/core @material-ui/icons
```
3. 同樣在 hack2 目錄，安裝底下套件：
```
yarn add -D @babel/cli @babel/core @babel/node @babel/preset-env nodemon
``` 

4. 從 Ceiba 上下載 `hack2.zip`。請直接在 `/wp1101/hack2/` 底下解壓縮，若有重複的檔案一律直接覆蓋。
> 使用 Macbook 的同學可能會解壓縮出另一個資料夾，請將資料夾裡的檔案全部移到 hack2 底下，請注意是否有將 .env .babelrc .gitignore 一起移過去。

5. 檔案結構如下:
```

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

以下是每一個站的詳細資料型態：
![](https://i.imgur.com/jJZSP7v.png)

## 題目的檔案架構
### 前端
![]()

### 後端
![]()

## 題目 Functions 說明
### 前端 (src / containers / App.js)
* `post.js`
    * `getPostDetail()`：去跟後端要某篇特定貼文的資料。
    * `delPost()`：請求後端刪掉一筆特定的貼文。
* `edit.js`
    * `handleSubmit()`：將輸入的文字標題、內容，連同生成的 `postId` 與時間一起傳到後端並寫入 database。

### 後端 (routes / station.js)


**考試時，若發現沒有自己需要的 functions，請自己寫，因為助教不打算硬性規定函數的名字跟傳的方式。**

## Checkpoints & Requirements
1. **連接 MongoDB 並成功開啟 server(20%)**
    * 請修改 .env，將自己的 Mongo 連結貼上去，並在 server.js 加入適當的程式碼，讓後端可以連接到資料庫。
    * **請不要將 Mongo 連結寫死在 server.js，因為批改測試會用助教自己的 .env，如果寫死會直接零分。**
    * 在 server.js 加上連接 Mongo 的程式碼後，請在 callback function 加上這行程式碼 (把示範資料寫入 database)：
        ```
        dataInit()
        ```
    * dboptions 可加可不加。

2. 

3. 

4. **新增一篇貼文 (20%)**

    4-(1). **Backend (10%)**
    
    * 後端主要修改：```index.js, post.js```
    * 請在 index.js 上加上適當的 API path 來接收前端要新增貼文的這個功能。
    * 完成 post.js 裡面的 `createPost()`，負責處理前端傳送過來的貼文資訊，並新增到 database。
    * 成功寫入 database 後請以 `status code 200` 回傳，同時附帶 `message: 'success'`。
    * 若出現任何錯誤請以 `status code 403` 回傳，同時附帶 `message: 'error'`。
    * **請注意，若回傳時沒有附帶 `message` 或是出現任何拼字不正確，會拿不到分數！(例如：將 `message` 寫成 `msg`，諸如此類。)**
    
    
    4-(2). **Frontend (10%)**
    
    * 前端主要修改：```edit.js```
    * 請在 ```<Textfield />``` 加上適當的 attribute，把輸入 title 跟 content 的文字存起來。
    * 請確保 title 與 content 頭尾兩端皆沒有空白，若兩端有空白則應去除，**沒有去除就不可以成功傳送到後端**。(Hint : `trim()`)
    * 將新的貼文透過 `/createPost` 傳送到後端 (instance 已加上 `/api`)。
    * 每則新增的貼文必須至少包含下面四個 properties：`postId, title, content, timestamp`
    * postId 請透過 uuid 這個套件來產生。(Hint : `uuidv4()`)
    * timestamp 直接生成本地端時間就好。

5. **刪除一篇貼文 (20%)**

    5-(1). **Backend (10%)**
    
    * 後端主要修改：```index.js, post.js```
    * 請在 index.js 上加上適當的 API path 來處理前端要刪掉的貼文這個功能。
    * 完成 post.js 裡面的 `deletePost()`，利用前端傳送過來的貼文資訊，從 database 刪除該筆資料。
    * **這邊請使用 `req.query` 來做處理，這邊前端只會固定傳 `postId` 到後端！**
    * 成功刪除後請以 `status code 200` 回傳，同時附帶 `message: 'success'`。
    * 若出現任何錯誤請以 `status code 403` 回傳，同時附帶 `message: 'error'`。
    * **請注意，若回傳時沒有附帶 `message` 或是出現任何拼字不正確，會拿不到分數！(例如：將 `message` 寫成 `msg`，諸如此類。)**
    
    5-(2). **Frontend (10%)**
    
    * 前端主要修改：```post.js```
    * 請在 ```<IconButton />``` 加上適當的 attribute，讓使用者可以點下去的時候觸發刪除的功能。
    * 完成 `delPost()`，並將此函數綁在上述的 `IconButton` 上。
    * 將欲刪除的貼文透過 `/deletePost?postId=` 傳送到後端 (instance 已加上 `/api`)，(或是用 params 的寫法附加在上面也可以)。
    * **請務必配合後端的 API 寫法，將 `postId` 放在 API path 後面。**

## Running Tests
1. 請先確保你的前端有在 `localhost:3000` 運作；確保你的後端有在 `localhost:4000` 運作。

2. 在 `wp1101/hack2` 底下輸入 `yarn test`，並等待測試結果。**

## Push your code to Github
```
cd wp1101
git add hack2
git commit -m "commit message"
git push origin master
```
