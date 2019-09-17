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
        
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            const cityName = this.form.querySelector('input[name="cityName"]').value;
            const cityLink = this.form.querySelector('input[name="cityLink"]').value;
            const regionAttachment = this.form.querySelector('select[name="region-selector"]').value;
            const dataRegionAttachments = this.objectManager.get('regions', regionAttachment);

            const attachedCities = dataRegionAttachments.attachment.cities;

            // putting "name" property in your data (2nd option) make a completely new object.
            const normalizedName = this.objectManager.add('cities', {name: cityName, link: cityLink});
            if (attachedCities.indexOf(normalizedName) < 0) {
                attachedCities.push(normalizedName);
            }
            this.objectManager.add('regions', {
                attachment: {
                    cities: attachedCities,
                    districts: dataRegionAttachments.attachment.districts
                }
            }, regionAttachment);
        });
    }
}
  
export default CitiesForm;
