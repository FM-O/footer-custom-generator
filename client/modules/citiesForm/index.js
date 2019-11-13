import ObjectManager from '../services/objectManager';
import Notification from '../services/notification';

class CitiesForm extends ObjectManager {
    constructor() {
        super();
        this.form = document.getElementById('cities-form');
        this.objectManager = new ObjectManager;
        this.notif = new Notification('cities-form');

        this.exec();
    }

    exec() {
       this.bindEvents();
    }

    bindEvents() {
        const cityField = this.form.querySelector('input[name="cityName"]');
        const linkField = this.form.querySelector('input[name="cityLink"]');
        const checkboxDdS = this.form.querySelector('input[name="displayDistrictsSelector"]');
        const checkboxDrS = this.form.querySelector('input[name="displayRegionsSelector"]');

        cityField.addEventListener('keyup', () => {
            const errorHelper = cityField.parentElement.querySelector('.helper');

            if (cityField.value.length > 0 && cityField.classList.contains('invalid')) {
                this.removeErrors(cityField);
                return;
            }

            if (cityField.value.length <= 0 && !cityField.classList.contains('invalid')) {
                errorHelper.innerHTML = 'Champ obligatoire';
                cityField.classList.add('invalid');
            }
        });

        checkboxDdS.addEventListener('change', () => {
            if (checkboxDdS.checked) {
                this.displayDistrictSelector(true);
                return true;
            }

            this.displayDistrictSelector(false);
        });

        checkboxDrS.addEventListener('change', () => {
            if (checkboxDrS.checked) {
                this.displayRegionSelector(true);
                return true;
            }

            this.displayRegionSelector(false)
        });
        
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            const checkboxDrS = this.form.querySelector('input[name="displayRegionsSelector"]');
            const checkboxDdS = this.form.querySelector('input[name="displayDistrictsSelector"]');

            const cityName = cityField.value;
            const cityLink = linkField.value;

            // Attachment logic
            const regionAttachment = this.form.querySelector('select[name="region-selector"]').value;
            const districtAttachment = this.form.querySelector('select[name="district-selector"]').value;
            const dataRegionAttachments = this.objectManager.get('regions', regionAttachment);
            const dataDistrictAttachments = this.objectManager.get('districts', districtAttachment);

            this.notif.add();

            if (cityName.length <= 0) {
                this.throwErrors({
                    fields: [
                        {element: cityField, error: 'required'}
                    ],
                    errorMessage: 'Remplissez les champs nécessaires'
                });
                return;
            }

            // putting "name" property in your data (2nd option) make a completely new object.
            const normalizedName = this.objectManager.add('cities', {name: cityName, link: cityLink});

            if (!checkboxDrS.checked && !checkboxDdS.checked) {
                this.notif.display('success', 'Votre ville a bien été créée');
                return;
            }
            
            if (checkboxDrS.checked && Object.keys(dataRegionAttachments).length > 0) {
                const attachedRegionCities = dataRegionAttachments.attachment.cities;

                //check if city in array
                if (attachedRegionCities.indexOf(normalizedName) < 0) {
                    attachedRegionCities.push(normalizedName);
                }
                this.objectManager.add('regions', {
                    attachment: {
                        cities: attachedRegionCities,
                        districts: dataRegionAttachments.attachment.districts
                    }
                }, regionAttachment);
            }

            if (checkboxDdS.checked && Object.keys(dataDistrictAttachments).length > 0) {
                const attachedDistrictCities = dataDistrictAttachments.attachment.cities;

                //check if city in array
                if (attachedDistrictCities.indexOf(normalizedName) < 0) {
                    attachedDistrictCities.push(normalizedName);
                }
                this.objectManager.add('districts', {
                    attachment: {
                        cities: attachedDistrictCities
                    }
                }, districtAttachment);
            }

            this.notif.display('success', 'Votre ville a bien été créée');

            this.form.reset();
            this.displayRegionSelector(false);
            this.displayDistrictSelector(false);
        });
    }

    displayDistrictSelector(display) {
        const districtSelector = this.form.querySelector('select[name="district-selector"]');

        if (districtSelector === null) {
            return false;
        }

        if (display) {
            districtSelector.style.display = "inline";
            return true;
        }

        districtSelector.style.display = "none";
    }

    displayRegionSelector(display) {
        const regionSelector = this.form.querySelector('select[name="region-selector"]');

        if (regionSelector === null) {
            return false;
        }

        if (display) {
            regionSelector.style.display = "inline";
            return true;
        }

        regionSelector.style.display = "none";
    }

    throwErrors(errors) {
        const fields = errors.fields;
        const errorMessage = errors.errorMessage;

        this.notif.display('error', errorMessage);

        fields.forEach(field => {
            const errorHelper = field.element.parentElement.querySelector('.helper');

            switch (field.error) {
                case 'required':
                    if (!field.element.classList.contains('invalid')) {
                        field.element.classList.add('invalid');
                    }
                    errorHelper.innerHTML = 'Champ obligatoire';
                    break;
    
                default:
                    if (!field.element.classList.contains('invalid')) {
                        field.element.classList.add('invalid');
                    }
                    errorHelper.innerHTML = 'Erreur';
                    break;
            }
        });
    }

    removeErrors(field) {
        field.parentElement.querySelector('.helper').innerHTML = '';
        field.classList.remove('invalid');
    }
}
  
export default CitiesForm;
