sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("googleappimagens.controller.Inicial", {
            onInit: function () {
                // COLCHETES INDICA UMA VARIAVEL DO TIPO TABELA INTERNA(ARRAY)
                // Vamos fazer uma table type dentro de uma estrutura(Um objeto de OO, com suas propriedades e seus valores)
                // Criamos um objeto  com propreidades e criamos uma lista com suas propriedades
                let ImageList = {
                    imagem: [
                        {
                            url: "http://cdn.shopify.com/s/files/1/0265/3893/4330/products/coca-cola-110591_1200x1200.jpg?v=1590528264",
                            thumbnail: "https://rapidapi.usearch.com/api/thumbnail/get?value=158279291306047240",
                            title: "Coca-cola",
                            // criamos uma outra estrutura dentro da lista
                            provider: {
                                name: "shopify"
                            }
                        },
                        // Vamos criar um segundo objeto
                        {
                            url: "http://cdn.shopify.com/s/files/1/0948/6514/products/fanta_orange_1200x1200.jpg?v=1571438679",
                            thumbnail: "https://rapidapi.usearch.com/api/thumbnail/get?value=3384807801648533844",
                            title: "Fanta Laranja",
                            // criamos uma outra estrutura dentro da lista
                            provider: {
                                name: "shopify"
                            }
                            // Agora temos uma tabela interna com duas linhas(Dados)
                        },
                    ]
                };

                //Criação do modelo para exibir dados na tela
                let ImageModel = new JSONModel(ImageList);
                let view = this.getView();
                view.setModel(ImageModel, "ModeloImagem");
                
            },
            onPressBuscar: function () {


                let inputBusca = this.byId("inpBusca");
                // coleta o valor digitado no input
                let query = inputBusca.getValue();
                // Exibi a tela
                //alert(query);

                // codigos copiados da API
                const settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI?q="
                    + query + "&20Cola& pageNumber=1 & pageSize=10 & autoCorrect=true",
                    "method": "GET",
                    "headers": {
                        "X-RapidAPI-Key": "42bb7406a2msh5d3a88e51b59f1dp12a255jsn24e501270251",
                        "X-RapidAPI-Host": "contextualwebsearch-websearch-v1.p.rapidapi.com"
                    }
                };
                //Comando para chamar a lista da API
                $.ajax(settings).done(function (response){ 
                    console.log(response);
                    // Fim dos codigos copiados pela API


                    // INstanciar o modelo
                    let oImageModel = this.getView().getModel("ModeloImagem");
                    let oImageData = oImageModel.getData();

                    // Clear na tabela interna = Array

                    oImageData.imagem = [];

                    //Loop para preencher uma tabela dentro de outra tabela

                    let listaResultados = response.value;
                    let newItem;
                    
                    //vamos dar o loop para preencher a nova lista que esta vazia usando o comando (for)

                    for (var i = 0; i < listaResultados.length; i++){
                        //Read table com indice 
                        newItem = listaResultados[i];
                        // append dos dados na nova tabela
                        oImageData.imagem.push(newItem);
                    }

                    oImageModel.refresh();
                    

                }.bind(this)
                );
                
            }
        });
    });
