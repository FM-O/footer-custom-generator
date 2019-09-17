import Storage from '../../services/storage';

class EditCity {
    constructor() {
        this.cities = {};
    }

    addCity(name, link = '') {
        this.cities[name] = {
            name: name,
            link: link
        }
        Storage.setData('cities', this.cities);
    }

    deleteCity(name) {
        Storage.deleteData('cities', name);
    }

    getCities() {
       return Storage.getData('cities');
    }
}
  
export default EditCity;
