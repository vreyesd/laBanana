class Exchange {
    constructor() {
        this.book = {bid: [], ask: []}
        this.transactions = []
    }


    buy(id, value, size) {
        let buyed = 0
        const orders = [id]

        for(let i = 0; i < this.book.ask.length && buyed < size; i++) {
            const ask = this.book.ask[i]
            
            if(ask.price > value/size) break
            if(ask.executed) continue 

            const remaining = size - buyed
            const pre_executed = ask.remaining - remaining 
            orders.push(ask.id)


            if(pre_executed > 0) {
                //completa la orden nueva e incompleta del libro
                buyed += remaining
                this.book.ask[i].remaining -= remaining


            } else if(pre_executed === 0) {
                // completa las 2
                buyed += remaining
                this.book.ask[i].remaining -= remaining
                this.book.ask[i].executed = true


            } else { 
                //completa la orden del libro e incompleta la nueva
                buyed += this.book.ask[i].remaining
                this.book.ask[i].remaining = 0
                this.book.ask[i].executed = true
            }
        }
        this.transactions.push({orders})

        return buyed
    }


    
    sell(id, value, size) {
        let selled = 0
        const orders = [id]

        for(let i=0; i < this.book.bid.length && selled < size; i++) {
            const bid = this.book.bid[i]

            if(bid.price < value/size) break
            if(bid.executed) continue

            const remaining = size - selled
            const pre_executed = bid.remaining - remaining
            orders.push(bid.id)

            if(pre_executed > 0) {
                selled += remaining
                this.book.bid[i].remaining -= remaining


            } else if (pre_executed === 0) {
                selled += remaining
                this.book.bid[i].remaining -= remaining
                this.book.bid[i].executed = true


            } else {
                selled += this.book.bid[i].remaining
                this.book.bid[i].remaining = 0
                this.book.bid[i].executed = true
            }
        }

        if(orders.length > 1) this.transactions.push({orders})

        return selled
    }



    newOrder({id, user, type, size, value}) {
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

        if(!id 
            || !user 
            || !type || ['bid', 'ask'].indexOf(type) < 0
            || !size || size < 0 
            || !value || value < 0
        ) 
            throw new Error(`invalid order ${JSON.stringify(order)}`)
        
        
 
        if (type === 'bid') {
            const bids = this.book.bid

            if(this.book.ask.find(a => !a.executed && order.price >= a.price)) {
                const executed = this.buy(order.id, value, size)
                order.remaining -= executed

                if(order.remaining === 0) order.executed = true
            } 
            

            if(bids.length) {
                let inserted = false

                for(let i=0; i<bids.length && !inserted; i++) {
                    const bid = bids[i]
                    
                    if(order.price > bid.price) {
                        this.book.bid.splice(i, 0, order)
                        inserted = true
                    }
                }
                if(!inserted) this.book.bid.push(order)
            } else {   
                this.book.bid.push(order)
            }
        }


        if(order.type === 'ask') {
            const asks = this.book.ask

            if(this.book.bid.find(b => !b.executed && order.price >= b.price)) {
                const executed = this.sell(id, value, size)
                order.remaining -= executed

                if(order.remaining === 0) order.executed = true
            }

            if(asks.length) {
                let inserted = 0

                for(let i=0; i<asks.length && !inserted; i++) {
                    const ask = asks[i]
                    
                    if(order.price < ask.price) {
                        this.book.ask.splice(i,0,order)
                        inserted = true
                    }
                }

                if(!inserted) this.book.ask.push(order)
            } else {
                this.book.ask.push(order)
            }
        }
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


    transactionsToPrint() {
        return this.transactions.map(t => {return {orders: t.orders.sort()}})
    }
}

module.exports = Exchange