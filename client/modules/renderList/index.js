import ObjectManager from '../services/objectManager';

class RenderList extends ObjectManager {
    constructor() {
        super();
        this.objectManager = new ObjectManager;

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

            list.appendChild(newList);
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
            this.objectManager.delete(link.getAttribute('data-list'), link.getAttribute('data-element'));
        });
    }
}
  
export default RenderList;
