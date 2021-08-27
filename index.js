const fs = require('fs');
class Cliente{
    constructor(Nome, Telefone, Endereco){
        this.Nome=Nome;
        this.Telefone=Telefone;
        this.Endereco=Endereco;
        this.Pedidos=[];
    }
    MaisUmPedido(Pedido){
        this.Pedidos.push(Pedido);
    }
}
class Pedido{
    constructor(Numero, Cliente, Data, Expresso, Preco){
        this.Numero=Numero;
        this.Cliente=Cliente;
        this.Data=Data; 
        this.Expresso=Expresso; 
        this.Preco=Preco; 
        this.Dataentrega=undefined;
    }
    ValorPedido(){
        if(this.Expresso==true){
            this.Preco = this.Preco*1.2;
        } else{
            this.Preco = this.Preco;
        }
    }
    VerificaPrazo(){
        if(this.Data==this.Dataentrega){
            return true;
        }
        return false;
    }
    toString(){
        console.log('Cliente: ' + this.Cliente.Nome +'\n' + 'PreÃ§o: ' + this.Preco);
        if(this.Dataentrega==undefined){
            return;
        }
        if(this.VerificaPrazo()==true){
            console.log('Entregue no prazo.\n');
            return;
        }
        console.log('Entregue fora do prazo.\n');
    }
}

function EscreveArquivoCliente(Cliente){
    let conteudo= Cliente.Nome + '\n' + Cliente.Endereco + '\n' + Cliente.Telefone + '\n\n';
    fs.appendFile('clientes.txt', conteudo, (err) => {
        if (err) throw err;
    });
}

function EscreveArquivoPedido(Pedido){
    let conteudo= Pedido.Numero + '\n' + Pedido.Cliente.Nome + '\n' + Pedido.Cliente.Telefone + '\n' + Pedido.Cliente.Endereco + '\n' +  Pedido.Data +
    '\n' + Pedido.Expresso + '\n' + Pedido.Preco +'\n\n';
    fs.appendFile('pedidos.txt', conteudo, (err) => {
        if (err) throw err;
    });
}
function LerArquivoPedido(){
    let content=fs.readFileSync('pedidos.txt', (err, data) => {
        if (err) throw err;
      });
      let conteudo=content.toString('utf8');
      let obj=[];
      let objetos=conteudo.split('\n\n');
      objetos.forEach(element => {
          let params=element.split('\n');
          let pedido= new Pedido(params[0], params[1], params[2], params[3], params[4]);
          obj.push(pedido);
      });
      console.log(obj);
}

function LerArquivoCliente(){
    let content=fs.readFileSync('clientes.txt', (err, data) => {
        if (err) throw err;
      });
      let conteudo=content.toString('utf8');
      let obj=[];
      let objetos=conteudo.split('\n\n');
      objetos.forEach(element => {
          let params=element.split('\n');
          let pedido= new Cliente(params[0], params[2], params[1]);
          obj.push(pedido);
      });
      console.log(obj);
}

function Main(){
    var data = new Date();
    let Cliente1= new Cliente('Fulano', '9999', 'Rua A');
    let Cliente2=new Cliente('Ciclano', '8888', 'Rua B');
    let Pedido1=new Pedido(1, Cliente1, String(data. getDate()). padStart(2, '0'), false, 500 );
    Pedido1.Dataentrega=27;
    Pedido1.ValorPedido();
    Cliente1.MaisUmPedido(Pedido1);
    let Pedido2=new Pedido(2, Cliente2, String(data. getDate()). padStart(2, '0'), true, 500);
    Pedido2.Dataentrega=27;
    Pedido2.ValorPedido();
    Cliente2.MaisUmPedido(Pedido2);
    Pedido1.toString();
    Pedido2.toString();
    EscreveArquivoCliente(Cliente1);
    EscreveArquivoPedido(Pedido1);
}

Main();

