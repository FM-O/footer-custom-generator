import ObjectManager from '../services/objectManager';
import Notification from '../services/notification';

class DivisionsForm extends ObjectManager {
    constructor() {
        super();
        this.form = document.getElementById('divisions-form');
        this.objectManager = new ObjectManager;
        this.notif = new Notification('division-form');

        this.exec();
    }

    exec() {
       this.bindEvents();
    }

    bindEvents() {
        const divisionField = this.form.querySelector('input[name="divisionName"]');
        const linkField = this.form.querySelector('input[name="divisionLink"]');
        const divisionTypeInputs = this.form.querySelectorAll('input[name="divisionType"]');
        const checkboxDrS = this.form.querySelector('input[name="displayRegionsSelector"]');

        divisionField.addEventListener('keyup', () => {
            const errorHelper = divisionField.parentElement.querySelector('.helper');

            if (divisionField.value.length > 0 && divisionField.classList.contains('invalid')) {
                this.removeErrors(divisionField);
                return;
            }

            if (divisionField.value.length <= 0 && !divisionField.classList.contains('invalid')) {
                errorHelper.innerHTML = 'Champ obligatoire';
                divisionField.classList.add('invalid');
            }
        });

        checkboxDrS.addEventListener('change', () => {
            if (checkboxDrS.checked) {
                this.displayRegionSelector(true);
                return true;
            }

            this.displayRegionSelector(false)
        });

        // Check if radio button 'districts' is selected
        [].forEach.call(divisionTypeInputs, (input) => {
            input.addEventListener('change', () => {
                if (input.value === 'districts') {
                    this.displayCheckboxSelector(true);
                    return true;
                }

                this.displayCheckboxSelector(false);
            })
        });
        
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            let divisionType = 'regions';

            const divisionName = divisionField.value;
            const divisionLink = linkField.value;

            const regionAttachment = this.form.querySelector('select[name="region-selector"]').value;
            const dataRegionAttachments = this.objectManager.get('regions', regionAttachment);

            [].forEach.call(divisionTypeInputs, (input) => {
                if (input.checked) {
                    divisionType = input.value;
                } 
            });

            const attachmentObject = divisionType === 'regions' ? {cities: [], districts: []} : {cities: []};

            this.notif.add();

            if (divisionName.length <= 0) {
                this.throwErrors({
                    fields: [
                        {element: divisionField, error: 'required'}
                    ],
                    errorMessage: 'Remplissez les champs nécessaires'
                });
                return;
            }

            const normalizedName = this.objectManager.add(divisionType, {name: divisionName, link: divisionLink, attachment: attachmentObject});

            if (checkboxDrS.checked && divisionType === 'districts' && Object.keys(dataRegionAttachments).length > 0) {
                const attachedRegionDistricts = dataRegionAttachments.attachment.districts;

                //check if district in array
                if (attachedRegionDistricts.indexOf(normalizedName) < 0) {
                    attachedRegionDistricts.push(normalizedName);
                }

                this.objectManager.add('regions', {
                    attachment: {
                        cities: dataRegionAttachments.attachment.cities,
                        districts: attachedRegionDistricts
                    }
                }, regionAttachment);
            }

            // Translation for notif
            const notifMessage = divisionType === 'regions' ? 'Votre région a bien été créée' : 'Votre département a bien été créé';

            this.notif.display('success', notifMessage);

            this.form.reset();
            this.displayRegionSelector(false);
        });
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

    displayCheckboxSelector(display) {
        const checkboxDrS = this.form.querySelector('input[name="displayRegionsSelector"]');
        const regionSelector = this.form.querySelector('select[name="region-selector"]');

        if (checkboxDrS === null) {
            return false;
        }

        if (display) {
            checkboxDrS.parentElement.style.display = "block";
            return true;
        }

        checkboxDrS.checked = false;
        regionSelector.style.display = "none";
        checkboxDrS.parentElement.style.display = "none";
    }

    throwErrors(errors) {
        const fields = errors.fields;
        const errorMessage = errors.errorMessage;

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

        this.notif.display('error', errorMessage);
    }

    removeErrors(field) {
        field.parentElement.querySelector('.helper').innerHTML = '';
        field.classList.remove('invalid');
    }
}
  
export default DivisionsForm;
