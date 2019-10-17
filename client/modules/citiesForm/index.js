import ObjectManager from '../services/objectManager';

class CitiesForm extends ObjectManager {
    constructor() {
        super();
        this.form = document.getElementById('cities-form');
        this.objectManager = new ObjectManager;

        this.exec();
    }

    exec() {
       this.bindEvents();
    }

    bindEvents() {
        const checkboxDdS = this.form.querySelector('input[name="displayDistrictsSelector"]');
        const checkboxDrS = this.form.querySelector('input[name="displayRegionsSelector"]');

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

            const cityName = this.form.querySelector('input[name="cityName"]').value;
            const cityLink = this.form.querySelector('input[name="cityLink"]').value;

            // Attachment logic
            const regionAttachment = this.form.querySelector('select[name="region-selector"]').value;
            const districtAttachment = this.form.querySelector('select[name="district-selector"]').value;
            const dataRegionAttachments = this.objectManager.get('regions', regionAttachment);
            const dataDistrictAttachments = this.objectManager.get('districts', districtAttachment);

            // putting "name" property in your data (2nd option) make a completely new object.
            const normalizedName = this.objectManager.add('cities', {name: cityName, link: cityLink});

            if (!checkboxDrS.checked && !checkboxDdS.checked) {
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
}
  
export default CitiesForm;
