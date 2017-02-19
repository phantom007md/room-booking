namespace Booking {
  export class $ {

    static select(s, context = null) {
      return (context) ? context.querySelector(s) : document.querySelector(s);
    }

    static selectall(s, context = null) {
      // return Array.from(document.querySelectorAll(s));
      return (context) ? context.querySelectorAll(s) :  document.querySelectorAll(s) ;
    }

    static on(parentSelector, eventType, elemSelector, fn) {
      let func = (event) => {
        if (typeof elemSelector === "string") {
          if(event.target === Booking.$.select(elemSelector)) {
            fn(event);
          }
        }else{
          if(event.target === elemSelector) {
            fn(event);
          }
        }
      };

      if (typeof parentSelector === "string") {
        Booking.$.select(parentSelector).addEventListener(eventType, func);
      } else {
        parentSelector.addEventListener(eventType, func);
      }
    }

    static findParent(target_elem, parent_elem) {
        let tar_elem_parent = target_elem.parentNode;
        while (tar_elem_parent != parent_elem) {
          if (tar_elem_parent === document) {
            return false;
          }
          tar_elem_parent = tar_elem_parent.parentNode;
        }
        return true;
    }

    static selectBoxVal(selector){
      if (selector instanceof HTMLSelectElement) {
        // console.log('its an obj');
        return selector.options[selector.selectedIndex].value;
      }else{
        const selectBox = Booking.$.select(selector);
        // console.log('its an elem');
        return selectBox.options[selectBox.selectedIndex].value;
        
      }
    }

  }
}
