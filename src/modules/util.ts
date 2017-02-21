namespace Booking {
  export class $ {
/**
 * select the element from a custom wrapper or document wraper bye a query selector.
 * @param  {Node} s         The element we want to select.
 * @param  {Node} context   default value is null and its the
 *                          wrapper of the element we want to select if its considerd.
 * @return {Node}           return the Element we select as s
 */
    static select(s, context = null) {
      return (context) ? context.querySelector(s) : document.querySelector(s);
    }
/**
 * its the same as the select method but it can select multy Elements and return an array
 * @param  {Node} s
 * @param  {Node} context=null
 * @return {Node}              return an array of the selected elements.
 */
    static selectall(s, context = null) {
      // return Array.from(document.querySelectorAll(s));
      return (context) ? context.querySelectorAll(s) :  document.querySelectorAll(s) ;
    }
/**
 * making delegate event bye adding the event on the parent of an element.
 * @TODO Select all of the element and loop for adding listeners in all elements.
 * @param  {Node}   parent    the generic parent we want to add the listener on.
 * @param  {Node}   eventType the type of the listener we receave to add line click or mousemove.
 * @param  {Node}   elem      the element we want to add the delegate event on by adding it to its parrent.
 * @param  {Function} fn      the function we receave with its e(Event) arg to add on the elem.
 * @return {void}
 */
    static on(parent, eventType, elem, fn) {
      let func = (event) => {
        /**
         * check if the elem passed is an object or a selector.
         * @param  {any} typeofelem==="string"
         * @return {voide}
         */
        if (typeof elem === "string") {
          /**
           * select the elem passed and run the function if its (clickd) on the target.
           * @param  {Node} event.target===Booking.$.select(elem)
           * @return {function}
           */
          if(event.target === Booking.$.select(elem)) {
            fn(event);
          }
        }else{
          /**
           * run the function if its (clickd) on the target.
           * @param  {Node} event.target===elem
           * @return {function}
           */
          if(event.target === elem) {
            fn(event);
          }
        }
      };

      if (typeof parent === "string") {
        Booking.$.select(parent).addEventListener(eventType, func);
      } else {
        parent.addEventListener(eventType, func);
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
