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
        const divisionTypeInputs = this.form.querySelectorAll('input[name="divisionType"]');
        const checkboxDrS = this.form.querySelector('input[name="displayRegionsSelector"]');

        checkboxDrS.addEventListener('change', () => {
            if (checkboxDrS.checked) {
                this.displayRegionSelector(true);
                return true;
            }

            this.displayRegionSelector(false)
        });

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

            const divisionName = this.form.querySelector('input[name="divisionName"]').value;
            const divisionLink = this.form.querySelector('input[name="divisionLink"]').value;

            const regionAttachment = this.form.querySelector('select[name="region-selector"]').value;
            const dataRegionAttachments = this.objectManager.get('regions', regionAttachment);

            [].forEach.call(divisionTypeInputs, (input) => {
                if (input.checked) {
                    divisionType = input.value;
                } 
            });

            const attachmentObject = divisionType === 'regions' ? {cities: [], districts: []} : {cities: []};

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
}
  
export default DivisionsForm;
