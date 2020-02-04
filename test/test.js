const Exchange = require('../exchange')
const should = require('should')

describe('Init Exchange', () => {

    beforeEach(() => {
        this.exchange = new Exchange()
    })

    it('should trigger invalid order error', () => {
        should(() => this.exchange.setNewOrder({user: "juan", type: "ask", size: 2.0, value: 1})).throw()
        should(() => this.exchange.setNewOrder({id:1, type: "ask", size: 2.0, value: 1})).throw()
        should(() => this.exchange.setNewOrder({id:1, user: "juan", size: 2.0, value: 1})).throw()
        should(() => this.exchange.setNewOrder({id:1, user: "juan", type: "ask", value: 1})).throw()
        should(() => this.exchange.setNewOrder({id:1, user: "juan", type: "ask", size: 2.0})).throw()
        should(() => this.exchange.setNewOrder({id:1, user: "juan", type: "ask", size: 0, value: 1})).throw()
        should(() => this.exchange.setNewOrder({id:1, user: "juan", type: "ask", size: 2.0, value: 0})).throw()
    })
    
    it('should insert ask order on empty book', () => {
        this.exchange.setNewOrder({id: 1, user: "juan", type: "ask", size: 2.0, value: 1.0})
        
        this.exchange.book.ask.length.should.be.equal(1)
        
        this.exchange.book.ask.head.should.have.property("id").which.is.a.Number().be.equal(1)
        this.exchange.book.ask.head.should.have.property("user").which.is.a.String().be.equal("juan")
        this.exchange.book.ask.head.should.have.property("type").which.is.a.String().be.equal("ask")
        this.exchange.book.ask.head.should.have.property("size").which.is.a.Number().be.equal(2.0)
        this.exchange.book.ask.head.should.have.property("value").which.is.a.Number().be.equal(1.0)
        this.exchange.book.ask.head.should.have.property("price").which.is.a.Number().be.equal(0.5)
        this.exchange.book.ask.head.remainingAmount.should.be.a.Number().be.equal(2.0)
        this.exchange.book.ask.head.isExecuted.should.be.a.Boolean().be.equal(false)
    })



    it('should insert 3 ask sorted orders ', () => {
        this.exchange.setNewOrder({id: 1, user: "diego", type: "ask", size: 2.0, value: 0.5})
        this.exchange.setNewOrder({id: 2, user: "diego", type: "ask", size: 2.0, value: 0.4})
        this.exchange.setNewOrder({id: 3, user: "diego", type: "ask", size: 2.0, value: 0.6})
        
        this.exchange.book.ask.length.should.be.equal(3)
        const firstAsk = this.exchange.book.ask.head
        const secondtAsk = firstAsk.next
        const thirdAsk = secondtAsk.next
        
        firstAsk.should.have.property("id").which.is.a.Number().be.equal(2)
        firstAsk.should.have.property("user").which.is.a.String().be.equal("diego")
        firstAsk.should.have.property("type").which.is.a.String().be.equal("ask")
        firstAsk.should.have.property("size").which.is.a.Number().be.equal(2.0)
        firstAsk.should.have.property("value").which.is.a.Number().be.equal(0.4)
        firstAsk.should.have.property("price").which.is.a.Number().be.equal(0.2)
        firstAsk.isExecuted.should.be.a.Boolean().be.equal(false)
        firstAsk.remainingAmount.should.be.a.Number().be.equal(2.0)
        secondtAsk.should.have.property("id").which.is.a.Number().be.equal(1)
        secondtAsk.should.have.property("user").which.is.a.String().be.equal("diego")
        secondtAsk.should.have.property("type").which.is.a.String().be.equal("ask")
        secondtAsk.should.have.property("size").which.is.a.Number().be.equal(2.0)
        secondtAsk.should.have.property("value").which.is.a.Number().be.equal(0.5)
        secondtAsk.should.have.property("price").which.is.a.Number().be.equal(0.25)
        secondtAsk.isExecuted.should.be.a.Boolean().be.equal(false)
        secondtAsk.remainingAmount.should.be.a.Number().be.equal(2.0)
        thirdAsk.should.have.property("id").which.is.a.Number().be.equal(3)
        thirdAsk.should.have.property("user").which.is.a.String().be.equal("diego")
        thirdAsk.should.have.property("type").which.is.a.String().be.equal("ask")
        thirdAsk.should.have.property("size").which.is.a.Number().be.equal(2.0)
        thirdAsk.should.have.property("value").which.is.a.Number().be.equal(0.6)
        thirdAsk.should.have.property("price").which.is.a.Number().be.equal(0.3)
        thirdAsk.isExecuted.should.be.a.Boolean().be.equal(false)
        thirdAsk.remainingAmount.should.be.a.Number().be.equal(2.0)
    })



    it('should insert bid order on empty book', () => {
        this.exchange.setNewOrder({id: 1, user: "diego", type: "bid", size: 2.0, value: 0.5})
        
        this.exchange.book.bid.length.should.be.equal(1)
        
        this.exchange.book.bid.head.should.have.property("id").which.is.a.Number().be.equal(1)
        this.exchange.book.bid.head.should.have.property("user").which.is.a.String().be.equal("diego")
        this.exchange.book.bid.head.should.have.property("type").which.is.a.String().be.equal("bid")
        this.exchange.book.bid.head.should.have.property("size").which.is.a.Number().be.equal(2.0)
        this.exchange.book.bid.head.should.have.property("value").which.is.a.Number().be.equal(0.5)
        this.exchange.book.bid.head.should.have.property("price").which.is.a.Number().be.equal(0.25)
        this.exchange.book.bid.head.remainingAmount.should.be.a.Number().be.equal(2.0)
        this.exchange.book.bid.head.isExecuted.should.be.a.Boolean().be.equal(false)
    })





    it('should insert 3 bid sorted orders ', () => {
        this.exchange.setNewOrder({id: 1, user: "diego", type: "bid", size: 2.0, value: 0.5})
        this.exchange.setNewOrder({id: 2, user: "diego", type: "bid", size: 2.0, value: 0.4})
        this.exchange.setNewOrder({id: 3, user: "diego", type: "bid", size: 2.0, value: 0.6})
        
        this.exchange.book.bid.length.should.be.equal(3)

        const firstBid = this.exchange.book.bid.head
        const secondtBid = firstBid.next
        const thirdBid = secondtBid.next
        
        firstBid.should.have.property("id").which.is.a.Number().be.equal(3)
        firstBid.should.have.property("user").which.is.a.String().be.equal("diego")
        firstBid.should.have.property("type").which.is.a.String().be.equal("bid")
        firstBid.should.have.property("size").which.is.a.Number().be.equal(2.0)
        firstBid.should.have.property("value").which.is.a.Number().be.equal(0.6)
        firstBid.should.have.property("price").which.is.a.Number().be.equal(0.3)
        firstBid.isExecuted.should.be.a.Boolean().be.equal(false)
        firstBid.remainingAmount.should.be.a.Number().be.equal(2.0)
        
        secondtBid.should.have.property("id").which.is.a.Number().be.equal(1)
        secondtBid.should.have.property("user").which.is.a.String().be.equal("diego")
        secondtBid.should.have.property("type").which.is.a.String().be.equal("bid")
        secondtBid.should.have.property("size").which.is.a.Number().be.equal(2.0)
        secondtBid.should.have.property("value").which.is.a.Number().be.equal(0.5)
        secondtBid.should.have.property("price").which.is.a.Number().be.equal(0.25)
        secondtBid.isExecuted.should.be.a.Boolean().be.equal(false)
        secondtBid.remainingAmount.should.be.a.Number().be.equal(2.0)
        
        thirdBid.should.have.property("id").which.is.a.Number().be.equal(2)
        thirdBid.should.have.property("user").which.is.a.String().be.equal("diego")
        thirdBid.should.have.property("type").which.is.a.String().be.equal("bid")
        thirdBid.should.have.property("size").which.is.a.Number().be.equal(2.0)
        thirdBid.should.have.property("value").which.is.a.Number().be.equal(0.4)
        thirdBid.should.have.property("price").which.is.a.Number().be.equal(0.2)
        thirdBid.isExecuted.should.be.a.Boolean().be.equal(false)
        thirdBid.remainingAmount.should.be.a.Number().be.equal(2.0)
    })
})





