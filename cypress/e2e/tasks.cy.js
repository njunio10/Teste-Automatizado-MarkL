

describe( 'tasks', () =>{

    let testData;

    before(() =>{
        cy.fixture('tasks').then(t => {
            testData = t
        })
        cy.viewport(1920, 1080)
    })

    context('cadastro', () => {
        it('deve cadastrar uma nova tarefa', () => {

            const taskname = 'Ler um livro em node.js'
    
            cy.removeTaskByName(taskname)
    
            cy.createTask(taskname)
    
            cy.contains('main div p', taskname)
                .should('be.visible')
               
        })
    
        it('não deve permitir tarefa duplicada', ()=> {
    
            const task = testData.dup
            
            cy.removeTaskByName(task.name)
            //Dado que eu tenho uma tarefa duplicada
    
            cy.postTask(task)
            //Quando faço o cadastro dessa tarefa
    
            cy.createTask(task.name)
            //Então vejo a mensagem de duplicidade
    
            cy.get('.swal2-html-container')
                .should('be.visible')
                .should('have.text', 'Task already exists!')
        })    
        
        it('campo obrigatório', ()=> {
            cy.createTask()
            cy.isRequired('This is a required field')
        })
    })  

    context('atualização', () =>{
        it('deve concluir uma tarefa', ()=>{
            const task = {
                name:'Passar compra de consumo',
                is_done: false
            }

            cy.removeTaskByName(task.name)
            cy.postTask(task)

            cy.visit('/')

            cy.contains('p', task.name)
               .parent() 
               .find('button[class*=ItemToggle]')
               .click()

            cy.contains('p', task.name)   
               .should('have.css', 'text-decoration-line', 'line-through')
        })
    })

    context('exclusão', () =>{
        it('deve remover uma tarefa', ()=>{
            const task = {
                name:'Estudar Javascript',
                is_done: false
            }

            cy.removeTaskByName(task.name)
            cy.postTask(task)

            cy.visit('/')

            cy.contains('p', task.name)
               .parent() 
               .find('button[class*=ItemDelete]')
               .click()

            cy.contains('p', task.name)   
               .should('not.exist')
        })
    })
})

