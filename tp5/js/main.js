var app;
window.onload = function () {
  app = new Vue({
    el: "#weatherApp",
    data: {
      loaded: false, // indicateur de chargement
      formCityName: "", // nom de la ville saisie
      message: "WebApp Loaded.",
      messageForm: "", // message d'erreur ou confirmation
      cityList: [
        {
          name: "Paris", // ville par défaut
        },
      ],
      cityWeather: null, // données météo
      cityWeatherLoading: false, // indicateur de chargement météo
    },

    mounted: function () {
      this.loaded = true;
      this.readData();
    },

    methods: {
      readData: function () {
        console.log("JSON.stringify(this.cityList):", JSON.stringify(this.cityList));
        console.log("this.loaded:", this.loaded);
      },

      // Méthode pour ajouter une ville à la liste
      addCity: function (event) {
        event.preventDefault(); // Empêche le rechargement de la page
      
        if (this.isCityExist(this.formCityName)) {
          this.messageForm = 'Cette ville existe déjà dans la liste.';
        } else {
          this.cityList.push({ name: this.formCityName });
          this.messageForm = ""; // Réinitialise le message de statut en cas de succès
        }
      
        // Remise à zéro du champ de saisie
        this.formCityName = "";
      },

      // Méthode pour vérifier si une ville existe dans la liste
      isCityExist: function (_cityName) {
        // Utilise filter pour vérifier si la ville existe déjà (insensible à la casse)
        return this.cityList.filter(
          item => item.name.toUpperCase() === _cityName.toUpperCase()
        ).length > 0;
      
    
    
    
    
    
    },

      remove: function (_city) {
      
            // on utilise 'filter' pour retourne une liste avec tous les items ayant un nom différent de _city.name
            this.cityList = this.cityList.filter(item => item.name != _city.name);
        
      },

      meteo: function (_city) {
        // Logique pour obtenir les données météo à compléter
        this.cityWeatherLoading = true;

        // appel AJAX avec fetch
        fetch('https://api.openweathermap.org/data/2.5/weather?q='+_city.name+'&units=metric&lang=fr&apikey=a951fab7e2b34ff920c48384e0aafb87')
            .then(function(response) {
                return response.json();
            })
            .then(function(json) {
              app.cityWeatherLoading = false;
  
              // test du code retour
              // 200 = OK
              // 404 = city not found
              if(json.cod == 200){
                  // on met la réponse du webservice dans la variable cityWeather
                  app.cityWeather = json;
                  app.message = null;
              }else{
                  app.cityWeather = null;
                  app.message = 'Météo introuvable pour ' + _city.name
                                  + ' (' + json.message+ ')';
              }
          });
          
          
          
          
          
          
          
          
          
          
          },
    },
  });
};
