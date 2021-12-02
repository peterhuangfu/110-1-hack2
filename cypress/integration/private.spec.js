describe('Hackathon 2 Private Test', () => {
  it('1 (20%)', () => {
    cy.visit({ url: 'localhost:4000', failOnStatusCode: false })
  })
  it('2-(1) (10%)', () => {
    cy.request('localhost:4000/api/getAllPosts')
    .then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('message')
      expect(response.body).to.have.property('data')
      expect(response.body.data).to.have.length(7)
    })
  })
  it('2-(2) (10%)', () => {
    cy.visit('localhost:3000')
    cy.get('#pid-0-title').should('contain', 'Private Test 7')
    cy.get('#pid-0-time').should('contain', '2021-12-02')
    cy.get('#pid-1-title').should('contain', 'Private Test 6')
    cy.get('#pid-1-time').should('contain', '2021-12-02')
    cy.get('#pid-5-title').should('contain', 'Private Test 2')
    cy.get('#pid-6-title').should('contain', 'Private Test 1')
  })
  it('3-(1) (10%)', () => {
    cy.request('localhost:4000/api/getPostDetail?pid=6f8f917b-505a-4e12-957c-03ffea5c6e32')
    .then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('message')
      expect(response.body).to.have.property('post')
      expect(response.body.post).to.have.property('postId')
      expect(response.body.post).to.have.property('title')
      expect(response.body.post).to.have.property('content')
      expect(response.body.post).to.have.property('timestamp')
    })
  })
  it('3-(2) (10%)', () => {
    cy.visit('localhost:3000')
    cy.get('#pid-3-title').click()
    cy.get('#pid-detail-title').should('contain', 'Private Test 4')
    cy.get('#pid-detail-content').should('contain', 'private test content 4')
    cy.get('#pid-detail-time').should('contain', '2021-12-02 13:21:04')
    cy.get('#goback-reply-btn').click()
    cy.get('#pid-5-title').click()
    cy.get('#pid-detail-title').should('contain', 'Private Test 2')
    cy.get('#pid-detail-content').should('contain', 'private test content 2')
    cy.get('#pid-detail-time').should('contain', '2021-12-02 13:01:04')
  })
  it('4-(1) (10%)', () => {
    cy.request({
      method: 'POST',
      url: 'localhost:4000/api/createPost',
      failOnStatusCode: false,
      body: {
        postId: '6a2099bb-1922-4376-8df3-9b4e75a2a487',
        title: 'Private Test Create',
        content: 'private test create',
        timestamp: new Date('2021-12-02T06:01:04.360Z')
      }
    })
    .then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('message')
    })

    cy.request('localhost:4000/api/getAllPosts')
    .then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('message')
      expect(response.body).to.have.property('data')
      expect(response.body.data).to.have.length(8)
    })
  })
  it('4-(2) (10%)', () => {
    cy.visit('localhost:3000')
    cy.get('#pid-0-title').should('contain', 'Private Test Create')
    cy.get('#pid-0-time').should('contain', '2021-12-02')
    cy.get('#pid-post-btn').click()
    cy.get('#pid-create-title').type('Private Test Create 2')
    cy.get('#pid-create-content').type('private test create 2')
    cy.get('#pid-create-submit-btn').click()
    cy.get('#pid-0-title').should('contain', 'Private Test Create 2')
    cy.get('#pid-1-title').should('contain', 'Private Test Create')
  })
  it('5-(1) (10%)', () => {
    cy.request({
      method: 'DELETE',
      url: 'localhost:4000/api/deletePost?pid=6a2099bb-1922-4376-8df3-9b4e75a2a487',
      failOnStatusCode: false
    })
    .then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('message')
    })

    cy.request('localhost:4000/api/getAllPosts')
    .then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('message')
      expect(response.body).to.have.property('data')
      expect(response.body.data).to.have.length(8)
    })
  })
  it('5-(2) (10%)', () => {
    cy.visit('localhost:3000')
    cy.get('#pid-0-title').should('contain', 'Private Test Create 2')
    cy.get('#pid-0-title').click()
    cy.get('#pid-detail-del-btn').click()
    cy.get('#pid-0-title').should('contain', 'Private Test 7')
    cy.get('#pid-1-title').should('contain', 'Private Test 6')
  })
})
