# login-registro-api

Api de login e cadastros de usuário com funcionalidade de adicionar, listar, editar e excluir contatos.

# POST - /users

Rota de criação de usuários, não necessita de autenticação.

Body de exemplo: {
"name": "Usuário Teste",
"email": "usuariio@teste.com",
"password": "senha123",
"phone_number": "+5569984140631",
"admin": true
}

Response: STATUS Created 201 - {
"id": 1,
"name": "Usuário Teste",
"email": "usuariio@teste.com",
"admin": true,
"phone_number": "+5569984140631",
"createdAt": "2023-08-11",
"updatedAt": "2023-08-11",
"deletedAt": null
}

# PATCH - /users/:id

Rota de autualização de usuários, necessita de autenticação, não é possível atualizar os campos de datas e admin.

Body de exemplo: {
"email": "usuaroo@teste.com",
}

Response: STATUS OK 200 - {
"id": 1,
"name": "Usuário Teste",
"email": "usuario@teste.com",
"admin": true,
"phone_number": "+5569984140631",
"createdAt": "2023-08-11",
"updatedAt": "2023-08-11",
"deletedAt": null
}

# DELETE - /users/:id

Rota de deleção de usuários, necessita de autenticação.

Response: STATUS No content 204

# POST - /login

Rota de login de usuários, não necessita de autenticação.

Body de exemplo: {
"email": "usuaroo@teste.com",
"password": "senha123"
}

Response: {
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzdWFyb29AdGVzdGUuY29tIiwiaWF0IjoxNjkxNzQ1MjY2LCJleHAiOjE2OTE4MzE2NjYsInN1YiI6IjMifQ.yx8fI26bgAdz4JbMcpKNAMKN8ZeBkHfHiNhcF4JyizE"
}

# POST - /contacts

Rota de criação de contatos, necessita de autenticação.

Body de exemplo: {
"name": "gustavo Qualquer Nome",
"email": "usuariio@teste.com",
"phone_number": "+5569984140631":
}

Response {
"id": 1,
"name": "gustavo Qualquer Nome",
"email": "usuariio@teste.com",
"phone_number": "+5569984140631",
"crated_at": "2023-08-11"
}

# PATCH - /contacts/:id

Rota de atualização de contatos, necessita de autenticação, atualiza email e numero de telefone caso existam no banco de usuários.

Body de exemplo: {
"email": "gustavo@teste.com",
"phone_number": "+5569984140633":
}

Response {
"id": 1,
"name": "gustavo Qualquer Nome",
"email": "gustavo@teste.com",
"phone_number": "+5569984140633",
"crated_at": "2023-08-11"
}

# DELETE - /contacts/:id

Rota de deleção de contatos, necessita de autenticação.

Response: STATUS No content 204

# GET - /contacts

Rota de listagem dos seus contatos, necessita de autenticação.

Response: [
{
"id": 1,
"name": "gustavo",
"email": "usuario@teste.com",
"phone_number": "+5569984140632",
"crated_at": "2023-08-09"
},
{
"id": 2,
"name": "pedro",
"email": "usuariio@teste.com",
"phone_number": "+5569984140639",
"crated_at": "2023-08-11"
},
{
"id": 3,
"name": "italo",
"email": "usuaro@teste.com",
"phone_number": "+5569984140631",
"crated_at": "2023-08-11"
}
]
