/// <reference path="./util.ts"/>
namespace Booking {
  export class RoomManage {
    constructor() {
      this.bindDeligateEvents();
      this.templateInjector();
    }
    //----------------------BindEvents-----------------------------
    private bindDeligateEvents(){
      Booking.$.on('body','change','.room-select', () => {
        this.roomIndexManager();
      });
      Booking.$.on('body','change','.child-count', () => {
        this.childIndexManager();
      });
    }
    //---------------------RoomIndexing----------------------------
    private roomRowArr(){
      const roomArr = Booking.$.selectall('.row-index');
      return roomArr;
    }
    private roomCountVal(){
      const roomSelectValue = Booking.$.selectBoxVal('.room-select');
      return parseInt(roomSelectValue);
    }
    private roomIndexCounter(){
      let roomIndexArr = Booking.$.selectall('.row-id');
      return  roomIndexArr.length
    }
    private rowIndexNumGenerate(){
      const rowIds = this.roomIndexCounter();
      return rowIds + 1;
    }
    private roomIndexManager(){
      const roomCount = this.roomCountVal();
      const roomIndex = this. roomIndexCounter();
      if (roomCount == roomIndex) {
        return
      }else if(roomCount > roomIndex){
        const nRoom = roomCount - roomIndex
        for (let i = 0; i < nRoom; i++) {
            this.templateInjector();
        }
      }else if(roomCount < roomIndex) {
        this.removeRoomIndex();
      }
    }
    private removeRoomIndex(){
      const rowIdsNum = this.roomIndexCounter();
      const roomCount = this.roomCountVal();
      const needToDelete =  rowIdsNum - roomCount;
      const roomArr = this.roomRowArr();
      for (let i = 0; i < needToDelete; i++) {
          console.log('needToDelete')
          roomArr[i+roomCount].remove();
      }
    }
    //--------------------ChildIndexing----------------------------
    private childCountVal(){
      const childSelectVal = Booking.$.selectBoxVal('.child-count');
      return parseInt(childSelectVal);
    }
    private childIndexCounter(){
      const childIndexArr = Booking.$.selectall('.child-age-wrap');
      return childIndexArr.length
    }
    private childArr(){
      const Arr = Booking.$.selectall('.child-age-wrap');
      return Arr;
    }
    private childIndexManager(){
      const childCount = this.childCountVal();
      const childIndex = this.childIndexCounter();
      if (childCount == childIndex) {
        return
      }else if(childCount > childIndex){
        const nRoom = childCount - childIndex
        for (let i = 0; i < nRoom; i++) {
            this.childTemplateInjector();
        }
      }else if(childCount < childIndex) {
        this.removeChildIndex();
      }
    }
    private removeChildIndex(){
      const childCount = this.childCountVal();
      const childIdsNum = this.childIndexCounter()
      let needToDelete =  childIdsNum - childCount;
      const childArr = this.childArr()
      for (let i = 0; i < needToDelete; i++) {
          childArr[i+childCount].remove();
      }
    }
    //--------------------TemplateInjector-------------------------
    private templateInjector(){
      const roomTemplate = this.templateGenrator();
      Booking.$.select('.row-index-wrap').appendChild(roomTemplate);
    }
    private childTemplateInjector(){
      const childTemplate = this.childTemplateGenerator();
      Booking.$.select('.child-select').appendChild(childTemplate);
    }
    private infantTemplateInjector(){}
    //-----------------------TemplateGenerator---------------------
    private templateGenrator() {
      let appendHandler = document.createElement('div');
      appendHandler.classList.add('row-index')
      let roomTemplateString = `
          <span class="row-id">${this.rowIndexNumGenerate()}</span>
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
              <div class="child-select">

              </div>
            </div>
          </div>`;
      appendHandler.innerHTML = roomTemplateString;
      return appendHandler;
    }
    private childTemplateGenerator(){
      let appendhandler = document.createElement('div');
      appendhandler.classList.add('child-age-wrap');
      let childTemplate=`
      <span>child </span>
      <span>1</span>
      <span>age</span>
      <select class="child-age">
        <option>2 YEAR</option>
        <option>3 YEAR</option>
        <option>4 YEAR</option>
        <option>5 YEAR</option>
        <option>6 YEAR</option>
        <option>7 YEAR</option>
      </select>`;
      appendhandler.innerHTML = childTemplate;
      return appendhandler;
    }
    private infantTemplateGenerator(){
      // this.infantAgeTemplate=`
      // <div class="infant-age-wrap"><span>infant </span><span>1</span><span>age</span>
      //   <select class="infant-age">
      //     <option>0 YEAR </option>
      //     <option>1 YEAR</option>
      //     <option>2 YEAR</option>
      //   </select>
      // </div>`;
    }
  }
}
