#采用技术
* Django, Django Rest Framework
* Vue, Element UI
* postgres
#目录结构
	|-- backend     //后端Django代码
	|-- frontend    //前端Vue代码 
    |-- gifs        //功能截图 
#本地部署步骤
##后端
* git clone 代码到本地
* 创建vitural env, pip install -r requirement.txt
* 构建数据库表 python manage.py makemigrations,
python manage.py migrate
* 启动后端服务，python manage.py runserver
##前端
* git clone 代码到本地
* npm install
* npm run dev
* 开启服务器，浏览器访问 http://localhost:8081
* 前端配置文件中已经配置了访问后台的地址为http://127.0.0.1:8000
#功能列表
* 增加一个待办事项
![c](https://github.com/jasonpanacea/prework/blob/master/gifs/create.gif)
* 删除一个待办事项
![d](https://github.com/jasonpanacea/prework/blob/master/gifs/delete.gif)
* 标记一个待办事项为已完成
![f](https://github.com/jasonpanacea/prework/blob/master/gifs/finish.gif)
* 编辑一个待办事项的具体内容
![u](https://github.com/jasonpanacea/prework/blob/master/gifs/update.gif)
* 翻页
![paging](https://github.com/jasonpanacea/prework/blob/master/gifs/paging.gif)
* 搜索
![search](https://github.com/jasonpanacea/prework/blob/master/gifs/search.gif)
* 排序
![sorting](https://github.com/jasonpanacea/prework/blob/master/gifs/sort.gif)
