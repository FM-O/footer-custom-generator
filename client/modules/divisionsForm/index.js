import ObjectManager from '../services/objectManager';

class DivisionsForm extends ObjectManager {
    constructor() {
        super();
        this.form = document.getElementById('divisions-form');
        this.objectManager = new ObjectManager;

        this.exec();
    }

    exec() {
       this.bindEvents();
    }

    bindEvents() {
        
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            let divisionType = 'regions';
            const divisionTypeInputs = this.form.querySelectorAll('input[name="divisionType"]');
            const divisionName = this.form.querySelector('input[name="divisionName"]').value;
            const divisionLink = this.form.querySelector('input[name="divisionLink"]').value;

            [].forEach.call(divisionTypeInputs, (input) => {
                if (input.checked) {
                    divisionType = input.value;
                } 
            });            

            this.objectManager.add(divisionType, {name: divisionName, link: divisionLink, attachment: {cities: [], districts: []}});
        });
    }
}
  
export default DivisionsForm;
