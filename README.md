**Documentação do Projeto**

# Formulário de Cadastro

Este é um exemplo de um formulário de cadastro desenvolvido com React e outras bibliotecas para validação de entrada, formatação de campos e envio de e-mails utilizando o serviço EmailJS.

## Bibliotecas Utilizadas

- **React**: Biblioteca JavaScript para criar interfaces de usuário.
- **React Hook Form**: Biblioteca para gerenciar formulários no React.
- **@hookform/resolvers/zod**: Integrador do React Hook Form com o Zod, uma biblioteca de validação de esquemas.
- **zod**: Biblioteca para validação de esquemas de dados.
- **react-input-mask**: Componente para máscaras de entrada em campos de texto.
- **@emailjs/browser**: Biblioteca para envio de e-mails no navegador.

## Validação de Dados

A biblioteca Zod foi utilizada para definir um esquema de validação para os campos do formulário. Aqui estão algumas das validações aplicadas:

- Nome: Primeiro nome e último nome são validados separadamente. As primeiras letras são capitalizadas e os espaços em branco são mantidos.
- CPF: Deve ser um CPF válido com 11 dígitos.
- RG: Deve ser um RG válido com pelo menos 9 dígitos.
- Telefone: Consiste em DDI e número de telefone, ambos obrigatórios.
- Cartão de Crédito: Número do cartão, data de validade e código de segurança, com validações específicas.

## Máscaras de Entrada

A biblioteca react-input-mask é utilizada para aplicar máscaras de entrada em alguns campos do formulário. Isso ajuda a formatar automaticamente os dados conforme o usuário digita.

- **Nome**: Máscara personalizada para capitalizar a primeira letra de cada palavra.
- **CPF**: Máscara para formatar o CPF com pontos e hífen.
- **RG**: Máscara para formatar o RG com pontos e hífen.
- **Telefone**: Máscaras para DDI e número de telefone.
- **Cartão de Crédito**: Máscara para número do cartão e data de validade.

## Envio de E-mail

A biblioteca EmailJS é utilizada para enviar os dados do formulário por e-mail. Um template é definido com os campos a serem preenchidos no e-mail de destino.

- **from_name**: Nome fornecido no formulário.
- **message**: Todos os dados do formulário em formato JSON.
- **email**: Endereço de e-mail fornecido no formulário.

## Como Rodar o Projeto

1. Clone este repositório para a sua máquina.
2. Navegue até a pasta do projeto usando o terminal.
3. Execute `npm install` para instalar as dependências.
4. Execute `npm start` para iniciar o servidor de desenvolvimento.

**Observação**: Certifique-se de fornecer suas próprias chaves e configurações para o EmailJS, conforme necessário.

Este projeto demonstra como criar um formulário de cadastro com validação de dados, máscaras de entrada e envio de e-mails utilizando tecnologias modernas do ecossistema React. Sinta-se à vontade para adaptar e expandir este exemplo de acordo com as suas necessidades.




### Trecho 1: Importações e Definição do Esquema de Validação

```javascript
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const createUserFormSchema = z.object({
  name: z.object({
    firstName: z.string().nonempty("Nome obrigatório").transform(/*...*/),
    lastName: z.string().nonempty("Sobrenome obrigatório").transform(/*...*/),
  }),
  // ... outras validações para campos como cpf, rg, telefone, card, email
});
```

Neste trecho, estamos importando as bibliotecas necessárias e definindo um esquema de validação usando a biblioteca Zod. O esquema `createUserFormSchema` define regras de validação para cada campo do formulário.

### Trecho 2: Componente de Entrada com Máscara

```javascript
import ReactInputMask from "react-input-mask";

export default function Input({ placeholder, registerInput, ...rest }) {
  return (
    <ReactInputMask
      className="text-black"
      placeholder={placeholder}
      maskChar={null}
      {...registerInput}
      {...rest}
    />
  );
}
```

Aqui, temos um componente chamado `Input`, que é uma abstração sobre o `ReactInputMask` para aplicar máscaras de entrada. Ele recebe as propriedades `placeholder` e `registerInput` para renderizar o campo de entrada com a máscara e outras configurações.

### Trecho 3: Uso do Hook useForm

```javascript
const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(createUserFormSchema),
  mode: "onSubmit",
});
```

Neste trecho, estamos utilizando o hook `useForm` do React Hook Form. Ele nos fornece funções e estados para gerenciar o formulário. Aqui, estamos configurando o `resolver` para usar o Zod como validador e definindo o `mode` como `"onSubmit"`.

### Trecho 4: Manipulação de Dados e Envio de E-mail

```javascript
const templete = {
  from_name: JSON.stringify(data?.name?.firstName),
  message: JSON.stringify(data),
  email: JSON.stringify(data?.email),
};

function teste02(data) {
  setData(JSON.stringify(data, null, 2));
  console.log(errors);
  console.log(data);
  emailjs.send("service_0470bzm", "template_tfn321q", templete, "GsHeakWXm2sPdMkj3")
    .then((response) => {
      console.log("Deu bom meu chapa");
    });
}
```

Neste trecho, `templete` é um objeto que contém os dados do formulário em formato JSON. A função `teste02` é chamada quando o formulário é submetido. Ela atualiza o estado `data` com os dados do formulário, faz um log dos erros e dados, e usa o EmailJS para enviar um e-mail com os dados preenchidos.

### Trecho 5: Renderização do Formulário

```javascript
<form onSubmit={handleSubmit(teste02)}>
  {/* ... campos do formulário */}
  <input type="submit" value="Vai filhão" />
</form>
```

Aqui, estamos renderizando o formulário. Quando o formulário é submetido, a função `handleSubmit` é chamada, que por sua vez chama a função `teste02` para validar e enviar os dados.

Esses são alguns trechos de código e explicações das partes principais do projeto. Cada trecho desempenha um papel importante na validação, formatação e envio de dados do formulário.