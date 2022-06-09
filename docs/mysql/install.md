---
id: mysql-install
title: install
sidebar_position: 0
---

## 输入查询
```
SELECT VERSION(), CURRENT_DATE;
```

## 创建和选择数据库
```
CREATE DATABASE menagerie;
```

## 创建表
```
CREATE TABLE pet (name VARCHAR(20), owner VARCHAR(20),
       species VARCHAR(20), sex CHAR(1), birth DATE, death DATE);
```

## 插入
```
INSERT INTO pet
       VALUES ('Puffball','Diane','hamster','f','1999-03-30',NULL);
```

## 显示一条
```
select distinct from pet where name = *;
```

## 条件
- and  `where name = 'haibo' and age = 30`
- or  `where name = 'haibo' or age = 30`

## 排序
```
SELECT name, birth, CURDATE(),
       TIMESTAMPDIFF(YEAR,birth,CURDATE()) AS age
       FROM pet ORDER BY age;
```
:::info caution
## 日期函数
`year()` `month()` `dayofmonth()`
- 求时间差 `timestampdiff(year, start, end)` 
-  `MONTH(DATE_ADD(CURDATE(),INTERVAL 1 MONTH))`  curdate() 当前日期  date_add() 添加日期
;;;
