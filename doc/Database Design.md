# Database Design

## UML diagram

![Database Design](https://tva1.sinaimg.cn/large/e6c9d24egy1h0291ekmpvj21440u0mzd.jpg)

## Assumptions each entity and relationship

* Each user has at least one payment
* Each user has at least one address
* One address can have multiple users.
* One order can have only one address, but an address can have multiple orders.
* Each payment only has one unique user.
* There must be only one membership for each user and membership can have multiple users.
* One category can have many goods
* One good only belongs to one category
* One shoppingcart contains many shoppingcart goods.
* One shopping cart only belongs to one user.
* One order has only one address.
* One order only belongs to one user.

## Relational schema

**User** (

id(int) [primary key],

name (varchar (255)),

password (varchar (255)),

phone_number (varchar (255)),

e-mail (varchar (255)),

gender (tinyint),

**membership_level (int), [foreign key to Membership.level],**

**expire_time (timestamp),**

is_deleted (tinyint),

created_at (timestamp),

updated_at (timestamp)

)

**Address** (

id(int) [primary key],

user_id (int) [foreign key to User.id],

recevier_name (varchar (255)),

state (varchar (64)),

county (varchar (128)),

street (varchar (255)),

post_code (varchar (64)),

receiver_phone_number (varchar (64)),

is_default (tinyint),

is_deleted (tinyint),

created_at (timestamp),

updated_at (timestamp)

)

**Payment** (

id(int) [primary key],

user_id(int) [foreign key to User.id],

card_number (varchar (64)),

is_deleted (tinyint),

created_at (timestamp),

updated_at (timestamp)

)

**Membership** (

id(int) [primary key],

level (int),

discount (decimal (10)),

description (varchar (255)),

price (decimal (10)),

is_deleted (tinyint),

created_at (timestamp),

updated_at (timestamp)

)

**Category** (

id (int) [primary key],

name (varchar(64)),	

description (varchar(64)),

is_deleted (tinyint),

created_at (timestap),

updated_at (timestap)

)

**Goods** (

id (int) primary key,

category_id (int) [foreign key to Category.id],

name (varchar(255)),

price (decimal 10),

brand (varchar(255)),

inventory (int),

sales (int),

image_url (varchar(255)),

discount (decimal(10)),

is_deleted (tinyint),

created_at (timestap),

updated_at (timestap)

)

**ShoppingCart** (

id (int) [primary key],

user_id (int) [foreign key to User.id],

**goods_id (int) [foreign key to Goods.id],**

**goods_count (int),**

is_deleted (tinyint),

created_at (timestap),

updated_at (timestap)

) 

**Order** (

id (int) [primary key],

user_id (int) [foreign key to User.id],

receiver_address_id (int) [foreign key to Address.id],

price (decimal(10)),

status (tinyint),

is_deleted (tinyint),

created_at (timestap),

updated_at (timestap)

)

## CREATE TABLE DDL command

```mysql
create table if not exists Category
(
    id          int auto_increment
        primary key,
    name        varchar(64)                         not null,
    description varchar(255)                        null,
    is_deleted  tinyint   default 0                 null,
    created_at  timestamp default CURRENT_TIMESTAMP not null,
    updated_at  timestamp default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP
)
    charset = utf8;

create table if not exists Goods
(
    id          int auto_increment
        primary key,
    name        varchar(255)                        not null,
    description varchar(255)                        null,
    price       decimal(10, 2)                      null,
    category_id int                                 not null,
    brand       varchar(255)                        not null,
    inventory   int                                 not null,
    sales       int       default 0                 not null,
    image_url   varchar(255)                        null,
    discount    decimal   default 1                 null,
    is_deleted  tinyint   default 0                 not null,
    created_at  timestamp default CURRENT_TIMESTAMP not null,
    updated_at  timestamp default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP,
    constraint Goods_ibfk_1
        foreign key (category_id) references Category (id)
)
    charset = utf8;

create index category_id
    on Goods (category_id);

create table if not exists Membership
(
    id          int auto_increment
        primary key,
    level       int                                 not null,
    discount    decimal                             not null,
    description varchar(255)                        null,
    price       decimal(10, 2)                      not null,
    is_deleted  tinyint   default 0                 null,
    created_at  timestamp default CURRENT_TIMESTAMP not null,
    updated_at  timestamp default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP,
    constraint level
        unique (level)
)
    charset = utf8;

create table if not exists User
(
    id                     int auto_increment
        primary key,
    name                   varchar(255)                        not null,
    password               varchar(255)                        not null,
    phone_number           varchar(255)                        not null,
    email                  varchar(255)                        not null,
    gender                 tinyint   default 0                 null,
    membership_level       int       default 0                 not null,
    membership_expire_time timestamp                           null,
    is_deleted             tinyint   default 0                 null,
    created_at             timestamp default CURRENT_TIMESTAMP not null,
    updated_at             timestamp default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP,
    constraint User_Membership_level_fk
        foreign key (membership_level) references Membership (level)
)
    charset = utf8;

create table if not exists Address
(
    id                    int auto_increment
        primary key,
    user_id               int                                 not null,
    receiver_first_name   varchar(255)                        not null,
    receiver_last_name    varchar(255)                        not null,
    state                 varchar(64)                         not null,
    county                varchar(128)                        not null,
    street                varchar(255)                        not null,
    post_code             varchar(64)                         not null,
    receiver_phone_number varchar(64)                         not null,
    is_default            tinyint   default 0                 null,
    is_deleted            tinyint   default 0                 null,
    created_at            timestamp default CURRENT_TIMESTAMP not null,
    updated_at            timestamp default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP,
    constraint Address_ibfk_1
        foreign key (user_id) references User (id)
)
    charset = utf8;

create index user_id
    on Address (user_id);

create table if not exists `Order`
(
    id                     int auto_increment
        primary key,
    user_id                int                                 not null,
    price                  decimal(10, 2)                      not null,
    status                 tinyint                             not null,
    receiver_address_id    int                                 not null,
    estimated_arrival_time timestamp                           null,
    arrival_time           timestamp                           null,
    is_deleted             tinyint   default 0                 null,
    created_at             timestamp default CURRENT_TIMESTAMP not null,
    updated_at             timestamp default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP,
    constraint Order_ibfk_1
        foreign key (user_id) references User (id),
    constraint Order_ibfk_2
        foreign key (receiver_address_id) references Address (id)
)
    charset = utf8;

create index receiver_address_id
    on `Order` (receiver_address_id);

create index user_id
    on `Order` (user_id);

create table if not exists Payment
(
    id          int auto_increment
        primary key,
    user_id     int                                 not null,
    card_number varchar(64)                         not null,
    is_deleted  tinyint   default 0                 null,
    created_at  timestamp default CURRENT_TIMESTAMP not null,
    updated_at  timestamp default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP,
    constraint Payment_ibfk_1
        foreign key (user_id) references User (id)
)
    charset = utf8;

create index user_id
    on Payment (user_id);

create table if not exists ShoppingCart
(
    id          int auto_increment
        primary key,
    user_id     int                                 not null,
    goods_id    int                                 not null,
    goods_count int                                 not null,
    is_deleted  tinyint   default 0                 null,
    created_at  timestamp default CURRENT_TIMESTAMP not null,
    updated_at  timestamp default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP,
    constraint ShoppingCart_Goods_id_fk
        foreign key (goods_id) references Goods (id),
    constraint ShoppingCart_ibfk_1
        foreign key (user_id) references User (id)
)
    charset = utf8;

create index user_id
    on ShoppingCart (user_id);
```

## Advanced Queries
1. select states that have more than 15 users.
```mysql
select distinct A.state, number, A.created_at
from (select state, count(*) as number
      from Address
      group by state) as sub
         join Address A on A.state = sub.state
         join User U on A.user_id = U.id
where number >= 15
order by number desc, A.created_at
limit 15;
```
![image-20220305130601518](https://tva1.sinaimg.cn/large/e6c9d24egy1gzzll8ugkqj20kv0eptam.jpg)

2. select the best selling good of brands that have more than 5 goods reach the sales of 300.

```mysql
select G.id,G.name, G.brand, G.price
from Goods G left join (select max(sales) as best_good_sale, count(*) as number, brand
                        from Goods
                        where sales >=300
                        group by brand) as sub1 using (brand)
where G.price<=10.00 and sub1.number>=5 and sales=best_good_sale
order by G.sales desc
limit 15
```

![](https://tva1.sinaimg.cn/large/e6c9d24egy1gzxd9h75fxj21s00mon1r.jpg)

## Indexing Analysis

### First query

```mysql
explain
select distinct A.state, number, A.created_at
from (select state, count(*) as number
      from Address
      group by state) as sub
         join Address A on A.state = sub.state
         join User U on A.user_id = U.id
where number >= 15
order by number desc, A.created_at
limit 15;
```

We want to try index on `user_id` and `state` because these columns are used in conditions. Also, we want to try index on `created_at` since it is used in ordering.

#### No index

When there is no index, the output of explain analyze is

```mysql
| -> Limit: 15 row(s)  (actual time=5.974..5.977 rows=15 loops=1)
    -> Sort: <temporary>.number DESC, <temporary>.created_at, limit input to 15 row(s) per chunk  (actual time=5.973..5.974 rows=15 loops=1)
        -> Table scan on <temporary>  (actual time=0.001..0.003 rows=15 loops=1)
            -> Temporary table with deduplication  (actual time=5.944..5.947 rows=15 loops=1)
                -> Nested loop inner join  (actual time=1.082..5.202 rows=684 loops=1)
                    -> Nested loop inner join  (cost=452.25 rows=1000) (actual time=0.058..2.563 rows=1000 loops=1)
                        -> Table scan on A  (cost=102.25 rows=1000) (actual time=0.035..0.480 rows=1000 loops=1)
                        -> Single-row index lookup on U using PRIMARY (id=A.user_id)  (cost=0.25 rows=1) (actual time=0.002..0.002 rows=1 loops=1000)
                    -> Filter: (sub.`number` >= 15)  (actual time=0.002..0.002 rows=1 loops=1000)
                        -> Index lookup on sub using <auto_key1> (state=A.state)  (actual time=0.001..0.001 rows=1 loops=1000)
                            -> Materialize  (actual time=0.002..0.002 rows=1 loops=1000)
                                -> Table scan on <temporary>  (actual time=0.001..0.005 rows=49 loops=1)
                                    -> Aggregate using temporary table  (actual time=0.975..0.983 rows=49 loops=1)
                                        -> Table scan on Address  (cost=102.25 rows=1000) (actual time=0.037..0.383 rows=1000 loops=1)
 |
+------------------------------------------------------------------------------------------
1 row in set (0.01 sec)
```

The output of explain is

```mysql
| id | select_type | table      | partitions | type   | possible_keys | key         | key_len | ref              | rows | filtered | Extra                           |
+----+-------------+------------+------------+--------+---------------+-------------+---------+------------------+------+----------+---------------------------------+
|  1 | PRIMARY     | A          | NULL       | ALL    | NULL          | NULL        | NULL    | NULL             | 1000 |   100.00 | Using temporary; Using filesort |
|  1 | PRIMARY     | U          | NULL       | eq_ref | PRIMARY       | PRIMARY     | 4       | to_buy.A.user_id |    1 |   100.00 | Using index                     |
|  1 | PRIMARY     | <derived2> | NULL       | ref    | <auto_key1>   | <auto_key1> | 194     | to_buy.A.state   |   10 |    33.33 | Using where                     |
|  2 | DERIVED     | Address    | NULL       | ALL    | NULL          | NULL        | NULL    | NULL             | 1000 |   100.00 | Using temporary                 |
+----+-------------+------------+------------+--------+---------------+-------------+---------+------------------+------+----------+---------------------------------+
4 rows in set, 1 warning (0.01 sec)
```

#### Index on user_id

We can see the type of the first step is `ALL`. So we want to optimize this step by adding index on Address.user_id.

```mysql
create index idx_user_id on Address(user_id);
```

Then we run `explain analyze` and `explain`. The output is

```mysql
| -> Limit: 15 row(s)  (actual time=15.013..15.016 rows=15 loops=1)
    -> Sort: <temporary>.number DESC, <temporary>.created_at, limit input to 15 row(s) per chunk  (actual time=15.012..15.014 rows=15 loops=1)
        -> Table scan on <temporary>  (actual time=0.002..0.003 rows=15 loops=1)
            -> Temporary table with deduplication  (actual time=14.977..14.980 rows=15 loops=1)
                -> Nested loop inner join  (actual time=1.031..14.303 rows=684 loops=1)
                    -> Nested loop inner join  (cost=452.00 rows=1000) (actual time=0.085..11.629 rows=1000 loops=1)
                        -> Index scan on U using User_Membership_level_fk  (cost=102.00 rows=1000) (actual time=0.049..0.284 rows=1000 loops=1)
                        -> Index lookup on A using Address_user_id_index (user_id=U.id)  (cost=0.25 rows=1) (actual time=0.011..0.011 rows=1 loops=1000)
                    -> Filter: (sub.`number` >= 15)  (actual time=0.002..0.002 rows=1 loops=1000)
                        -> Index lookup on sub using <auto_key1> (state=A.state)  (actual time=0.001..0.001 rows=1 loops=1000)
                            -> Materialize  (actual time=0.002..0.002 rows=1 loops=1000)
                                -> Table scan on <temporary>  (actual time=0.000..0.005 rows=49 loops=1)
                                    -> Aggregate using temporary table  (actual time=0.896..0.905 rows=49 loops=1)
                                        -> Table scan on Address  (cost=102.25 rows=1000) (actual time=0.041..0.373 rows=1000 loops=1)
 |
----------------------------------------------------------+
1 row in set (0.00 sec)

+----+-------------+------------+------------+-------+--------------------+-----------------
| id | select_type | table      | partitions | type  | possible_keys      | key                      | key_len | ref            | rows | filtered | Extra                                        |
+----+-------------+------------+------------+-------+--------------------+-----------------
|  1 | PRIMARY     | U          | NULL       | index | PRIMARY               | User_Membership_level_fk | 4       | NULL           | 1000 |   100.00 | Using index; Using temporary; Using filesort |
|  1 | PRIMARY     | A          | NULL       | ref   | Address_user_id_index | Address_user_id_index    | 4       | to_buy.U.id    |    1 |   100.00 | NULL                                         |
|  1 | PRIMARY     | <derived2> | NULL       | ref   | <auto_key1>           | <auto_key1>              | 194     | to_buy.A.state |   10 |    33.33 | Using where                                  |
|  2 | DERIVED     | Address    | NULL       | ALL   | NULL                  | NULL                     | NULL    | NULL           | 1000 |   100.00 | Using temporary                              |
+----+-------------+------------+------------+-------+--------------------+-----------------
4 rows in set, 1 warning (0.00 sec)
```

We can see that `inner join` part running time decrease from 0.037..0.480 to 0.011..0.011. The type of step1 changes to `index`.

#### Index on Address.state

We also find that `state` is used in where condition and `group by`. So we add index on `Address.state`.

```mysql
create index idx_state on Address(state);
```

Then we run `explain analyze` and `explain`. The output is

```mysql
| -> Limit: 15 row(s)  (actual time=5.116..5.120 rows=15 loops=1)
    -> Sort: <temporary>.number DESC, <temporary>.created_at, limit input to 15 row(s) per chunk  (actual time=5.115..5.117 rows=15 loops=1)
        -> Table scan on <temporary>  (actual time=0.001..0.003 rows=15 loops=1)
            -> Temporary table with deduplication  (actual time=5.084..5.087 rows=15 loops=1)
                -> Nested loop inner join  (actual time=0.611..4.290 rows=684 loops=1)
                    -> Nested loop inner join  (cost=452.25 rows=1000) (actual time=0.087..2.166 rows=1000 loops=1)
                        -> Table scan on A  (cost=102.25 rows=1000) (actual time=0.069..0.537 rows=1000 loops=1)
                        -> Single-row index lookup on U using PRIMARY (id=A.user_id)  (cost=0.25 rows=1) (actual time=0.001..0.001 rows=1 loops=1000)
                    -> Filter: (sub.`number` >= 15)  (actual time=0.002..0.002 rows=1 loops=1000)
                        -> Index lookup on sub using <auto_key1> (state=A.state)  (actual time=0.001..0.001 rows=1 loops=1000)
                            -> Materialize  (actual time=0.001..0.002 rows=1 loops=1000)
                                -> Group aggregate: count(0)  (actual time=0.045..0.473 rows=49 loops=1)
                                    -> Index scan on Address using Address_state_index  (cost=102.25 rows=1000) (actual time=0.033..0.299 rows=1000 loops=1)
 |
+-------------------------------------------------------------------------------------------
1 row in set (0.00 sec)
---------------------------+
| id | select_type | table      | partitions | type   | possible_keys                          | key                 | key_len | ref              | rows | filtered | Extra                                        |
+----+-------------+------------+------------+--------+----------------------------------------+---------------------+---------+------------------+------+----------+----------------------------------------------+
|  2 | DERIVED     | Address    | NULL       | index  | Address_state_index                    | Address_state_index | 194     | NULL             | 1000 |   100.00 | Using index                                  |
+----+-------------+------------+------------+--------+----------------------------------------+---------------------+---------+------------------+------+----------+----------------------------------------------+
4 rows in set, 1 warning (0.00 sec)
```

The running time of group aggregation decrease from 0.975..0.983 to 0.045..0.473 and where condition decrease from 0.037..0.383 to 0.033..0.299.  The type of second step is changed to `index`. 

#### Index on Address.created_at

We want to optimze the ordering part. So we add index on `Address.created_at`.

```mysql
create index idx_created_at on Address(created_at);
```

Then we run `explain analyze` and `explain`. The output is

```mysql
| -> Limit: 15 row(s)  (actual time=5.148..5.151 rows=15 loops=1)
    -> Sort: <temporary>.number DESC, <temporary>.created_at, limit input to 15 row(s) per chunk  (actual time=5.147..5.148 rows=15 loops=1)
        -> Table scan on <temporary>  (actual time=0.000..0.002 rows=15 loops=1)
            -> Temporary table with deduplication  (actual time=5.127..5.130 rows=15 loops=1)
                -> Nested loop inner join  (actual time=1.001..4.499 rows=684 loops=1)
                    -> Nested loop inner join  (cost=452.25 rows=1000) (actual time=0.059..1.989 rows=1000 loops=1)
                        -> Table scan on A  (cost=102.25 rows=1000) (actual time=0.044..0.460 rows=1000 loops=1)
                        -> Single-row index lookup on U using PRIMARY (id=A.user_id)  (cost=0.25 rows=1) (actual time=0.001..0.001 rows=1 loops=1000)
                    -> Filter: (sub.`number` >= 15)  (actual time=0.002..0.002 rows=1 loops=1000)
                        -> Index lookup on sub using <auto_key1> (state=A.state)  (actual time=0.001..0.001 rows=1 loops=1000)
                            -> Materialize  (actual time=0.002..0.002 rows=1 loops=1000)
                                -> Table scan on <temporary>  (actual time=0.001..0.004 rows=49 loops=1)
                                    -> Aggregate using temporary table  (actual time=0.897..0.906 rows=49 loops=1)
                                        -> Table scan on Address  (cost=102.25 rows=1000) (actual time=0.031..0.393 rows=1000 loops=1)
 |
+------------------------------------------------------------------------------------------
1 row in set (0.01 sec)
+----+-------------+------------+------------+--------+---------------+-------------+---------+------------------+------+----------+---------------------------------+
| id | select_type | table      | partitions | type   | possible_keys | key         | key_len | ref              | rows | filtered | Extra                           |
+----+-------------+------------+------------+--------+---------------+-------------+---------+------------------+------+----------+---------------------------------+
|  1 | PRIMARY     | A          | NULL       | ALL    | NULL          | NULL        | NULL    | NULL             | 1000 |   100.00 | Using temporary; Using filesort |
|  1 | PRIMARY     | U          | NULL       | eq_ref | PRIMARY       | PRIMARY     | 4       | to_buy.A.user_id |    1 |   100.00 | Using index                     |
|  1 | PRIMARY     | <derived2> | NULL       | ref    | <auto_key1>   | <auto_key1> | 194     | to_buy.A.state   |   10 |    33.33 | Using where                     |
|  2 | DERIVED     | Address    | NULL       | ALL    | NULL          | NULL        | NULL    | NULL             | 1000 |   100.00 | Using temporary                 |
+----+-------------+------------+------------+--------+---------------+-------------+---------+------------------+------+----------+---------------------------------+
4 rows in set, 1 warning (0.00 sec)
```

The running time of ordering part decrese from 5.973..5.974 to 5.147..5.148. 

### Second query

The second query is the following:

```mysql
select G.id,G.name, G.brand, G.price
from Goods G left join (select max(sales) as best_good_sale, count(*) as number, brand
                        from Goods
                        where sales >=300
                        group by brand) as sub1 using (brand)
where G.price<=10.00 and sub1.number>=5 and sales=best_good_sale
order by G.sales desc
limit 15;
```

we want to try to build index on attributes 'price' and 'sales' of the Goods table, for 'price', we use it as a filtering condition in the where clause, for 'sales', we use it as a filtering condition in both the where clause and in the subquery, what's more, it's also used as ordering condition.  

#### No index

when there is no index, the output of explain analyze is

| EXPLAIN |
| :--- |
| -&gt; Limit: 15 row\(s\)  \(actual time=3.260..3.358 rows=15 loops=1\)<br/>    -&gt; Nested loop inner join  \(actual time=3.260..3.356 rows=15 loops=1\)<br/>        -&gt; Sort: G.sales DESC  \(cost=107.40 rows=1034\) \(actual time=1.816..1.827 rows=56 loops=1\)<br/>            -&gt; Filter: \(G.price &lt;= 10.00\)  \(actual time=0.420..1.422 rows=794 loops=1\)<br/>                -&gt; Table scan on G  \(actual time=0.411..1.260 rows=1034 loops=1\)<br/>        -&gt; Filter: \(sub1.\`number\` &gt;= 5\)  \(actual time=0.027..0.027 rows=0 loops=56\)<br/>            -&gt; Index lookup on sub1 using &lt;auto\_key1&gt; \(best\_good\_sale=G.sales, brand=G.brand\)  \(actual time=0.001..0.001 rows=1 loops=56\)<br/>                -&gt; Materialize  \(actual time=0.027..0.027 rows=1 loops=56\)<br/>                    -&gt; Table scan on &lt;temporary&gt;  \(actual time=0.000..0.022 rows=255 loops=1\)<br/>                        -&gt; Aggregate using temporary table  \(actual time=1.195..1.238 rows=255 loops=1\)<br/>                            -&gt; Filter: \(Goods.sales &gt;= 300\)  \(cost=107.40 rows=345\) \(actual time=0.119..0.540 rows=724 loops=1\)<br/>                                -&gt; Table scan on Goods  \(cost=107.40 rows=1034\) \(actual time=0.117..0.434 rows=1034 loops=1\)<br/> |


#### Index on price

We first test the result of creating an index on price

```mysql
CREATE INDEX idx_price ON Goods(price);
```

Then we run `explain  analyze`. The output is


| EXPLAIN |
| :--- |
| -&gt; Limit: 15 row\(s\)  \(actual time=1.980..2.064 rows=15 loops=1\)<br/>    -&gt; Nested loop inner join  \(actual time=1.980..2.062 rows=15 loops=1\)<br/>        -&gt; Sort: G.sales DESC  \(cost=107.40 rows=1034\) \(actual time=0.887..0.897 rows=56 loops=1\)<br/>            -&gt; Filter: \(G.price &lt;= 10.00\)  \(actual time=0.040..0.633 rows=794 loops=1\)<br/>                -&gt; Table scan on G  \(actual time=0.039..0.485 rows=1034 loops=1\)<br/>        -&gt; Filter: \(sub1.\`number\` &gt;= 5\)  \(actual time=0.020..0.021 rows=0 loops=56\)<br/>            -&gt; Index lookup on sub1 using &lt;auto\_key1&gt; \(best\_good\_sale=G.sales, brand=G.brand\)  \(actual time=0.001..0.001 rows=1 loops=56\)<br/>                -&gt; Materialize  \(actual time=0.020..0.020 rows=1 loops=56\)<br/>                    -&gt; Table scan on &lt;temporary&gt;  \(actual time=0.000..0.024 rows=255 loops=1\)<br/>                        -&gt; Aggregate using temporary table  \(actual time=0.894..0.940 rows=255 loops=1\)<br/>                            -&gt; Filter: \(Goods.sales &gt;= 300\)  \(cost=107.40 rows=345\) \(actual time=0.022..0.449 rows=724 loops=1\)<br/>                                -&gt; Table scan on Goods  \(cost=107.40 rows=1034\) \(actual time=0.021..0.347 rows=1034 loops=1\)<br/> |



As we can see from the result above, the filtering of price is much efficient than when there's no index on price, the actual time goes from 0.411..1.260 to  0.012..0.016, the overall actual time go from 3.260..3.358 down to 1.980..2.064.

#### Index on sales
Then we drop the index on price and test the result of creating an index on sales

```mysql
CREATE INDEX idx_sales ON Goods(sales);
```

The result of `explain analyze` is as follow:


| EXPLAIN |
| :--- |
| -&gt; Limit: 15 row\(s\)  \(actual time=1.357..1.361 rows=15 loops=1\)<br/>    -&gt; Sort: &lt;temporary&gt;.sales DESC, limit input to 15 row\(s\) per chunk  \(actual time=1.357..1.359 rows=15 loops=1\)<br/>        -&gt; Stream results  \(actual time=1.042..1.335 rows=30 loops=1\)<br/>            -&gt; Nested loop inner join  \(actual time=1.040..1.324 rows=30 loops=1\)<br/>                -&gt; Filter: \(\(sub1.\`number\` &gt;= 5\) and \(sub1.best\_good\_sale is not null\)\)  \(actual time=1.014..1.077 rows=42 loops=1\)<br/>                    -&gt; Table scan on sub1  \(actual time=0.001..0.021 rows=255 loops=1\)<br/>                        -&gt; Materialize  \(actual time=1.011..1.052 rows=255 loops=1\)<br/>                            -&gt; Table scan on &lt;temporary&gt;  \(actual time=0.000..0.027 rows=255 loops=1\)<br/>                                -&gt; Aggregate using temporary table  \(actual time=0.878..0.929 rows=255 loops=1\)<br/>                                    -&gt; Filter: \(Goods.sales &gt;= 300\)  \(cost=107.40 rows=724\) \(actual time=0.036..0.459 rows=724 loops=1\)<br/>                                        -&gt; Table scan on Goods  \(cost=107.40 rows=1034\) \(actual time=0.035..0.363 rows=1034 loops=1\)<br/>                -&gt; Filter: \(\(G.brand = sub1.brand\) and \(G.price &lt;= 10.00\)\)  \(cost=0.51 rows=0\) \(actual time=0.005..0.006 rows=1 loops=42\)<br/>                    -&gt; Index lookup on G using idx\_sales \(sales=sub1.best\_good\_sale\)  \(cost=0.51 rows=2\) \(actual time=0.004..0.005 rows=3 loops=42\)<br/> |


As we can see from the result above, the sorting on sales is performed on less rows than when there is no index, the actual time of filtering of `sales > 300`  goes from 0.119..0.540 to 0.036..0.459. The overall run time also goes from 3.260..3.358 to 1.357..1.361.

#### Index on brand
```mysql
CREATE INDEX idx_brand ON Goods(brand);
```

| EXPLAIN |
| :--- |
| -&gt; Limit: 15 row\(s\)  \(actual time=4.213..4.216 rows=15 loops=1\)<br/>    -&gt; Sort: &lt;temporary&gt;.sales DESC, limit input to 15 row\(s\) per chunk  \(actual time=4.212..4.214 rows=15 loops=1\)<br/>        -&gt; Stream results  \(actual time=3.360..4.107 rows=30 loops=1\)<br/>            -&gt; Nested loop inner join  \(actual time=3.358..4.094 rows=30 loops=1\)<br/>                -&gt; Filter: \(\(sub1.\`number\` &gt;= 5\) and \(sub1.brand is not null\)\)  \(actual time=3.331..3.396 rows=42 loops=1\)<br/>                    -&gt; Table scan on sub1  \(actual time=0.002..0.026 rows=255 loops=1\)<br/>                        -&gt; Materialize  \(actual time=3.325..3.369 rows=255 loops=1\)<br/>                            -&gt; Group aggregate: max\(Goods.sales\), count\(0\)  \(actual time=0.377..3.247 rows=255 loops=1\)<br/>                                -&gt; Filter: \(Goods.sales &gt;= 300\)  \(cost=107.40 rows=345\) \(actual time=0.363..2.876 rows=724 loops=1\)<br/>                                    -&gt; Index scan on Goods using idx\_brand  \(cost=107.40 rows=1034\) \(actual time=0.361..2.755 rows=1034 loops=1\)<br/>                -&gt; Filter: \(\(G.sales = sub1.best\_good\_sale\) and \(G.price &lt;= 10.00\)\)  \(cost=0.86 rows=0\) \(actual time=0.012..0.016 rows=1 loops=42\)<br/>                    -&gt; Index lookup on G using idx\_brand \(brand=sub1.brand\)  \(cost=0.86 rows=3\) \(actual time=0.006..0.015 rows=12 loops=42\)<br/> |

For indexing on brand, it strange because the overall actual time goes higher, from 3.260..3.358 to 4.213..4.216, the running mechanisms for the same sql also differ, there's an "Index scan on Goods using idx_brand" if we add the idx_brand.


