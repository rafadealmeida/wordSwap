### Simplifica Doc

## Resumo
Um sistema web para simplificar a criação de documentos repetitivos de forma ágil e eficiente.
A inspiração para esse projeto surgiu de uma necessidade pessoal: meu pai estava envolvido em um trabalho
que continha a elaboração constante de documentos, diversas vezes semelhantes, que modificava apenas os dados ou detalhes menores.
Isso me motivou a pensar em como automatizar e acelerar o processo, já que a maior parte desses documentos
compartilhava semelhanças, com apenas algumas partes que precisavam ser personalizadas, como dito anteriormente.

## Como usar
Neste sistema o usuário prepara o arquivo previamente doc ou docx ,no word, por exemplo, seguindo os padrões do sistema, pontuando palavras ou frases a serem substituidas, colocando-as entre duplo colchetes.
#### **Exemplo de um texto :** 
>Este documento é direcionado a {{nome_da_pessoa}}, que contém o CPF: {{cpf_da_pessoa}} ...

Ao fazer o upload do arquivo, seguindo os padrões, sistema gerará um formulários com as palavras ou frases que o usuário deseja substituir. Preenchendo este formulário,
o sistema modificará o seu documentos com as informações inseridas pelo usuário, assim o usuário pode copiar o texto, ou baixar este documento já modificado.


### Desafios
Neste projeto tive alguns desafios interessante, o primeiro dele era definir como seria o funcionamento do sistema, como seria o fluxo de uso além de qual tecnologia escolher. Optei por usar o framework NextJs
pra me expor a alguns desafios, utilizar NextJs em um projeto real e colocar em prova meus estudos juntamento com uma codificação de Back End, também usando o NextJs. Outro desafio foi a manipulação de arquivos,
decidir como seria feito, escolher e encontrar uma biblioteca que atendesse o que era requirido e codificar está manipulação. Foi muitos erros, muitas dificuldades, mas ao conseguir, superá-los e atingir o objetivo,
este projeto foi muito gratificante. 

## Tecnologias Usadas 
  <p align='left'>
    <img loading="lazy" src="https://skillicons.dev/icons?i=ts,react,nextjs,materialui, electron,git,github"/>  
  </p>
 React-Hook-Form e utilizando Firebase como banco de dados

## [Acesse o projeto clicando aqui!](https://simplifica-doc.vercel.app/)

### Sreen Shots 
#### Ao fazer upload do arquivo , o sistema gerará o formulário com as informações do texto.
![image](https://github.com/rafadealmeida/wordSwap/assets/93219825/aa3cdf19-5feb-4938-8052-8cc9a46cc3b1)

#### Preencher o formulário com os dados que devem ser incluidos no documento.
![image](https://github.com/rafadealmeida/wordSwap/assets/93219825/63d43a74-05c0-45f5-842d-a60a689a10dc)

#### Ao clicar em para substituir palavras, e o texto e modificado, podendo o usuário copiar o texto ou fazer download.
![image](https://github.com/rafadealmeida/wordSwap/assets/93219825/d275285b-fd78-44f9-893b-4fa884bcb2ec)




