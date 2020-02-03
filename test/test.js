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
        
        this.exchange.book.ask[0].should.have.property("id").which.is.a.Number().be.equal(1)
        this.exchange.book.ask[0].should.have.property("user").which.is.a.String().be.equal("juan")
        this.exchange.book.ask[0].should.have.property("type").which.is.a.String().be.equal("ask")
        this.exchange.book.ask[0].should.have.property("size").which.is.a.Number().be.equal(2.0)
        this.exchange.book.ask[0].should.have.property("value").which.is.a.Number().be.equal(1.0)
        this.exchange.book.ask[0].should.have.property("price").which.is.a.Number().be.equal(0.5)
        this.exchange.book.ask[0].should.have.property("executed").which.is.a.Boolean().be.equal(false)
        this.exchange.book.ask[0].should.have.property("remaining").which.is.a.Number().be.equal(2.0)
    })



    it('should insert 3 ask sorted orders ', () => {
        this.exchange.setNewOrder({id: 1, user: "diego", type: "ask", size: 2.0, value: 0.5})
        this.exchange.setNewOrder({id: 2, user: "diego", type: "ask", size: 2.0, value: 0.4})
        this.exchange.setNewOrder({id: 3, user: "diego", type: "ask", size: 2.0, value: 0.6})
        
        this.exchange.book.ask.length.should.be.equal(3)
        
        this.exchange.book.ask[0].should.have.property("id").which.is.a.Number().be.equal(2)
        this.exchange.book.ask[0].should.have.property("user").which.is.a.String().be.equal("diego")
        this.exchange.book.ask[0].should.have.property("type").which.is.a.String().be.equal("ask")
        this.exchange.book.ask[0].should.have.property("size").which.is.a.Number().be.equal(2.0)
        this.exchange.book.ask[0].should.have.property("value").which.is.a.Number().be.equal(0.4)
        this.exchange.book.ask[0].should.have.property("price").which.is.a.Number().be.equal(0.2)
        this.exchange.book.ask[0].should.have.property("executed").which.is.a.Boolean().be.equal(false)
        this.exchange.book.ask[0].should.have.property("remaining").which.is.a.Number().be.equal(2.0)
        this.exchange.book.ask[1].should.have.property("id").which.is.a.Number().be.equal(1)
        this.exchange.book.ask[1].should.have.property("user").which.is.a.String().be.equal("diego")
        this.exchange.book.ask[1].should.have.property("type").which.is.a.String().be.equal("ask")
        this.exchange.book.ask[1].should.have.property("size").which.is.a.Number().be.equal(2.0)
        this.exchange.book.ask[1].should.have.property("value").which.is.a.Number().be.equal(0.5)
        this.exchange.book.ask[1].should.have.property("price").which.is.a.Number().be.equal(0.25)
        this.exchange.book.ask[1].should.have.property("executed").which.is.a.Boolean().be.equal(false)
        this.exchange.book.ask[1].should.have.property("remaining").which.is.a.Number().be.equal(2.0)
        this.exchange.book.ask[2].should.have.property("id").which.is.a.Number().be.equal(3)
        this.exchange.book.ask[2].should.have.property("user").which.is.a.String().be.equal("diego")
        this.exchange.book.ask[2].should.have.property("type").which.is.a.String().be.equal("ask")
        this.exchange.book.ask[2].should.have.property("size").which.is.a.Number().be.equal(2.0)
        this.exchange.book.ask[2].should.have.property("value").which.is.a.Number().be.equal(0.6)
        this.exchange.book.ask[2].should.have.property("price").which.is.a.Number().be.equal(0.3)
        this.exchange.book.ask[2].should.have.property("executed").which.is.a.Boolean().be.equal(false)
        this.exchange.book.ask[2].should.have.property("remaining").which.is.a.Number().be.equal(2.0)
    })



    it('should insert bid order on empty book', () => {
        this.exchange.setNewOrder({id: 1, user: "diego", type: "bid", size: 2.0, value: 0.5})
        
        this.exchange.book.bid.length.should.be.equal(1)
        
        this.exchange.book.bid[0].should.have.property("id").which.is.a.Number().be.equal(1)
        this.exchange.book.bid[0].should.have.property("user").which.is.a.String().be.equal("diego")
        this.exchange.book.bid[0].should.have.property("type").which.is.a.String().be.equal("bid")
        this.exchange.book.bid[0].should.have.property("size").which.is.a.Number().be.equal(2.0)
        this.exchange.book.bid[0].should.have.property("value").which.is.a.Number().be.equal(0.5)
        this.exchange.book.bid[0].should.have.property("price").which.is.a.Number().be.equal(0.25)
        this.exchange.book.bid[0].should.have.property("executed").which.is.a.Boolean().be.equal(false)
        this.exchange.book.bid[0].should.have.property("remaining").which.is.a.Number().be.equal(2.0)
    })





    it('should insert 3 bid sorted orders ', () => {
        this.exchange.setNewOrder({id: 1, user: "diego", type: "bid", size: 2.0, value: 0.5})
        this.exchange.setNewOrder({id: 2, user: "diego", type: "bid", size: 2.0, value: 0.4})
        this.exchange.setNewOrder({id: 3, user: "diego", type: "bid", size: 2.0, value: 0.6})
        
        this.exchange.book.bid.length.should.be.equal(3)
        
        this.exchange.book.bid[0].should.have.property("id").which.is.a.Number().be.equal(3)
        this.exchange.book.bid[0].should.have.property("user").which.is.a.String().be.equal("diego")
        this.exchange.book.bid[0].should.have.property("type").which.is.a.String().be.equal("bid")
        this.exchange.book.bid[0].should.have.property("size").which.is.a.Number().be.equal(2.0)
        this.exchange.book.bid[0].should.have.property("value").which.is.a.Number().be.equal(0.6)
        this.exchange.book.bid[0].should.have.property("price").which.is.a.Number().be.equal(0.3)
        this.exchange.book.bid[0].should.have.property("executed").which.is.a.Boolean().be.equal(false)
        this.exchange.book.bid[0].should.have.property("remaining").which.is.a.Number().be.equal(2.0)
        
        this.exchange.book.bid[1].should.have.property("id").which.is.a.Number().be.equal(1)
        this.exchange.book.bid[1].should.have.property("user").which.is.a.String().be.equal("diego")
        this.exchange.book.bid[1].should.have.property("type").which.is.a.String().be.equal("bid")
        this.exchange.book.bid[1].should.have.property("size").which.is.a.Number().be.equal(2.0)
        this.exchange.book.bid[1].should.have.property("value").which.is.a.Number().be.equal(0.5)
        this.exchange.book.bid[1].should.have.property("price").which.is.a.Number().be.equal(0.25)
        this.exchange.book.bid[1].should.have.property("executed").which.is.a.Boolean().be.equal(false)
        this.exchange.book.bid[1].should.have.property("remaining").which.is.a.Number().be.equal(2.0)
        
        this.exchange.book.bid[2].should.have.property("id").which.is.a.Number().be.equal(2)
        this.exchange.book.bid[2].should.have.property("user").which.is.a.String().be.equal("diego")
        this.exchange.book.bid[2].should.have.property("type").which.is.a.String().be.equal("bid")
        this.exchange.book.bid[2].should.have.property("size").which.is.a.Number().be.equal(2.0)
        this.exchange.book.bid[2].should.have.property("value").which.is.a.Number().be.equal(0.4)
        this.exchange.book.bid[2].should.have.property("price").which.is.a.Number().be.equal(0.2)
        this.exchange.book.bid[2].should.have.property("executed").which.is.a.Boolean().be.equal(false)
        this.exchange.book.bid[2].should.have.property("remaining").which.is.a.Number().be.equal(2.0)
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
        
        this.exchange.book.ask[0].should.have.property("id").which.is.a.Number().be.equal(1)
        this.exchange.book.ask[0].should.have.property("user").which.is.a.String().be.equal("juan")
        this.exchange.book.ask[0].should.have.property("type").which.is.a.String().be.equal("ask")
        this.exchange.book.ask[0].should.have.property("size").which.is.a.Number().be.equal(2.0)
        this.exchange.book.ask[0].should.have.property("value").which.is.a.Number().be.equal(1.0)
        this.exchange.book.ask[0].should.have.property("price").which.is.a.Number().be.equal(0.5)
        this.exchange.book.ask[0].should.have.property("executed").which.is.a.Boolean().be.equal(true)
        this.exchange.book.ask[0].should.have.property("remaining").which.is.a.Number().be.equal(0)
        
        this.exchange.book.bid.length.should.be.equal(1)
        
        this.exchange.book.bid[0].should.have.property("id").which.is.a.Number().be.equal(2)
        this.exchange.book.bid[0].should.have.property("user").which.is.a.String().be.equal("pedro")
        this.exchange.book.bid[0].should.have.property("type").which.is.a.String().be.equal("bid")
        this.exchange.book.bid[0].should.have.property("size").which.is.a.Number().be.equal(3.0)
        this.exchange.book.bid[0].should.have.property("value").which.is.a.Number().be.equal(3.0)
        this.exchange.book.bid[0].should.have.property("price").which.is.a.Number().be.equal(1.0)
        this.exchange.book.bid[0].should.have.property("executed").which.is.a.Boolean().be.equal(false)
        this.exchange.book.bid[0].should.have.property("remaining").which.is.a.Number().be.equal(1)
        
        this.exchange.transactions.length.should.be.equal(1)
        this.exchange.transactions[0].should.have.property("orders").which.is.a.Object().be.eql([1, 2])
    })



    it('should execute full bid order with 3 ask orders', () => {
        this.exchange.setNewOrder({id:1, user: "juan", type: "ask", size: 2.0, value: 1.0})
        this.exchange.setNewOrder({id:2, user: "diego", type: "ask", size: 2.0, value: 1.2})
        this.exchange.setNewOrder({id:3, user: "emilio", type: "ask", size: 2.0, value: 1.4})
        this.exchange.setNewOrder({id:4, user: "pedro", type: "bid", size: 6.0, value: 6.0})
        

        this.exchange.book.ask.length.should.be.equal(3)
        
        this.exchange.book.ask[0].should.have.property("id").which.is.a.Number().be.equal(1)
        this.exchange.book.ask[0].should.have.property("user").which.is.a.String().be.equal("juan")
        this.exchange.book.ask[0].should.have.property("type").which.is.a.String().be.equal("ask")
        this.exchange.book.ask[0].should.have.property("size").which.is.a.Number().be.equal(2.0)
        this.exchange.book.ask[0].should.have.property("value").which.is.a.Number().be.equal(1.0)
        this.exchange.book.ask[0].should.have.property("price").which.is.a.Number().be.equal(0.5)
        this.exchange.book.ask[0].should.have.property("executed").which.is.a.Boolean().be.equal(true)
        this.exchange.book.ask[0].should.have.property("remaining").which.is.a.Number().be.equal(0)
        
        this.exchange.book.ask[1].should.have.property("id").which.is.a.Number().be.equal(2)
        this.exchange.book.ask[1].should.have.property("user").which.is.a.String().be.equal("diego")
        this.exchange.book.ask[1].should.have.property("type").which.is.a.String().be.equal("ask")
        this.exchange.book.ask[1].should.have.property("size").which.is.a.Number().be.equal(2.0)
        this.exchange.book.ask[1].should.have.property("value").which.is.a.Number().be.equal(1.2)
        this.exchange.book.ask[1].should.have.property("price").which.is.a.Number().be.equal(0.6)
        this.exchange.book.ask[1].should.have.property("executed").which.is.a.Boolean().be.equal(true)
        this.exchange.book.ask[1].should.have.property("remaining").which.is.a.Number().be.equal(0)
        
        this.exchange.book.ask[2].should.have.property("id").which.is.a.Number().be.equal(3)
        this.exchange.book.ask[2].should.have.property("user").which.is.a.String().be.equal("emilio")
        this.exchange.book.ask[2].should.have.property("type").which.is.a.String().be.equal("ask")
        this.exchange.book.ask[2].should.have.property("size").which.is.a.Number().be.equal(2.0)
        this.exchange.book.ask[2].should.have.property("value").which.is.a.Number().be.equal(1.4)
        this.exchange.book.ask[2].should.have.property("price").which.is.a.Number().be.equal(0.7)
        this.exchange.book.ask[2].should.have.property("executed").which.is.a.Boolean().be.equal(true)
        this.exchange.book.ask[2].should.have.property("remaining").which.is.a.Number().be.equal(0)
        

        this.exchange.book.bid.length.should.be.equal(1)
        
        this.exchange.book.bid[0].should.have.property("id").which.is.a.Number().be.equal(4)
        this.exchange.book.bid[0].should.have.property("user").which.is.a.String().be.equal("pedro")
        this.exchange.book.bid[0].should.have.property("type").which.is.a.String().be.equal("bid")
        this.exchange.book.bid[0].should.have.property("size").which.is.a.Number().be.equal(6.0)
        this.exchange.book.bid[0].should.have.property("value").which.is.a.Number().be.equal(6.0)
        this.exchange.book.bid[0].should.have.property("price").which.is.a.Number().be.equal(1.0)
        this.exchange.book.bid[0].should.have.property("executed").which.is.a.Boolean().be.equal(true)
        this.exchange.book.bid[0].should.have.property("remaining").which.is.a.Number().be.equal(0)

        this.exchange.transactions.length.should.be.equal(1)
        this.exchange.transactions[0].should.have.property("orders").which.is.a.Object().be.eql([1, 2, 3, 4])
    })



    it('should execute partial ask order with full bid order', () => {
        this.exchange.setNewOrder({id:1, user: "juan", type: "bid", size: 2.0, value: 4.0})
        this.exchange.setNewOrder({id:2, user: "pedro", type: "ask", size: 3.0, value: 3.0})

        this.exchange.book.bid.length.should.be.equal(1)

        this.exchange.book.bid[0].should.have.property("id").which.is.a.Number().be.equal(1)
        this.exchange.book.bid[0].should.have.property("user").which.is.a.String().be.equal("juan")
        this.exchange.book.bid[0].should.have.property("type").which.is.a.String().be.equal("bid")
        this.exchange.book.bid[0].should.have.property("size").which.is.a.Number().be.equal(2.0)
        this.exchange.book.bid[0].should.have.property("value").which.is.a.Number().be.equal(4.0)
        this.exchange.book.bid[0].should.have.property("price").which.is.a.Number().be.equal(2.0)
        this.exchange.book.bid[0].should.have.property("executed").which.is.a.Boolean().be.equal(true)
        this.exchange.book.bid[0].should.have.property("remaining").which.is.a.Number().be.equal(0)

        this.exchange.book.ask.length.should.be.equal(1)

        this.exchange.book.ask[0].should.have.property("id").which.is.a.Number().be.equal(2)
        this.exchange.book.ask[0].should.have.property("user").which.is.a.String().be.equal("pedro")
        this.exchange.book.ask[0].should.have.property("type").which.is.a.String().be.equal("ask")
        this.exchange.book.ask[0].should.have.property("size").which.is.a.Number().be.equal(3.0)
        this.exchange.book.ask[0].should.have.property("value").which.is.a.Number().be.equal(3.0)
        this.exchange.book.ask[0].should.have.property("price").which.is.a.Number().be.equal(1.0)
        this.exchange.book.ask[0].should.have.property("executed").which.is.a.Boolean().be.equal(false)
        this.exchange.book.ask[0].should.have.property("remaining").which.is.a.Number().be.equal(1.0)
    })



    it('should execute full ask order with 3 bid orders', () => {
        this.exchange.setNewOrder({id:1, user: "juan", type: "bid", size: 2.0, value: 2.0})
        this.exchange.setNewOrder({id:2, user: "diego", type: "bid", size: 3.0, value: 3.0})
        this.exchange.setNewOrder({id:3, user: "luis", type: "bid", size: 1.0, value: 1.0})
        this.exchange.setNewOrder({id:4, user: "pedro", type: "ask", size: 6.0, value: 3.0})


        this.exchange.book.bid.length.should.be.equal(3)

        this.exchange.book.bid[0].should.have.property("id").which.is.a.Number().be.equal(1)
        this.exchange.book.bid[0].should.have.property("user").which.is.a.String().be.equal("juan")
        this.exchange.book.bid[0].should.have.property("type").which.is.a.String().be.equal("bid")
        this.exchange.book.bid[0].should.have.property("size").which.is.a.Number().be.equal(2.0)
        this.exchange.book.bid[0].should.have.property("value").which.is.a.Number().be.equal(2.0)
        this.exchange.book.bid[0].should.have.property("price").which.is.a.Number().be.equal(1)
        this.exchange.book.bid[0].should.have.property("executed").which.is.a.Boolean().be.equal(true)
        this.exchange.book.bid[0].should.have.property("remaining").which.is.a.Number().be.equal(0)
        
        this.exchange.book.bid[1].should.have.property("id").which.is.a.Number().be.equal(2)
        this.exchange.book.bid[1].should.have.property("user").which.is.a.String().be.equal("diego")
        this.exchange.book.bid[1].should.have.property("type").which.is.a.String().be.equal("bid")
        this.exchange.book.bid[1].should.have.property("size").which.is.a.Number().be.equal(3.0)
        this.exchange.book.bid[1].should.have.property("value").which.is.a.Number().be.equal(3.0)
        this.exchange.book.bid[1].should.have.property("price").which.is.a.Number().be.equal(1)
        this.exchange.book.bid[1].should.have.property("executed").which.is.a.Boolean().be.equal(true)
        this.exchange.book.bid[1].should.have.property("remaining").which.is.a.Number().be.equal(0)
       
        this.exchange.book.bid[2].should.have.property("id").which.is.a.Number().be.equal(3)
        this.exchange.book.bid[2].should.have.property("user").which.is.a.String().be.equal("luis")
        this.exchange.book.bid[2].should.have.property("type").which.is.a.String().be.equal("bid")
        this.exchange.book.bid[2].should.have.property("size").which.is.a.Number().be.equal(1.0)
        this.exchange.book.bid[2].should.have.property("value").which.is.a.Number().be.equal(1.0)
        this.exchange.book.bid[2].should.have.property("price").which.is.a.Number().be.equal(1)
        this.exchange.book.bid[2].should.have.property("executed").which.is.a.Boolean().be.equal(true)
        this.exchange.book.bid[2].should.have.property("remaining").which.is.a.Number().be.equal(0)


        this.exchange.book.ask.length.should.be.equal(1)

        this.exchange.book.ask[0].should.have.property("id").which.is.a.Number().be.equal(4)
        this.exchange.book.ask[0].should.have.property("user").which.is.a.String().be.equal("pedro")
        this.exchange.book.ask[0].should.have.property("type").which.is.a.String().be.equal("ask")
        this.exchange.book.ask[0].should.have.property("size").which.is.a.Number().be.equal(6.0)
        this.exchange.book.ask[0].should.have.property("value").which.is.a.Number().be.equal(3.0)
        this.exchange.book.ask[0].should.have.property("price").which.is.a.Number().be.equal(0.5)
        this.exchange.book.ask[0].should.have.property("executed").which.is.a.Boolean().be.equal(true)
        this.exchange.book.ask[0].should.have.property("remaining").which.is.a.Number().be.equal(0)
        
        this.exchange.transactions.length.should.be.equal(1)
        this.exchange.transactions[0].should.have.property("orders").which.is.a.Object().be.eql([1, 2, 3, 4])
    })
})