/// <reference path="./util.ts"/>

namespace Booking {
  export class RoomManage {
    private roomTemplate: Element;
    private roomCount: number;
    private rooms: Object;
    private childAgeTemplate: string;
    private infantAgeTemplate: string;
    private roomIndex: number;
    private roomIndexArr: Element[];
    private rowIndexNum: number;
    constructor() {
      this.roomCountVal();
      this.bindDeligateEvents();
      this.templateInjector();
    }
    private roomCountVal(){
      let roomSelectValue = Booking.$.selectBoxVal('.room-select');
      this.roomCount = parseInt(roomSelectValue);
    }
    private roomIndexCounter(){
      this.roomIndexArr = Booking.$.selectall('.row-id');
      this.roomIndex =  this.roomIndexArr.length
    }
    private rowIndexNumGenerate(){
      let rowIds = Booking.$.selectall('.row-id');
      this.rowIndexNum = rowIds.length + 1;
    }
    private bindDeligateEvents(){
      Booking.$.on('body','change','.room-select', () => {
        this.roomCountVal();
        this.roomIndexCounter();
        this.roomIndexManager();
      });
      // Booking.$.on('body','change','.child-count', () => {
      //   this.childCountVal();
      //   this.roomIndexCounter();
      //   this.roomIndexManager();
      // });
    }
    private roomIndexManager(){
      if (this.roomCount == this.roomIndex) {
        return
      }else if(this.roomCount > this.roomIndex){
        let nRoom = this.roomCount - this.roomIndex
        for (let i = 0; i < nRoom; i++) {
            this.templateInjector();
        }
      }else if(this.roomCount < this.roomIndex) {
        this.removeRoomIndex();
      }
    }
    private removeRoomIndex(){
      let rowIds = Booking.$.selectall('.row-index');
      let rowIdsNum = rowIds.length;
      let needToDelete =  rowIdsNum - this.roomCount;
      for (let i = 0; i < needToDelete; i++) {
          rowIds[i+this.roomCount].remove();
      }
    }
    private templateInjector(){
      this.rowIndexNumGenerate();
      this.templateGenrator();
      Booking.$.select('.row-index-wrap').appendChild(this.roomTemplate);
    }
    private templateGenrator() {
      let appendHandler = document.createElement('div');
      appendHandler.classList.add('row-index')
      let roomTemplateString = `
          <span class="row-id">${this.rowIndexNum}</span>
          <div class="row">
            <div class="count-select"><span>adult count:</span>
              <select class="adult-count">
                <option>0</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
              </select><span>child count:</span>
              <select class="child-count">
                <option>0</option>
                <option>1</option>
                <option>2</option>
              </select><span>infant count:</span>
              <select class="infant-count">
                <option>0</option>
                <option>1</option>
                <option>2</option>
              </select>
            </div>
            <div class="age-select">
            </div>
          </div>`;
        appendHandler.innerHTML = roomTemplateString;
        this.roomTemplate = appendHandler;
    }
    private childTemplateGenerator(){
      this.childAgeTemplate=`
      <div class="child-age-wrap"><span>child </span><span>1</span><span>age</span>
        <select class="child-age">
          <option>2 YEAR</option>
          <option>3 YEAR</option>
          <option>4 YEAR</option>
          <option>5 YEAR</option>
          <option>6 YEAR</option>
          <option>7 YEAR</option>
        </select>
      </div>`;
    }
    private infantTemplateGenerator(){
      this.infantAgeTemplate=`
      <div class="infant-age-wrap"><span>infant </span><span>1</span><span>age</span>
        <select class="infant-age">
          <option>0 YEAR </option>
          <option>1 YEAR</option>
          <option>2 YEAR</option>
        </select>
      </div>`;
    }
  }
}
