
export default class BookstoreService {
    data= [{
        id:1,
        title: 'sussces',
        author: 'Trupm donald',
        price: 12,
        coverImage:"https://m.media-amazon.com/images/I/61tmNfB-wBL.jpg"
    },
    {
        id:2,
        title: 'alex',
        author: 'd.j martin',
        price: 42,
        coverImage: "https://cdnattic.atticbooks.co.ke/img/A972809.jpg"
    }];

    getBooks() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.data)
                // reject(new Error('shit happen'))
            }, 700)
        })
    }
}