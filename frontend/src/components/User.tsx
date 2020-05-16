import React from 'react'

interface IUser {
    nome: string
    email: string
    senha: string
}

interface Props {
    user: IUser
}

const User: React.FC<Props> = ({ user }) => {
    return(
        <div>
            <strong>Nome: {user.nome} </strong><br/>
            <strong>E-mail: {user.email} </strong><br/>
            <strong>Senha: {user.senha} </strong><br/>
            <br/>
        </div>
    )
}

export default User