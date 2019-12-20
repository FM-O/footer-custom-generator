import ObjectManager from '../services/objectManager';
import Notification from '../services/notification';

class RenderList extends ObjectManager {
    constructor() {
        super();
        this.objectManager = new ObjectManager;
        this.notif = new Notification('list');

        window.addEventListener('load', this.exec.bind(this));
    }

    exec() {
        const lists = document.querySelectorAll('[data-list-primary]');

        [].forEach.call(lists, (list) => {
            const dataGroupTarget = list.getAttribute('data-list-primary');
            const data = this.objectManager.get(dataGroupTarget);

            const oldCitiesList = list.firstElementChild;
            if (oldCitiesList !== null) {
                list.removeChild(oldCitiesList);
            }

            const newList = this.fillListArea(data, dataGroupTarget);

            if (newList) {
                list.appendChild(newList);
            }
        });

        this.buildDistrictSelectors();
        this.buildRegionSelectors();
    }

    fillListArea(data, groupType) {
        if (Object.keys(data).length === 0) {
            return false;
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

            if (data[element].hasOwnProperty('attachment')) {
                const sublist = this.buildSublist(data[element].attachment);

                if (sublist.hasChildNodes()) {
                    elementList.appendChild(sublist);
                }
            }

            list.appendChild(elementList);
        }

        return list;
    }

    buildRegionSelectors() {
        const oldCityRegionSelector = document.getElementById('cities-region-selector');
        const oldDivisionRegionSelector = document.getElementById('division-region-selector');

        if (oldCityRegionSelector !== null) {
            oldCityRegionSelector.parentElement.removeChild(oldCityRegionSelector);
        }

        if (oldDivisionRegionSelector !== null) {
            oldDivisionRegionSelector.parentElement.removeChild(oldDivisionRegionSelector);
        }

        const selector = document.createElement('select');
        selector.id = 'cities-region-selector';
        selector.name = 'region-selector';
        const cityRegionsOption = document.querySelector('#city-attach-region-option');
        const cityRegionsOptionCheckbox = cityRegionsOption.querySelector('input[name="displayRegionsSelector"]');
        const districtRegionsOption = document.querySelector('#district-attach-region-option');
        const districtRegionsOptionCheckbox = districtRegionsOption.querySelector('input[name="displayRegionsSelector"]');

        const regions = this.objectManager.get('regions');
        cityRegionsOption.style.display = "block";

        if (Object.keys(regions).length <= 0) {
            cityRegionsOption.style.display = "none";
        }

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

        if (cityRegionsOptionCheckbox.checked) {
            selector.style.display = "inline";
        }

        if (districtRegionsOptionCheckbox.checked) {
            clonedSelector.style.display = "inline";
        }
    }

    buildDistrictSelectors() {
        const cityDistrictsOption = document.querySelector('#city-attach-district-option');
        const cityDistrictsOptionCheckbox = cityDistrictsOption.querySelector('input[name="displayDistrictsSelector"]');
        const oldDisctrictSelector = document.getElementById('cities-district-selector');

        if (oldDisctrictSelector !== null) {
            oldDisctrictSelector.parentElement.removeChild(oldDisctrictSelector);
        }

        const selector = document.createElement('select');
        selector.id = 'cities-district-selector';
        selector.name = 'district-selector';

        const disctricts = this.objectManager.get('districts');

        cityDistrictsOption.style.display = "block";

        if (Object.keys(disctricts).length <= 0) {
            cityDistrictsOption.style.display = "none";
        }

        for (const district in disctricts) {
            if (disctricts.hasOwnProperty(district)) {
                const option = document.createElement('option');
                option.value = district;
                option.innerHTML = disctricts[district].name;

                selector.appendChild(option);
            }
        }

        cityDistrictsOption.appendChild(selector);

        if (cityDistrictsOptionCheckbox.checked) {
            selector.style.display = "inline";
        }
    }

    buildSublist(attachments) {
        const sublist = document.createElement('ul');
        sublist.className = 'sublist';

        for (const group in attachments) {
            if (attachments.hasOwnProperty(group) && attachments[group].length > 0) {
                const list = attachments[group];

                list.forEach(element => {
                    const line = this.createLine(group, element);

                    if (line) {
                        sublist.appendChild(line);
                    }
                });
            }
        }

        return sublist;
    }

    createLine(groupType, entity) {
        const elementList = document.createElement('li');

        const data = this.objectManager.get(groupType, entity);

        if (data === undefined) {
            return false;
        }

        const elementLink = document.createElement('a');
        elementLink.href = data.link;
        elementLink.target = '_blank';
        elementLink.innerHTML = data.name;

        // const deleteLink = elementLink.cloneNode(true);
        // deleteLink.href = "#";
        // deleteLink.className = "delete-button";
        // deleteLink.setAttribute('data-list', groupType);
        // deleteLink.setAttribute('data-element', element);
        // deleteLink.innerHTML = 'delete';
        // this.attachDeleteEvent(deleteLink);

        elementList.appendChild(elementLink);
        // elementList.appendChild(deleteLink);

        // if (data[element].hasOwnProperty('attachment')) {
        //     this.buildSublist(data[element].attachment);
        // }

        return elementList;
    }

    attachDeleteEvent(link) {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            this.notif.add();
            this.objectManager.delete(link.getAttribute('data-list'), link.getAttribute('data-element'));
            this.notif.display('warn', 'L\'élément a bien été supprimé');
        });
    }
}
  
export default RenderList;
