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

            this.fillListArea(list, data, dataGroupTarget);
        });

        this.buildDistrictSelectors();
        this.buildRegionSelectors();
    }

    fillListArea(element, data, groupType) {
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

            const deleteLink = elementLink.cloneNode(true);
            deleteLink.href = "#";
            deleteLink.className = "delete-button";
            deleteLink.setAttribute('data-list', groupType);
            deleteLink.setAttribute('data-element', element);
            deleteLink.innerHTML = 'delete';
            this.attachDeleteEvent(deleteLink);

            elementList.appendChild(elementLink);
            elementList.appendChild(deleteLink);
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
        const cityRegionsOption = document.querySelector('#city-attach-region-option');
        const districtRegionsOption = document.querySelector('#district-attach-region-option');

        const regions = this.objectManager.get('regions');

        for (const region in regions) {
            if (regions.hasOwnProperty(region)) {
                const option = document.createElement('option');
                option.value = region;
                option.innerHTML = regions[region].name;

                selector.appendChild(option);
            }
        }

        const clonedSelector = selector.cloneNode(true);
        clonedSelector.id = 'division-region-selector';

        cityRegionsOption.appendChild(selector);
        districtRegionsOption.appendChild(clonedSelector);
    }

    buildDistrictSelectors() {
        const cityDistrictsOption = document.querySelector('#city-attach-district-option');
        const oldDisctrictSelector = document.getElementById('cities-district-selector');
        console.log(oldDisctrictSelector);

        if (oldDisctrictSelector !== null) {
            oldDisctrictSelector.parentElement.removeChild(oldDisctrictSelector);
        }

        const selector = document.createElement('select');
        selector.id = 'cities-district-selector';
        selector.name = 'district-selector';

        const disctricts = this.objectManager.get('districts');

        for (const district in disctricts) {
            if (disctricts.hasOwnProperty(district)) {
                const option = document.createElement('option');
                option.value = district;
                option.innerHTML = disctricts[district].name;

                selector.appendChild(option);
            }
        }

        cityDistrictsOption.appendChild(selector);
    }

    attachDeleteEvent(link) {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            this.objectManager.delete(link.getAttribute('data-list'), link.getAttribute('data-element'));
        });
    }
}
  
export default RenderList;
