const CustomEvent = require('custom-event');

class Storage {
  /**
   * Save a data string in Local Storage
   *
   * @param {string} name
   * @param {string} data
   */
    static setData(name, data) {
      const updatedData = this.getData(name);

      for (const prop in data) {
        if (data.hasOwnProperty(prop)) {
          
          // I don't know why I wrote that test, but keeping in case of.
          // if (prop === Object.getOwnPropertyNames(updatedData)[0]) {
          //   return false;
          // }

          updatedData[prop] = data[prop];
        }
      }

      localStorage.setItem(name, this.__serialize(updatedData));

      const event = new CustomEvent('storageChange', {
        detail: {
          groupType: name
        }
      });

      window.dispatchEvent(event);
    }

    /**
   * @param {string} name
   * Remove a given data from Local Storage.
   *
   */
    static deleteData(group, name) {
      if (localStorage.getItem(group) && name === undefined) {
        localStorage.removeItem(group);
        return;
      }

      const dataGroup = this.getData(group);
      delete dataGroup[name];
      this.setData(group, dataGroup);
      return;
    }

    /**
   * Get a data value.
   * @param {string} name
   * @returns {object}
   */
    static getData(name, selector) {
      if (localStorage.getItem(name) === null ){
        return {};
      }

      const formattedData = this.__deserialize(localStorage.getItem(name));

      if (selector !== undefined) {
        return formattedData[selector];
      }

      return formattedData;
    }

    static __serialize(data) {
      return JSON.stringify(data);
    }

    static __deserialize(data) {
      return JSON.parse(data);
    }
}

export default Storage;