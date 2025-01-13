export enum ItemURL {
    LIST = "/item/list",
    CREATE = "/item/create",
    GET_ONE = "/item/",
    DELETE = "/item/delete/",
    SEARCH = "/item/search"
}

export enum AuthURL {
    LOGIN = "/auth/login",
    REGISTER = "/auth/register",
    LOGOUT = "/auth/logout",
    REFRESH = "/auth/refresh"
}

export enum BrandURL {
    LIST = "/brand/list",
    CHANGE = "/brand/change/",
    CREATE = "/brand/create",
    DELETE = "/brand/delete/"
}

export enum CategoryURL {
    LIST = "/category/list",
    CHANGE = "/category/change/",
    CREATE = "/category/create",
    DELETE = "/category/delete/"
}

export enum CartURL {
    CREATE = "/cart/add",
    GET = "/cart/",
    UPDATE = "/cart/update",
    DELETE = "/cart/delete"
}

export enum OrderURL {
    GET_USER_ORDERS = "order/user-list",
    GET_ALL_ORDERS = "order/list",
    CREATE = "order/create"
}

export enum UserURL {
    CHANGE_PERSONAL = "user/change-personal"
}

export enum CommentURL {
    ADD = "/comment/",
    DELETE = "/comment/"
}