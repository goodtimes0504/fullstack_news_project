import Center from "@/views/center/Center.vue";
import Home from "@/views/home/Home.vue";
import NewsAdd from "@/views/news-manage/NewsAdd.vue";
import NewsList from "@/views/news-manage/NewsList.vue";
import ProductAdd from "@/views/product-manage/ProductAdd.vue";
import ProductList from "@/views/product-manage/ProductList.vue";
import UserAdd from "@/views/user-manage/UserAdd.vue";
import UserList from "@/views/user-manage/UserList.vue";
import NotFound from "@/views/notfound/NotFound.vue";

//基础路由表，不需要权限
export const constantRoutes = [
    {
        path: "/",
        redirect: "/index",
    },
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
        path: "/:pathMatch(.*)*",
        name: "notFound",
        component: NotFound,
    },

];
// 权限路由表
export const authRoutes = [
    {
        path: "/user-manage/adduser",
        name: "adduser",
        component: UserAdd,
        requireAuth: true,
    },
    {
        path: "/user-manage/userlist",
        name: "userlist",
        component: UserList,
        requireAuth: true,
    }

]

//完全路由表 防止管理员刷新时出现没有 权限相关的页面的bug（因为光登录页面跳转加权限页面是不够的 一刷新就没了）
export const allRoutes = [{
    path: "/",
    redirect: "/index",
},
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
    path: "/:pathMatch(.*)*",
    name: "notFound",
    component: NotFound,
},
{
    path: "/user-manage/adduser",
    name: "adduser",
    component: UserAdd,
    requireAuth: true,
},
{
    path: "/user-manage/userlist",
    name: "userlist",
    component: UserList,
    requireAuth: true,
}
]
