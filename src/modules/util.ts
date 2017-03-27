namespace Booking {
  export class $ {
/**
 * select the element from a custom wrapper or document wraper bye a query selector.
 * @param  {Node} s         The element we want to select.
 * @param  {Node} context   default value is null and its the
 *                          wrapper of the element we want to select if its considerd.
 * @return {Node}           return the Element we select as s
 */
    static select(s, context?) {
      return (context) ? context.querySelector(s) : document.querySelector(s);
    }
/**
 * its the same as the select method but it can select multy Elements and return an array
 * @param  {Node} s
 * @param  {Node} context=null
 * @return {Node}              return an array of the selected elements.
 */
    static selectall(s, context?):Array<any> {
      const elems= Array.from((context) ? context.querySelectorAll(s) :  document.querySelectorAll(s));
      return elems;
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
        let elems;
        if (typeof elem === "string") {
          elems = Booking.$.selectall(elem);
        }else if(Array.isArray(elem)) {
          elems = elem;
        } else {
          elems = [elem];
        }
        if(elems.find(el => el === event.target)) {
          fn(event);
        }
      };

      if (typeof parent === "string") {
        const parentArr = Booking.$.selectall(parent)
        parentArr.forEach(item => item.addEventListener(eventType, func));
      } else if (Array.isArray(parent)) {
          parent.forEach(item => item.addEventListener(eventType, func));
        }else{
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

    static selectBoxVal(selector, context?){
      if (selector instanceof HTMLSelectElement) {
        return selector.options[selector.selectedIndex].value;
      }else{
        const selectBox = Booking.$.select(selector,context);
        return selectBox.options[selectBox.selectedIndex].value;

      }
    }
  }
}
