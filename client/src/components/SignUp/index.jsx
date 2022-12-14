import React, { useContext } from 'react'
import { ApiContext } from '../../providers/api';
import { Container } from './styles'
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
export default function SignUp() {
    const { createUser } = useContext(ApiContext)
    const history = useHistory()

    const formSchema = yup.object().shape({
        email: yup.string().required("Email obrigatório").email("E-mail inválido"),
        password: yup.string().min(8).required("Senha obrigatória"),
      });
    
      const {
        register,
        handleSubmit,
        formState: { errors }
      } = useForm({
        resolver: yupResolver(formSchema)
      });
    
      const onSubmitFunction = async (data) => {
        const result = await createUser(data)
        if(result.name !== 'AxiosError'){
          history.push('/signin')
          toast.success('✔️ Usuário criado com sucesso!')
        }else{
          toast.error('❌ E-mail já cadastrado!')
        }
      }

  return (
    <Container>
        <form className="form" onSubmit={handleSubmit(onSubmitFunction)}>
            <h3>SignUp</h3>
            
            <input placeholder="Email" type="text" {...register("email")} />
            {errors.email?.message}

            <input placeholder="Password" type="password" {...register("password")} />
            {errors.password?.message}

            <button type="submit">Criar!</button>
            <div>
              <span>Você já possui uma conta?</span> <Link to='signin'>Entrar</Link>
            </div>
      </form>
    </Container>
  )
}
