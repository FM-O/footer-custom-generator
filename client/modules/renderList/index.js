import ObjectManager from '../services/objectManager';

class RenderList extends ObjectManager {
    constructor() {
        super();
        this.lists = document.querySelectorAll('[data-list]');
        this.objectManager = new ObjectManager;

        this.exec();
    }

    exec() {
        [].forEach.call(this.lists, (list) => {
            const dataGroupTarget = list.getAttribute('data-list');
            const data = this.objectManager.get(dataGroupTarget);

            this.fillListArea(list, data);
        });

        this.buildRegionSelectors();
    }

    fillListArea(element, data) {
        if (Object.keys(data).length === 0) {
            return false;
        }
        
        const oldCitiesList = element.firstElementChild;
        if (oldCitiesList !== null) {
            element.removeChild(oldCitiesList);
        }

        const list = document.createElement('ul');

        for (const element in data) {
            const elementList = document.createElement('li');
            const elementLink = document.createElement('a');
            elementLink.href = data[element].link;
            elementLink.target = '_blank';
            elementLink.innerHTML = data[element].name;

            elementList.appendChild(elementLink);
            list.appendChild(elementList);
        }

        element.appendChild(list);
    }

    buildRegionSelectors() {
        const oldRegionSelector = document.getElementById('cities-region-selector');

        if (oldRegionSelector !== null) {
            oldRegionSelector.parentElement.removeChild(oldRegionSelector);
        }

        const selector = document.createElement('select');
        selector.id = 'cities-region-selector';
        selector.name = 'region-selector';
        const citiesForm = document.querySelector('#cities-form');
        const citiesFormSubmit = citiesForm.querySelector('input[type="submit"]');

        const regions = this.objectManager.get('regions');

        for (const region in regions) {
            if (regions.hasOwnProperty(region)) {
                const option = document.createElement('option');
                option.value = region;
                option.innerHTML = regions[region].name;

                selector.appendChild(option);
            }
        }

        citiesForm.insertBefore(selector, citiesFormSubmit);
    }
}
  
export default RenderList;