describe('Executing orders', () => {

    beforeEach(() => {
        this.exchange = new Exchange()
    })

    it('should execute partial bid order with full ask order', () => {
        this.exchange.setNewOrder({id:1, user: "juan", type: "ask", size: 2.0, value: 1.0})
        this.exchange.setNewOrder({id:2, user: "pedro", type: "bid", size: 3.0, value: 3.0})
        

        this.exchange.book.ask.length.should.be.equal(1)        
        const askOrder = this.exchange.book.ask.head
        
        askOrder.should.have.property("id").which.is.a.Number().be.equal(1)
        askOrder.should.have.property("user").which.is.a.String().be.equal("juan")
        askOrder.should.have.property("type").which.is.a.String().be.equal("ask")
        askOrder.should.have.property("size").which.is.a.Number().be.equal(2.0)
        askOrder.should.have.property("value").which.is.a.Number().be.equal(1.0)
        askOrder.should.have.property("price").which.is.a.Number().be.equal(0.5)
        askOrder.isExecuted.should.be.a.Boolean().be.equal(true)
        askOrder.remainingAmount.should.be.a.Number().be.equal(0)
        
        
        this.exchange.book.bid.length.should.be.equal(1)
        const bidOrder = this.exchange.book.bid.head
        
        bidOrder.should.have.property("id").which.is.a.Number().be.equal(2)
        bidOrder.should.have.property("user").which.is.a.String().be.equal("pedro")
        bidOrder.should.have.property("type").which.is.a.String().be.equal("bid")
        bidOrder.should.have.property("size").which.is.a.Number().be.equal(3.0)
        bidOrder.should.have.property("value").which.is.a.Number().be.equal(3.0)
        bidOrder.should.have.property("price").which.is.a.Number().be.equal(1.0)
        bidOrder.isExecuted.should.be.a.Boolean().be.equal(false)
        bidOrder.remainingAmount.should.be.a.Number().be.equal(1)
        
        this.exchange.transactions.length.should.be.equal(1)
        this.exchange.transactions[0].should.have.property("orders").which.is.a.Object().be.eql([1, 2])
    })


    it('should execute full bid order with 3 ask orders', () => {
        this.exchange.setNewOrder({id:1, user: "juan", type: "ask", size: 2.0, value: 1.0})
        this.exchange.setNewOrder({id:2, user: "diego", type: "ask", size: 2.0, value: 1.2})
        this.exchange.setNewOrder({id:3, user: "emilio", type: "ask", size: 2.0, value: 1.4})
        this.exchange.setNewOrder({id:4, user: "pedro", type: "bid", size: 6.0, value: 6.0})
        

        this.exchange.book.ask.length.should.be.equal(3)
        const firstAsk = this.exchange.book.ask.head
        const secondAsk = firstAsk.next
        const thirdAsk = secondAsk.next
        
        firstAsk.should.have.property("id").which.is.a.Number().be.equal(1)
        firstAsk.should.have.property("user").which.is.a.String().be.equal("juan")
        firstAsk.should.have.property("type").which.is.a.String().be.equal("ask")
        firstAsk.should.have.property("size").which.is.a.Number().be.equal(2.0)
        firstAsk.should.have.property("value").which.is.a.Number().be.equal(1.0)
        firstAsk.should.have.property("price").which.is.a.Number().be.equal(0.5)
        firstAsk.isExecuted.should.be.a.Boolean().be.equal(true)
        firstAsk.remainingAmount.should.be.a.Number().be.equal(0)
        
        secondAsk.should.have.property("id").which.is.a.Number().be.equal(2)
        secondAsk.should.have.property("user").which.is.a.String().be.equal("diego")
        secondAsk.should.have.property("type").which.is.a.String().be.equal("ask")
        secondAsk.should.have.property("size").which.is.a.Number().be.equal(2.0)
        secondAsk.should.have.property("value").which.is.a.Number().be.equal(1.2)
        secondAsk.should.have.property("price").which.is.a.Number().be.equal(0.6)
        secondAsk.isExecuted.should.be.a.Boolean().be.equal(true)
        secondAsk.remainingAmount.should.be.a.Number().be.equal(0)
        
        thirdAsk.should.have.property("id").which.is.a.Number().be.equal(3)
        thirdAsk.should.have.property("user").which.is.a.String().be.equal("emilio")
        thirdAsk.should.have.property("type").which.is.a.String().be.equal("ask")
        thirdAsk.should.have.property("size").which.is.a.Number().be.equal(2.0)
        thirdAsk.should.have.property("value").which.is.a.Number().be.equal(1.4)
        thirdAsk.should.have.property("price").which.is.a.Number().be.equal(0.7)
        thirdAsk.isExecuted.should.be.a.Boolean().be.equal(true)
        thirdAsk.remainingAmount.should.be.a.Number().be.equal(0)
        

        this.exchange.book.bid.length.should.be.equal(1)
        const bidOrder = this.exchange.book.bid.head
        
        bidOrder.should.have.property("id").which.is.a.Number().be.equal(4)
        bidOrder.should.have.property("user").which.is.a.String().be.equal("pedro")
        bidOrder.should.have.property("type").which.is.a.String().be.equal("bid")
        bidOrder.should.have.property("size").which.is.a.Number().be.equal(6.0)
        bidOrder.should.have.property("value").which.is.a.Number().be.equal(6.0)
        bidOrder.should.have.property("price").which.is.a.Number().be.equal(1.0)
        bidOrder.isExecuted.should.be.a.Boolean().be.equal(true)
        bidOrder.remainingAmount.should.be.a.Number().be.equal(0)

        this.exchange.transactions.length.should.be.equal(1)
        this.exchange.transactions[0].should.have.property("orders").which.is.a.Object().be.eql([1, 2, 3, 4])
    })



    it('should execute partial ask order with full bid order', () => {
        this.exchange.setNewOrder({id:1, user: "juan", type: "bid", size: 2.0, value: 4.0})
        this.exchange.setNewOrder({id:2, user: "pedro", type: "ask", size: 3.0, value: 3.0})

        this.exchange.book.bid.length.should.be.equal(1)
        const bidOrder = this.exchange.book.bid.head

        bidOrder.should.have.property("id").which.is.a.Number().be.equal(1)
        bidOrder.should.have.property("user").which.is.a.String().be.equal("juan")
        bidOrder.should.have.property("type").which.is.a.String().be.equal("bid")
        bidOrder.should.have.property("size").which.is.a.Number().be.equal(2.0)
        bidOrder.should.have.property("value").which.is.a.Number().be.equal(4.0)
        bidOrder.should.have.property("price").which.is.a.Number().be.equal(2.0)
        bidOrder.isExecuted.should.be.a.Boolean().be.equal(true)
        bidOrder.remainingAmount.should.be.a.Number().be.equal(0)

        this.exchange.book.ask.length.should.be.equal(1)
        const askOrder = this.exchange.book.ask.head

        askOrder.should.have.property("id").which.is.a.Number().be.equal(2)
        askOrder.should.have.property("user").which.is.a.String().be.equal("pedro")
        askOrder.should.have.property("type").which.is.a.String().be.equal("ask")
        askOrder.should.have.property("size").which.is.a.Number().be.equal(3.0)
        askOrder.should.have.property("value").which.is.a.Number().be.equal(3.0)
        askOrder.should.have.property("price").which.is.a.Number().be.equal(1.0)
        askOrder.isExecuted.should.be.a.Boolean().be.equal(false)
        askOrder.remainingAmount.should.be.a.Number().be.equal(1.0)
    })



    it('should execute full ask order with 3 bid orders', () => {
        this.exchange.setNewOrder({id:1, user: "juan", type: "bid", size: 2.0, value: 2.0})
        this.exchange.setNewOrder({id:2, user: "diego", type: "bid", size: 3.0, value: 3.0})
        this.exchange.setNewOrder({id:3, user: "luis", type: "bid", size: 1.0, value: 1.0})
        this.exchange.setNewOrder({id:4, user: "pedro", type: "ask", size: 6.0, value: 3.0})


        this.exchange.book.bid.length.should.be.equal(3)
        const firstBid = this.exchange.book.bid.head
        const secondBid = firstBid.next
        const thirdBid = secondBid.next

        firstBid.should.have.property("id").which.is.a.Number().be.equal(1)
        firstBid.should.have.property("user").which.is.a.String().be.equal("juan")
        firstBid.should.have.property("type").which.is.a.String().be.equal("bid")
        firstBid.should.have.property("size").which.is.a.Number().be.equal(2.0)
        firstBid.should.have.property("value").which.is.a.Number().be.equal(2.0)
        firstBid.should.have.property("price").which.is.a.Number().be.equal(1)
        firstBid.isExecuted.should.be.a.Boolean().be.equal(true)
        firstBid.remainingAmount.should.be.a.Number().be.equal(0)
        
        secondBid.should.have.property("id").which.is.a.Number().be.equal(2)
        secondBid.should.have.property("user").which.is.a.String().be.equal("diego")
        secondBid.should.have.property("type").which.is.a.String().be.equal("bid")
        secondBid.should.have.property("size").which.is.a.Number().be.equal(3.0)
        secondBid.should.have.property("value").which.is.a.Number().be.equal(3.0)
        secondBid.should.have.property("price").which.is.a.Number().be.equal(1)
        secondBid.isExecuted.should.be.a.Boolean().be.equal(true)
        secondBid.remainingAmount.should.be.a.Number().be.equal(0)
       
        thirdBid.should.have.property("id").which.is.a.Number().be.equal(3)
        thirdBid.should.have.property("user").which.is.a.String().be.equal("luis")
        thirdBid.should.have.property("type").which.is.a.String().be.equal("bid")
        thirdBid.should.have.property("size").which.is.a.Number().be.equal(1.0)
        thirdBid.should.have.property("value").which.is.a.Number().be.equal(1.0)
        thirdBid.should.have.property("price").which.is.a.Number().be.equal(1)
        thirdBid.isExecuted.should.be.a.Boolean().be.equal(true)
        thirdBid.remainingAmount.should.be.a.Number().be.equal(0)


        this.exchange.book.ask.length.should.be.equal(1)
        const askOrder = this.exchange.book.ask.head

        askOrder.should.have.property("id").which.is.a.Number().be.equal(4)
        askOrder.should.have.property("user").which.is.a.String().be.equal("pedro")
        askOrder.should.have.property("type").which.is.a.String().be.equal("ask")
        askOrder.should.have.property("size").which.is.a.Number().be.equal(6.0)
        askOrder.should.have.property("value").which.is.a.Number().be.equal(3.0)
        askOrder.should.have.property("price").which.is.a.Number().be.equal(0.5)
        askOrder.isExecuted.should.be.a.Boolean().be.equal(true)
        askOrder.remainingAmount.should.be.a.Number().be.equal(0)
        
        this.exchange.transactions.length.should.be.equal(1)
        this.exchange.transactions[0].should.have.property("orders").which.is.a.Object().be.eql([1, 2, 3, 4])
    })
})
