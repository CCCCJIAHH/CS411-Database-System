## Project Title

Asian Food website project

## Project Summary

In our project, we assume that we build up a company that sells Asian Foods. We assume that we have our supply chain. Based on this assumption, our project aims to build up our website. Our website focuses on selling Asian foods such as fast noodles, drinks, and snacks. 
Our website is a membership website like Costco. Customers should buy a membership to shop at our website. As a benefit of this, we provide free delivery, more foods, and lower price compared with other websites that sell Asian foods.

## **Description**

The idea comes from that although many websites are selling Asian foods in the US, all of them do not specify foods. They are more like selling Asian groceries. So, there are only a few choices of Asian foods. Based on this circumstance, we want to build up a website that focuses on selling Asian foods and provides as many kinds of foods as possible. Meanwhile, those websites have a very high delivery fee, so we want to provide free delivery to appeal to customers. So, we use the membership fee to take place of the delivery fee. With the membership, customers can also enjoy the lower price of our foods compared with other websites. 
For the definition of Asian foods, we focus on ready-to-eat food. That is to say, we do not sell fresh food such as meat and vegetables. We sell snacks, drinks, canned foods, and so on. This is our feature.

## Usefulness

There are similar websites out there like Weee! and Yamibuy, but our website is quite different from these 2 websites. 
**First, the types of products that we supply are different, Yami and Weee sell many things like make-up besides foods but we only focus on selling those products that are good for storage. What’s more, our products are native and directly imported from their origin countries, which can help to satisfy those Asian who missed their hometown food but fail to find any native food in the US.**
**Second, customer management of our website is based on membership mechanism, quite like that of Costco. We plan to have a comprehensive set of rules and benefits applied for customers of different levels of membership, and those customers who don’t have membership can only browse our website but cannot order products.**
**Third, we plan to support a function of displaying customers’ monthly shopping summary, we plan use some data pipelining techniques combined with some front-end development to automatically generate monthly summary, including pie charts, bar charts, simple customer character generalization, and so on.** 


## **Realness**

* **For product data, we will get them from some domestic online shopping websites, for example, Taobao and JD from China. And we will take the prices of similar products from Weee! and Yamibuy as reference to set up our prices.**

* **For customer data, we will create some dummy customer data through some websites (https://www.mockaroo.com), and we also allow users of our website to register to create new customer record.**

* For customer behavior data, we will store the user's shopping history, like the products they have bought and the items they like.

## Functionality

#### Data:

* User information includes name, password, phone number, address, email, gender, ssn. They are derived when a user registers on the website.

* Goods information includes category, name, description, price, brand, inventory, image, discount, sales and comments information. These information are from other shopping websites and our users.

* Order information includes price, receiver's phone number, receiver's address, receiver's name. These information is derived when an user buy some goods.

#### basic function

* User register, login, change name and password

* show goods list and specific imformation, search for goods, delete and update goods information by admin

* Buy goods(directly pay, add to shopping cart)

* Buy membership and membership discount

* Order information show, deletion and summary

#### creative function

We have designed a function that summarizes the user's shopping situation. It summarizes the user's shopping tendency and spending every month to help our users better manage their finances.

**We collect statistics on the monthly and annual shopping records of users. We will show the change of the amount spent by users over time in the form of a column chart and a line chart. And We will show which categories that users like to buy in the form of a pie chart.**

## **A low fidelity UI mockup**

#### Goods list

![image-20220206113323565](https://tva1.sinaimg.cn/large/008i3skNgy1gz4b6nm6d4j31h60swwgl.jpg)

#### Login

![image-20220206113347540](https://tva1.sinaimg.cn/large/008i3skNgy1gz4b6y7krgj318i0sfwg9.jpg)

#### Goods description

![image-20220206113359487](https://tva1.sinaimg.cn/large/008i3skNgy1gz4b766wfdj31gp0qrmz4.jpg)

#### Shopping cart

![image-20220206113412183](https://tva1.sinaimg.cn/large/008i3skNgy1gz4b7dngjnj31ga0l4dhk.jpg)

#### User information

![image-20220206113425262](https://tva1.sinaimg.cn/large/008i3skNgy1gz4b7ljspjj31g10t341s.jpg)

#### Order list

![image-20220206113441668](https://tva1.sinaimg.cn/large/008i3skNgy1gz4b7we7akj31ga0tiq56.jpg)

## **Project work distribution**

Siyu Ren：Front-end and back-end(Order)

Jiahan：Back-end(Goods)

Boyu：Front-end

Shaojun：Back-end(User, Admin)

