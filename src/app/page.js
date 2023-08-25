"use client"
import Input from "@/app/components/Input"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import {z} from "zod"
import emailjs from '@emailjs/browser';

const createUserFomrSchema = z.object({
  name: z.object({
    firstName: z.string().nonempty("teste")
  .transform(firstName => {
    return firstName.trim().split(" ").map(word => {
    return word[0].toLocaleUpperCase().concat(word.substring(1))
  }).join("")}),
  lastName: z.string().nonempty("Sobrenome Obrigatório").transform(firstName => {return firstName.trim().split(' ').map(word => {
  return word[0].toLocaleUpperCase().concat(word.substring(1))
   }).join(" ")}),
  }),
   cpf: z.string().nonempty("O CPF e Obrigatório").min(14, {message : "O CPF tem que ter no minimo 11 digitos"}),
   rg: z.string().nonempty("O RG e Obrigatorio").min(12, {message: "O CPF tem que ter no minimo 9 digitos"}),
   telefone:z.object({
    ddi: z.string().nonempty("O DDi e obrigatorio"),
    tell: z.string().nonempty("O Telefone com o DDD e obrigatorio"),
   }),
   card: z.object({
    cardnunber: z.string().nonempty('O numero do catãoo e Obrigatorio').min(19, {message: "O Cartão precisa ter no minimo 16 digitos"}),
    datecard: z.string().nonempty('A data do cartão e obrigatoria').min(5, {message:"E a data precisa ser composta por mes e ano"}),
    cvccard: z.string().nonempty('O CVC e obrigatorio').min(3, {message:"E necessario colocar 3 digitos do codigo de segurança"}),
   }),
   email: z.string().email('E-mail invalido').nonempty("O e-mail e obrigatorio"),

 })

export default function Home() {
   const { register, handleSubmit, formState : {errors} } = useForm({
    resolver: zodResolver(createUserFomrSchema),
    mode: "onSubmit",
  }
   );
  console.log("erros : ",errors)
   const [data, setData] = useState();

  const templete = {
    from_name: JSON.stringify(data?.name?.firstName),
    message: JSON.stringify(data),
    email:  JSON.stringify(data?.email)
  }

   function teste02(data){
    setData(JSON.stringify(data, null, 2))
    console.log(errors)
    console.log(data)
    emailjs.send("service_0470bzm", "template_tfn321q", templete, "GsHeakWXm2sPdMkj3")
    .then((response) => {
      console.log('Deu bom meu chapa')
    })
   }
  return (
    <main>
      <form onSubmit={handleSubmit(teste02)}>
        <label>
        Nome
        <Input registerInput={{...register("name[firstName]")}} mask={"********************"}
        formatChars={{ "*": "[A-Za-z ]" }} 
         placeholder="Primeiro Nome" />
        {errors.name?.firstName?.message && <p>{errors.name.firstName.message}</p>}
         
        <Input  registerInput={{...register("name[lastName]")}} mask={"***************************"}
        placeholder="Digite seu nome"
        formatChars={{ "*": "[A-Za-z ]" }}
         />
        {errors.name?.lastName?.message && <p>{errors.name.lastName.message}</p>}

        </label>
       <label>
        CPF
        <Input mask="999.999.999-99" registerInput={{...register("cpf")}} placeholder="123.456.789.00"/>
        {errors.cpf?.message && <p>{errors.cpf.message}</p>}
       </label>
       <label>
        RG
       <Input mask="99.999.999-9" registerInput={{...register("rg")}} placeholder="12.345.678-0"/>
       {errors.rg?.message && <p>{errors.rg.message}</p>}
       </label>
       <label>
        Data de nascimento
       <Input registerInput={{...register("date")}} mask={"99/99/9999"} placeholder="00/00/00"/>
       </label>
       <label>
        Email
        <input className="text-black" {...register("email")} type="email"  placeholder="exemplo@gmail.com"/>
       {errors.email?.message && <p>{errors.email.message}</p>}
       </label>
       <label>
        Telefone
        <Input registerInput={{...register("telefone[ddi]")}} mask={'+99'} placeholder="+XX"/>
       {errors.telefone?.ddi?.message && <p>{errors.telefone.ddi.message}</p>}
        <Input registerInput={{...register("telefone[tell]")}} mask={'(99) 9 9999-9999'}  placeholder="(XX) XXXXXXXXX"/>
       {errors.telefone?.tell?.message && <p>{errors.telefone.tell.message}</p>}
       </label>
       <label>
        Cartão
        <Input registerInput={{...register("card[cardnunber]")}} mask={'9999 9999 9999 9999'}  placeholder="Numero do cartão"/>
       {errors.card?.cardnunber?.message && <p>{errors.card.cardnunber.message}</p>}
        <Input registerInput={{...register("card[datecard]")}} mask={'99/99'}  placeholder="XX/XX"/>
       {errors.card?.datecard?.message && <p>{errors.card.datecard.message}</p>}
        <Input registerInput={{...register("card[cvccard]")}} mask={'999'}  placeholder="CVC"/>
       {errors.cadr?.cvccard?.message && <p>{errors.card.cvccard.message}</p>}
       </label>
       <input type="submit" value="Vai filhão" />
      </form>
    </main>
  )
}
