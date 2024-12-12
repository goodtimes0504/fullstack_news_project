import Center from "@/views/center/Center.vue";
import Home from "@/views/home/Home.vue";
import NewsAdd from "@/views/news-manage/NewsAdd.vue";
import NewsList from "@/views/news-manage/NewsList.vue";
import ProductAdd from "@/views/product-manage/ProductAdd.vue";
import ProductList from "@/views/product-manage/ProductList.vue";
import UserAdd from "@/views/user-manage/UserAdd.vue";
import UserList from "@/views/user-manage/UserList.vue";
import NotFound from "@/views/notfound/NotFound.vue";

const routes = [
    {
        path: "/index",
        name: "index",
        component: Home,
    },
    {
        path: "/center",
        name: "center",
        component: Center,
    },
    {
        path: "/user-manage/adduser",
        name: "adduser",
        component: UserAdd,
    },
    {
        path: "/user-manage/userlist",
        name: "userlist",
        component: UserList,
    },
    {
        path: "/news-manage/addnews",
        name: "addnews",
        component: NewsAdd,
    },
    {
        path: "/news-manage/newslist",
        name: "newslist",
        component: NewsList,
    },
    {
        path: "/product-manage/addproduct",
        name: "addproduct",
        component: ProductAdd,
    },
    {
        path: "/product-manage/productlist",
        name: "productlist",
        component: ProductList,
    },
    {
        path: "/",
        redirect: "/index",
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: NotFound,
    },
];

export default routes;
