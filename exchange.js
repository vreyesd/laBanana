class Order {
    constructor(id, user, type, size, value, executedAmount) {
        this.id = id
        this.user = user
        this.type = type
        this.size = size
        this.value = value
        this.price = value/size
        this.executedAmount = executedAmount

        this.next = null
        this.prev = null
    }

    get isExecuted() {
        return this.checkExecuted()
    }

    checkExecuted() {
        return this.executedAmount === this.size

    }

    get remainingAmount() {
        return this.calcRemainingAmount()
    }

    calcRemainingAmount() {
        return this.size - this.executedAmount
    }
}





class Book {
    constructor() {
        this.head = null
        this.tail = null
        this.length = 0
    }



    getNOrder(index) {
        let i = 0
        let order = this.head
        
        while(order) {
            if(i === index) return order
            i++
            order = order.next
        }

        return null
    }


    push({id, user, type, size, value, executedAmount}) {
        const order = new Order(id, user, type, size, value, executedAmount)

        if(!this.head) {
            this.head = order
            this.tail = order

        } else {
            order.prev = this.tail
            this.tail.next = order

            this.tail = order
        }
        this.length++
    }



    insertAtHead({id, user, type, size, value, executedAmount}) {
        const order = new Order(id, user, type, size, value, executedAmount)

        order.next = this.head

        this.head = order
        this.length++
    }

    

    insertAtIndex({id, user, type, size, value, executedAmount}, index) {
        if(!index) {
            this.insertAtHead({id, user, type, size, value, executedAmount})
            
        } else {
            const newOrder = new Order(id, user, type, size, value, executedAmount)

            const nOrder = this.getNOrder(index - 1)
            
            newOrder.next = nOrder.next
            nOrder.next = newOrder
            this.length++
        }

    }



    findBy(attr, value) {
        let order = this.head

        while(order) {
            if(order[attr] === value) {
                return order
            }
            order = order.next
        }

        return null
    }
}




class Exchange {

    constructor() {
        this.book = {bid: new Book(), ask: new Book}
        this.transactions = []
        this.executedOrders = []
    }



    executeOrder(id, type, value, size) {
        let executedAmount = 0
        const transactionsOrders = [id]
        const orderMatchWith = {ask: "bid", bid: "ask"}
        const bookToMatch = this.book[orderMatchWith[type]]

        let bookOrder = bookToMatch.head
        
        while(bookOrder && executedAmount < size) {

            if(bookOrder.isExecuted) {
                bookOrder = bookOrder.next
                continue
            }

            const newOrderPrice = value/size

            if(type === "ask" && bookOrder.price < newOrderPrice ||
               type === "bid" && bookOrder.price > newOrderPrice)
                break

            const newOrderRemaining = size - executedAmount
            const pre_executed = bookOrder.remainingAmount - newOrderRemaining
            transactionsOrders.push(bookOrder.id)

            if(pre_executed > 0) {
                executedAmount += newOrderRemaining
                //bookOrder.executedAmount += newOrderRemaining
                this.book[orderMatchWith[type]].findBy("id", bookOrder.id).executedAmount += newOrderRemaining

            } else if(pre_executed === 0) {
                executedAmount += newOrderRemaining
                //bookOrder.executedAmount += newOrderRemaining
                this.book[orderMatchWith[type]].findBy("id", bookOrder.id).executedAmount += newOrderRemaining

            
            } else {
                executedAmount += bookOrder.remainingAmount
                //bookOrder.executedAmount += bookOrder.remaining
                this.book[orderMatchWith[type]].findBy("id", bookOrder.id).executedAmount += bookOrder.remainingAmount

            }

            bookOrder = bookOrder.next
        }

        this.transactions.push({orders: transactionsOrders.sort()})
        return executedAmount
    }





    isValidOrder(id, user, type, size, value) {
        if(!id 
            || !user 
            || !type || ['bid', 'ask'].indexOf(type) < 0
            || !size || size < 0 
            || !value || value < 0
        ) 
            return false
        return true
    }





    canExecute(type, price) {
        if(type === "ask") {
            //const bidBook = this.book.bid.head
            const bidBook = this.book.bid.findBy("isExecuted", false)

            return bidBook && bidBook.price >= price
        }
        else if(type === "bid") {
            //const askBook = this.book.ask.head
            const askBook = this.book.ask.findBy("isExecuted", false)

            return askBook && askBook.price <= price
        }
    }





    insertOrderToBook({id, user, type, size, value, price, executedAmount}) {
        const newOrder = {id, user, type, size, value, price, executedAmount}
        const orderBook = this.book[type]

        if(!orderBook.length) {
            this.book[type].push(newOrder)
        } else {
            let bookOrder = orderBook.head
            let bookIndex = 0

            while(bookOrder) {
                if(newOrder.price === bookOrder.price) {

                    if(!bookOrder.next) {
                        orderBook.push(newOrder)
                        return
                    }

                    let samePriceOrder = bookOrder.next
                    let samePriceOrderIndex = bookIndex + 1

                    while(samePriceOrder) {
                        if(samePriceOrder.price !== newOrder.price) {
                            orderBook.insertAtIndex(newOrder, samePriceOrderIndex)
                            return
                        }
                        samePriceOrder = samePriceOrderIndex.next
                        samePriceOrderIndex++
                    }

                    
                } else if(newOrder.type === "bid" && newOrder.price > bookOrder.price) {
                    orderBook.insertAtIndex(newOrder, bookIndex)
                    return
                } else if(newOrder.type === "ask" && newOrder.price < bookOrder.price) {
                    orderBook.insertAtIndex(newOrder, bookIndex)
                    return
                }

                bookOrder = bookOrder.next
                bookIndex++
            } 

            this.book[type].push(newOrder)
        }
    }





    setNewOrder({id, user, type, size, value}) {
        let order = {
            id,
            user,
            type,
            size,
            value,
            price: value/size,
            executedAmount: 0
        }


        if(!this.isValidOrder(id, user, type, size, value))
            throw new Error()
        
            
        if(this.canExecute(type, order.price)) {
            const executed = this.executeOrder(order.id, type, value, size)
            order.executedAmount = executed
        }
            
        this.insertOrderToBook(order)
    }





    ordersToPrint(type) {
        const orders = []
        
        let order = this.book[type].head

        while(order) {
            orders.push({
                id: order.id,
                user: order.user,
                type: order.type,
                size: order.size,
                value: order.value,
                remaining: order.remainingAmount
            })
            order = order.next
        }

        return orders
    }
}

module.exports = Exchange