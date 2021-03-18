///////////////////////////////////////////////////////////////////////////
// Copyright © Esri. All Rights Reserved.
//
// Licensed under the Apache License Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
///////////////////////////////////////////////////////////////////////////
define(['dojo/_base/declare', 'jimu/BaseWidget', "esri/tasks/QueryTask", "esri/tasks/query", 'dojo/_base/lang', "esri/SpatialReference", "esri/symbols/SimpleFillSymbol", "esri/symbols/SimpleLineSymbol", "esri/Color", "esri/graphic"],
  function(declare, BaseWidget, QueryTask, Query, lang, SpatialReference, SimpleFillSymbol, SimpleLineSymbol, Color, Graphic) {
    //To create a widget, you need to derive from BaseWidget.
    return declare([BaseWidget], {
      // Custom widget code goes here

      baseClass: 'jimu-widget-customwidget',


      cargaConcellos() {

        let codigoProvincia = this.selectProvincias.value;
        if (codigoProvincia == -1) return;


        this.selectConcellos.innerHTML = "";


//Se coge la URL del fichero de configuración
      const queryTask = new QueryTask(this.config.concellosService);

//Se establecen los parametros
      const query = new Query ();
      query.returnGeometry = false;
      query.outFields = ["CODCONC", "CONCELLO"];
      query.orderByFields = ["CONCELLO"];
      query.where = "CODPROV =" + codigoProvincia;

      //console.log(query)

//Ejecucción de la consulta
        queryTask.execute(query, lang.hitch(this, function(results) {

          //opción por defecto (-1)
          let opt = document.createElement("option");
          opt.value = -1;
          opt.text = "Seleccione concello";
          this.selectConcellos.add(opt);

          //console.log(opt);

          for (let i = 0; i < results.features.length; i++) {
            opt = document.createElement("option");
            opt.value = results.features[i].attributes.CODCONC;
            opt.text = results.features[i].attributes.CONCELLO;
            this.selectConcellos.add(opt);
          }


        }));



      },




      zoomConcello () {
        let codigoConcello = this.selectConcellos.value;
        if (codigoConcello == -1) return;

        this.selectConcellos.innerHTML = "";

        const queryTask = new QueryTask(this.config.concellosService);

        var params = new Query ();

        params.returnGeometry = true;
        params.where = "CODCONC =" + codigoConcello;
        params.outSpatialReference = new SpatialReference(102100);

        

        queryTask.execute(params, lang.hitch(this,function(resultados) {

          var geometria = resultados.features[0].geometry

          console.log(resultados)


          var simbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
            new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASHDOT,
            new Color([255,0,0]), 2),new Color([255,255,0,0.25]))


            var dibujo = new Graphic (geometria, simbol)

              console.log(dibujo)

              this.map.graphics.add(dibujo)

        }))

      },


      cargaParroquias() {

        let codigoConcello = this.selectConcellos.value;
        if (codigoConcello == -1) return;

        this.selectParroquias.innerHTML = "";

        console.log(codigoConcello)

        
        const queryTaskKk = new QueryTask(this.config.parroquiasService);

        const consulta = new Query ();
        consulta.returnGeometry = false;
        consulta.outFields = ["CODPARRO", "PARROQUIA"];
        consulta.orderByFields = ["PARROQUIA"];
        consulta.where = "CODCONC=" + codigoConcello;

        queryTaskKk.execute(consulta, lang.hitch(this, function(results) {

          let opti = document.createElement("option");
          opti.value = -1;
          opti.text = "Seleccione una parroquia";
          this.selectParroquias.add(opti);


          for (let a = 0; a < results.features.length; a++) {
            opti = document.createElement("option");
            opti.value = results.features[a].attributes.CODPARRO;
            opti.text = results.features[a].attributes.PARROQUIA;
            this.selectParroquias.add(opti);
          }

        }))


      },

      
      zoomParroquia () {

        let codigoParroquias = this.selectParroquias.value;
        if (codigoParroquias == -1) return;

        this.selectParroquias.innerHTML = "";

        const queryTask = new QueryTask(this.config.parroquiasService);

        var parm = new Query ();

        parm.returnGeometry = true;
        parm.where = "CODPARRO =" + codigoParroquias;
        parm.outSpatialReference = new SpatialReference(102100);

        queryTask.execute(parm, lang.hitch(this,function(resultats) {

          //var geom = resultats.features[0].geometry

          //console.log(geom)


          var simbologia = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
            new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASHDOT,
            new Color([255,0,0]), 2),new Color([255,255,0,0.25]))


            var dibuix = new Graphic (geom, simbologia)

              console.log(dibuix)

              this.map.graphics.add(dibuix)

        }))

      },




    });
  });