import Login from "../page/login/Login/Login";
import Register from "../page/login/Register/Register";
import User from "../page/user";
import Order from "../page/user/Order";
import Cart from "../page/cart";
import CartList from "../page/cart/cartlist";
import CartConfirm from "../page/cart/confirm";
import CartSuccess from "../page/cart/success";
import Comment from "../page/user/Comment";
import UserCenter from "../page/user/Center";
import UserAddress from "../page/user/Address";
import UserInfo from "../page/user/UserInfo";
import ChangePwd from "../page/user/ChangePwd";
import Home from "../page/home/Home";
import OrderDetail from "../page/user/OrderDetail";
import Index from "../page/home";
import Category from "../page/home/Category";
import GoodsDetail from "../page/home/GoodsDetail";
import Search from "../page/search";
import Entrance from "../page/entrance";
import {Routes, Route, Navigate} from "react-router-dom"




export default function IndexRouter() {
    return (
        <Routes>
            <Route path={"/login"} element={<Login/>}/>
            <Route path={"/register"} element={<Register/>}/>
            <Route path={"/"} element={<Entrance/>}/>

            <Route path={"/user"} element={<User/>}>
                <Route path={"order"} element={<Order/>}/>
                <Route path={"comment"} element={<Comment/>}/>
                <Route path={"index"} element={<UserCenter/>}/>
                <Route path={"address"} element={<UserAddress/>}/>
                <Route path={"info"} element={<UserInfo/>}/>
                <Route path={"change_password"} element={<ChangePwd/>}/>
                <Route path={"order_detail"} element={<OrderDetail/>}/>
            </Route>

            <Route path={"/cart"} element={<Cart/>}>
                <Route path={"list"} element={<CartList/>}/>
                <Route path={"confirm"} element={<CartConfirm/>}/>
                <Route path={"success"} element={<CartSuccess/>}/>
            </Route>
            <Route path={"/"} element={<Index/>}>
                <Route path={"home"} element={<Home/>}/>
                <Route path={"goods"} element={<Category/>}/>
                <Route path={"goods_detail"} element={<GoodsDetail/>}/>
            </Route>
            <Route path={"/search"} element={<Search/>}/>
            <Route path={"*"} element={<Home/>}/>
        </Routes>
    );
}

// export const IndexRouter = [
//     {path: "/login", element: <Login/>},
//     {path: "/register", element: <Register/>},
//     {
//         path: "/user",
//         element: <User/>,
//         children: [
//             {path: "order", element: <Order/>},
//             {path: "comment", element: <Comment/>},
//             {path: "index", element: <UserCenter/>},
//             {path: "address", element: <UserAddress/>},
//             {path: "info", element: <UserInfo/>},
//             {path: "change_password", element: <ChangePwd/>},
//             {path: "order_detail", element: <OrderDetail/>},
//         ]
//     },
//     {
//         path: "/cart",
//         element: <Cart/>,
//         children: [
//             {path: "list", element: <CartList/>},
//             {path: "confirm", element: <CartConfirm/>},
//             {path: "success", element: <CartSuccess/>}
//         ]
//     },
//     {path: "/", element: <Entrance/>},
//     {
//         path: "/",
//         element: <Index/>,
//         children: [
//             {path:"home", element:<Home/>},
//             {path:"goods", element:<Category/>},
//             {path: "goods_detail", element: <GoodsDetail/>}
//         ]
//     },
//     {path: "/search", element: <Search/>},
//     {path: '*', element: <Navigate to={"/home"}/>}
// ]