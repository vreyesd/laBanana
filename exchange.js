class Exchange {

    constructor() {
        this.book = {bid: [], ask: []}
        this.transactions = []
    }





    executeOrder(id, type, value, size) {
        let executedAmount = 0
        const transactionsOrders = [id]
        const orderMatchWith = {ask: "bid", bid: "ask"}
        const bookToMatch = orderMatchWith[type]

        for(let i = 0; i < this.book[bookToMatch].length && executedAmount < size; i++) {
            const bookOrder = this.book[bookToMatch][i]
            if(bookOrder.executed) continue
            

            const price = value/size
            if(type === "ask" && bookOrder.price < price ||
               type === "bid" && bookOrder.price > price)
                break
            

            const orderRemaining = size - executedAmount
            const pre_executed = bookOrder.remaining - orderRemaining
            transactionsOrders.push(bookOrder.id)

            if(pre_executed > 0) {
                executedAmount += orderRemaining
                this.book[bookToMatch][i].remaining -= orderRemaining

            } else if(pre_executed === 0) {
                executedAmount += orderRemaining
                this.book[bookToMatch][i].remaining = 0
                this.book[bookToMatch][i].executed = true
            
            } else {
                executedAmount += this.book[bookToMatch][i].remaining
                this.book[bookToMatch][i].remaining = 0
                this.book[bookToMatch][i].executed = true
            }    
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
            const bidBook = this.book.bid.filter(b => !b.executed)

            return bidBook.length && bidBook[0].price >= price
        }
        else if(type === "bid") {
            const askBook = this.book.ask.filter(b => !b.executed)

            return askBook.length && askBook[0].price <= price
        }
    }





    insertOrderToBook({id, user, type, size, value, price, executed, remaining}) {
        const order = {id, user, type, size, value, price, executed, remaining}
        const orderBook = this.book[type]

        if(!orderBook.length) {
            this.book[type].push(order)
        } else {

            for(let i=0; i<orderBook.length; i++) {
                const bookOrder = orderBook[i]
                
                if(order.price === bookOrder.price) {
                    if(i+1 === orderBook.length) {
                        this.book[type].push(order)
                        return
                    }

                    for(let j=i+1; j<orderBook.length; j++) {
                        const samePriceOrder = orderBook[j]
                        if(order.price !== samePriceOrder.price) {
                            this.book[type].splice(j, 0, order)
                            return
                        }
                    }
                } else if(order.type === "bid" && order.price > bookOrder.price) {
                    this.book[type].splice(i, 0, order)
                    return
                } else if(order.type === "ask" && order.price < bookOrder.price) {
                    this.book[type].splice(i, 0, order)
                    return
                }
            }
            this.book[type].push(order)
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
            executed: false,
            remaining: size
        }


        if(!this.isValidOrder(id, user, type, size, value))
            throw new Error()
        
            
        if(this.canExecute(type, order.price)) {
            const executed = this.executeOrder(order.id, type, value, size)
            order.remaining -= executed
            
            if(order.remaining === 0) order.executed = true
        }
            
        this.insertOrderToBook(order)
    }





    ordersToPrint(type) {
        return this.book[type].map(e => {
            return {
                id: e.id,
                user: e.user,
                type,
                size: e.size,
                value: e.value,
                remaining: e.remaining
            }
        })
    }
}

module.exports = Exchange