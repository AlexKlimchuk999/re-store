import React from "react";
import BookList from "../book-list/book-list";
import ShoppingCartTable from "../shopping-cart-table/shopping-cart-table"

const Home  = () => {
    return (
        <div>
            <BookList />
            <ShoppingCartTable />
        </div>
    )
}
export default Home ;