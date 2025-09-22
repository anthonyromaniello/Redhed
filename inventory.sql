CREATE TYPE merchandise AS OBJECT (
    merch_id NUMBER,
    name VARCHAR2(100),
    type VARCHAR2(255),
    price NUMBER(10, 2),
    size VARCHAR2(10)
);

CREATE TABLE inventory OF merchandise (
    PRIMARY KEY (merch_id)
);

CREATE TYPE customer AS OBJECT (
    customer_id NUMBER,
    name VARCHAR2(100),
    email VARCHAR2(100),
    phone VARCHAR2(15)
);
CREATE TABLE customers OF customer (
    PRIMARY KEY (customer_id)
);
CREATE TYPE orders AS OBJECT (
    customer_id NUMBER,
    merch_id NUMBER,
    order_date DATE,
    total_amount NUMBER(10, 2)
);
CREATE TABLE orders OF orders (
    PRIMARY KEY (customer_id, merch_id)
);